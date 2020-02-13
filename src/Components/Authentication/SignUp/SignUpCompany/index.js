import React, { Component } from "react";
import { Auth } from "aws-amplify";

import awsmobile from '../../../../aws-exports'

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBInput, MDBModal, MDBModalHeader,MDBModalBody, MDBAlert } from 'mdbreact';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  name: "",
  username: "",
  phone_number: "",
  gender: 'male',
  code: "",
  open: false,
  error: null,
  year: "", 
  month: "", 
  day: "",
  modal: false
};

class CompanySignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  toggle = () => {
  }

  getYear = () => {
    return new Date().getFullYear();
  }

  handleConfirmCode = () => {
    const { username, code } = this.state;

    Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    }).then(data => {
      //invoke lambda function to add user to a group
      fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/addUserToGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          groupname: "doctor",
          UserPoolId: awsmobile.aws_user_pools_id,
          username: this.state.username
        })
      }).then((r) => r.json()).then((r) => {
          this.setState({
            modal: !this.state.modal
          });
          this.props.gotoSignIn();
      }).catch((err) => { // Error response
          this.setState({ error: err });
          console.log(err);
      });      
    })
    .catch(err => {
      this.setState({ error: err });
    });
  };

  handleResendCode = () => {
    const { username } = this.state;

    Auth.resendSignUp(username).then(() => {
        console.log('code resent successfully');
    }).catch(e => {
        console.log(e);
    });
  };

  onSubmit = (event) => {
    const { username, email, password, phone_number, name } = this.state;

    Auth.signIn(email, "password").then(user => {
      this.setState({
        email_exist: false
      });
      Auth.signOut()
        .then()
        .catch(err => console.log(err));
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
            .then( data => {
              this.setState({
                modal: !this.state.modal
              });
            })
            .catch(err => {
              console.log(err); 
              this.setState({ error: err});
            });
      }else{
        this.setState({
          error: {
            message: 'This email is associated with an existing account'
          }
        });
      }
    });
    event.preventDefault();
  };


  onClickRadio = value => () =>{
    this.setState({
      gender: value
    });
  }

  render() {
    const { email, password, phone_number, username, name, code, error } = this.state;

    const isInvalid = (password === "" || email === "");
    const smallStyle = { fontSize: '0.8rem'}
    const select = {marginTop: '25px'}
    
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
                            <h3 className="dark-grey-text mb-5"><strong>Doctor Sign up</strong></h3>
                          </div>
                          <MDBInput label="Your UserName" value={username} onChange={event => this.setState(updateByPropertyName("username", event.target.value)) } group type="text" validate error="wrong" success="right"/>
                          <MDBRow>
                            <MDBCol md="3">
                              <select className="browser-default custom-select" value="dr" style={select} onChange={event => this.setState(updateByPropertyName("dr", event.target.value))}>
                                  <option value="dr">Dr</option>
                                  <option value="dra">Dra</option>
                              </select>
                            </MDBCol>
                            <MDBCol>
                              <MDBInput label="Full Name" value={name} onChange={event => this.setState(updateByPropertyName("name", event.target.value)) } group type="text" validate error="wrong" success="right"/>
                            </MDBCol>
                          </MDBRow>
                          <MDBInput label="Your Phone Number" value={phone_number} onChange={event => this.setState(updateByPropertyName("phone_number", event.target.value)) } group type="text" validate error="wrong" success="right"/>
                          {/* <MDBRow>
                            <MDBCol>
                              <div className="mb-3" align="left">
                                <Form.Check inline type="radio" onChange={this.onClickRadio('male')} checked={this.state.gender==='male' ? true : false} label="Male"/>
                                <Form.Check inline type="radio" onChange={this.onClickRadio('female')} checked={this.state.gender==='female' ? true : false} label="Female"/>
                              </div>
                            </MDBCol>
                          </MDBRow> */}
                          <MDBInput label="Your email" value={email} onChange={event => this.setState(updateByPropertyName("email", event.target.value)) } group type="email" validate error="wrong" success="right"/>
                          <MDBInput label="Your password" value={password} onChange={event => this.setState(updateByPropertyName("password", event.target.value))} group type="password" validate containerClass="mb-0"/>
                          
                          <div className="text-center pt-3 mb-3">
                            <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" disabled={isInvalid} type="submit">Sign up</MDBBtn>
                            {!((error === null) || (error === '')) &&
                            <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already a member? <button onClick={() => this.props.gotoSignIn()} className="blue-text ml-1"> Sign In</button></p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>Email Confirmation</MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="Verification Code" value={code} onChange={event => this.setState(updateByPropertyName("code", event.target.value)) } group type="text" validate error="wrong" success="right"/>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.handleResendCode}>Resend Code</MDBBtn>
                <MDBBtn color="primary" onClick={this.handleConfirmCode}>Confirm</MDBBtn>
              </MDBModalFooter>
              {!((error === null) || (error === '')) &&
              <MDBAlert color="danger">{error && <p>{error.message}</p>}</MDBAlert>}
            </MDBModal>
          </MDBContainer>
      </div>
    );
  }
}

export default CompanySignUp;
