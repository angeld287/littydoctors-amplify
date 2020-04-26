import React, { Component } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";

import awsmobile from '../../../../aws-exports'
import { createPatient } from '../../../../graphql/mutations';
import moment from 'moment';

import TooltipButton from '../../../TooltipButton';

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

/*   testAPILambda = async () => {

    const apiOptions = {};
    apiOptions['headers'] = {
        'Content-Type': 'application/json'
    };
    apiOptions['body'] = {
      UserPoolId: awsmobile.aws_user_pools_id,
      email: "danielangelesangelestoribio@gmail.com",
      Username: "jcallejon"
    };

    const resultP = await API.post('ApiForLambda', '/verifyIfUserExist', apiOptions);

    console.log(resultP);
  } */

  openPDF = async () => {
    const file = 'https://littydoctorsbucket1115546-dev.s3.amazonaws.com/public/LEGAL_DOCUMENTS/TERMS_CONDITIONS.pdf'; //await Storage.get('LEGAL_DOCUMENTS/TERMS_CONDITIONS.pdf');
    var win = window.open(file, '_blank');
    win.focus();
  }

  Exist = async (username, email) => {

    const apiOptions = {};
    apiOptions['headers'] = {
        'Content-Type': 'application/json'
    };
    apiOptions['body'] = {
      UserPoolId: awsmobile.aws_user_pools_id,
      email: email,
      Username: username
    };

    const resultP = await API.post('ApiForLambda', '/verifyIfUserExist', apiOptions);

    return (resultP);
  }

  insertPatientInfo = () => {
    //loadingConfirmation: false
    const { username, password, phone_num, birthdate, sex, email, name} = this.state;

    Auth.signIn(username, password).then(user => {
        const phone_number = "+1"+phone_num;

        const input = {         
          name: name,
          username: username,
          email: email,
          phone: phone_number,
          sex: sex,
          approved_terms_conditions: true,
          birthdate: birthdate,
          code: moment(new Date()).format('YYYYMMDDHHmmSSssss')+"_"+username
        };

        API.graphql(graphqlOperation(createPatient, { input: input }))
        .then((r) => {  
          
          Auth.signOut().then(r => {
            this.setState({...INITIAL_STATE})
            this.props.gotoSignIn();
          }).catch(err => {this.setState({loadingConfirmation: false, error: err}); console.log(err);});

        }).catch((err) => { 
            this.setState({
              loadingConfirmation: false,
              error: err
            });
            console.log(err);
        })
    });
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

  onSubmit = async event => {
    event.preventDefault(); 
    this.setState({error:null, loading: true});
    
    const { username, email, password, phone_num, name, terms_conditions, sex, birthdate } = this.state;

    const phone_number = "+1"+phone_num;

    const exist = await this.Exist(username, email);

    if (exist.body.cognito.username) {
      this.setState({loading: false, error: { message: "Este nombre de usuario ya existe, debe utilizar otro"}});
      return
    }
    
    if (exist.body.cognito.email) {
      this.setState({loading: false, error: { message: "El email ya esta asociado a una cuenta"}});
      return
    }

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

    const showPdf = (<MDBBtn social="slack" floating size="sm" onClick={(ev) => {ev.preventDefault(); this.openPDF()}} ><MDBIcon icon="external-link-alt" size="2x" /></MDBBtn>);
    
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
                          <MDBInput label="Nombre de Usuario" value={username} title="entre 8 y 20 caracteres, no espacios en blanco" pattern="^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" onChange={event => this.setState(updateByPropertyName("username", event.target.value)) } group type="text" validate error="wrong" success="right" required/>

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
                          <MDBInput label="Numero de Telefono" value={phone_num} pattern="^[+]*[0-9]{11}$" title="Agregar (+1) mas el numero telefono. Ej: +18491220022" onChange={event => this.setState(updateByPropertyName("phone_num", event.target.value)) } group type="number" validate error="wrong" success="right" required/>
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
                          <MDBInput label="Email" value={email} pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" onChange={event => this.setState(updateByPropertyName("email", event.target.value)) } group type="email" validate error="wrong" success="right" required/>
                          <MDBInput label="Clave" value={password} onChange={event => this.setState(updateByPropertyName("password", event.target.value))} group type="password" validate containerClass="mb-0" required/>
                          
                          {/* <MDBInput className="mt-4" gap onClick={this.onClickRadioTC(!terms_conditions)} checked={terms_conditions} label="Aceptar Terminos y Condiciones" type="checkbox" id="terms_conditions" /> */}
                          <MDBFormInline><MDBInput className="mt-4 mb-4" label="Aceptar Terminos y Condiciones" checked={terms_conditions} onChange={this.onClickRadioTC} type="checkbox" id="terms_conditions" /><TooltipButton helperMessage={"Ver Terminos y Condiciones"} component={showPdf} placement="top"></TooltipButton></MDBFormInline>

                          <div className="text-center pt-5 mb-3">
                           {/*  <MDBBtn onClick={this.testAPILambda}>test</MDBBtn> */}
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
                {(loadingResendCode || loadingConfirmation )&& <MDBSpinner small />}
                {(!loadingResendCode && !loadingConfirmation )&& <div><MDBBtn color="secondary" onClick={this.handleResendCode}>Reenviar Codigo</MDBBtn> <MDBBtn color="primary" onClick={this.handleConfirmCode}>Confirmar</MDBBtn></div>}
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
