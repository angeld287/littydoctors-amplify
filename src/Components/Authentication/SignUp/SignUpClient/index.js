import React, { Component } from "react";
import { Auth, API } from "aws-amplify";

import awsmobile from '../../../../aws-exports'

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBFormInline, MDBSpinner, MDBIcon, MDBCard, MDBCardBody, MDBModalFooter, MDBDatePicker, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBAlert } from 'mdbreact';

import _ from 'lodash';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  email_exist: null,
  password: "",
  name: "",
  username: "",
  phone_num: "",
  sex: null,
  code: "",
  open: false,
  error: null,
  year: "", 
  month: "", 
  day: "",
  modal: false,
  terms_conditions: false,
  birthdate: null,
  loading: false,
  loadingConfirmation: false,
  loadingResendCode: false,
};

class ClientSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  toggle = () => {
  }

  getYear = () => {
    return new Date().getFullYear();
  }

  testAPILambda = async () => {

    const apiOptions = {};
    apiOptions['headers'] = {
        'Content-Type': 'application/json'
    };
    apiOptions['body'] = {
      UserPoolId: awsmobile.aws_user_pools_id,
      Username: "test2"
    };

    const resultP = await API.post('ApiForLambda', '/addUserToGroup', apiOptions);

    console.log( resultP);


  }

  handleConfirmCode = () => {
    const { username, code } = this.state;
    this.setState({loadingConfirmation: true});
    Auth.confirmSignUp(username, code, {
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
        this.setState({
          modal: !this.state.modal,
          loadingConfirmation: false
        });
        this.props.gotoSignIn();
      }).catch((err) => { // Error response
          this.setState({ error: err, loadingConfirmation:false });
          console.log(err);
      });      
    })
    .catch(err => {
      this.setState({ error: err, loadingConfirmation: false });
    });
  };

  handleResendCode = () => {
    const { username } = this.state;
    this.setState({ loadingResendCode: true });

    Auth.resendSignUp(username).then(() => {
      this.setState({ loadingResendCode: false });
    }).catch(e => {
        console.log('Error resending code: ', e);
        this.setState({ loadingResendCode: false });
    });
  };

  onSubmit = event => {
    event.preventDefault(); 
    this.setState({error:null, loading: true});
    
    const { username, email, password, phone_num, name, terms_conditions, sex, birthdate } = this.state;

    const phone_number = "+1"+phone_num;

    if (!terms_conditions) {
      this.setState({loading: false, error: { message: "Debe Aceptar los Terminos y Condiciones"}});
      return
    }

    if (sex === null) {
      this.setState({loading: false, error: { message: "Debe seleccionar el sexo"}});
      return
    }

    if (birthdate === null) {
      this.setState({loading: false, error: { message: "Debe seleccionar la fecha de nacimiento"}});
      return
    }

    Auth.signIn(email, "password").then(user => {
      this.setState({
        email_exist: false
      });
      Auth.signOut()
        .then()
        .catch(err => console.log('Error logging out', err));
    }).catch(err => {
      if(err.code === 'UserNotFoundException' && err.message === 'User does not exist.'){
          Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention daniel_1234@hotmail.es   +18292130970
                name,
                // other custom attributes 
            },
            //validationData: []  //optional
            })
            .then(data => {
              this.setState({
                modal: !this.state.modal,
                loading: false,
              });
            })
            .catch(err => {
              console.log(err); 
              this.setState({ loading: false, error: err});
            });
      }else{
        this.setState({
          error: {
            email_exist: true,
            loading: false,
            message: 'This email is associated with an existing account'
          }
        });
      }
    });
  };

  onClickRadio = value => () =>{
    this.setState({
      sex: value
    });
  }

  onClickRadioTC = () =>{
    this.setState({
      terms_conditions: !this.state.terms_conditions
    });
  }

  render() {
    const { email, password, phone_num, username, name, code, error, year, month, day, terms_conditions, sex, loading, loadingConfirmation, loadingResendCode } = this.state;

    const isInvalid = (password === "" || email === "");
    const smallStyle = { fontSize: '0.8rem'}
    const currentYear = this.getYear().toString();
    
    return (
      <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mx-auto mt-3">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <form onSubmit={this.onSubmit}>
                      <MDBRow>
                        <MDBCol>
                          <div className="text-center">
                            <h3 className="dark-grey-text mb-5"><strong>Registro de Paciente</strong></h3>
                          </div>
                          <MDBInput label="Nombre de Usuario" value={username} pattern="^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" onChange={event => this.setState(updateByPropertyName("username", event.target.value)) } group type="text" validate error="wrong" success="right" required/>

                           {/*^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
                               └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
                                     │         │         │            │           no _ or . at the end
                                     │         │         │            │
                                     │         │         │            allowed characters
                                     │         │         │
                                     │         │         no __ or _. or ._ or .. inside
                                     │         │
                                     │         no _ or . at the beginning
                                     │
                                     username is 8-20 characters long */}


                          <MDBInput label="Nombre Completo" value={name} onChange={event => this.setState(updateByPropertyName("name", event.target.value)) } group type="text" validate error="wrong" success="right" required/> 
                          <MDBInput label="Numero de Telefono" value={phone_num} onChange={event => this.setState(updateByPropertyName("phone_num", event.target.value)) } group type="number" validate error="wrong" success="right" required/>
                          <MDBRow>
                            <MDBCol>
                              <MDBFormInline className="mb-4">
                                <label>Sexo: </label>
                                <MDBCol>
                                  <MDBInput type="radio" onChange={this.onClickRadio('MALE')} checked={ sex === 'MALE' } label="Masculino" id="sex_male" />
                                </MDBCol>
                                <MDBCol>
                                  <MDBInput type="radio" onChange={this.onClickRadio('FEMALE')} checked={ sex === 'FEMALE' } label="Femenino" id="sex_female" />
                                </MDBCol>
                              </MDBFormInline>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="mb-3">
                            <MDBCol>
                              <MDBFormInline className="mb-4">
                                <label>Fecha de Nacimiento: </label>
                                <MDBCol>
                                  <MDBDatePicker style={{marginLeft: 20}} icon="birthday-cake" getValue={d => this.setState(updateByPropertyName("birthdate", d)) } />
                                </MDBCol>
                              </MDBFormInline>
                            </MDBCol>
                          </MDBRow>
                          <MDBInput label="Email" value={email} onChange={event => this.setState(updateByPropertyName("email", event.target.value)) } group type="email" validate error="wrong" success="right" required/>
                          <MDBInput label="Clave" value={password} onChange={event => this.setState(updateByPropertyName("password", event.target.value))} group type="password" validate containerClass="mb-0" required/>
                          
                          {/* <MDBInput className="mt-4" gap onClick={this.onClickRadioTC(!terms_conditions)} checked={terms_conditions} label="Aceptar Terminos y Condiciones" type="checkbox" id="terms_conditions" /> */}
                          <MDBInput className="mt-4 mb-4" label="Aceptar Terminos y Condiciones" checked={terms_conditions} onChange={this.onClickRadioTC} type="checkbox" id="terms_conditions" />

                          <div className="text-center pt-5 mb-3">
                            {/* <MDBBtn onClick={this.testAPILambda}>test</MDBBtn> */}
                            {!loading && <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" disabled={isInvalid} type="submit">Registrarse</MDBBtn>}
                            {loading && <MDBSpinner small />}
                            {(!(error === null) || (error === '')) &&
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
                    </form>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="grey-text d-flex justify-content-end" style={smallStyle}>Ya estas registrado? <button onClick={() => this.props.gotoSignIn()} className="blue-text ml-1"> Sign In</button></p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>Confirmacion de Email</MDBModalHeader>
              <MDBModalBody>
                <p>Se le ha enviado un codigo de vericacion a su correo para confirmar el email</p>
                <br/>
                <MDBInput label="Codigo de Verificacion" value={code} onChange={event => this.setState(updateByPropertyName("code", event.target.value)) } group type="text" validate error="wrong" success="right"/>
              </MDBModalBody>
              <MDBModalFooter>
                {!loadingResendCode && <MDBBtn color="secondary" onClick={this.handleResendCode}>Reenviar Codigo</MDBBtn>}
                {(loadingResendCode || loadingConfirmation )&& <MDBSpinner small />}
                {!loadingConfirmation && <MDBBtn color="primary" onClick={this.handleConfirmCode}>Confirmar</MDBBtn>}
              </MDBModalFooter>
              {(!(error === null) || (error === '')) &&
              <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
            </MDBModal>
          </MDBContainer>
      </div>
    );
  }
}

export default ClientSignUp;
