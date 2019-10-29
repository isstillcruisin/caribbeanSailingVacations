import React from 'react'
import { create } from 'react-test-renderer'
import AddWhiteLabelForm from '../components/AddWhiteLabelForm'

describe('AddWhiteLabelForm component', () => {
  test('Matches the snapshot', () => {
    const form = create(<AddWhiteLabelForm whiteLabelName='test' />)
    expect(form.toJSON()).toMatchSnapshot()
  })
})