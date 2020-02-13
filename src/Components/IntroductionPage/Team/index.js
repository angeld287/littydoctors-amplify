import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBAvatar, MDBCardBody, MDBIcon, MDBBtn } from "mdbreact";

import developer from '../../../images/angel-angeles.png';
import graphic_designer from '../../../images/angel-ramos.jpeg';
import aws_infraestructure_manager from '../../../images/manuel-santana.png';

const TeamPage = () => {
  return (
    <MDBCard className="my-5 px-1 pb-5 text-center">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold my-5">
            Nuestro Equipo
          </h2>
          <p className="grey-text w-responsive mx-auto mb-5">
          </p>
          <MDBRow>
            <MDBCol md="4" className="mb-md-0 mb-5">
              <img
                tag="img"
                src={aws_infraestructure_manager}
                className="rounded z-depth-1-half img-fluid"
                alt="Sample avatar"
              />
              <h4 className="font-weight-bold dark-grey-text my-4">
                Manuel Santana
              </h4>
              <h6 className="text-uppercase grey-text mb-3">AWS Infraestructure Manager</h6>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/maanusf/" tag="a" floating size="sm" className="mx-1 mb-0 btn-tw">
                <MDBIcon fab icon="instagram" />
              </MDBBtn>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/maansf" tag="a" floating size="sm" className="mx-1 mb-0 btn-fb">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0 mb-5">
              <img
                tag="img"
                src={developer}
                className="rounded z-depth-1-half img-fluid"
                alt="Sample avatar"
              />
              <h4 className="font-weight-bold dark-grey-text my-4">Angel Angeles</h4>
              <h6 className="text-uppercase grey-text mb-3">
                Developer
              </h6>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/therc5/" tag="a" floating size="sm" className="mx-1 mb-0 btn-tw">
                <MDBIcon fab icon="instagram" />
              </MDBBtn>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/daniel.angeles.3557" tag="a" floating size="sm" className="mx-1 mb-0 btn-fb">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0 mb-5">
              <img
                tag="img"
                src={graphic_designer}
                className="rounded z-depth-1-half img-fluid"
                alt="Sample avatar"
                height="500" 
                width="306"
              />
              <h4 className="font-weight-bold dark-grey-text my-4">
                Angel Ramos
              </h4>
              <h6 className="text-uppercase grey-text mb-3">Graphic Designer</h6>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/a_ramos_a/" tag="a" floating size="sm" className="mx-1 mb-0 btn-tw">
                <MDBIcon fab icon="instagram" />
              </MDBBtn>
              <MDBBtn target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100002327691648" tag="a" floating size="sm" className="mx-1 mb-0 btn-fb">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
  );
}

export default TeamPage;