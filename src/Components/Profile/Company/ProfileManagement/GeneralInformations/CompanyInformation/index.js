import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBAlert } from "mdbreact";

import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";

import { API, graphqlOperation } from "aws-amplify";

import { updateConsultingRoom } from '../../../../../../graphql/mutations';
import useCompany from './useCompany'

const CompanyInformation = ({ company: company }) => {


    const { NoSecretary, error, userExist, setSecretary, secretary, AddSecretary} = useCompany()


    const _noSecretary = (company.secretary === 'dummy' && NoSecretary === true)

    const data = String(company.location);
    const locationUrl = data.split(' ').join('%20');
    const mapUrl = "https://maps.google.com/maps?q="+locationUrl+"&t=&z=18&ie=UTF8&iwloc=&output=embed";
    

    return (
      <section className="my-5">
        <MDBRow>
          <MDBCol lg="5" className="lg-0 mb-4">
            <MDBCard>
              <MDBCardBody>
                <div className="form-header blue accent-1">
                  <h3 className="mt-2">
                    {/* <MDBIcon icon="envelope" /> */} Informacion General
                  </h3>
                </div>
               {
                 _noSecretary && 
                 <div className="md-form">
                   <MDBCard>
                     <MDBCardBody>
                       <MDBInput
                         label="Secretaria"
                         value={secretary} 
                         onChange={event => setSecretary(event.target.value)}
                         iconClass="grey-text"
                         type="text"
                         id="form-email"
                       />
                       <p className="dark-grey-text">
                         digite el nombre de usuario de la secretaria
                       </p>
                       {userExist === false && <MDBAlert color="danger">Nombre de usuario no existe. Verifique el nombre e intente de nuevo</MDBAlert>}
                       <MDBBtn onClick={() => AddSecretary(company)}>
                         Agregar Secretaria
                       </MDBBtn>
                     </MDBCardBody>
                   </MDBCard>
                 </div>
               }
               {!_noSecretary &&
                <div>
                  <div className="md-form">
                    <MDBInput
                      icon="user-md"
                      label={company.doctorname}
                      iconClass="grey-text"
                      type="text"
                      disabled
                      id="form-email"
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="stethoscope"
                      label={company.speciality}
                      iconClass="grey-text"
                      type="text"
                      disabled
                      id="form-email"
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="user-nurse"
                      label={company.secretary}
                      iconClass="grey-text"
                      type="text"
                      disabled
                      id="form-subject"
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="location-arrow"
                      label={company.location}
                      iconClass="grey-text"
                      type="textarea"
                      disabled
                      id="form-text"
                    />
                  </div>
                </div>
               }
                {/* <div className="text-center">
                  <MDBBtn color="light-blue">Submit</MDBBtn>
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="7">
            <div
              id="map-container"
              className="rounded z-depth-1-half map-container"
              style={{ height: "400px" }}
            >
              {/* <FancyComponent childProps={this.props.childProps}/> */}
              <iframe
                src={mapUrl}
                title="This is a unique title"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
              />
            </div>
            <br />
            <MDBRow className="text-center">
              {/* <MDBCol md="4">
                <MDBBtn tag="a" floating color="blue" className="accent-1">
                  <MDBIcon icon="phone" />
                </MDBBtn>
                <p>+ 01 234 567 89</p>
                <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
              </MDBCol> */}
              <MDBCol md="6">
                <MDBBtn tag="a" floating color="blue" className="accent-1">
                  <MDBIcon icon="envelope" />
                </MDBBtn>
                <p>{company.email}</p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
    );
}

export default CompanyInformation;