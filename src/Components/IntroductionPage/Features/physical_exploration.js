import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBNavLink, MDBView, MDBBtn } from "mdbreact";

import fe1 from '../../../images/features/EXPLORACION_FISICA_.jpg';
import fe2 from '../../../images/features/EXPLORACION_FISICA_1.png';
import fe3 from '../../../images/features/EXPLORACION_FISICA_2.png';

const PhysicalExploration = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Exploración  Física
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        La exploración física está compuesta por la exploración general, los signos vitales y la exploración regional. Las exploraciones físicas se realizan por consulta, si el doctor lo desea puede obviar la creación de la misma y pasar al siguiente paso del proceso.
        </p>
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={fe1}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Registro de Datos</strong>
            </h3>
            <p className="dark-grey-text">
            Los doctores pueden agregar de forma opcional los datos que necesiten ingresar. Ingresando los datos en cada consulta de un paciente se almacenan ciertas informaciones que pueden ser visibles en el dashboard del paciente de forma gráfica y también detallada.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={fe2}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Gráfico de Historico de Signos Vitales</strong>
            </h3>
            <p className="dark-grey-text">
            Una vez el doctor guarda los datos de los signos vitales, puede visualizar en cada signo vital un grafico de linea de tiempo con los resultados de las consultas anteriores. La gráfica permite que el doctor pueda ver los resultados de consultas del pasado sin tener que salir de la pantalla actual.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={fe3}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Exploración Regional por Especialidad</strong>
            </h3>
            <p className="dark-grey-text">
            El conjunto de datos que se muestran en La Exploración Regional difieren según la especialidad. Esto quiere decir que el software está adaptado a mostrar diferentes campos en la exploración regional, dependiendo de la especialidad del doctor que está utilizando el software. El histórico de estos datos se puede visualizar por el doctor caba vez que quiera en el dashboard del paciente.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default PhysicalExploration;