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
            <MDBAvatar className="mx-auto white" circle>
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
          <MDBCard className="face back">
            <MDBCardBody>
              <h4 className="font-weight-bold">About me</h4>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Maxime quae, dolores dicta. Blanditiis rem amet repellat,
                dolores nihil quae in mollitia asperiores ut rerum
                repellendus, voluptatum eum, officia laudantium quaerat?
              </p>
              <hr />
              <ul className="list-inline py-2">
                <li className="list-inline-item">{/* 
                  <a href="" className="p-2 fa-lg fb-ic">
                    <MDBIcon icon="facebook" brand />
                  </a> */}
                </li>
                <li className="list-inline-item">{/* 
                  <a href="" className="p-2 fa-lg tw-ic">
                    <MDBIcon icon="twitter" brand />
                  </a> */}
                </li>
                <li className="list-inline-item">{/* 
                  <a href="" className="p-2 fa-lg gplus-ic">
                    <MDBIcon icon="google-plus" brand />
                  </a> */}
                </li>
                <li className="list-inline-item">{/* 
                  <a href="" className="p-2 fa-lg li-ic">
                    <MDBIcon icon="linkedin" brand />
                  </a> */}
                </li>
              </ul>
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