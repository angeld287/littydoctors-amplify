import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';
import useNewPatient from './useNewPatient';
import { createPatient } from '../../../../../graphql/mutations';
import { listPatients } from '../../../../../graphql/queries';
import moment from 'moment';
import Swal from 'sweetalert2';
import Select from 'react-select';

import { uuidv2 } from '../../../../../Functions/uuid';

import PlacesAutocomplete from 'react-places-autocomplete';

const NewPatient = (
                      {
                        createConsultation: createConsultation,
                        setCreateNewPatient: setCreateNewPatient,
                        name: _name,
                        reason: reason,
                        childProps: childProps
                      }
                   ) => {

  const { CognitoCreateUser, Exist, setMonthAge, age, setAge, register, setBirthdate, handleSubmit, formState, birthdate, newPatient, errors, _loading, _setLoading, name, setName, fields, api, handleSelect, handleChange } = useNewPatient();

  const _setAge = (d) =>{
    const y = moment(new Date()).format('YYYY') - moment(d).format('YYYY');
    const m = moment(new Date()).format('MM') - moment(d).format('MM');
    setAge(calcAge(d));
    setMonthAge(m);

    setBirthdate(d)
  }

  const calcAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }

  const adult = (age > 17);

  const onSubmit = async (input) => {
        //_setLoading(true);
        var date = moment(new Date()).format('YYYY-MM-DD');
        var bdate = moment(birthdate).format('YYYY-MM-DD');
        
        const exist = await Exist(input.username, input.email);

        if(exist.body.cognito.username){
            Swal.fire('Nombre de Usuario Existente', 'Favor agregar otro nombre de usuario, dado que este ya existe', 'error');
            _setLoading(false);
            return
        }

        if(exist.body.cognito.email){
            Swal.fire('Email Existente', 'El email ya esta asociado a una cuenta', 'error');
            _setLoading(false);
            return
        }

        if (bdate >= date) {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Fecha de Nacimiento de forma Correcta', 'error');
            _setLoading(false);
            return
        }

        if (fields.location.location === "") {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Direccion', 'error');
            _setLoading(false);
            return
        }

        if (fields.marital_status.marital_status === "") {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Estado Civil', 'error');
            _setLoading(false);
            return
        }

        if (fields.religion.religion === "") {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Religion', 'error');
            _setLoading(false);
            return
        }

        if (fields.sex.sex === "") {
            Swal.fire('Campo Obligatorio', 'Favor completar el campo Sexo', 'error');
            _setLoading(false);
            return
        }
        
        input.birthdate = birthdate;
        input.address = fields.location.location;
        input.marital_status = fields.marital_status.marital_status;
        input.sex = fields.sex.sex;
        input.patientReligionId = fields.religion.religion;
        if(!adult){input.id_card = null;}
        input.approved_terms_conditions = false;
        input.temporary_password = uuidv2();
        input.code = moment(new Date()).format('YYYYMMDDHHmmSSssss')+"_"+input.username;


        const cognito = await CognitoCreateUser(input);

        if (cognito.body.code === undefined) {
          API.graphql(graphqlOperation(createPatient, { input: input }))
          .then((r) => {
              createConsultation(childProps.state, r.data.createPatient, reason);
          })
          .catch((err) => { 
              console.log(err);
              _setLoading(false);
          })
        }
    }

    const searchOptions = {
        location: new window.google.maps.LatLng(19, -71),
        radius: 2000,
        //types: ['address']
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
                    <input name="username" placeholder="Nombre de Usuario" title="entre 8 y 20 caracteres, no espacios en blanco" pattern="^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
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
                    <input name="email" placeholder="Email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.email && <span className="text-danger mb-2">{errors.email.message}</span>}
                  </MDBCol>
                </MDBRow>
								<br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="phone" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="phone" placeholder="Telefono" autoComplete="off" pattern="^[+]*[0-9]{11}$" title="Agregar (+1) mas el numero telefono. Ej: +18491220022" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.phone && <span className="text-danger mb-2">{errors.phone.message}</span>}
                  </MDBCol>
                </MDBRow>
                <br />
                {adult && 
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="id-card" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <input name="id_card" placeholder="Cedula" autoComplete="off" className="form-control" ref={register({ required: { message: 'Este campo es requerido', value: true } })}/>
                    {errors.id_card && <span className="text-danger mb-2">{errors.id_card.message}</span>}
                  </MDBCol>
                </MDBRow>}
               </MDBCol>
               <MDBCol>
                  <MDBRow style={{marginLeft: 3}}><MDBIcon icon="birthday-cake" size="2x" style={{marginTop: 20}}/><MDBDatePicker style={{marginLeft: 20}} icon="birthday-cake" getValue={d => _setAge(d)} /><div className="">{age+ " Año(s) de Edad"}</div></MDBRow>
                <br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="restroom" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <Select id="sex" options={api.sexs} onChange={ (v) => {fields.sex.setsex(v.value)}} />
                  </MDBCol>
                </MDBRow>
								<br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="book" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <Select id="religion" options={api.religions} onChange={ (v) => {fields.religion.setreligion(v.value)}} />
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="ring" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    <Select id="maritalstatus" options={api.maritalstatus} onChange={ (v) => {fields.marital_status.setmarital_status(v.value)}} />
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol md="1" >
                    <MDBIcon icon="map-marked" size="2x"/>
                  </MDBCol>
                  <MDBCol md="11">
                    


                  <PlacesAutocomplete
                    value={fields.location.location}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    searchOptions={searchOptions}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <MDBInput
                          {...getInputProps({
                            label: 'Direccion donde vive el paciente...',
                            className: "mt-4",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                  </MDBCol>
                </MDBRow>
               </MDBCol>
             </MDBRow>
            </div>
            <div className="text-center py-4 mt-3">
                  {!_loading && <MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}>Agregar</MDBBtn>}
                  {_loading && <MDBSpinner small />}
						</div>
          </form>
         );
}

export default NewPatient;