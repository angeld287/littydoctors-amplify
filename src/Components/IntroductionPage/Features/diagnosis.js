import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBNavLink, MDBView, MDBBtn } from "mdbreact";

import diag from '../../../images/features/DIAGNOSTICO_.jpg';
import diag1 from '../../../images/features/DIAGNOSTICO_1.png';

const Diagnosis = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Diagnostico
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        El diagnóstico es realizado en el paso final del proceso de consulta médica. El software permite registrar un solo diagnóstico por cada consulta médica. 
        </p>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={diag}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7">
            <a href="#!" className="green-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Indicacion de Resultados
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Análisis de Resultados</strong>
            </h3>
            <p>
            El registro de diagnósticos ofrece llevar un almacén de datos que permiten analizar de forma estadística como se comportan los diagnósticos de las consultas médicas con respecto al tiempo. Estos resultados pueden ser de referencia para investigaciones universitarias o de muestras para exponer en conferencias.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="success" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="7">
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Formulario
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Formulario de Registro de Diagnósticos</strong>
            </h3>
            <p>
            Los diagnosticos son identificados segun su evolucion o segun su metodo. Como resultado final, en el diagnóstico se especifica la enfermedad que puede tener el paciente. Si el doctor determina que no tiene enfermedad entonces puede colocar la opción “N/a”. Además se puede agregar un comentario en el caso de que se requiera especificar otros detalles.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="pink" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={diag1}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
      </MDBCardBody>
    </MDBCard>
  );
}

export default Diagnosis;