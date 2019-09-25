import React from "react";
import { create } from "react-test-renderer";
import AddEBrochureForm from '../components/AddEBrochureForm';

describe("AddEBrochureForm component", () => {
  test("Matches the snapshot", () => {
    const form = create(<AddEBrochureForm name='test' />);
    expect(form.toJSON()).toMatchSnapshot();
  });
});