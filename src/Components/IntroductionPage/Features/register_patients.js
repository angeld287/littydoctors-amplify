import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBNavLink, MDBView, MDBBtn } from "mdbreact";

import rp1 from '../../../images/features/REGISTRO_PACIENTES.jpeg';
import rp2 from '../../../images/features/REGISTRO_PACIENTES_1-01.png';
import rp3 from '../../../images/features/REGISTRO_PACIENTES_2.jpg';

const RegisterPatients = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Registro de Pacientes en el Sistema
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        Un proceso de consulta médica exige mantener un registro de pacientes que contenga toda su información con el que se pueda tener una trazabilidad de los resultados, procesos, exámenes médicos, entre otros.
        </p>
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={rp1}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Distribución de Información a los Pacientes</strong>
            </h3>
            <p className="dark-grey-text">
            El paciente tiene la posibilidad de visualizar los diferentes documentos e informaciones que son parte de los elementos de salida del proceso de consulta médica y que le corresponden al mismo.
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
                src={rp2}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Facilidades de Registro para el Paciente</strong>
            </h3>
            <p className="dark-grey-text">
            El paciente puede registrarse en el software desde su Smartphone o desde su computadora. Cuando se registre deberá proporcionar su correo electrónico y su número de teléfono, luego recibirá un código para confirmar su correo.
            <br/>
            <br/>
            En el caso de que el paciente no pueda registrarse por alguna limitación, el doctor tiene la posibilidad de registrarlo en el sistema en el panel de creación de consultas. La secretaría deberá asegurarse de que los pacientes estén registrados en el sistema antes de que entren a la consulta médica. Si el paciente no se puede registrar entonces esta será una tarea del doctor. Las oportunidades de registro en el sistema están abiertas las 24 horas del día los 7 días de la semana.
            <br/>
            <br/>
            El paciente deberá aprobar los términos y condiciones en los que se hace referencia a que sus datos básicos serán compartidos por los doctores registrados en el sistema. En caso de que el paciente no haya aprobado los términos y condiciones, entonces el doctor podrá crear consultas médicas con el paciente pero no podrá ver sus datos básicos. Los datos básicos del paciente son los siguientes: nombre, email, telefono, edad, sexo, cedula, religión y estado civil.
            </p>
            <br/>
            <br/>
            <br/>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="5" xl="4">
            <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
              <img
                className="img-fluid"
                src={rp3}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" xl="8">
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Beneficios de Evitar Registrar Pacientes en el Sistema</strong>
            </h3>
            <p className="dark-grey-text">
            El beneficio principal en el tiempo ahorrado. Con el tiempo ahorrado en sus consultas, el doctor puede salir más temprano del consultorio o hacer más consultas por día. También, cuando el doctor no tiene la obligación de registrar al paciente tiene una descarga mental y física, contribuyendo a evitar su fatiga. 
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="primary" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default RegisterPatients;