import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBSpinner, MDBBox,
         MDBCard } from "mdbreact";

import Select from 'react-select';

import TooltipButton from '../../../../../TooltipButton';

const EditPhysicalExploration = ({
    global: global,
    editPhysicalExploration: editPhysicalExploration,
    fields: fields,
    actions: actions,
    editLoading: editLoading,
    setEditData: setEditData,
    setEdit: setEdit,
    fieldsForm: fieldsForm,
    setFieldsForm: setFieldsForm,
}) => {
  
  const [ mm, setmm ] = useState(0);
  const [ hg, sethg ] = useState(0);
  const [ loading, setloading ] = useState(true);
  const [ blood_pressure, setblood_pressure] = useState(fields.blood_pressure.blood_pressure);

  var foo = new Array(500);
  
  const n = [];
  for(var i = 0; i < foo.length; i++){
    n.push({value: i, label: i});
  }

  useEffect(() => {
      let didCancel = false;

      const fetch = async () => {   
          const blood_pressure = global.medicalConsultation.medicalHistory.physicalExploration.vitalsign.blood_pressure;

          const mm = blood_pressure.match(/((.*?)\/[0-9]{1,3})/) !== null ? blood_pressure.match(/((.*?)\/[0-9]{1,3})/)[2] : 0;
          const hg = blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/) !== null ? blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/)[2] : 0;
          setmm(mm);
          sethg(hg);
      };
      
      setFieldsForm(global.regionalExplorationFields, global.medicalConsultation.medicalHistory.physicalExploration === null ? [] : global.medicalConsultation.medicalHistory.physicalExploration.regionalExploration.others.items);
      fetch();
      setloading(false);
      return () => {
          didCancel = true;
      };
  }, []);
  
  const imm = n.findIndex(v => v.value.toString() === mm);
  const ihg = n.findIndex(v => v.value.toString() === hg);
  const fe = global.medicalConsultation.medicalHistory.physicalExploration;

  const vs = fe.vitalsign;
  const re = fe.regionalExploration;

  const savebtn = (<MDBBtn className="btn btn-outline-blue" type="submit" ><MDBIcon icon="save" size="2x" /></MDBBtn>);
  const cancelbtn = (<MDBBtn className="btn btn-outline-blue" onClick={e => {setEdit(false)}} ><MDBIcon icon="times" size="2x" /></MDBBtn>);

  if (loading) {return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner big/></MDBBox></MDBContainer>);}

  return (
    <MDBContainer>
       <form onSubmit={actions.handleSubmit(actions.editPhysicalExploration)}>
            <div className="form-group">
              <label htmlFor="general_exploration">Exploracion General</label>
            </div>
            <textarea defaultValue={fe.general_exploration} name="general_exploration" className="form-control" id="general_exploration" rows="7" ref={actions.register}></textarea>
            <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
            <MDBRow className="mb-3">
              <MDBCol>
                <input defaultValue={vs.breathing} type="number" name="breathing" placeholder="Respiraciones por Minuto" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
              <MDBCol>
                <input defaultValue={vs.pulse} type="number" name="pulse" placeholder="Pulso (Latidos por Segundo)" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol>
                <MDBRow>
                  <MDBCol md="5">
                    <label htmlFor="blood_pressure">Presion de Sangre (mm/Hg):</label>
                    <input name="blood_pressure" hidden value={blood_pressure} onChange={e => {e.preventDefault(); setblood_pressure(e.target.value)}} ref={actions.register}/>
                  </MDBCol>
                  <MDBCol md="3">
                    <Select placeholder="mm" options={n} defaultValue={n[imm]} onChange={ (v) => {
                        setmm(v.value);
                        setblood_pressure(v.value + "/" + hg + " mm/Hg")
                        }}/>
                  </MDBCol>
                  <MDBCol md="0">
                    <h1>/</h1>
                  </MDBCol>
                  <MDBCol md="3">
                    <Select options={n} defaultValue={n[ihg]} placeholder="Hg" onChange={ (v) => {
                        sethg(v.value);
                        setblood_pressure(mm + "/" + v.value + " mm/Hg")
                        }}/>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <input defaultValue={vs.temperature} type="number" name="temperature" placeholder="Temperatura (°F)" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
            </MDBRow>
            <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
            <MDBRow className="mb-3">
              <MDBCol>
                <input defaultValue={re.head} name="head" placeholder="Cabeza" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
              <MDBCol>
                <input defaultValue={re.neck} name="neck" placeholder="Cuello" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol>
                <input defaultValue={re.thorax} name="thorax" placeholder="Torax" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
              <MDBCol>
                <input defaultValue={re.abdomen} name="abdomen" placeholder="Abdomen" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol>
                <input defaultValue={re.members} name="members" placeholder="Miembro" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
              <MDBCol>
                <input defaultValue={re.genitals} name="genitals" placeholder="Genitales" autoComplete="off" className="form-control" ref={actions.register}/>
              </MDBCol>
            </MDBRow>
            <div className="form-group">
              <label htmlFor="others">Exploracion Regional por Especialidad</label>
              <MDBCard>
                <MDBContainer className="m-1">{fieldsForm}</MDBContainer>
              </MDBCard>
            </div>
            <div className="text-center py-4 mt-3">
                {!editLoading && <TooltipButton helperMessage={"Guardar Cambios"} component={savebtn} placement="top"/>}
                {!editLoading && <TooltipButton helperMessage={"Cancelar Cambios"} component={cancelbtn} placement="top"/>}
                {editLoading && <MDBSpinner small />}
            </div>
        </form>
    </MDBContainer>
  );
}

export default EditPhysicalExploration;