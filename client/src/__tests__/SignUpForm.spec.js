import React from 'react'
import { create } from 'react-test-renderer'
import SignUpForm from '../components/SignUpForm'

describe('SignUpForm component', () => {
  test('Matches the snapshot', () => {
    const form = create(<SignUpForm 
      email='test@testerson.com'
      password='aPassword'
    />)
    expect(form.toJSON()).toMatchSnapshot()
  })
})