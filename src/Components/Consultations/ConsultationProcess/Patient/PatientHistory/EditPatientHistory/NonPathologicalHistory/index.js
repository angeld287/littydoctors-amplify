import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import useNonPathologicalHistory from './useNonPathologicalHistory';

import Select from 'react-select'
import Swal from 'sweetalert2';
const uuidv1 = require('uuid/v1');

const NonPathologicalHistory = ({
    nonPathActions: nonPathActions,
    toggleNonPath: toggleNonPath,
    nonPathEditObject: nonPathEditObject,
    global: global,
    setGlobalData: setGlobalData,
    setList: setList,
    edit: edit,
}) => {

  const [ id, setId ] = useState("");
  const [ type, setType ] = useState([]);
  const [ frequency, setFrequency ] = useState([]);
  const [ riskFactor, setRiskFactor ] = useState(0);
  const [ comment, setComment ] = useState("");

  const { api, editNonPath, createNonPath, loading } = useNonPathologicalHistory(global, setGlobalData, setList, toggleNonPath, nonPathActions);

  const frequencies = [];
  if (api.nonpathfrequencies !== undefined) {
    api.nonpathfrequencies.forEach(element => {
      var item = {value: element.id, label: element.name};
      frequencies.push(item);
    });
  }

  const types = [];
  if (api.nonpathtypes !== undefined) {
    api.nonpathtypes.forEach(element => {
      var item = {value: element.id, label: element.name};
      types.push(item);
    });
  }

  useEffect(() => {  
    
        if(edit){
          setId(nonPathEditObject.id);
          setType(nonPathEditObject.type);          
          setFrequency(nonPathEditObject.frequency);
          setRiskFactor(nonPathEditObject.risk_factor);
          setComment(nonPathEditObject.comment);
        }else{
          setId("");
          setType("");          
          setFrequency("");
          setRiskFactor(0);
          setComment("");
          
        }
  }, []);

  const save = (create) => {
    if (riskFactor > 100 || riskFactor < 1) {
        //Swal.fire('Campo Obligatorio', 'Favor completar el campo Lugar de Evento', 'error');
        Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'El Factor de Riesgo debe ser no mayor que 100 y mayor que 0',
              showConfirmButton: false,
              timer: 1500
        });
        return
    }

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
           risk_factor: riskFactor,
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
          risk_factor: riskFactor,
          doctor: "String",
          secretary: "String",
          patient: "String",
      });
      toggleNonPath();
    }

  }

  const tindex = !edit ? null : types.findIndex(v => v.value === nonPathEditObject.type.id);
  const findex = !edit ? null : frequencies.findIndex(v => v.label === nonPathEditObject.frequency);
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggleNonPath}>Crear Antecedente No Patologico</MDBModalHeader>
        <MDBModalBody>
          <MDBContainer>
            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol >
                <label htmlFor="type" className="mt-2" >Tipo</label>
                {!loading && <Select id="type" options={types} defaultValue={types[tindex]} onChange={ (v) => {setType(v)}} />}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
              <MDBCol >
                <label htmlFor="frequency" className="mt-2" >Frecuencia</label>
                {!loading && <Select id="frequency" options={frequencies} defaultValue={frequencies[findex]} onChange={ (v) => {setFrequency(v)}}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
            </MDBRow>
            
            <div className="form-group">
              <label htmlFor="risk_factor">Factor de Riesgo (%)</label>
              <input name="risk_factor" className="form-control" id="risk_factor" value={riskFactor} onChange={ (e) => {setRiskFactor(e.target.value)}}></input>
            </div>
            <MDBCol md="8" className="mt-3">
              <div className="form-group">
                <label htmlFor="comment">Comentario</label>
                <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
              </div>
            </MDBCol>
          </MDBContainer>
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