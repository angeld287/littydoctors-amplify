import React, { useState } from 'react';
import { Auth } from 'aws-amplify';


import logo from '../../images/logo_svg.svg';

import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBNavbarBrand,
  MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem, MDBNavbarToggler
  } from "mdbreact";

const HeaderLinks = ({childProps: childProps}) => {

    const [ collapse, setcollapse ] = useState(false);
    const [ dropdownOpen, setdropdownOpen ] = useState(false);

    const handlesignOut = () => {
      Auth.signOut().then(d => {
        window.location.reload()
      });
    }

    const onClick = () => {
      setcollapse(!collapse);
    }

    const toggle = () => {
      setdropdownOpen(!dropdownOpen);
    }

    return (
          <MDBNavbar className="flexible-navbar" color="indigo" light expand="md" scrolling>
              <MDBNavbarBrand href="/">
                <img className="card-img-top" src={logo} style={{ width: 25}} alt="" /> <span style={{fontSize: '18px', color: '#fff'}}>Litty Doctors</span>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick = { onClick } />
              <MDBCollapse isOpen = { collapse } navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/features"><span style={{fontSize: '18px'}}><span style={{fontSize: '18px', color: '#fff'}}>Caracteristicas</span></span></MDBNavLink>}</MDBNavItem>
                    <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/pricing"><span style={{fontSize: '18px'}}><span style={{fontSize: '18px', color: '#fff'}}>Precio</span></span></MDBNavLink>}</MDBNavItem>
                    <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/contactus"><span style={{fontSize: '18px'}}><span style={{fontSize: '18px', color: '#fff'}}>Contactos</span></span></MDBNavLink>}</MDBNavItem>
                    {(childProps.state.user_roll === 'doctor') && <MDBNavItem><MDBNavLink to="/consultations"><span style={{fontSize: '18px', color: '#fff'}}>Consultas Medicas</span></MDBNavLink></MDBNavItem>}
                    {/* {(this.props.childProps.state.user_roll === 'secretary' || this.props.childProps.state.user_roll === 'doctor') && <MDBNavItem ><MDBNavLink to="/medicalappointmentsmanagement">Citas</MDBNavLink></MDBNavItem>} */}
                    {(childProps.state.user_roll === 'doctor' || childProps.state.user_roll === 'secretary') && <MDBNavItem ><MDBNavLink to="/patients"><span style={{fontSize: '18px', color: '#fff'}}>Pacientes</span></MDBNavLink></MDBNavItem>}
                    {(childProps.state.user_roll === 'doctor') && <MDBNavItem ><MDBNavLink to="/reports"><span style={{fontSize: '18px', color: '#fff'}}>Reportes</span></MDBNavLink></MDBNavItem>}
                  </MDBNavbarNav>
                  {!childProps.isLoggedIn &&<MDBNavbarNav right><MDBNavItem><MDBNavLink to="/profile"><span style={{fontSize: '18px', color: '#fff'}}>LogIn</span></MDBNavLink></MDBNavItem></MDBNavbarNav>}
                  {childProps.isLoggedIn &&
                  <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user"/>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" right>
                            <MDBDropdownItem onClick={handlesignOut}>LogOut</MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown> 
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/profile"><span style={{fontSize: '18px', color: '#fff'}}>{childProps.state.username}</span></MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  }
              </MDBCollapse>
          </MDBNavbar>
    );
}

export default HeaderLinks;


 {/* <MDBNavbar color="indigo" dark expand="md" scrolling>
        <MDBNavbarBrand href="/">
              <strong>MDB</strong>
        </MDBNavbarBrand>
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/"><img className="card-img-top" src={logo} style={{ width: 25}} alt="" /> <span style={{fontSize: '18px'}}>Litty Doctors</span></MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/features"><span style={{fontSize: '18px'}}>Caracteristicas</span></MDBNavLink>}</MDBNavItem>
            <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/pricing"><span style={{fontSize: '18px'}}>Precio</span></MDBNavLink>}</MDBNavItem>
            <MDBNavItem>{!childProps.isLoggedIn &&<MDBNavLink to="/contactus"><span style={{fontSize: '18px'}}>Contactenos</span></MDBNavLink>}</MDBNavItem>
            {(childProps.state.user_roll === 'doctor') && <MDBNavItem><MDBNavLink to="/consultations">Consultas Medicas</MDBNavLink></MDBNavItem>}
            {(this.props.childProps.state.user_roll === 'secretary' || this.props.childProps.state.user_roll === 'doctor') && <MDBNavItem ><MDBNavLink to="/medicalappointmentsmanagement">Citas</MDBNavLink></MDBNavItem>}
            {(childProps.state.user_roll === 'doctor' || childProps.state.user_roll === 'secretary') && <MDBNavItem ><MDBNavLink to="/patients">Pacientes</MDBNavLink></MDBNavItem>}
            {(childProps.state.user_roll === 'doctor') && <MDBNavItem ><MDBNavLink to="/reports">Reportes</MDBNavLink></MDBNavItem>}
          </MDBNavbarNav>
          {!childProps.isLoggedIn &&<MDBNavbarNav right><MDBNavItem><MDBNavLink to="/profile">LogIn</MDBNavLink></MDBNavItem></MDBNavbarNav>}
          {childProps.isLoggedIn &&
          <MDBNavbarNav right>
            <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem onClick={handlesignOut}>LogOut</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown> 
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/profile">{childProps.state.username}</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          }
        </MDBCollapse>
      </MDBNavbar> */}