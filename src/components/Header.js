import React, { Component } from 'react';
import imgLogo from '../images/logo-blanco.png';
//import PropTypes from 'prop-types';

export class Header extends Component{
/*
  static propTypes = {
    idemail: PropTypes.number
  }

  constructor(props) {
    super(props);
  //  this.state = { results: [], isOpen: false};
  }*/

  render(){
    return (
      <section className="hero is-primary" >
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item">
                <img src={imgLogo} alt="Rimac" />
              </a>
              <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item">
                  <a className="button is-primary is-inverted">
                    <span className="icon">
                      <i className="fab sign-out-alt"></i>
                    </span>
                    <span>Salir</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Buscar Evidencia de Correos
          </h1>
        </div>
      </div>

      </section>



    )
  }

}
