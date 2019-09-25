import React from "react";
import { create } from "react-test-renderer";
import CharterInquiryForm from '../components/CharterInquiryForm';

describe("CharterInquiryForm component", () => {
  test("Matches the snapshot", () => {
    const alert = create(
      <CharterInquiryForm 
        boat={{boatName: 'test boat'}}
        whiteLabel={{
          _travelAgent: {
            firstName: 'Test',
            lastName: 'Testerson'
          }
        }}
      />
    );
    expect(alert.toJSON()).toMatchSnapshot();
  });
});