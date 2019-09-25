import React from "react";
import { create } from "react-test-renderer";
import StreetAddress from '../components/StreetAddress';

describe("StreetAddress component", () => {
  test("Matches the snapshot", () => {
    const address = create(<StreetAddress 
      address={{
        name: 'test',
        companyName: 'test company',
        streetAddress: '1 Tester Lane',
        city: 'Test',
        state: 'Tt',
        country: 'Test USA',
        zipCode: '00000-0000'
      }}
    />);
    expect(address.toJSON()).toMatchSnapshot();
  });
});