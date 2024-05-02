import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home"; // Assuming you have a Home component
import Config from "./Config"; // Assuming you have a Config component
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css"; // Import your CSS file with transition styles

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation(); // Use useLocation hook to get the current location

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/config" element={<Config />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
