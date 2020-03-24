import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import usePostConsultationsActivity from './usePostConsultationsActivity';
import ViewPostConsultationsActivity from './ViewPostConsultationsActivity';
import NewPostConsultationsActivity from './NewPostConsultationsActivity';
import EditPostConsultationsActivity from './EditPostConsultationsActivity';

const PostConsultationsActivity = ({
    global: global,
    setGlobalData: setGlobalData
}) => {
  const { actions, setNew, _new , _edit, setEdit, editLoading, fields, editPostConsultationsActivity, api} = usePostConsultationsActivity(global, setGlobalData);

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


  return (
    <MDBContainer>
      {/* Crear Datos de Exploracion Fisica */}
      {(_new && !_edit)&&
          <NewPostConsultationsActivity
              global={global}
              setGlobalData={setGlobalData}
              actions={actions}
              setNew={setNew}
              api={api}
          />
      }

      {/* Mostrar Datos de Exploracion Fisica */}
      {(!_new && !_edit)&&
          <ViewPostConsultationsActivity
              global={global}
              setGlobalData={setGlobalData}
              setEdit={setEdit}
              editLoading={editLoading}
              api={api}
          />
      }

      {/* Editar Datos de Exploracion Fisica */}
      {(!_new && _edit)&&
          <EditPostConsultationsActivity
              fields={fields}
              editLoading={editLoading}
              api={api}
          />
      }
      
    </MDBContainer>
  );
}

export default PostConsultationsActivity;