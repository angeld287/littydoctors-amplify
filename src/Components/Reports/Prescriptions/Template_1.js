import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
export const Template = () => (

    <MDBContainer>
      <MDBRow>
        <h1>Name of the Hospital</h1>
      </MDBRow>
      <MDBRow>
        <h3>Nombre del Doctor</h3>
        <p>Direccion de consultorio</p>
        <p>direccion</p>
        <p>telefono 1</p>
        <p>telefono 2</p>
      </MDBRow>
      <ColoredLine color="#25c0d7" />
      <MDBRow>
        <MDBRow>
          <span>S No: numero del paciente</span>
        </MDBRow>
        <MDBCol>
          <span>Name: Nombre del paciente</span>
          <span>Address: Direccion del paciente</span>
        </MDBCol>
        <MDBCol>
          <span>Age: edad del paciente</span>
          <span>Date: fecha del paciente</span>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <h5>Prescription:</h5>
        <br/>
        <p>
          Prescription medida y medicinas recomendadas por el doctor
        </p>
      </MDBRow>
      <MDBRow>
        <span>Firma del doctor</span>
      </MDBRow>
      <ColoredLine color="#25c0d7" />
      <h4>correo del doctor</h4>
    </MDBContainer>
    
  );

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);