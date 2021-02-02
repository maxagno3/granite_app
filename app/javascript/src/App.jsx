import Logger from "js-logger";
import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import ShowTask from "components/Tasks/ShowTask";
import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";
import EditTask from "components/Tasks/EditTask";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    Logger.info("Log from js-logger");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/:id/show" component={ShowTask} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
      </Switch>
    </Router>
  );
};

export default App;
