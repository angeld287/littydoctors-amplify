import React, {useState} from "react";
import PatientFinder from './PatientFinder';
import ConsultationsList from './ConsultationsList';
import { MDBContainer, MDBRow, MDBCard } from "mdbreact";

const Consultations = ({childProps: childProps}) => { 

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCard style={{ width: "100%" }} className="mb-4 mt-4">
            <PatientFinder childProps={childProps} />
          </MDBCard>
        </MDBRow>
        <MDBRow>
          <MDBCard style={{ width: "100%" }} className="mb-4 mt-4">
            <ConsultationsList childProps={childProps} />
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    );
}

export default Consultations;