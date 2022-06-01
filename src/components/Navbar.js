import React from 'react'
import {
  Link, useLocation
} from "react-router-dom";
const Navbar = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const setCountry = () => {
    props.setCountry(document.querySelector(".country").value);
  }
  let location = useLocation();
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/GorillaNews/">NewsGorilla</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: "#212529", color: "white" }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">NewsGorilla</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" style={{ backgroundColor: "white" }}></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">

              {props.categories.map(category => {
                return <li key={category} className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/GorillaNews/" + (category === "top" ? "" : category) ? "active" : ""}`} to={`/GorillaNews/${category === "top" ? "" : category}`}><b>{category === "top" ? "Home" : capitalizeFirstLetter(category)}</b></Link>
                </li>
              })}

            </ul>
            <ul className="navbar-nav justify-content-end my-1">
              <select defaultValue="in" className="form-select form-select-sm country" aria-label="Default select example" onChange={setCountry}>
                {Object.keys(props.countries).map(function (key) {
                  return <option key={key} value={props.countries[key]}>{key}</option>
                })
                }
              </select>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
