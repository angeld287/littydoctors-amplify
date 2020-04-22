import React, { Fragment, useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRotatingCard, MDBDataTable } from "mdbreact";

import { deleteNonPathologicalHistory } from '../../../../../graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';
import Swal from 'sweetalert2';

import useEditPatientHistory from './EditPatientHistory/useEditPatientHistory';
import NonPathologicalHistory from './EditPatientHistory/NonPathologicalHistory';
import PolygonCharts from '../../../../Reports/graphics/PolygonCharts';

import TooltipButton from '../../../../TooltipButton';


const NonPathological = ({
    global: global,
    setGlobalData: setGlobalData,
}) => {
  const data = global.patient.patientHistory.items[0].nonPathologicalHistory;
  const [ table, setTable ] = useState([]);
  const [ polygon, setPolygon ] = useState({});
  const [ flipped, setFlipped ] = useState(data.items.length < 3);
  const { nonPathActions, api, edit } = useEditPatientHistory(global, setGlobalData, setList);

  useEffect(() => {
    if (data.items !== undefined && data.items !== null) {
        setList();
    }
  }, []);

  const removeNonPath = async (id) => {
      const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
      if (result.value) {
          nonPathActions.setlb_nonpath(true);
          
          const _items = global.patient.patientHistory.items[0].nonPathologicalHistory.items;
          
          API.graphql(graphqlOperation(deleteNonPathologicalHistory, {input: {id: id}} ));
          _items.splice(_items.findIndex(v => v.id === id), 1);

          global.patient.patientHistory.items[0].nonPathologicalHistory.items = _items;

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

    const polygon = {dataRadar:{labels: [], datasets: [{label: "", backgroundColor: "rgba(194, 116, 161, 0.5)", borderColor: "rgb(194, 116, 161)", data: []}]}};
    
    data.items.forEach(e => {
      polygon.dataRadar.labels.push(e.type.name);
      polygon.dataRadar.datasets[0].label = "Factor de Riesgo "+ global.patient.name;
      polygon.dataRadar.datasets[0].data.push(e.risk_factor);
    });

    setPolygon(polygon);
    setTable(_nonpath);
  };
  
  const handleFlipping = () => {
    setFlipped(!flipped);
  }

  const npbtn = (
            <MDBBtn onClick={nonPathActions.toggleNonPath} disabled={nonPathActions.loadingButton} className="btn btn-primary btn-sm">
              {!nonPathActions.lb_nonpath && <MDBIcon icon="plus" size="2x" />}
              {nonPathActions.lb_nonpath && 
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
          </MDBBtn>);
  // { responsive: true, scale:{display: true, ticks: { max: 100, min: 0 }} }
  return (
    <MDBContainer>
      <MDBRow between>
        <MDBCol style={{ minHeight: '36rem', maxWidth: "100rem" }}>
          <MDBRotatingCard flipped={flipped} className="text-center">
            <MDBCard className="face front">
              <PolygonCharts state={polygon} options={{ responsive: true, scale:{display: true, ticks: { max: 100, min: 0 }} }}/>
              <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={handleFlipping}>
                  <MDBIcon icon="redo" /> Click aqui para rotar
              </a>
            </MDBCard>
            <MDBCard className="face back">
              <br/>
              <MDBContainer>
                <TooltipButton helperMessage={"Agregar Antecedentes no Patologicos"} component={npbtn} placement="right"/>
                <MDBDataTable
                      scrollY
                      striped bordered searchLabel="Buscar"
                      responsiveSm={true} small hover entries={5}
                      btn={true} data={table} noRecordsFoundLabel="No se han encontrado datos"
                      entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                      paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
                />
              </MDBContainer>
              {(data.items.length > 2) && <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={handleFlipping}>
                  <MDBIcon icon="undo" /> Click aqui para rotar
              </a>}
              {!(data.items.length > 2) && <p>Para mostrar el radar debe tener 3 o mas Antecedentes</p>}
            </MDBCard>
          </MDBRotatingCard>
        </MDBCol>
      </MDBRow>
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