import React from "react";
import { create } from "react-test-renderer";
import ConfigureEBrochureForm from '../components/ConfigureEBrochureForm';
import { MemoryRouter } from 'react-router';

describe("ConfigureEBrochureForm component", () => {
  test("Matches the snapshot", () => {
    const form = create(
       <MemoryRouter>
        <ConfigureEBrochureForm 
          allYachts={
            [
              {'_id': 1, boatName: 'boat1'}, 
              {'_id': 2, boatName: 'boat2'}
            ]
          }
          eBrochure={
            {
              yachts:[
                {_id: 2, boatName: 'boat2'}
              ],
              name: 'test'
            }
          }
        />
      </MemoryRouter>
    );
    expect(form.toJSON()).toMatchSnapshot();
  });
});