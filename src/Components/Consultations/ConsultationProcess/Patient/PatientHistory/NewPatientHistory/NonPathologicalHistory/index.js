import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select'
import Swal from 'sweetalert2';
const uuidv1 = require('uuid/v1');

const NonPathologicalHistory = ({
    toggleNonPath: toggleNonPath,
    api: api,
    createNonPath: createNonPath,
    editNonPath: editNonPath,
    edit: edit,
    nonPathEditObject: nonPathEditObject
}) => {

  const [ id, setId ] = useState("");
  const [ type, setType ] = useState([]);
  const [ frequency, setFrequency ] = useState([]);
  const [ duration, setDuration ] = useState("");
  const [ comment, setComment ] = useState("");

  const frequencies = [];
  api.nonpathfrequencies.forEach(element => {
    var item = {value: element.id, label: element.name};
    frequencies.push(item);
  });

  const types = [];
  api.nonpathtypes.forEach(element => {
    var item = {value: element.id, label: element.name};
    types.push(item);
  });

  useEffect(() => {            
        if(edit){
          setId(nonPathEditObject.id);
          setType(nonPathEditObject.type);          
          setFrequency(nonPathEditObject.frequency);
          setComment(nonPathEditObject.comment);
        }else{
          setId("");
          setType("");          
          setFrequency("");
          setComment("");
          
        }
  }, []);

  const save = (create) => {
    if ((frequency.length < 1) || (type.length < 1)) {
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
       createNonPath({
           id: uuidv1(),
           date: new Date(),
           frequency: frequency,
           type: type,
           comment: comment,
           doctor: "String",
           secretary: "String",
           patient: "String",
       });
       toggleNonPath();
    }else{
      editNonPath({
          id: id,
          date: new Date(),
          frequency: frequency,
          type: type,
          comment: comment,
          doctor: "String",
          secretary: "String",
          patient: "String",
      });
      toggleNonPath();
    }

  }

  const tindex = !edit ? null : types.findIndex(v => v.value === nonPathEditObject.type.value);
  const findex = !edit ? null : frequencies.findIndex(v => v.value === nonPathEditObject.frequency.value);
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggleNonPath}>Crear Antecedente No Patologico</MDBModalHeader>
        <MDBModalBody>
<label htmlFor="type" className="mt-2" >Tipo</label>
          <Select id="type" options={types} defaultValue={types[tindex]} onChange={ (v) => {setType(v)}} />
          <label htmlFor="frequency" className="mt-2" >Frecuencia</label>
          <Select id="frequency" options={frequencies} defaultValue={frequencies[findex]} onChange={ (v) => {setFrequency(v)}}/>
          <div className="form-group">
            <label htmlFor="comment">Comentario</label>
            <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleNonPath}>Cancelar</MDBBtn>
          <MDBBtn color="primary" onClick={(e) => {
            e.preventDefault();
            save(!edit);
          }}>{edit ? "Guardar Cambios" : "Crear"}</MDBBtn>
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default NonPathologicalHistory;