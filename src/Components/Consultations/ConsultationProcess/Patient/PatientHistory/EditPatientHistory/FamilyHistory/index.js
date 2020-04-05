import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select';
import Swal from 'sweetalert2';

import useFamilyHistory from './useFamilyHistory';

const FamilyHistory = ({
    familyActions: familyActions,
    toggleFamily: toggleFamily,
    edit: edit,
    familyEditObject: familyEditObject,
    global: global,
    setGlobalData: setGlobalData,
    setList: setList,
}) => {

  const [ id, setId ] = useState("");
  const [ relationship, setRelationship ] = useState([]);
  const [ diseases, setDiseases ] = useState([]);
  const [ comment, setComment ] = useState("");
  const [ alive, setAlive ] = useState(true);

  const [ diseasesToEdit, setDiseasesToEdit ] = useState([]);


  const { api, createFamily, loading, editFamily} = useFamilyHistory(global, setGlobalData, setList, toggleFamily, familyActions);

  const _diseases = [];
  if (api.diseases !== undefined) {
    api.diseases.forEach(element => {
      var item = {value: element.id, label: element.name};
      _diseases.push(item);
    }); 
  }

  const relationships = [];
  if (api.familytypes !== undefined) {
    api.familytypes.forEach(element => {
      var item = {value: element.id, label: element.name};
      relationships.push(item);
    });
  }

  useEffect(() => {       
    
        if(edit){

          const _d = []
          familyEditObject.diseases.items.forEach( e => {
            _d.push({value: e.diseases.id, label: e.diseases.name})
          })

          setDiseasesToEdit(_d);
          
          setId(familyEditObject.id);
          setRelationship(familyEditObject.relationship);          
          setDiseases(familyEditObject.diseases);
          setComment(familyEditObject.comment);
        }else{
          setId("");
          setRelationship([]);          
          setDiseases([]);
          setComment("");
        }
  }, []);

  const save = (create) => {
    if(diseases === null){
      Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Favor completar el campo enfermedades',
            showConfirmButton: false,
            timer: 1500
      });
      return
    }

    if ((relationship.length < 1) || (diseases.length < 1)) {
        Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Favor completar los campos paretesco y enfermedades',
              showConfirmButton: false,
              timer: 1500
        });
        return
    }
    if (create) {
       createFamily({
           //id: uuidv1(),
           date: new Date(),
           diseases: diseases,
           relationship: relationship,
           comment: comment,
           doctor: "String",
           secretary: "String",
           patient: "String",
           alive: alive,
       });
       toggleFamily();
    }else{
      editFamily({
          id: id,
          date: new Date(),
          diseases: diseases,
          relationship: relationship,
          comment: comment,
          doctor: "String",
          secretary: "String",
          patient: "String",
          alive: alive,
      });
      toggleFamily();
    }

  }

  const setAliveD = () => { setAlive(!alive); }

  const rindex = !edit ? null : relationships.findIndex(v => v.value === familyEditObject.relationship.id);
  const dlist = !edit ? null : familyEditObject.diseases;

  
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggleFamily}>Crear Antecedente Familiar</MDBModalHeader>
        <MDBModalBody>
          <MDBRow className="mb-3">
            <MDBCol md="8" >
              <label htmlFor="relationship" className="mt-2" >Parentesco </label>
              {!loading && <Select isLoading={loading} id="relationship" options={relationships} defaultValue={relationships[rindex]} onChange={ (v) => {setRelationship(v)}} />}
              {loading && 
                  <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>
              }
            </MDBCol>
            <MDBCol md="4" >
              <div className="custom-control custom-checkbox">
                  <MDBInput label="Con vida?" type="checkbox" id="alive" checked={alive} onChange={setAliveD}
                  />
              </div>
            </MDBCol>
          </MDBRow>

          <label htmlFor="diseases" className="mt-2" >Enfermedades</label>
          {!loading && <Select isMulti id="diseases" options={_diseases} defaultValue={diseasesToEdit} onChange={ (v) => {setDiseases(v)}}/>}
          {loading && 
              <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>
          }
          <div className="form-group">
            <label htmlFor="comment">Comentario</label>
            <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleFamily}>Cancelar</MDBBtn>
          <MDBBtn color="primary" onClick={(e) => {
            e.preventDefault();
            save(!edit);
          }}>{edit ? "Guardar Cambios" : "Crear"}</MDBBtn>
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default FamilyHistory;