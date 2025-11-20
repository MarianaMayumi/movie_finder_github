import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import './App.css';

const NotFound = ()=> <h2>404 Not Found</h2>;

export default function App(){
  return(
    <Router basename="/movie_finder_github">
      <nav><Link to="/">Movie Finder</Link></nav>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/movie/:id" component={Movie}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}
