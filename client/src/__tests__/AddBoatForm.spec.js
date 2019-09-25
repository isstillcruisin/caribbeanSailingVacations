import React from "react";
import { create } from "react-test-renderer";
import AddBoatForm from '../components/AddBoatForm';

describe("AddBoatForm component", () => {
  test("Matches the snapshot", () => {
    const form = create(<AddBoatForm />);
    expect(form.toJSON()).toMatchSnapshot();
  });
});