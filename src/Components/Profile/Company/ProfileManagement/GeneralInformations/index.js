import React, { useState } from "react";
import { MDBContainer, MDBCollapse, MDBCard, MDBCardBody, MDBCollapseHeader, MDBRow } from "mdbreact";

import CompanyInformation from './CompanyInformation'
import UserInformation from './UserInformation'

const GeneralInformations = ({company: company}) => {
    const [ collapseID, setCollapseID ] = useState("");

    return (
        <MDBContainer fluid>
          <MDBRow className="m-4">
            <MDBCard style={{width: '100%'}}>
              <UserInformation company={company}/>
            </MDBCard>
          </MDBRow>
          <MDBRow className="m-4">
            <MDBCard style={{width: '100%'}}>
             <CompanyInformation company={company}/>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      );
}

export default GeneralInformations;


/*
          <MDBContainer className="md-accordion mt-5">
            <MDBCard className="mt-3">
              <MDBCollapseHeader onClick={event => {
                                event.preventDefault();
                                const newcollapseID = "collapse1"
                                setCollapseID(collapseID !== newcollapseID ? newcollapseID : "");
                              }}>
                              Informacion Princial
                <i className={ collapseID==="collapse1" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
              </MDBCollapseHeader>
              <MDBCollapse id="collapse1" isOpen={collapseID}>
                <MDBCardBody>
                  <UserInformation company={company}/>
                </MDBCardBody>
              </MDBCollapse>
            </MDBCard>

            <MDBCard>
              <MDBCollapseHeader onClick={event => {
                                event.preventDefault();
                                const newcollapseID = "collapse2"
                                setCollapseID(collapseID !== newcollapseID ? newcollapseID : "");
                              }}>
                              Informacion de Consultorio
                <i className={ collapseID==="collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
              </MDBCollapseHeader>
              <MDBCollapse id="collapse2" isOpen={collapseID}>
                <MDBCardBody>
                  <CompanyInformation company={company}/>
                </MDBCardBody>
              </MDBCollapse>
            </MDBCard>
          </MDBContainer>

*/