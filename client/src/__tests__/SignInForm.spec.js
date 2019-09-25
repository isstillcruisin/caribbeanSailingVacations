import React from "react";
import { create } from "react-test-renderer";
import SignInForm from '../components/SignInForm';

describe("SignInForm component", () => {
  test("Matches the snapshot", () => {
    const form = create(<SignInForm 
      email='test@testerson.com'
      password='aPassword'
    />);
    expect(form.toJSON()).toMatchSnapshot();
  });
});