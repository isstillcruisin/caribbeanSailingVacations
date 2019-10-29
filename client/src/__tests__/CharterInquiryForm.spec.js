import React from 'react'
import { create } from 'react-test-renderer'
import CharterInquiryForm from '../components/CharterInquiryForm'

describe('CharterInquiryForm component', () => {
  test('Matches the snapshot', () => {
    const alert = create(
      <CharterInquiryForm 
        boat={{boatName: 'test boat', pricePerWeek: 10000}}
        whiteLabel={{
          _travelAgent: {
            firstName: 'Test',
            lastName: 'Testerson'
          }
        }}
        month={new Date(2019, 11)}
        unavailableDateRanges={[
          { from: new Date('October 12, 2019'), to: new Date('October 25, 2019')},
          { from: new Date('December 24, 2019'), to: new Date('January 2, 2020')}
        ]}
      />
    )
    expect(alert.toJSON()).toMatchSnapshot()
  })
})