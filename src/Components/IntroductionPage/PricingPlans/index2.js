import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBIcon, MDBBtn  } from "mdbreact";

import image from '../../../images/costpic.jpg';

const EcommercePage = () => {
  return (
    <section className='text-center my-5'>

      <MDBRow>
        <MDBCol md='12' className='mb-4'>
          <MDBCard
            className='card-image'
            style={{
              backgroundImage:
                'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/6-col/img%20%2873%29.jpg)'
            }}
          >
            <div className='text-white text-center d-flex flex-column align-items-center rgba-black-strong py-5 px-4 rounded'>
              <h6 className='blue-text'>
                <MDBIcon icon='money-bill-wave' />
                <strong> Monto a Pagar por Mes</strong>
              </h6>
              <h3 className='py-3 font-weight-bold'>
                <strong>Precio de Plan Básico</strong>
              </h3>
              <p className='pb-3'>
                El costo del servicios va a depender del numero de consultas realizadas en el mes, cada consulta creada por el doctor tiene un costo de 7 pesos dominicanos. 
                Ejemplo, si el doctor realiza 300 consultas en el mes entonses el costo sera igual a 300 * 7, 2100 pesos dominicanos.
              </p>
              <MDBBtn color='primary' disabled rounded size='md'>
                <MDBRow><MDBIcon icon='dollar-sign' size="4x" className='left' /><h1> 7 pesos por Consulta</h1></MDBRow>
              </MDBBtn>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default EcommercePage;