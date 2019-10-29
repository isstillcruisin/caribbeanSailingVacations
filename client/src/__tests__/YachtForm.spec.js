import React from 'react'
import { create } from 'react-test-renderer'
import YachtForm from '../components/YachtForm'

describe('YachtForm component', () => {
  test('Matches the snapshot', () => {
    const form = create(<YachtForm 
      boatName='test boat'
      crewBio='test bio'
      maxPassengers={10}
      year={1999}
      manufacture='2000 feet test manufacture'
      imgs={[]}
    />)
    expect(form.toJSON()).toMatchSnapshot()
  })
})