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
              {'_id': 1, boatName: 'boat1', maxPassengers: 5, pricePerWeek: 1000, imgs: []}, 
              {'_id': 2, boatName: 'boat2', maxPassengers: 5, pricePerWeek: 1000, imgs: []}, 
            ]
          }
          eBrochure={
            {
              yachts:[
                {_id: 2, boatName: 'boat2', maxPassengers: 5, pricePerWeek: 1000, imgs: []}, 
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