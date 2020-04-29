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
              <h6 className='purple-text'>
                <MDBIcon icon='money-bill-wave' />
                <strong> Monto a Pagar por Mes</strong>
              </h6>
              <h3 className='py-3 font-weight-bold'>
                <strong>Precio de Plan Básico</strong>
              </h3>
              <p className='pb-3'>
                LittyDoctors provee los servicios de Soporte Técnico, Reportería, Mantenimiento y Capacitación para la aplicación web. El costo por estos servicios es de 40 dólares mensuales que son un total de 2,176.60 pesos dominicanos. Contáctenos para más información sobre el proceso de pago.
              </p>
              <MDBBtn color='secondary' disabled rounded size='md'>
                <MDBRow><MDBIcon icon='dollar-sign' size="4x" className='left' /><h1>40/mes</h1></MDBRow>
              </MDBBtn>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default EcommercePage;