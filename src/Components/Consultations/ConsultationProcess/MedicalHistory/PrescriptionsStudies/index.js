import React from 'react';
import { MDBContainer, MDBCard, MDBRow } from "mdbreact";

import PostConsultationsActivity from './PostConsultationsActivity';
import Diagnosis from './Diagnosis';

const PrescriptionsStudies = ({
    global: global,
    setGlobalData: setGlobalData
}) => {

  return (
    <MDBContainer>
      <MDBRow className="mb-4">
        <MDBCard style={{width: '100%'}}>
          <Diagnosis
            global={global}
            setGlobalData={setGlobalData}
        />
        </MDBCard>
      </MDBRow>
      <MDBRow>
        <MDBCard style={{width: '100%'}}>
          <PostConsultationsActivity
            global={global}
            setGlobalData={setGlobalData}
        />
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default PrescriptionsStudies;