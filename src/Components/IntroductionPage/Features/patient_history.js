import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBNavLink, MDBView, MDBBtn } from "mdbreact";

import atecedentes from '../../../images/features/ANTECEDENTES_1.jpg';
import atecedentes1 from '../../../images/features/ANTECEDENTES_2.png';
import atecedentes2 from '../../../images/features/ANTECEDENTES_3.png';

const PatientHistory = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Antecedentes del Paciente
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        Los antecedentes son administrados por los doctores pero visibles para cada paciente según le corresponda. El software registra los antecedentes personales patológicos, no patológicos y familiares.
        </p>
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={atecedentes}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Reglas de Visibilidad de Antecedentes</strong>
            </h3>
            <p className="dark-grey-text">
            Este es un software que está preparado par ser utilizado por varios doctores, cada uno con sus respectivos perfiles. Cada paciente registrado tendrá un antecedente por doctor. Esto quiere decir que si un paciente visita al doctor A, este le registrara sus antecedentes, entonces cuando el paciente visite al doctor B no tendrá ninguna interferencia con los datos que registró el doctor A, por consiguiente este deberá registrar otros antecedentes del paciente. Una vez registrados los antecedentes del paciente se mostraran esos mismo datos en las próximas consultas, dándole permiso al doctor para modificarlos, si así lo desea.
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
                src={atecedentes1}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Factor de Riesgo</strong>
            </h3>
            <p className="dark-grey-text">
            Este gráfico de factor de riesgo es tomado de los antecedente personales no patológicos, en los que el doctor define de manera subjetiva el porcentaje de factor de riesgo de las actividades del paciente según lo que le describa el mismo. Este gráfico sirve para medir en qué estado se encuentra el paciente con respecto a las actividades que debe y no debe realizar para mantener su salud. Es un gráfico que el paciente debe poder visualizar en cualquier momento.
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
                src={atecedentes2}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Formulario de Creación</strong>
            </h3>
            <p className="dark-grey-text">
            En las tablas de los antecedentes se permite agregar, editar y borrar los registros. El formulario para crear antecedentes familiares permite agregar varias enfermedades por familiar y también permite agregar un comentario en caso de que surja la necesidad de describir otros detalles.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default PatientHistory;