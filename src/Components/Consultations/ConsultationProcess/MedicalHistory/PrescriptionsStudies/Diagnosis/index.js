import React from 'react';
import { MDBContainer, MDBSpinner, MDBBox } from "mdbreact";

import useDiagnosis from './useDiagnosis';
import ViewDiagnosis from './ViewDiagnosis';
import NewDiagnosis from './NewDiagnosis';
import EditDiagnosis from './EditDiagnosis';

const Diagnosis = ({
    global: global,
    setGlobalData: setGlobalData
}) => {
  const { actions, setNew, _new , _edit, setEdit, editLoading, fields, api, loading} = useDiagnosis(global, setGlobalData);


  if (loading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5 mb-3"><MDBSpinner big/></MDBBox></MDBContainer>)
  
  return (
    <MDBContainer>
    <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Diagnostico</strong></h6>
      {/* Crear Datos de Exploracion Fisica */}
      {(_new && !_edit)&&
          <NewDiagnosis
              global={global}
              setGlobalData={setGlobalData}
              actions={actions}
              setNew={setNew}
              api={api}
          />
      }

      {/* Mostrar Datos de Exploracion Fisica */}
      {(!_new && !_edit)&&
          <ViewDiagnosis
              global={global}
              setGlobalData={setGlobalData}
              setEdit={setEdit}
              editLoading={editLoading}
              api={api}
          />
      }

      {/* Editar Datos de Exploracion Fisica */}
      {(!_new && _edit)&&
          <EditDiagnosis
              global={global}
              setGlobalData={setGlobalData}
              fields={fields}
              editLoading={editLoading}
              api={api}
              setEdit={setEdit}
          />
      }
      
    </MDBContainer>
  );
}

export default Diagnosis;