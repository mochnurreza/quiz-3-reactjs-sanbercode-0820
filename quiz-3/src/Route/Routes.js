import React, { useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Nav from "./Nav";
import Home from "../Konten/Home";
import About from "../Konten/About";
import MovieList from "../Konten/MovieList";
import Notfound from "../Konten/Notfound";
import { Login } from "../Kontex/Login";
import LoginForm from "../Kontex/LoginForm";

const Routes = () => {
    const { login } = useContext(Login);
    const history = useHistory();
    history.push("/");
    console.log(login);
    return (
      <>
        <Nav />
        <section>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            {login === "sudah" && 
              <Route path="/movielist">
                <MovieList />
              </Route>
            }
            <Route component={Notfound} />
          </Switch>
        </section>
        <footer>
          <h5>copyright &copy; 2020 by Sanbercode</h5>
        </footer>
      </>
    );
  };
  
  export default Routes;
  