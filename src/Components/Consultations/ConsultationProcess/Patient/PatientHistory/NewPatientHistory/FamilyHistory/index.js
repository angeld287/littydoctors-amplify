import React, { useState, Fragment, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable,
         MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

import Select from 'react-select'
const uuidv1 = require('uuid/v1');

const FamilyHistory = ({
    toggleFamily: toggleFamily,
    api: api,
    createFamily: createFamily,
    editFamily: editFamily,
    edit: edit,
    familyEditObject: familyEditObject
}) => {

  const [ id, setId ] = useState("");
  const [ relationship, setRelationship ] = useState({});
  const [ diseases, setDiseases ] = useState([]);
  const [ comment, setComment ] = useState("");

  const _diseases = [];
  api.diseases.forEach(element => {
    var item = {value: element.id, label: element.name};
    _diseases.push(item);
  });

  const relationships = [];
  api.familytypes.forEach(element => {
    var item = {value: element.id, label: element.name};
    relationships.push(item);
  });

  useEffect(() => {            
        if(edit){
          setId(familyEditObject.id);
          setRelationship(familyEditObject.relationship);          
          setDiseases(familyEditObject.diseases);
          setComment(familyEditObject.comment);
        }else{
          setId("");
          setRelationship({});          
          setDiseases([]);
          setComment("");
          
        }
  }, []);

  const rindex = !edit ? null : relationships.findIndex(v => v.value === familyEditObject.relationship.value);
  const dlist = !edit ? null : familyEditObject.diseases;
  return (
    <MDBContainer>
        <MDBModalHeader toggle={toggleFamily}>Crear Antecedente Familiar</MDBModalHeader>
        <MDBModalBody>
          <MDBRow className="mb-3">
            <MDBCol md="8" >
              <label htmlFor="relationship" className="mt-2" >Parentesco</label>
              <Select id="relationship" options={relationships} defaultValue={relationships[rindex]} onChange={ (v) => {setRelationship(v)}} />
            </MDBCol>
            <MDBCol md="4" >
              <div className="custom-control custom-checkbox">
                  <label className="custom-control-label" htmlFor="brother_alive">Con vida?</label>
                  <input name="brother_alive" id="brother_alive" type="checkbox" className="custom-control-input"/>
              </div>
            </MDBCol>
          </MDBRow>

          <label htmlFor="diseases" className="mt-2" >Enfermedades</label>
          <Select isMulti id="diseases" options={_diseases} defaultValue={dlist} onChange={ (v) => {setDiseases(v)}}/>
          <div className="form-group">
            <label htmlFor="comment">Comentario</label>
            <textarea name="comment" className="form-control" id="comment" rows="3" value={comment} onChange={ (e) => {setComment(e.target.value)}}></textarea>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleFamily}>Cancelar</MDBBtn>

          {!edit &&
            <MDBBtn color="primary" onClick={(e) => {
                e.preventDefault();
                createFamily({
                    id: uuidv1(),
                    date: new Date(),
                    diseases: diseases,
                    relationship: relationship,
                    comment: comment,
                    doctor: "String",
                    secretary: "String",
                    patient: "String",
                });
                toggleFamily();
            }}>Crear</MDBBtn>
          }
          {edit &&
            <MDBBtn color="primary" onClick={(e) => {
                e.preventDefault();                
                editFamily({
                    id: id,
                    date: new Date(),
                    diseases: diseases,
                    relationship: relationship,
                    comment: comment,
                    doctor: "String",
                    secretary: "String",
                    patient: "String",
                });
                toggleFamily();
            }}>Guardar Cambios</MDBBtn>
          }
        </MDBModalFooter>
    </MDBContainer>
  );
}

export default FamilyHistory;