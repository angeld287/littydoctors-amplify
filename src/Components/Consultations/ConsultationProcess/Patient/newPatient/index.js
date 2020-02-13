import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';
import useNewPatient from './useNewPatient';
import { createPatient } from '../../../../../graphql/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';

const NewPatient = (
                      {
                        createConsultation: createConsultation,
                        setCreateNewPatient: setCreateNewPatient,
                        name: _name,
                        childProps: childProps
                      }
                   ) => {

  const { register, setBirthdate, handleSubmit, formState, birthdate, newPatient, errors, loading, setLoading, name, setName } = useNewPatient();

  const onSubmit = (input) => {
        var date = moment(new Date()).format('YYYY-MM-DD');
        var bdate = moment(birthdate).format('YYYY-MM-DD');

        if (bdate === date) {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Fecha de Nacimiento', 'error');
            return
        }else{
            setLoading(true);
            input.birthdate = birthdate;
            API.graphql(graphqlOperation(createPatient, { input: input }))
            .then((r) => {
                createConsultation(childProps.state, r.data.createPatient);
                setLoading(false);
            })
            .catch((err) => { 
                console.log(err);
                setLoading(false);
            })
        }
    }

  return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grey-text">
             <MDBRow>
               <MDBCol>
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="user" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="username" placeholder="Nombre de Usuario" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.username && <span className="text-danger mb-2">{errors.username.message}</span>}
                  </MDBCol>
                </MDBRow>
								<br />
								<MDBRow>
                  <MDBCol md="12">
                    <input name="name" value={(name === null ? _name : name)} onChange={e => {setName(e.target.value)}} placeholder="Nombre Completo" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}
                  </MDBCol>
                </MDBRow>
								<br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="envelope" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="email" placeholder="Email" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.email && <span className="text-danger mb-2">{errors.email.message}</span>}
                  </MDBCol>
                </MDBRow>
								<br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="phone" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="phone" placeholder="Telefono" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.phone && <span className="text-danger mb-2">{errors.phone.message}</span>}
                  </MDBCol>
                </MDBRow>
               </MDBCol>
               <MDBCol>
                 <MDBRow style={{marginLeft: 3}}><MDBIcon icon="birthday-cake" size="2x" style={{marginTop: 20}}/><MDBDatePicker style={{marginLeft: 20}} icon="birthday-cake" getValue={d => setBirthdate(d)} /></MDBRow>
                 <br />
                  <MDBRow>
                    <MDBCol md="1" >
                      <MDBIcon icon="weight" size="2x"/>
                    </MDBCol>
                    <MDBCol md="11">
                      <input name="weight" placeholder="Peso" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                      {errors.weight && <span className="text-danger mb-2">{errors.weight.message}</span>}
                    </MDBCol>
                  </MDBRow>
								<br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="envelope" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="height" placeholder="Altura" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.height && <span className="text-danger mb-2">{errors.height.message}</span>}
                  </MDBCol>
                </MDBRow>
               </MDBCol>
             </MDBRow>
            </div>
            <div className="text-center py-4 mt-3">
                  {loading && <MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}>Agregar</MDBBtn>}
                  {!loading && <MDBSpinner small />}
						</div>
          </form>
         );
}

export default NewPatient;