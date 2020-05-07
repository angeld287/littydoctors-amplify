import React, { Component } from "react";
import { Auth } from "aws-amplify";

import ServiceInfo from "./ServiceInfo";


import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody, MDBModalFooter, MDBInput, MDBAlert, MDBSpinner } from 'mdbreact';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  code: "",
  error: null,
  loading: false,
};

// Se comento el boton que redirecciona a la pantalla de registro

class CustomConfirmSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn',{});
  }

  onSubmit = event => {
    const { username, code } = this.state;
    console.log();
    
  };

  render() {
    const { username, code, error, loading } = this.state;
    const smallStyle = { fontSize: '0.8rem'}

    return (
      <div>
        { this.props.authState === 'signIn' && 
          <MDBContainer>
            <MDBRow>
              {/*<MDBCol md="10" lg="7" xl="7" className="mx-auto mt-3">
                <ServiceInfo/>
              </MDBCol> */}
              <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <MDBRow>
                      <MDBCol>
                        <div className="text-center">
                          <h3 className="dark-grey-text mb-5"><strong>Confirmar Email</strong></h3>
                        </div>
                        <MDBInput label="Username" value={username} onChange={event => this.setState(updateByPropertyName("username", event.target.value)) } group type="text" validate error="wrong" success="right"/>
                        <MDBInput label="Codigo" value={code} onChange={event => this.setState(updateByPropertyName("code", event.target.value))} group type="text" validate containerClass="mb-0"/>
                        {/* <MDBAutocomplete label="Your country" clear data={countries} clearClass="grey-text"/> */}
                        <div className="text-center pt-3 mb-3">
                          {!loading && <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" disabled={false} onClick={this.onSubmit}>Confirmar</MDBBtn>}
                          {loading && <MDBSpinner />}
                          {error !== null &&
                          <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
                        </div>
                        {/* <p className="dark-grey-text text-right d-flex justify-content-center mb-3 pt-2" style={smallStyle}> or Sign up with:</p>
                        <div className="row my-3 d-flex justify-content-center">
                          <MDBBtn type="button" color="white" rounded className="mr-md-3 z-depth-1a"><MDBIcon fab icon="facebook-f" className="blue-text text-center" /></MDBBtn>
                          <MDBBtn type="button" color="white" rounded className="mr-md-3 z-depth-1a"><MDBIcon fab icon="twitter" className="blue-text" /></MDBBtn>
                          <MDBBtn type="button" color="white" rounded className="z-depth-1a"><MDBIcon fab icon="google-plus-g" className="blue-text" /></MDBBtn>
                        </div> */}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="grey-text d-flex justify-content-end" style={smallStyle}><button onClick={() => this.gotoSignIn()} className="blue-text ml-1"> Iniciar Sesion </button></p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          }
      </div>
    );
  }
}

export default CustomConfirmSignUp;
