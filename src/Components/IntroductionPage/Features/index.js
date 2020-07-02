import React from "react";
import {  MDBRow, MDBCol, MDBCardBody, MDBNavLink, MDBBtn, MDBView, MDBMask } from "mdbreact";
import ft1 from '../../../images/features/ft1.png';
import ft2 from '../../../images/features/ft2.png';
import ft3 from '../../../images/features/ft3.png';
import ana from '../../../images/features/FRONT-RESULTADOS.png';
import reg from '../../../images/features/FRONT-REGISTRO.png';
import pre from '../../../images/features/FRONT-PRESCIPCIONES.png';
import exp from '../../../images/features/FRONT-EXPLORACION.png';
import dia from '../../../images/features/FRONT-DIAGNISTICO.png';
import ant from '../../../images/features/FRONT-ANTECEDENTES.png';


const Features = () => {
  return (
    <section className="text-center my-5 m-4">
      <h2 className="h1-responsive font-weight-bold my-5">
        Caracteristicas
      </h2>

      <MDBRow className="text-center">
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/pendinganalysis">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={ana} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/patienthistory">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={ant} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/diagnosis">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={dia} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/physicalexploration">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={exp} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/prescriptions">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={pre} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBNavLink to="/features/registerpatients">
            <MDBView className="overlay rounded primary-color-dark" waves>
              <img src={reg} alt="" className="img-fluid"/>
              <MDBMask overlay="white-slight" />
            </MDBView>
          </MDBNavLink>
        </MDBCol>
      </MDBRow>


      <h2 className="h1-responsive font-weight-bold my-5 ">
        Caracteristicas Tecnológicas
      </h2>
      <MDBRow className="text-center">
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBView className="overlay rounded primary-color-dark" waves>
            <img
              src={ft1}
              alt=""
              className="img-fluid"
            />
            <a href="#!">
              <MDBMask overlay="white-slight" />
            </a>
          </MDBView>
          <MDBCardBody className="pb-0">
            <h4 className="font-weight-bold my-3">GRAFICOS ESTADISTICOS</h4>
            <p className="grey-text">
              Permite ver el histórico de los pacientes y otros datos de mucha relevancia para el doctor de una forma más fácil y digerible.
            </p>
          </MDBCardBody>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBView className="overlay rounded z-depth-1" waves>
            <img
              src={ft2}
              alt=""
              className="img-fluid"
            />
            <a href="#!">
              <MDBMask overlay="white-slight" />
            </a>
          </MDBView>
          <MDBCardBody className="pb-0">
            <h4 className="font-weight-bold my-3">PORTABILIDAD</h4>
            <p className="grey-text">
              Se puede utilizar el producto en los diferentes dispositivos electrónicos, desde cualquier lugar donde se encuentre.
            </p>
          </MDBCardBody>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBView className="overlay rounded z-depth-1" waves>
            <img
              src={ft3}
              alt=""
              className="img-fluid"
            />
            <a href="#!">
              <MDBMask overlay="white-slight" />
            </a>
          </MDBView>
          <MDBCardBody className="pb-0">
            <h4 className="font-weight-bold my-3">SEGURIDAD DE LA INFORMACION</h4>
            <p className="grey-text">
              Contamos son los servicios tecnológicos de una de las empresas internacionales más exitosa en el mercado, Amazon Web Service.
            </p>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default Features;