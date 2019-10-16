import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../util/AuthProvider";

function AuthRoute({ component: Component, ...rest }) {
  const [authState] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        authState ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AuthRoute;
