import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn, MDBNavLink } from "mdbreact";

import p1 from '../../../images/features/PRESCRIPCIONES_.jpg';
import p2 from '../../../images/features/PRESCRIPCIONES_1.png';
import p3 from '../../../images/features/PRESCRIPCIONES_2.png';

const Prescriptions = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Prescripciones Médicas
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        Es una de las actividades del último paso del proceso de consulta médica, acompañado del diagnóstico. Permite que el doctor pueda describir de manera fácil y clara las recetas médicas del paciente.
        </p>
        <MDBRow>
          <MDBCol lg="7">
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Formulario
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Formulario de Registro de Receta Medica</strong>
            </h3>
            <p>
            El formulario de registro permite agregar las medicinas recetadas filtradas por el nombre. También se puede agregar la frecuencia del uso de la medicina y la duración. Por último, el formulario tiene un campo para digitar un comentario para agregar detalles.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="pink" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={p2}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={p3}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7">
            <a href="#!" className="indigo-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Tabla
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Tabla de Recetas Médicas</strong>
            </h3>
            <p>
            En la tabla se muestran los registros creados por el doctor para las recetas médicas, en los que se pueden editar y borrar los mismos. El software provee una opción para exportar las recetas médicas de forma física (papel). Además el software debe permitir que el paciente vea sus recetas médicas desde su smartphone o pc, para evitar el uso del papel.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="indigo" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Prescriptions;