import React, { useEffect } from "react";
import Private from "../components";
import { useAppStore } from "../../../store";
import { useNavigate } from "react-router-dom";

const PrivateContainer = () => {
  const { userInfo } = useAppStore();
  const navigateTo = useNavigate();
  console.log("This is the userInfo from the private container", userInfo);

  useEffect(() => {
    console.log("I'm inside the useEffect");
    if(!userInfo) {
      navigateTo("/auth");
    }
  },[userInfo, navigateTo]);

  return <Private />;
};

export default PrivateContainer;
