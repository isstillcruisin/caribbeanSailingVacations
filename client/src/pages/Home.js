import React from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  return <Redirect to={{ pathname: "/sign-in" }} />;
};

export default Home;
