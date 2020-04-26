import React, { Component } from "react";
import { MDBMask, MDBRow, MDBCol, MDBBtn, MDBView, MDBContainer } from "mdbreact";
import "./IntroductionPage.css";

import PricingPlans from './PricingPlans';
import EcommercePage from './PricingPlans/index2';
import TeamPage from './Team';
import ContactPage from './ContactUs';
import MissionVisionValues from './MissionVisionValues';

import iphones from './../../images/iphones.png';
import laptop from './../../images/laptop.png';

class IntroductionPage extends Component {
  state = {
    collapsed: false
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  redirectTo = (route) => {
    window.location.href = route;
  }

  render() {
    return (
      <div id="apppage">
        {/* <Router>
          <div>
            <MDBNavbar
              color="primary-color"
              style={navStyle}
              dark
              expand="md"
              fixed="top"
              scrolling
              transparent
            >
              <MDBContainer>
                <MDBNavbarBrand>
                  <strong className="white-text">MDB</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.handleTogglerClick} />
                <MDBCollapse isOpen={this.state.collapsed} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBFormInline waves>
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                      </MDBFormInline>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router> */}
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    Litty Doctors{" "}
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Aplicación Web para manejar el Registro Electrónico de Salud (EHR) de los paciente y el proceso de consultas médicas. Este es un software portable, esto quiere decir que se puede acceder desde laptops, desktops, tablets o mobiles. Es un sistema que genera datos estadísticos de todas las formas gráficas posibles (gráficos de línea, pastel, radar, barras, etc..)
                  </h6>
                  <MDBBtn color="white" onClick={ e => {e.preventDefault(); this.redirectTo("/patients")}} >
                    <a /* href="https://play.google.com/store/apps/details?id=com.aangelesmdconsultations" */>Ver Mas</a>
                  </MDBBtn>
                  <MDBBtn color="white" onClick={ e => {e.preventDefault(); this.redirectTo("/signin")}}>
                    <a>Iniciar Sesion</a>
                  </MDBBtn>
                </div>
                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <img
                    src={laptop}
                    alt=""
                    className="img-fluid"
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <h6>
                <a target="_blank" href="https://www.freepik.es/fotos-vectores-gratis/fondo">Vector de Fondo creado por Creative_hat - www.freepik.es</a>
              </h6>
              <p>
                
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer>
          <MissionVisionValues/>
        </MDBContainer>
        <MDBContainer>
          <EcommercePage/>
        </MDBContainer>
        <MDBContainer>
          <TeamPage/>
        </MDBContainer>
        <MDBContainer>
          <ContactPage/>
        </MDBContainer>
      </div>
    );
  }
}

export default IntroductionPage;