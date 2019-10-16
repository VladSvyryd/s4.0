import React, { useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Shell from "./components/Shell/Shell";

import { Route, Switch, HashRouter } from "react-router-dom";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import MainMenu from "./components/MainMenu/MainMenu";
import { WindowsStatesProvider } from "./util/WindowsStatesProvider";
import { AuthProvider } from "./util/AuthProvider";
import CheckPage from "./components/CheckPage/CheckPage";
// App
// Main Component which at the beginning sends to CheckPage/Main Menu
// HashRouter(Browser Router) deals with all Routes > programm on the server or locally is being loaded with index.html,
// but there is no other paths, so we need to use HashRouter(#) which inserts '#' in url, to imitate dynamic page for react Router, so all dynamic urls works.
// By Compiling for online it could be switched with BrowserRoouter, offline goes only with HasRouter

// Switch Changes global path according to path=1(grundlagen)...2(fuegen)...3(energieuebertragung)...4(s_tragen) and opens Shell Component with right set of pages
// App has a global React object props that is being send to each Shell Component to manage the state of current Chapter
const App = props => {
  return (
    <div className="allCenter">
      <div className="App">
        <AuthProvider>
          <HashRouter>
            <WindowsStatesProvider>
              <Switch>
                <Route path="/" exact component={CheckPage} />
                <AuthRoute path="/hauptmenu" exact component={MainMenu} />
                <Route
                  path="/grundlagen"
                  render={props => <Shell path={1} {...props} />}
                />
                <Route
                  path="/fuegen"
                  render={props => <Shell path={2} {...props} />}
                />
                <Route
                  path="/energieuebertragung"
                  render={props => <Shell path={3} {...props} />}
                />
                <Route
                  path="/s_tragen"
                  render={props => <Shell path={4} {...props} />}
                />
              </Switch>
            </WindowsStatesProvider>
          </HashRouter>
        </AuthProvider>
      </div>
    </div>
  );
};
export default App;
