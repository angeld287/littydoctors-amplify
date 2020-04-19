import React from 'react';
import { MDBContainer, MDBCard } from "mdbreact";

import PostConsultationsActivity from './PostConsultationsActivity';

const PrescriptionsStudies = ({
    global: global,
    setGlobalData: setGlobalData
}) => {

  return (
    <MDBContainer>
      <MDBCard style={{width: '100%'}}>
        <PostConsultationsActivity
           global={global}
           setGlobalData={setGlobalData}
       />
      </MDBCard>
    </MDBContainer>
  );
}

export default PrescriptionsStudies;