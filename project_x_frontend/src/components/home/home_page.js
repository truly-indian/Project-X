"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const HomePageView = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const userInfo = Cookies.get('userInfo');
    const info = JSON.parse(userInfo);
    setUserName(info?.email || '');
  }, []);

  return (
    <>
      <h1>Hello Mr. {userName} </h1>
    </>
  );
}

export default HomePageView