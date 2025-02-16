import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Public from "../components";
import { useAppStore } from "../../../store";

const PublicContainer = () => {
  const { userInfo } = useAppStore();
  const navigateTo = useNavigate();

  console.log("This is the userInfo from the public container", userInfo);
  useEffect(() => {
    console.log("This is the userInfo from the public container", userInfo);
    if (userInfo) {
        console.log("I'm in the if block of public")
      navigateTo("/home");
    }
  }, [userInfo, navigateTo]);

  return <Public />;
};

export default PublicContainer;
