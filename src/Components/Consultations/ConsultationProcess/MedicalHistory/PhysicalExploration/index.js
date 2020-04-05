import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import usePhysicalExploration from './usePhysicalExploration';
import ViewPhysicalExploration from './ViewPhysicalExploration';
import NewPhysicalExploration from './NewPhysicalExploration';
import EditPhysicalExploration from './EditPhysicalExploration';



const PhysicalExploration = ({
    global: global,
    setGlobalData: setGlobalData
}) => {
  const { actions, _new , _edit, setEdit, editLoading, fields, editPhysicalExploration, setEditData, loading} = usePhysicalExploration(global, setGlobalData);

  useEffect(() => {
      let didCancel = false;

      const fetch = async () => {        
          try {
            } catch (error) {
          }
      };

      fetch();

      return () => {
          didCancel = true;
      };
  }, []);

  if (loading) {
    return (
      <MDBContainer>
        <MDBBox display="flex" justifyContent="center" className="mt-5">
          <MDBSpinner big/>
        </MDBBox>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer>
      {/* Crear Datos de Exploracion Fisica */}
      {(_new && !_edit)&&
          <NewPhysicalExploration
              global={global}
              setGlobalData={setGlobalData}
              actions={actions}
          />
      }

      {/* Mostrar Datos de Exploracion Fisica */}
      {(!_new && !_edit)&&
          <ViewPhysicalExploration
              global={global}
              setEdit={setEdit}
              editLoading={editLoading}
          />
      }

      {/* Editar Datos de Exploracion Fisica */}
      {(!_new && _edit)&&
          <EditPhysicalExploration
              editPhysicalExploration={editPhysicalExploration}
              fields={fields}
              editLoading={editLoading}
              setEditData={setEditData}
              setEdit={setEdit}
          />
      }
      
    </MDBContainer>
  );
}

export default PhysicalExploration;