// Import the dependencies for testing
const expect = require('chai').expect
const { doesADateRangeOverlap } = require('../../util/tools')
const moment = require('moment')

describe('doesADateRangeOverlap', () => {
  it('returns false if there are no date ranges passed in', (done) => {
    expect(doesADateRangeOverlap([], new Date(), new Date())).to.equal(false)
    done()
  })

  it('returns true if the startDate is between the start and end of a range', (done) => {
    const ranges = [{
      from: moment().subtract(1, 'days').toDate(),
      to: moment().add(1, 'days').toDate()
    }]

    const startDate = new Date()
    let endDate = moment().toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    endDate = moment().add(1, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    endDate = moment().add(2, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    done()
  })

  it('returns true if the endDate is between the start and end of a range', (done) => {
    const ranges = [{
      from: moment().subtract(1, 'days').toDate(),
      to: moment().add(1, 'days').toDate()
    }]

    const endDate = new Date()
    let startDate = moment().toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    startDate = moment().subtract(1, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    startDate = moment().subtract(2, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(true)
    done()
  })

  it('returns false if the startDate and endDate are both before the start and end of all ranges', (done) => {
    const ranges = [{
      from: moment().subtract(1, 'days').toDate(),
      to: moment().add(1, 'days').toDate()
    }]

    const startDate = moment().subtract(4, 'days').toDate()

    const endDate = moment().subtract(3, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(false)
    done()
  })

  it('returns false if the startDate and endDate are both after the start and end of all ranges', (done) => {
    const ranges = [{
      from: moment().subtract(1, 'days').toDate(),
      to: moment().add(1, 'days').toDate()
    }]

    const startDate = moment().add(3, 'days').toDate()

    const endDate = moment().add(4, 'days').toDate()
    expect(doesADateRangeOverlap(ranges, startDate, endDate)).to.equal(false)
    done()
  })
})
