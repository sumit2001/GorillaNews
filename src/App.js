import './App.css';
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  // const apiKey = "process.env.REACT_APP_NEWS_API";

  const [progress, setProg] = useState(0);

  const [country, setCountry] = useState("in");

  const setProgress = (progress) => {
    setProg(progress)
  }

  // const cats = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
  const cats = ["top", "business", "entertainment", "environment", "food", "health", "politics", "science", "sports", "technology", "world"];
  const routeComponents = cats.map(ele => (
    <Route key={ele} exact path={`/GorillaNews/${ele === "top" ? "" : ele}`} element={<News key={ele} apiKey={apiKey} country={country} setProgress={setProgress} category={ele} pageSize={20} />}></Route>
  ));
  const countries = {
    All: "all",
    // Argentina: "ar",
    Australia: "au",
    // Austria: "at",
    // Belgium: "be",
    // Brazil: "br",
    // Bulgaria: "bg",
    Canada: "ca",
    China: "cn",
    // Colombia: "co",
    Cuba: "cu",
    // "Czech republic": "cz",
    // Egypt: "eg",
    France: "fr",
    Germany: "de",
    // Greece: "gr",
    "Hong kong": "hk",
    // Hungary: "hu",
    India: "in",
    // Indonesia: "id",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    Japan: "jp",
    // Latvia: "lv",
    // Lebanon: "lb",
    // Lithuania: "lt",
    Malaysia: "my",
    // Mexico: "mx",
    // Morocco: "ma",
    Netherland: "nl",
    // "New zealand": "nz",
    Nigeria: "ng",
    // "North korea": "kp",
    // Norway: "no",
    Pakistan: "pk",
    Philippines: "ph",
    // Poland: "pl",
    // Portugal: "pt",
    // Romania: "ro",
    Russia: "ru",
    "Saudi arabia": "sa",
    Serbia: "rs",
    Singapore: "sg",
    Slovakia: "sk",
    // Slovenia: "si",
    "South africa": "za",
    "South korea": "kr",
    // Spain: "es",
    // Sweden: "se",
    // Switzerland: "ch",
    // Taiwan: "tw",
    Thailand: "th",
    // Turkey: "tr",
    // Ukraine: "ua",
    "United arab emirates": "ae",
    "United kingdom": "gb",
    "United states of america": "us",
    // Venezuela: "ve"
  }

  return (
    <Router>
      <div>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Navbar categories={cats} countries={countries} setCountry={setCountry} />
        <Routes>
          {routeComponents}
        </Routes>
      </div>
    </Router>
  )

}


export default App