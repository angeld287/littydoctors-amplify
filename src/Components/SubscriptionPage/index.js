import React, { Component } from 'react';
import { 
  MDBContainer, 
  MDBBtn, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBInput, 
  MDBCol, 
  MDBRow, 
  MDBCard, 
  MDBCardBod,
  MDBCardBody,
  MDBModalFooter
} from 'mdbreact';

import _ from 'lodash';

import { Auth } from "aws-amplify";

import { withAuthenticator} from 'aws-amplify-react'; 

//import {injectStripe, CardElement} from 'react-stripe-elements';

import "./SubscriptionPage.css";


const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});


class SubscriptionPage extends Component {
  constructor(props){
      super(props);

      this.state = { 
        cardNumber: "",
        ccv: "",
        year: 0, 
        month: 0,
        currentYear: this.getYear().toString().substr(-2),
        username: '',
        email: '',
        subscriptionPlan: 'plan_EaC7RSrIL9nqb2'
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.getYear = this.getYear.bind(this);

      this._isMounted = false;
  }

  componentDidMount = () => {
    this._isMounted = true;
    Auth.currentUserInfo()
      .then(data => {
        this.setState({
          username: data.attributes.name,
          email: data.attributes.email
        })
      })
      .catch(err => console.log('error: ', err))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getYear = () => {
    return new Date().getFullYear();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: this.state.cardNumber,
          exp_month: this.state.month,
          exp_year: this.state.year,
          cvc: this.state.ccv
        })
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
          this.createCustomer(responseObject.stripeResponse.id);
      }).catch((err) => { // Error response
          console.log(err);
      });
  };

  createCustomer = (id) => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: 'User Created from WebPage',
          email: this.state.email,
          source: id
        })
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
          this.subscribeCustomer(responseObject.stripeResponse.id)
      }).catch((err) => { // Error response
          console.log(err);
      });
  };

  subscribeCustomer = (id) => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          plan: this.state.subscriptionPlan
        })
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
      }).catch((err) => { // Error response
          console.log(err);
      });
  };

  render() {
    const { cardNumber, ccv, year, month, currentYear } = this.state;

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
          <form onSubmit={this.handleSubmit}>
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Add Pay Method</strong>
                  </h3>
                </div>
                <MDBInput
                  value={cardNumber}
                  onChange={event =>
                    this.setState(updateByPropertyName("cardNumber", event.target.value))
                  }
                  label="Card Number"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBRow>
                  <MDBCol md="6">
                    <select className="browser-default custom-select"
                            value={month} 
                            onChange={event =>
                              this.setState(updateByPropertyName("month", event.target.value))
                            }
                    >
                      <option value="0">Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </MDBCol>
                  <MDBCol md="6">
                    <select className="browser-default custom-select"
                            value={year} 
                            onChange={event =>
                              this.setState(updateByPropertyName("year", event.target.value))
                            }
                    >
                      <option value="0">Year</option>
                      { _.range(currentYear, 99).map(value => <option key={value} value={value}>{value}</option>) }
                    </select>
                  </MDBCol>
                </MDBRow>
                <br/>
                <MDBRow>
                  <MDBCol md="6">
                    <input
                      value={ccv}
                      onChange={event =>
                        this.setState(updateByPropertyName("ccv", event.target.value))
                      }
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="CCV"
                    />
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol md="12">
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="submit"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      );
    }
}

export default withAuthenticator(SubscriptionPage, { includeGreetings: false });