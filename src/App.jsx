import React from "react";
import RandomPlay from "./pages/RandomPlay";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./Components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random" element={<RandomPlay />} />
        {/* <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
          </Route>
        </Route> */}
      </Routes>
    </>
  );
};

export default App;
