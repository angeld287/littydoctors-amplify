import React, { Component } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";

import awsmobile from '../../../aws-exports'
import { createPatient } from '../../../graphql/mutations';

import moment from 'moment';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody, MDBModalFooter, MDBInput, MDBAlert, MDBSpinner, MDBModalHeader, MDBModalBody, MDBModal } from 'mdbreact';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  loading: false,
  modal: false,
  code: "",
  loadingConfirmation: false,
  loadingResendCode: false,
  successm: null,
};

// Se comento el boton que redirecciona a la pantalla de registro

class CustomSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.gotoSignUp = this.gotoSignUp.bind(this);
  }

  toggle = () => {

  }

  gotoSignUp = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signUp',{});
  }

  insertPatientInfo = () => {
    //loadingConfirmation: false
    const { email, password, /* phone_num, birthdate, sex, name */} = this.state;

    Auth.signIn(email, password).then(user => {
        const input = {         
          name: user.attributes.name,
          username: user.username,
          email: user.attributes.email,
          phone: user.attributes.phone_number,
          sex: user.attributes.gender,
          approved_terms_conditions: user.attributes['custom:approvedtc'],
          birthdate: user.attributes['custom:_birthdate'],
          code: user.attributes['custom:code'],
        };
      
        API.graphql(graphqlOperation(createPatient, { input: input }))
        .then((r) => {  
            window.location.reload()
        }).catch((err) => { 
            this.setState({
              loadingConfirmation: false,
              error: err
            });
            console.log(err);
        })
    });
  }

  handleResendCode = () => {
    const { email } = this.state;
    this.setState({ loadingResendCode: true });

    Auth.resendSignUp(email).then(() => {
      this.setState({ loadingResendCode: false });
    }).catch(e => {
        console.log('Error resending code: ', e);
        this.setState({ loadingResendCode: false });
    });
  };

  
  handleConfirmCode = () => {
    const { email, code } = this.state;
    this.setState({loadingConfirmation: true,  error: null});
    Auth.confirmSignUp(email, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    }).then(data => {
      //invoke lambda function to add user to a group 
      const apiOptions = {};

      apiOptions['headers'] = {
          'Content-Type': 'application/json'
      };
      
      apiOptions['body'] = {
        UserPoolId: awsmobile.aws_user_pools_id,
        Username: this.state.username
      };

      API.post('ApiForLambda', '/addUserToGroup', apiOptions)
      .then( r => {
          this.insertPatientInfo();
      }).catch((err) => { // Error response
          this.setState({ error: err, loadingConfirmation:false });
          console.log(err);
      });      
    })
    .catch(err => {
      this.setState({ error: err, loadingConfirmation: false });
    });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    Auth.signIn(email, password)
      .then(user => {
        this.setState(() => ({ ...INITIAL_STATE }));
        if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {
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
          //this.props.onStateChange("confirmSignUp");
          this.setState({ modal: true,  error: null });
        } else if (err.code === "PasswordResetRequiredException") {
          this.props.onStateChange("requireNewPassword");
        } else {
          //authError(err);
          console.log(err);
        }
        this.setState(updateByPropertyName("error", err));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error, loading, code, successm, loadingConfirmation, loadingResendCode } = this.state;

    const isInvalid = password === "" || email === "";
    const smallStyle = { fontSize: '0.8rem'}

    return (
      <div>
        { this.props.authState === 'signIn' && 
          <MDBContainer>
            <MDBRow>
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
                        <div className="text-center pt-3 mb-3">
                          {!loading && <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" disabled={isInvalid} onClick={this.onSubmit()}>Sign in</MDBBtn>}
                          {loading && <MDBSpinner />}
                          {error !== null &&
                          <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="grey-text d-flex justify-content-end" style={smallStyle}>No estas registrado? <button onClick={() => this.gotoSignUp()} className="blue-text ml-1"> Registrate como Paciente</button></p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          }

          <MDBContainer>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>Confirmacion de Email</MDBModalHeader>
              <MDBModalBody>
                <p>Se le ha enviado un codigo de vericacion a su correo para confirmar el email</p>
                <br/>
                <MDBInput label="Codigo de Verificacion" value={code} onChange={event => this.setState(updateByPropertyName("code", event.target.value)) } group type="text" validate error="wrong" success="right"/>
              </MDBModalBody>
              <MDBModalFooter>
                {(loadingResendCode || loadingConfirmation )&& <MDBSpinner small />}
                {(!loadingResendCode && !loadingConfirmation )&& <div><MDBBtn color="secondary" onClick={this.handleResendCode}>Reenviar Codigo</MDBBtn> <MDBBtn color="primary" onClick={this.handleConfirmCode}>Confirmar</MDBBtn></div>}
              </MDBModalFooter>
              {(!(error === null) || (error === '')) &&
              <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
              {(!(successm === null) || (successm === '')) &&
              <MDBAlert color="success"><p>{successm}</p></MDBAlert>}
            </MDBModal>
          </MDBContainer>
      </div>
    );
  }
}

export default CustomSignIn;
