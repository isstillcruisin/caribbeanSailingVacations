import React from "react";

const YachtInquiryForm = props => (
  <form>
    <p>To inquire about chartering this yacht, please fill out the following form and an email will be sent to {props.travelAgentEmail} </p>
    <i>All fields are required unless otherwise stated.</i>
    <h3>A WhiteLabel Page For Yacht Charter Inquiry</h3>
    <div>NAME: {props.whiteLabel.name}</div>
    <div>RECIPIENT EMAIL: {props.whiteLabel._travelAgent.email}</div>
    <div>BOAT NAME: {props.boat.boatName}</div>
    <p style={{fontSize: 10 + 'px'}}>BOAT CREW BIO: {props.boat.crewBio}</p>
  </form>
);

export default YachtInquiryForm;
