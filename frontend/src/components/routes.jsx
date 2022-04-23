import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home";
import Signin from "./login";
import signup from "./signup";
function routes() {
  return (
    <div>
      <Routes>
        <Route path="/home" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={signup} />
        <Route exact path="/" element={<Navigate to="/home" />}></Route>
      </Routes>
    </div>
  );
}

export default routes;
