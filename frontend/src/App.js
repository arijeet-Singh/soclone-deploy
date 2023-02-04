import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import StackOverflow from "./components/StackOverflow";
import Question from "./components/AddQuestion/Question";
import ViewQuestion from "./components/ViewQuestion";
import Index from "./components/Auth/Index";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./feature/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import Tags from "./components/StackOverflow/Tags";
import Users from "./components/StackOverflow/Users";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={StackOverflow} />
        <Route exact path="/auth" component={Index} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/users" component={Users} />
        <PrivateRoute exact path="/add-question" component={Question} />
        <PrivateRoute exact path="/question" component={ViewQuestion} />
      </Switch>
    </div>
  );
}

export default App;
