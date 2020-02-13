import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select'

const NewMedicalPrescription = ({
  toggle: toggle,
  api: api,
  createMedicalPrescription: createMedicalPrescription,
  editMedicalPrescription: editMedicalPrescription,
  edit: edit,
  editObject: editObject,
}) => {

  const [ prescriptionMedication, setPrescriptionMedication ] = useState("");
  const [ frequency, setFrequency ] = useState("");
  const [ duration, setDuration ] = useState("");
  const [ comment, setComment ] = useState("");

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
        }else{
          setPrescriptionMedication("");          
          setFrequency("");
          setDuration("");
          setComment("");
          
        }
  }, []);

  const mindex = !edit ? null : medications.findIndex(v => v.value === editObject.medicalPrescriptionMedicationsId);
  const findex = !edit ? null : options.findIndex(v => v.value === editObject.frequency);
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggle}>Receta Medica</MDBModalHeader>
        <MDBModalBody>
          <label htmlFor="prescriptionmedication" className="mt-2" >Medicamento</label>
          <Select id="prescriptionmedication" options={medications} defaultValue={medications[mindex]} onChange={ (v) => {setPrescriptionMedication(v)}} />
          <label htmlFor="frequency" className="mt-2" >Frecuencia</label>
          <Select id="frequency" options={options} defaultValue={options[findex]} onChange={ (v) => {setFrequency(v.value)}}/>
          <MDBInput label="Duracion" value={duration} onChange={ (e) => {setDuration(e.target.value)}}/>
          <div className="form-group">
            <label htmlFor="comment">Comentario</label>
            <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Cancelar</MDBBtn>

          {!edit &&
            <MDBBtn color="primary" onClick={(e) => {
                e.preventDefault();
                createMedicalPrescription({
                    date: new Date(),
                    frequency: frequency,
                    duration: duration,
                    comment: comment,
                    doctor: "String",
                    secretary: "String",
                    patient: "String",
                    medicalPrescriptionMedicationsId: prescriptionMedication.value,
                    medicationName: prescriptionMedication.label,
                    medicalPrescriptionPostconsultactId: "sss"
                });
                toggle();
            }}>Crear</MDBBtn>
          }
          {edit &&
            <MDBBtn color="primary" onClick={(e) => {
                e.preventDefault();
                editMedicalPrescription({
                    date: new Date(),
                    frequency: frequency,
                    duration: duration,
                    comment: comment,
                    doctor: "String",
                    secretary: "String",
                    patient: "String",
                    medicalPrescriptionMedicationsId: prescriptionMedication.value,
                    medicationName: prescriptionMedication.label,
                    medicalPrescriptionPostconsultactId: "sss"
                });
                toggle();
            }}>Guardar Cambios</MDBBtn>
          }
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default NewMedicalPrescription;