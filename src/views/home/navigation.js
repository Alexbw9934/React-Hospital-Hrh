import React from "react";
import { useHistory, Link } from "react-router-dom";
// import {button,nav } from 'bootstrap';

export const Navigation = (props) => {
  const history = useHistory();
  return (
    <div className="fixed-top">
      <nav
        id="menu"
        className="navbar navbar-default navbar-fixed-top "
        style={{ backgroundColor: "aliceblue" }}
      >
        <div className="container" style={{ display: "contents" }}>
          <div className="navbar-header">
            {/* <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}

          </button> */}
            {/* <a className='navbar-brand page-scroll' href='#page-top'>
            React Landing Page
          </a>{' '} */}
          </div>

          <div
            className="container"
            // className='collapse navbar-collapse'
            id="bs-example-navbar-collapse-1"
          >
            <ul
              className="nav navbar-nav navbar-right"
              style={{ display: "contents" }}
            >
              <li>
                <a className="navbar-brand page-scroll" href="#page-top">
                  <b>React Landing Page</b>
                </a>{" "}
              </li>
              <li>
                <a href="#features" className="page-scroll">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="page-scroll">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="page-scroll">
                  Gallery
                </a>
              </li>
              {/* <li>
              <a href="/JoinWithUs">
              Join Hands with Us
              </a>
            </li> */}
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
              <li>
                <a href="/Login">Login</a>
              </li>
              {/* <li>
            <button
                onClick={() => history.push("/Login")}
            >
                About
            </button>
            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
