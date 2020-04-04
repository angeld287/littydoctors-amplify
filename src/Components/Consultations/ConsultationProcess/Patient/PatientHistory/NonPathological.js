import React, { Fragment, useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import { deleteNonPathologicalHistory } from '../../../../../graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';
import Swal from 'sweetalert2';

import useEditPatientHistory from './EditPatientHistory/useEditPatientHistory';
import NonPathologicalHistory from './EditPatientHistory/NonPathologicalHistory';

import TooltipButton from '../../../../TooltipButton';


const NonPathological = ({
    global: global,
    setGlobalData: setGlobalData,
}) => {
  
  const [ table, setTable ] = useState([]);
  const { nonPathActions, api, edit } = useEditPatientHistory(global, setGlobalData, setList);
  const data = global.patient.patientHistory.nonPathologicalHistory;

  useEffect(() => {
    if (data.items !== undefined && data.items !== null) {
        setList();
    }
  }, []);

  const removeNonPath = async (id) => {
      const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
      if (result.value) {
          nonPathActions.setlb_nonpath(true);
          const _items = global.patient.patientHistory.nonPathologicalHistory.items;
          
          API.graphql(graphqlOperation(deleteNonPathologicalHistory, {input: {id: id}} ));
          _items.splice(_items.findIndex(v => v.id === id), 1);

          global.patient.patientHistory.nonPathologicalHistory.items = _items;

          setGlobalData(global);
          
          setTimeout(() => {  
              setList();
              nonPathActions.setlb_nonpath(false);   
          }, 2000);
      }
  }

  const setList = () => {
    var formated = [];
    const items = data.items.sort((a,b) => { return new Date(b.createdAt) - new Date(a.createdAt)});
        items.forEach((item) => {   
          const delBtn = (<MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeNonPath(item.id) }}> <MDBIcon icon="trash" size="2x"/></MDBBtn>);
          const editBtn = (<MDBBtn size="sm" onClick={(e) => {e.preventDefault(); nonPathActions.openNonPathModalToEdit(item) }}><MDBIcon icon="edit" size="2x"/></MDBBtn>);           
          formated.push({
            type: item.type.name,
            frequency: item.frequency,
            options: (<Fragment><TooltipButton helperMessage={"Editar"} component={editBtn} placement="top"/><TooltipButton helperMessage={"Borrar"} component={delBtn} placement="top"/></Fragment>)
          });
        });

    const _nonpath = {
			columns: [ { label: 'Tipo', field: 'type', sort: 'asc' }, { label: 'Frecuencia', field: 'frequency', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};

    setTable(_nonpath);
	};

  const npbtn = (
            <MDBBtn onClick={nonPathActions.toggleNonPath} disabled={nonPathActions.loadingButton} className="btn btn-primary btn-sm">
              {!nonPathActions.lb_nonpath && <MDBIcon icon="plus" size="2x" />}
              {nonPathActions.lb_nonpath && 
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
          </MDBBtn>);
  
  return (
    <MDBContainer>
        <br/>
        <MDBContainer>
          <TooltipButton helperMessage={"Agregar Antecedentes no Patologicos"} component={npbtn} placement="right"/>
          <MDBDataTable
                striped bordered searchLabel="Buscar"
                responsiveSm={true} small hover entries={5}
                btn={true} data={table} noRecordsFoundLabel="No se han encontrado datos"
                entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
          />
        </MDBContainer>
        <MDBModal isOpen={nonPathActions.nonPathModal} toggle={nonPathActions.toggleNonPath} size="lg">
          <NonPathologicalHistory 
            toggleNonPath={nonPathActions.toggleNonPath}
            nonPathActions={nonPathActions}
            api={api}
            createNonPath={nonPathActions.createNonPath}
            editNonPath={nonPathActions.editNonPath}
            edit={edit}
            nonPathEditObject={nonPathActions.nonPathEditObject}
            global={global}
            setGlobalData={setGlobalData}
            setList={setList}
          />
        </MDBModal>
    </MDBContainer>
  );
}

export default NonPathological;