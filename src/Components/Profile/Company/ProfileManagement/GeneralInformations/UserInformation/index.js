import React, { useState } from 'react';
import { MDBCol, MDBRow, MDBModalFooter, MDBCard, MDBCardUp, MDBCardBody, MDBAvatar, MDBRotatingCard/* , MDBIcon */ } from "mdbreact";

import image_back from '../../../../../../images/modern-blue-medical-background.jpg';

import { Storage } from "aws-amplify";
import { S3Image } from 'aws-amplify-react';


const UserInformation = ({ company: company }) => {
  const [ flipped, setFlipped ] = useState(false);

  const {image} = company

  const _image = (image !== null && image !== undefined)?(<S3Image imgKey={image} height="100" width="60" alt="" className="rounded-circle" />):(null);

  return (
    <MDBRow>
      <MDBCol style={{ minHeight: '26rem' }}>
        <MDBRotatingCard flipped={flipped} className="text-center h-100 w-100">
          <MDBCard className="face front">
            <MDBCardUp>
              <img className="card-img-top" src={image_back} alt="" />
            </MDBCardUp>
            <MDBAvatar size="4x" className="mx-auto white">
              {_image}
            </MDBAvatar>
            <MDBCardBody>
              <h4 className="font-weight-bold mb-3">{ company.doctorname}</h4>
              <p className="font-weight-bold blue-text">{company.speciality}</p>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
                <a href="https://www.freepik.es/fotos-vectores-gratis/fondo">Vector de Fondo creado por Creative_hat - www.freepik.es</a>
            </MDBModalFooter>
          </MDBCard>
        </MDBRotatingCard>
      </MDBCol>
    </MDBRow>
    );
}

export default UserInformation;