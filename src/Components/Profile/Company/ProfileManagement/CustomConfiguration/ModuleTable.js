import React from 'react';
import { MDBInput, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

const ModuleTable = ({childProps: p}) =>{

  return(
    <MDBTable btn fixed>
      <MDBTableHead columns={p.columns} />
      <MDBTableBody rows={p.rows} />
    </MDBTable>
  );
};

export default ModuleTable;