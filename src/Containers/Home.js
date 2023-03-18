import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const homeSelector =  useSelector(state=> state)
  console.log(homeSelector);
    return <div>Home</div>;
};

export default Home;
