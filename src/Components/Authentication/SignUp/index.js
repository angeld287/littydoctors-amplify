import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent,
MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBRow, MDBCol } from "mdbreact";

import CompanySignUp from './SignUpCompany';
import ClientSignUp from './SignUpClient';


class CustomSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      activeItemOuterTabs: "1",
      activeItemInnerPills: "1"
    };
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn = () => {
    this.props.onStateChange('signIn',{});
  }

  toggleOuterTabs = tab => () => {
    if (this.state.activeItemOuterTabs2 !== tab) {
    this.setState({
      activeItemOuterTabs: tab
    });
    }
  }
  
  toggleInnerPills = tab => () => {
    if (this.state.activeItemInnerPills !== tab) {
    this.setState({
      activeItemInnerPills: tab
    });
    }
  }

  render() {
    return (
      <div>
          { this.props.authState === 'signUp' && 
          <MDBContainer>
            <MDBRow>
              <MDBCol md="9" lg="7" xl="6" className="mx-auto mt-3">
                <MDBNav tabs className="nav-justified" color="indigo">
                  <MDBNavItem>
                    <MDBNavLink to="#" className={this.state.activeItemOuterTabs==="1" ? "active" : "" } onClick={this.toggleOuterTabs("1")}
                      role="tab">
                      <MDBIcon size="lg" icon="user" /> Patient
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#" className={this.state.activeItemOuterTabs==="2" ? "active" : "" } onClick={this.toggleOuterTabs("2")}
                      role="tab">
                      <MDBIcon size="lg" icon="user-md" /> Doctor
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>
                <MDBTabContent className="card" activeItem={this.state.activeItemOuterTabs}>
                  <MDBTabPane tabId="1" role="tabpanel">
                    <ClientSignUp gotoSignIn={this.gotoSignIn}/>
                  </MDBTabPane>
                  <MDBTabPane tabId="2" role="tabpanel">
                  <CompanySignUp gotoSignIn={this.gotoSignIn}/>
                  </MDBTabPane>
                </MDBTabContent>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          }
      </div>
    );
  }
}

export default CustomSignUp;
