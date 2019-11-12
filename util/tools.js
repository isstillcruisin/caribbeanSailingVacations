const db = require('../models')

const doesADateRangeOverlap = (dbDateRanges, startDate, endDate) => {
  return !!dbDateRanges.find(range => {
    return !(
      (startDate < range.from && endDate < range.from) ||
      (endDate > range.to && startDate > range.to)
    )
  })
}

const updateYachtAvailabilityFromData = (yacht, data) => {
  return new Promise(function(resolve, reject) {
    if (data.calendar.yachtName === 'No Results') {
      db.UnavailableDateRange.deleteMany({ _yacht: { _id: yacht._id }, type: 'CYA' })
        .then((dbDeleted) => {
          db.UnavailableDateRange.find({ _yacht: { _id: yacht._id } })
            .then(dbRanges => {
              resolve(dbRanges)
            })
        })
    } else {
      const unavailableDateRanges = data.calendar.map(range => {
        return {
          _yacht: yacht._id,
          from: new Date(range.yachtStartDate),
          to: new Date(range.yachtEndDate),
          description: range.yachtBookDesc,
          type: 'CYA'
        }
      })
      db.UnavailableDateRange.deleteMany({ _yacht: { _id: yacht._id }, type: 'CYA' })
        .then((dbDeleted) => {
          db.UnavailableDateRange.create(unavailableDateRanges)
            .then((dbCreated) => {
              db.UnavailableDateRange.find({ _yacht: { _id: yacht._id } })
                .then(dbRanges => {
                  resolve(dbRanges)
                })
            })
        })
    }
  })
}


module.exports = {
  doesADateRangeOverlap, updateYachtAvailabilityFromData
}
