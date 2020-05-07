import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBSpinner, MDBBox } from "mdbreact";

import usePhysicalExploration from './usePhysicalExploration';
import ViewPhysicalExploration from './ViewPhysicalExploration';
import NewPhysicalExploration from './NewPhysicalExploration';
import EditPhysicalExploration from './EditPhysicalExploration';



const PhysicalExploration = ({
    global: global,
    setGlobalData: setGlobalData,
    patientData: patientData,
    childProps: childProps
}) => {
  const { _setFieldsForm, fieldsForm, actions, _new , _edit, setEdit, editLoading, fields, editPhysicalExploration, setEditData, loading} = usePhysicalExploration(childProps, patientData, global, setGlobalData);

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
              fieldsForm={fieldsForm}
              setFieldsForm={_setFieldsForm}
          />
      }

      {/* Mostrar Datos de Exploracion Fisica */}
      {(!_new && !_edit)&&
          <ViewPhysicalExploration
              global={global}
              setEdit={setEdit}
              editLoading={editLoading}
              fieldsForm={fieldsForm}
              setFieldsForm={_setFieldsForm}
          />
      }

      {/* Editar Datos de Exploracion Fisica */}
      {(!_new && _edit)&&
          <EditPhysicalExploration
              global={global}
              actions={actions}
              editPhysicalExploration={editPhysicalExploration}
              fields={fields}
              editLoading={editLoading}
              setEditData={setEditData}
              setEdit={setEdit}
              fieldsForm={fieldsForm}
              setFieldsForm={_setFieldsForm}
          />
      }
      
    </MDBContainer>
  );
}

export default PhysicalExploration;