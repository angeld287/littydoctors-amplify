import React, { Component } from "react";
import {   MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBListGroup, MDBListGroupItem } from "mdbreact";

class ServiceInfo extends Component {
  state = {
    activeItemClassicTabs1: "1",
    activeItemClassicTabs2: "1"
  };

  toggleClassicTabs1 = tab => () => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs2: tab,
        activeItemClassicTabs1: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer className="classic-tabs">
          <MDBNav classicTabs color="primary" className="mt-5">
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "1" ? "active" : "" } onClick={this.toggleClassicTabs1("1")} >
                About
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "2" ? "active" : "" } onClick={this.toggleClassicTabs1("2")} >
                Services
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "3" ? "active" : "" } onClick={this.toggleClassicTabs1("3")} >
                Contact
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "4" ? "active" : "" } onClick={this.toggleClassicTabs1("4")} >
                Process Flow
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent
            className="card mb-5"
            activeItem={this.state.activeItemClassicTabs2}
          >
            <MDBTabPane tabId="1">
              <p>
                This is a project that seeks to streamline the processes that have a relationship between the patient and the doctor, with the purpose of implementing software technology to the greatest number of offices or doctors at an affordable cost.
              </p>
              <p>
                Spanish: Este es un proyecto que busca eficientar los procesos que tienen relacion entre el paciente y el doctor, con el proposito de implentar tecnologia de software a la mayor cantidad de consultorios o medicos a un costo acequible.
              </p>
            </MDBTabPane>
            <MDBTabPane tabId="2">
                <p>
                    The service offered is an automated process that meets the following factors:
                </p>
                <br/>
                <MDBListGroup style={{ width: "100%" }}>
                    <MDBListGroupItem>
                        Confirmation of consultations with patients through an app
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        Full and dynamic communication with the secretary (Example: indicate the cost of the consultation to the secretary through a web or mobile application)
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        Visibility of income (reports). It works to compare the income that the system has with the money received by the secretary.
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        Presentation of your services and specialties to patients in an app
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBTabPane>
            <MDBTabPane tabId="3">
                <h5>
                 To get this product you must send an email to <b>medicalconsultationsprocess@gmail.com</b> requesting the service.
                </h5>
            </MDBTabPane>
            <MDBTabPane tabId="4">
              <p>
                The process begins when the patient requests a medical consultation through the mobile app. Then, between the secretary and the patient, they agree on the date of consultation. By agreeing, the consultation is approved by the secretary. The secretary or doctor sends a notification to the patient to confirm the consultation. When patients confirm, the doctor has a list of confirmed patients and can consult them from their smartphone. Once the patient is finished with the consultation, the doctor assigns a cost of consultation, the patient goes to pay the secretary and she ends the consultation.
              </p>
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
    );
  }
}

export default ServiceInfo;