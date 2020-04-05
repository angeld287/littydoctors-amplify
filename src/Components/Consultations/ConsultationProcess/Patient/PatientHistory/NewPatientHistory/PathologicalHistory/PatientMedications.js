import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select'
import Swal from 'sweetalert2';
const uuidv1 = require('uuid/v1');

const PatientMedications = ({
    toggleMedication: toggleMedication,
    api: api,
    createMedication: createMedication,
    editMedication: editMedication,
    edit: edit,
    medicationEditObject: medicationEditObject
}) => {

  const [ id, setId ] = useState("");
  const [ medication, setMedication ] = useState([]);
  const [ drugConcentration, setDrugConcentration ] = useState([]);

  const medications = [];
  api.medications.forEach(element => {
    var item = {value: element.id, label: element.name};
    medications.push(item);
  });

  useEffect(() => {            
        if(edit){
          setId(medicationEditObject.id);
          setMedication(medicationEditObject.medication);          
          setDrugConcentration(medicationEditObject.drug_concentration);
        }else{
          setId("");
          setMedication("");          
          setDrugConcentration("");
        }
  }, []);

  const save = (create) => {
    if ((medication.length < 1) || (drugConcentration === "")) {
        //Swal.fire('Campo Obligatorio', 'Favor completar el campo Lugar de Evento', 'error');
        Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Favor completar los campos categoria y frecuencia',
              showConfirmButton: false,
              timer: 1500
        });
        return
    }
    if (create) {
       createMedication({
          id: uuidv1(),
          medication: medication,
          drug_concentration: drugConcentration,
          doctor: "String",
          secretary: "String",
          patient: "String",
       });
       toggleMedication();
    }else{
      editMedication({
          id: id,
          medication: medication,
          drug_concentration: drugConcentration,
          doctor: "String",
          secretary: "String",
          patient: "String",
      });
      toggleMedication();
    }

  }

  const mindex = !edit ? null : medications.findIndex(v => v.value === medicationEditObject.medication.value);
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggleMedication}>Agregar Medicamento</MDBModalHeader>
        <MDBModalBody>
          <label htmlFor="type" className="mt-2" >Medicamento</label>
          <Select id="type" options={medications} defaultValue={medications[mindex]} onChange={ (v) => {setMedication(v)}} />
          <br/>
          <div className="form-group">
            <label htmlFor="drug_concentration">Concentracion (mL)</label>
            <input type="number" name="drug_concentration" className="form-control" id="drug_concentration" rows="3" value={drugConcentration} onChange={ (e) => {setDrugConcentration(e.target.value)}}></input>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleMedication}>Cancelar</MDBBtn>
          <MDBBtn color="primary" onClick={(e) => {
            e.preventDefault();
            save(!edit);
          }}>{edit ? "Guardar Cambios" : "Crear"}</MDBBtn>
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default PatientMedications;