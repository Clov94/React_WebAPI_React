import React from "react";
import "./App.css";
import { HomeComponent } from "./components/home-component";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavigationMenuComponent } from "./components/navigation-menu-component";
import { DepartmentComponent } from "./components/sections/department-component";
import { EmployeeComponent } from "./components/sections/employee-component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          React JS with API demo
        </h3>
        <h5 className="m-3 d-flex justify-content-center">
          Employee Management Portal
        </h5>
        <NavigationMenuComponent />
        <Switch>
          <Route path="/" component={HomeComponent} exact />
          <Route path="/department" component={DepartmentComponent} exact />
          <Route path="/employee" component={EmployeeComponent} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
