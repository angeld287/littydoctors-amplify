import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select'
import Swal from 'sweetalert2';

const NewMedicalPrescription = ({
  toggle: toggle,
  api: api,
  createMedicalPrescription: createMedicalPrescription,
  editMedicalPrescription: editMedicalPrescription,
  edit: edit,
  editObject: editObject,
}) => {

  const [ prescriptionMedication, setPrescriptionMedication ] = useState("");
  const [ frequency, setFrequency ] = useState([]);
  const [ duration, setDuration ] = useState("");
  const [ comment, setComment ] = useState("");
  const [ medication, setMedication ] = useState([]);

  const medications = [];
  api.prescriptionmedications.forEach(element => {
    var medication = {value: element.id, label: element.name};
    medications.push(medication);
  });

  const options = [
    { value: 'cada 5 horas', label: 'cada 5 horas' },
    { value: 'cada 6 horas', label: 'cada 6 horas' },
    { value: 'cada 7 horas', label: 'cada 7 horas' },
    { value: 'cada 8 horas', label: 'cada 8 horas' },
    { value: 'cada 9 horas', label: 'cada 9 horas' },
    { value: 'cada 10 horas', label: 'cada 10 horas' },
    { value: 'cada 11 horas', label: 'cada 11 horas' },
    { value: 'cada 12 horas', label: 'cada 12 horas' },
    { value: 'cada 13 horas', label: 'cada 13 horas' },
    { value: 'cada 14 horas', label: 'cada 14 horas' },
    { value: 'cada 15 horas', label: 'cada 15 horas' },
    { value: 'cada 16 horas', label: 'cada 16 horas' },
    { value: 'cada 17 horas', label: 'cada 17 horas' },
    { value: 'cada 18 horas', label: 'cada 18 horas' },
    { value: 'cada 19 horas', label: 'cada 19 horas' },
    { value: 'cada 20 horas', label: 'cada 20 horas' },
    { value: 'cada 21 horas', label: 'cada 21 horas' },
    { value: 'cada 22 horas', label: 'cada 22 horas' },
    { value: 'cada 23 horas', label: 'cada 23 horas' },
    { value: 'cada 24 horas', label: 'cada 24 horas' },
  ];

  useEffect(() => {            
        if(edit){
          setPrescriptionMedication(editObject.medicalPrescriptionMedicationsId);          
          setFrequency(editObject.frequency);
          setDuration(editObject.duration);
          setComment(editObject.comment);
          setMedication(editObject.medication);
        }else{
          setPrescriptionMedication("");          
          setFrequency([]);
          setDuration("");
          setComment("");
          setMedication([]);
          
        }
  }, []);

  const save = (create) => {
    if ((frequency.length < 1) || (medication.length < 1)) {
        //Swal.fire('Campo Obligatorio', 'Favor completar el campo Lugar de Evento', 'error');
        Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Favor completar los campos Frecuencia y Medicamento',
              showConfirmButton: false,
              timer: 1500
        });
        return
    }
    if (create) {
       createMedicalPrescription({
          date: new Date(),
          frequency: frequency,
          medication: medication,
          duration: duration,
          comment: comment,
          doctor: "String",
          secretary: "String",
          patient: "String",
       });
       toggle();
    }else{
      editMedicalPrescription({
          date: new Date(),
          frequency: frequency,
          medication: medication,
          duration: duration,
          comment: comment,
          doctor: "String",
          secretary: "String",
          patient: "String",
      });
      toggle();
    }

  }

  const mindex = !edit ? null : medications.findIndex(v => v.value === editObject.medication.value);
  const findex = !edit ? null : options.findIndex(v => v.value === editObject.frequency.value);
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggle}>Receta Medica</MDBModalHeader>
        <MDBModalBody>
          <label htmlFor="prescriptionmedication" className="mt-2" >Medicamento</label>
          <Select id="prescriptionmedication" options={medications} defaultValue={medications[mindex]} onChange={ (v) => {setMedication(v)}} />
          <label htmlFor="frequency" className="mt-2" >Frecuencia</label>
          <Select id="frequency" options={options} defaultValue={options[findex]} onChange={ (v) => {setFrequency(v)}}/>
          <MDBInput label="Duracion" value={duration} onChange={ (e) => {setDuration(e.target.value)}}/>
          <div className="form-group">
            <label htmlFor="comment">Comentario</label>
            <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Cancelar</MDBBtn>
          <MDBBtn color="primary" onClick={(e) => {
            e.preventDefault();
            save(!edit);
          }}>{edit ? "Guardar Cambios" : "Crear"}</MDBBtn>
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default NewMedicalPrescription;