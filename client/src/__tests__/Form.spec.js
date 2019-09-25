import React from "react";
import { create } from "react-test-renderer";
import Form from '../components/Form';

describe("Form component", () => {
  test("Matches the snapshot", () => {
    const form = create(
      <Form 
        boatName='test boat'
        crewBio='test bio'
        maxPassengers='10'
        year='1999'
        manufacture='2000 feet test manufacture'
        imgs={[]}
      />
    );
    expect(form.toJSON()).toMatchSnapshot();
  });
});