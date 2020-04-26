import React from "react";
import {  MDBListGroup, MDBListGroupItem, MDBCard, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";

const MissionVisionValues = () => {
  return (
    <MDBCard className="my-5 px-1 pb-1 text-center">
        <section className="my-5">

        <MDBRow>
            <MDBCol md="4" className="md-0">
            <MDBRow>
                <MDBCol lg="2" md="3" size="2">
                <MDBIcon icon="bullseye" size="4x" className="blue-text" />
                </MDBCol>
                <MDBCol lg="10" md="9" size="10">
                <h4 className="font-weight-bold">Mision</h4>
                <br/>
                <br/>
                <p className="grey-text">
                    Nuestra misión es hacer que el doctor se sienta cómodo con el servicio y el producto.
                </p>
                </MDBCol>
            </MDBRow>
            </MDBCol>
            <MDBCol md="4" className="md-0">
            <MDBRow>
                <MDBCol lg="2" md="3" size="2">
                <MDBIcon icon="eye" size="4x" className="pink-text" />
                </MDBCol>
                <MDBCol lg="10" md="9" size="10">
                <h4 className="font-weight-bold">Vision</h4>
                <br/>
                <br/>
                <p className="grey-text">
                    Nuestra visión es llevar el producto a todos los doctores de República Dominicana.
                </p>
                </MDBCol>
            </MDBRow>
            </MDBCol>
            <MDBCol md="4" className="md-0">
            <MDBRow>
                <MDBCol lg="2" md="3" size="2">
                <MDBIcon icon="gem" size="4x" className="purple-text" />
                </MDBCol>
                <MDBCol lg="10" md="9" size="10">
                <div className="">
                    <h4 className="font-weight-bold">Valores</h4>
                    <br/>
                    <br/>
                    <ul style={{listStyleType: 'none'}}>
                        <li><p className="grey-text">Calidad</p></li>
                        <li><p className="grey-text">Responsabilidad</p></li>
                        <li><p className="grey-text">Servicio</p></li>
                        <li><p className="grey-text">Transparencia</p></li>
                    </ul>
                    {/* <MDBListGroup>
                        <MDBListGroupItem>Calidad</MDBListGroupItem>
                        <MDBListGroupItem>Responsabilidad</MDBListGroupItem>
                        <MDBListGroupItem>Servicio</MDBListGroupItem>
                        <MDBListGroupItem>Transparencia</MDBListGroupItem>
                    </MDBListGroup> */}
                </div>
                </MDBCol>
            </MDBRow>
            </MDBCol>
        </MDBRow>
        </section>
    </MDBCard>
  );
}

export default MissionVisionValues;