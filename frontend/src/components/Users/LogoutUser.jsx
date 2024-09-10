import React from "react";

const LogoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default LogoutUser;
