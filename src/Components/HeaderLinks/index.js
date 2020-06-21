import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';


import logo from '../../images/logo_svg.svg';

import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem
  } from "mdbreact";

const HeaderLinks = ({childProps: childProps}) => {
      useEffect(() => {
          
      }, []);

    const handlesignOut = () => {
      Auth.signOut().then(d => {
        window.location.reload()
      });
    }

    return (
      <MDBNavbar color="indigo" dark expand="md">
            <MDBCollapse id="navbarCollapse3" /* isOpen={this.state.isOpen} */ navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to="/"><img className="card-img-top" src={logo} style={{ width: 25}} alt="" /> <span style={{fontSize: '18px'}}>Litty Doctors</span></MDBNavLink>
                </MDBNavItem>
                {(childProps.state.user_roll === 'doctor') && <MDBNavItem><MDBNavLink to="/consultations">Consultas Medicas</MDBNavLink></MDBNavItem>}
                {/* {(this.props.childProps.state.user_roll === 'secretary' || this.props.childProps.state.user_roll === 'doctor') && <MDBNavItem ><MDBNavLink to="/medicalappointmentsmanagement">Citas</MDBNavLink></MDBNavItem>} */}
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
      </MDBNavbar>
    );
}

export default HeaderLinks;