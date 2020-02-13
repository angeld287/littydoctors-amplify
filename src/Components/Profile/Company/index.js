import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCardText, MDBTabPane, MDBTabContent,
MDBNav, MDBNavItem, MDBIcon, MDBBtn } from "mdbreact";

import { Redirect } from 'react-router'

import GeneralInformations from './ProfileManagement/GeneralInformations';
import PaymentInformation from './ProfileManagement/PaymentInformations';
import SubscriptionManagement from './ProfileManagement/SubscriptionManagement';
import { API, graphqlOperation } from 'aws-amplify';

import useCompany from './useCompany'

const CompanyUserProfile = () => {
    const { doctorname, error, loading, activeItemVerticalPills, setActiveItemVerticalPills, subscriptionData, toggleVerticalPills, company } = useCompany();

    let subsmanage;
    if (subscriptionData !== null) {
      subsmanage = <SubscriptionManagement subscriptionData={subscriptionData}/>;
    }

    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="3">
            <MDBNav pills color="primary" className="flex-column">
              <MDBNavItem>
                <MDBBtn style={{width: 300}} color="primary" className={activeItemVerticalPills==="1" ? "active" : "" } onClick={toggleVerticalPills("1")}>
                  General
                  <MDBIcon icon="user" className="ml-2" />
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn style={{width: 300}} color="primary" className={activeItemVerticalPills==="2" ? "active" : "" } onClick={toggleVerticalPills("2")}>
                  Orders & invoices
                  <MDBIcon icon="file-alt" className="ml-2" />
                </MDBBtn>
              </MDBNavItem>
            </MDBNav>
          </MDBCol>
          <MDBCol md="9">
            <MDBTabContent activeItem={activeItemVerticalPills}>
              <MDBTabPane tabId="1">
                <GeneralInformations company={company}/>
              </MDBTabPane>
              <MDBTabPane tabId="2">
                <MDBCardBody>
                  <MDBCardTitle>Orders & Invoices</MDBCardTitle>
                  <MDBCardText>
                    "Hello? Is it me you're looking for?"
                  </MDBCardText>
                </MDBCardBody>
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
        {
            (typeof doctorname !== 'string') &&
            <Redirect to='/subscribe'/>
        }
      </MDBContainer>
    );
}

export default CompanyUserProfile;

/* GetModulesList = () => {
  API.graphql(graphqlOperation(listModules)).then( moduleResult =>{
    const moduleObjects = [];
    const dbmodules = moduleResult.data.listModules.items;
    API.graphql(graphqlOperation(listDoctorCustomModulePropss)).then( customModulePropsResult =>{
      const DoctorCustomPropsModules = customModulePropsResult.data.listDoctorCustomModulePropss.items;
      [].concat(dbmodules).map((_module, f) => {
            const cProp = DoctorCustomPropsModules.find(item => item.module.id === _module.id);
            if(cProp === undefined){
                const module_result = {
                    id: undefined,
                    module_id:_module.id,
                    name: _module.name,
                    active: false,
                    registred_in_cloud: false
                };
                moduleObjects.push(module_result);
            }else{
                const module_result = {
                    id: cProp.id,
                    module_id: _module.id,
                    name: _module.name,
                    active: cProp.active,
                    registred_in_cloud: true
                };
                moduleObjects.push(module_result);
            }
          this.setState({listModules: moduleObjects });
          localStorage.setItem("Modules", JSON.stringify(moduleObjects));
      })
    }) 
  })
}

GetSubscriptionData = () => {
  fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/subscription/'+this.props.childProps.state.stripe_subscription_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r) => r.json()).then((r) => {
        var responseObject = JSON.parse(r.body);
        this.setState({ subscriptionData: responseObject.stripeResponse });
    }).catch((err) => { // Error response
        console.log(err);
    });
};
    const subscribed = (this.props.childProps.state.stripe_subscription_id !== 'undefined' &&
                        this.props.childProps.state.stripe_subscription_id !== undefined && 
                        this.props.childProps.state.stripe_subscription_id !== '' && 
                        this.props.childProps.state.stripe_subscription_id !== null)    */

{/* <MDBNavItem>
                <MDBBtn style={{width: 300}} color="primary" className={this.state.activeItemVerticalPills==="3" ? "active" : "" } onClick={this.toggleVerticalPills("3")}>
                  Payment Method
                  <MDBIcon icon="address-card" className="ml-2" />
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn disabled={!subscribed} readOnly style={{width: 300}} color="primary" className={this.state.activeItemVerticalPills==="4" ? "active" : "" } onClick={this.toggleVerticalPills("4")}>
                  Subscription Management
                  <MDBIcon icon="address-card" className="ml-2" />
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn disabled={!subscribed} readOnly style={{width: 300}} color="primary" className={this.state.activeItemVerticalPills==="5" ? "active" : "" } onClick={this.toggleVerticalPills("5")}>
                  Configuraciones de Modulos
                  <MDBIcon icon="address-card" className="ml-2" />
                </MDBBtn>
              </MDBNavItem> */}


 {/* <MDBTabPane tabId="5">
                <Modal childProps={childProps} />
              </MDBTabPane> */}

/* if(tab === '4' && this.state.subscriptionData === null){
      this.GetSubscriptionData();
    }
    if(tab === '5' && this.state.listModules === null){
      this.GetModulesList();
    } */