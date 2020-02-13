import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import CancelSubscription from './CancelSubscription'

class SubscriptionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemPills: "4",
      subscriptionStatus: this.props.subscriptionData.status
    }

    this.CancelSubscription = this.CancelSubscription.bind(this)
  }

togglePills = tab => () => {
  if (this.state.activePills !== tab) {
  this.setState({
    activeItemPills: tab
    });
    
  }
}

CancelSubscription = () => {
  fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/subscription/'+this.props.childProps.state.stripe_subscription_id , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    }).then((r) => r.json()).then((r) => {
        var responseObject = JSON.parse(r.body);   
        this.setState({ subscriptionStatus: responseObject.stripeResponse.status }); 
        this.forceUpdate()   
    }).catch((err) => { // Error response
        console.log(err);
    });
}

render() {
  const active = (this.props.subscriptionData.status === "active");
  const canceled = (this.props.subscriptionData.status === "canceled");
  let status; 

  if (active) {
    status =  <div>
                <p>Cancels a customer’s subscription immediately. The customer will not be charged again for the subscription.</p>
                <CancelSubscription CancelSubscription={this.CancelSubscription}/>
              </div>;
  } else if(canceled){
    status = "Your subscription has canceled.";
  }else{
    status = "";
  }
  
  return (
      <MDBContainer>
        <MDBNav pills color="secondary">
          <MDBNavItem>
            <MDBNavLink to="#" className={this.state.activeItemPills==="1" ? "active" : "" }  
                               onClick={event => {
                                 const tab = "1"
                                event.preventDefault();
                                if (this.state.activePills !== tab) {
                                  this.setState({
                                    activeItemPills: tab
                                  });
                                }
                              }}>
              Invoices
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" className={this.state.activeItemPills==="2" ? "active" : "" }  
                               onClick={event => {
                                 const tab = "2"
                                event.preventDefault();
                                if (this.state.activePills !== tab) {
                                  this.setState({
                                    activeItemPills: tab
                                  });
                                }
                              }}>
              Plan
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" className={this.state.activeItemPills==="3" ? "active" : "" }  
                               onClick={event => {
                                 const tab = "3"
                                event.preventDefault();
                                if (this.state.activePills !== tab) {
                                  this.setState({
                                    activeItemPills: tab
                                  });
                                }
                              }}>
              Credits
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" className={this.state.activeItemPills==="4" ? "active" : "" }   
                               onClick={(event) => {
                                 const tab = "4"
                                if (this.state.activePills !== tab) {
                                  this.setState({
                                    activeItemPills: tab
                                  });
                                }
                                event.preventDefault();
                              }}>
              Cancel Subscription
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItemPills}>
          <MDBTabPane tabId="1">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="2">
            <p>
              PLAN
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="4">
              <div>
                {status}
              </div>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default SubscriptionManagement;