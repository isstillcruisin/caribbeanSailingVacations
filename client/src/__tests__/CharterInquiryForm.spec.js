import React from "react";
import { create } from "react-test-renderer";
import CharterInquiryForm from '../components/CharterInquiryForm';

describe("CharterInquiryForm component", () => {
  test("Matches the snapshot", () => {
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
      />
    );
    expect(alert.toJSON()).toMatchSnapshot();
  });
});