import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn, MDBNavLink } from "mdbreact";

import lab from '../../../images/features/ANALISIS_PENDIENTES_.jpg';
import pa1 from '../../../images/features/ANALISIS_PENDIENTES_1.png';
import pa2 from '../../../images/features/ANALISIS_PENDIENTES_2.png';

const PendingAnalysis = () => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        Análisis Pendientes
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
        El proceso de revisión de los análisis pendientes de la consulta están al comienzo del proceso. En el mismo los doctores pueden ver una lista de los análisis que se solicitaron en la consulta anterior al paciente.
        </p>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={lab}
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
                Laboratorio
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Actividad Delegada al Paciente</strong>
            </h3>
            <p>
            Con el propósito de evitar que el doctor tenga que agregar los datos de resultados de análisis médicos, se debe permitir que el paciente agregue estos resultados una vez obtenidos y en el momento de la consulta el doctor solamente valide que los resultados físicos concuerdan con los registrados en el sistema.
            </p>
            <br/>
            <p>
            Lo que LittyDoctors vende es un servicio y un mantenimiento, por lo tanto estos son procesos que se irán agregando al software a medida que vayan surgiendo las necesidades con mayor efecto.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="green" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
        <MDBRow>
          <MDBCol lg="7">
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Tabla
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Tabla de Análisis Pendientes</strong>
            </h3>
            <p>
            En la tabla de análisis pendientes se pueden agregar los resultados de dos formas diferentes: resultados numéricos segmentados y almacenamiento de archivo pdf que contenga los resultados.
            <br/>
            <br/>
            Guardar los resultados en datos numéricos de forma segmentada ayuda a que en un futuro se puedan visualizar de una forma más digerible para el cerebro humano. Almacenar los archivos pdf abarca un mayor detalle del resultado médico. Las dos formas de agregar resultados médicos son relevantes.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="pink" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={pa1}
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
                src={pa2}
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
                Formulario
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Formulario de ingreso de Resultados</strong>
            </h3>
            <p>
            Cada examen médico tiene un conjunto de datos que son visualizado de forma numérica, el potencial de almacenar estas informaciones de manera segmentada se basa en que estas informaciones pueden cambiar su contenido escrito a un contenido gráfico causando que sea más rápido de entender y de digerir.
            </p>
            <MDBNavLink to="/contactus"><MDBBtn color="indigo" size="md">Conocer Mas</MDBBtn></MDBNavLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default PendingAnalysis;