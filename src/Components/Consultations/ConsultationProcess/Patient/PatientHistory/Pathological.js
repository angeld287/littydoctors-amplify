import React, { Fragment, useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

import usePatientHistory from  './usePatientHistory';

const Pathological = ({
    data: data,
    pathological: pathological
}) => {
   
	const [ medications, setMedications ] = useState([]);
	const [ allergies, setAllergies ] = useState([]);
	const [ surgicalInterventions, setSurgicalInterventions ] = useState([]);
  const { test } = usePatientHistory();

  useEffect(() => {
      setLists();
  }, []);

  const setLists = () => {
		var surgical = [];
		var medicines = [];
		var allergies = [];
    var s = 0;
    var m = 0;
    var a = 0;
    if (data.surgicalInterventions !== null && data.surgicalInterventions !== undefined) {
      data.surgicalInterventions.items.forEach((item) => {
        s = s + 1;
        surgical.push({
          number: s,
          name: item.surgicalIntervention.name,
        });
      });
    }
		
    if (data.patientMedications !== null && data.patientMedications !== undefined) {
      data.patientMedications.items.forEach((item) => {
        m = m + 1;
        medicines.push({
          number: m,
          name: item.medications.name +" - "+ item.drug_concentration,
        });
      });
    }

    if (data.patientAllergies !== null && data.patientAllergies !== undefined) {
      data.patientAllergies.items.forEach((item) => {
        a = a + 1;
        allergies.push({
          number: a,
          name: item.allergies.name,
        });
      });
    }

    setSurgicalInterventions(surgical);
    setMedications(medicines);
    setAllergies(allergies);
	};

  const _surgical = [ { label: <MDBIcon size="2x" icon="cut" className="blue-text" />, field: 'number', width: 10}, { label: 'Intervenciones Quirurgicas', field: 'name', width: '80%' }];
  const _medications = [ { label: <MDBIcon size="2x" icon="list-ol" className="blue-text" />, field: 'number', width: 10 }, { label: 'Medicamentos', field: 'name', width: '80%' }];
  const _allergies = [ { label: <MDBIcon size="2x" icon="allergies" className="blue-text" />, field: 'number', width: 10 }, { label: 'Alergias', field: 'name', width: '80%' }];


  return (
      <MDBContainer>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBContainer>
                <MDBTable>
                  <MDBTableHead columns={_allergies} />
                  <MDBTableBody rows={allergies} />
                </MDBTable>
            </MDBContainer>
          </MDBCol>
          <MDBCol>
            <MDBContainer>
                <MDBTable>
                  <MDBTableHead columns={_medications} />
                  <MDBTableBody rows={medications} />
                </MDBTable>
            </MDBContainer>
          </MDBCol>
          <MDBCol>
            <MDBContainer>
                <MDBTable>
                  <MDBTableHead columns={_surgical} />
                  <MDBTableBody rows={surgicalInterventions} />
                </MDBTable>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
}

export default Pathological;