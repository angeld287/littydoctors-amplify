import React, { Fragment, useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import { deleteFamilyHistory } from '../../../../../graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';
import Swal from 'sweetalert2';

import useEditPatientHistory from './EditPatientHistory/useEditPatientHistory';
import FamilyHistory from './EditPatientHistory/FamilyHistory';

import TooltipButton from '../../../../TooltipButton';


const Family = ({
    global: global,
    setGlobalData: setGlobalData,
}) => {

	const [ table, setTable ] = useState([]);
  const { familyActions, api, edit } = useEditPatientHistory(global, setGlobalData, setList);
  const data = global.patient.patientHistory.items[0].familyHistory;

  useEffect(() => {
      if (data.items !== undefined && data.items !== null) {
        setList();
      }
  }, []);

  const removeFamily = async (id) => {
      const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
      if (result.value) {
          familyActions.setlb_family(true);
          const _items = global.patient.patientHistory.familyHistory.items;
          
          API.graphql(graphqlOperation(deleteFamilyHistory, {input: {id: id}} ));
          _items.splice(_items.findIndex(v => v.id === id), 1);

          global.patient.patientHistory.familyHistory.items = _items;

          setGlobalData(global);
          
          setTimeout(() => {  
              setList();
              familyActions.setlb_family(false);   
          }, 2000);
      }
  }

  const setList = () => {
		var formated = [];
    const items = data.items.sort((a,b) => { return new Date(b.createdAt) - new Date(a.createdAt)});
		  items.forEach((item) => {
        const delBtn = (<MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeFamily(item.id) }}> <MDBIcon icon="trash" size="2x"/></MDBBtn>);
        const editBtn = (<MDBBtn size="sm" onClick={(e) => {e.preventDefault(); familyActions.openFamilyModalToEdit(item) }}><MDBIcon icon="edit" size="2x"/></MDBBtn>);
            var dItems = null;
            item.diseases.items.forEach((d) => {
                dItems = dItems+" - "+d.diseases.name;
            });
            
			formated.push({
				relationship: item.relationship.name,
				diseases: dItems,
				options: (<Fragment><TooltipButton helperMessage={"Editar"} component={editBtn} placement="top"/><TooltipButton helperMessage={"Borrar"} component={delBtn} placement="top"/></Fragment>)
			});
		});

    const familytable = {
			columns: [ { label: 'Parentesco', field: 'relationship', sort: 'asc' }, { label: 'Enfermedades', field: 'diseases', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};

    setTable(familytable);
  };
  
  const fbtn = (
            <MDBBtn onClick={familyActions.toggleFamily} disabled={familyActions.loadingButton} className="btn btn-primary btn-sm">
                        {!familyActions.lb_family && <MDBIcon icon="plus" size="2x" />}
                        {familyActions.lb_family && 
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        }
            </MDBBtn>);

  return (
      <MDBContainer>
          <br/>
          <MDBContainer>
            <TooltipButton helperMessage={"Agregar Antecedentes Familiar"} component={fbtn} placement="right"/>
            <MDBDataTable
              striped bordered searchLabel="Buscar"
              responsiveSm={true} small hover entries={5}
              btn={true} data={table} noRecordsFoundLabel="No se han encontrado datos"
              entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
              paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
            />
          </MDBContainer>
          <MDBModal isOpen={familyActions.familyModal} toggle={familyActions.toggleFamily} size="lg">
            <FamilyHistory 
              toggleFamily={familyActions.toggleFamily}
              familyActions={familyActions}
              api={api}
              createFamily={familyActions.createFamily}
              editFamily={familyActions.editFamily}
              edit={edit}
              familyEditObject={familyActions.familyEditObject}
              global={global}
              setGlobalData={setGlobalData}
              setList={setList}
            />
          </MDBModal>
      </MDBContainer>
  );
}

export default Family;