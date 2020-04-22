import React, { Component } from "react";
import { Auth } from "aws-amplify";

import ServiceInfo from "./ServiceInfo";


import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody, MDBModalFooter, MDBInput, MDBAlert, MDBSpinner } from 'mdbreact';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  loading: false,
};

// Se comento el boton que redirecciona a la pantalla de registro

class CustomSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.gotoSignUp = this.gotoSignUp.bind(this);
  }

  gotoSignUp = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signUp',{});
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    Auth.signIn(email, password)
      .then(user => {
        this.setState(() => ({ ...INITIAL_STATE }));
        if (
          user.challengeName === "SMS_MFA" ||
          user.challengeName === "SOFTWARE_TOKEN_MFA"
        ) {
          this.changeState("confirmSignIn", user);
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.props.onStateChange("requireNewPassword", user);
        } else if (user.challengeName === "MFA_SETUP") {
          this.changeState("TOTPSetup", user);
        } else {
          this.props.onStateChange('signedIn',{});
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        if (err.code === "UserNotConfirmedException") {
          this.changeState("confirmSignUp");
        } else if (err.code === "PasswordResetRequiredException") {
          this.changeState("requireNewPassword");
        } else {
          //authError(err);
          console.log(err);
        }
        this.setState(updateByPropertyName("error", err));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error, loading } = this.state;

    const isInvalid = password === "" || email === "";
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
                          <h3 className="dark-grey-text mb-5"><strong>Sign in</strong></h3>
                        </div>
                        <MDBInput label="Your username" value={email} onChange={event => this.setState(updateByPropertyName("email", event.target.value)) } group type="text" validate error="wrong" success="right"/>
                        <MDBInput label="Your password" value={password} onChange={event => this.setState(updateByPropertyName("password", event.target.value))} group type="password" validate containerClass="mb-0"/>
                        {/* <MDBAutocomplete label="Your country" clear data={countries} clearClass="grey-text"/> */}
                        <div className="text-center pt-3 mb-3">
                          {!loading && <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" disabled={isInvalid} onClick={this.onSubmit}>Sign in</MDBBtn>}
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
                  {/* <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="grey-text d-flex justify-content-end" style={smallStyle}>No estas registrado? <button onClick={() => this.gotoSignUp()} className="blue-text ml-1"> Registrate como Paciente</button></p>
                  </MDBModalFooter> */}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          }
      </div>
    );
  }
}

export default CustomSignIn;
