import React from "react";
import Fade from "react-reveal/Fade";
import SignIn from "./SignIn";
import { Redirect } from "react-router-dom";


const Home = () => {
  return <Redirect to={{ pathname: "/sign-in" }} />;
};

export default Home;
