import React from "react";
import {  MDBCard, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

const ContactPage = () => {
  return (
    <MDBCard className="my-5 px-5 pb-1 text-center">
        <MDBContainer>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
            Contactenos
        </h2>
        <p className="text-center w-responsive mx-auto pb-5">
            Si esta interesado en adquirir nuestros servicios, estaremos en la disposicion de recibir su comunicado por las siguientes vias:
        </p>
        <MDBRow className="text-center">
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="blue" className="accent-1">
                <MDBIcon fab icon="instagram" />
              </MDBBtn>
              <p>@mdconsultasrd</p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="phone" />
              </MDBBtn>
              <p>+1 8493412807</p>
            </MDBCol>
            <MDBCol md="4">
              <MDBBtn tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="envelope" />
              </MDBBtn>
              <p>mdconsultasrd@gmail.com</p>
            </MDBCol>
        </MDBRow>
        <br/>
        </MDBContainer>
    </MDBCard>
  );
}

export default ContactPage;