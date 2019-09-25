import React from "react";
import { create } from "react-test-renderer";
import ConfigureWhiteLabelForm from '../components/ConfigureWhiteLabelForm';
import { MemoryRouter } from 'react-router';

describe("ConfigureWhiteLabelForm component", () => {
  test("Matches the snapshot", () => {
    const form = create(
      <MemoryRouter>
        <ConfigureWhiteLabelForm 
          whiteLabel={
            {
              streetAddress: '1 Test Lane',
              name: 'test',
              ebrochures: [
                {
                  name: 'test brochure',
                  _id: '1',
                }
              ],
            }
          }
        />
      </MemoryRouter>
    );
    expect(form.toJSON()).toMatchSnapshot();
  });
});