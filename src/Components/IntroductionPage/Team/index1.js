import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBAvatar, MDBCardBody, MDBIcon } from "mdbreact";

import logo from '../../../images/angel-angeles.png';

const TeamPage = () => {
  return (
    <MDBCard className="my-5 px-5 pb-1 text-center">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold my-5">
          Nuestro Equipo
        </h2>
        <p className="grey-text w-responsive mx-auto mb-5">
          
        </p>
        <MDBRow className="text-md-left">
          <MDBCol lg="6" md="12" className="mb-5">
            <MDBCol md="4" lg="6" className="float-left">
              <MDBAvatar
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid"
                tag="img"
                alt="Sample avatar"
              />
            </MDBCol>
            <MDBCol md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">Angel Ramos</h4>
              <h6 className="font-weight-bold grey-text mb-3">
                Graphic Designer
              </h6>
              <p className="grey-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                eos id officiis hic tenetur.
              </p>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100002327691648" className="p-2 fa-lg fb-ic">
                <MDBIcon fab icon="facebook-f" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/a_ramos_a/" className="p-2 fa-lg ins-ic">
                <MDBIcon fab icon="instagram" />
              </a>
            </MDBCol>
          </MDBCol>

          <MDBCol lg="6" md="12" className="mb-5">
            <MDBCol md="4" lg="6" className="float-left">
              <MDBAvatar
                src={logo}
                className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid"
                tag="img"
                alt="Sample avatar"
              />
            </MDBCol>
            <MDBCol md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">Angel Angeles</h4>
              <h6 className="font-weight-bold grey-text mb-3">
                Developer
              </h6>
              <p className="grey-text">
                Desarrollador de aplicaciones mobiles y web. Emprendedor del proyecto MD Consultas
              </p>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/daniel.angeles.3557" className="p-2 fa-lg fb-ic">
                <MDBIcon fab icon="facebook-f" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/feed/" className="p-2 fa-lg yt-ic">
                <MDBIcon fab icon="linkedin" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/therc5/" className="p-2 fa-lg ins-ic">
                <MDBIcon fab icon="instagram" />
              </a>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default TeamPage;