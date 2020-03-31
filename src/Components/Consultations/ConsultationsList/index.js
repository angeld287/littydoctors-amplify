import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBSpinner, MDBTable, MDBTableHead, MDBTableBody, MDBCol, MDBBox, MDBCard } from "mdbreact";
import useConsultationsList from './useConsultationsList';

const ConsultationsList = ({childProps: childProps}) => { 

    const { loading, consultations, error, ctable, itable } = useConsultationsList();

    if (loading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5 mb-2"><MDBSpinner big/></MDBBox></MDBContainer>);
    if (error) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5 mb-2"><h2>Ha ocurrido un error</h2></MDBBox></MDBContainer>);

    return (
      <MDBContainer>
            <br/>
            <br/>
            <h2 tag='h2'>Consultas del Dia</h2>
            <br/>
            <br/>
        <MDBRow>
            <MDBCol md="8">
                <MDBCard className="mt-2 mb-2 p-2">
                    <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Completadas</strong></h4>
                    <MDBTable >
                    <MDBTableHead columns={ctable.columns} />
                    <MDBTableBody rows={ctable.rows} />
                    </MDBTable>
                </MDBCard>
            </MDBCol>
            <MDBCol md="4">
                <MDBCard className="mt-2 mb-2 p-2">
                    <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Borrador</strong></h4>
                    <MDBTable >
                    <MDBTableHead columns={itable.columns} />
                    <MDBTableBody rows={itable.rows} />
                    </MDBTable>
                </MDBCard>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
}

export default ConsultationsList;