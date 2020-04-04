import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBAlert } from "mdbreact";

class CompanyUserProfile extends Component {
    render(){
      const { username, speciality, email, location, stripe_plan_name, croppedImage } = this.props.profileData

      const data = String(location);
      const locationUrl = data.split(' ').join('%20');
      const mapUrl = "https://maps.google.com/maps?q="+locationUrl+"&t=&z=18&ie=UTF8&iwloc=&output=embed";
        return (
            <section className="my-5">
              <MDBRow>
                <MDBCol lg="5" className="lg-0 mb-4">
                  <MDBCard>
                    <MDBCardBody>
                      <div className="form-header blue accent-1">
                        <img src={croppedImage} height="60" width="70" alt="" className="rounded-circle" />
                        <h3 className="mt-2">
                          <MDBIcon icon="user" />   {username}
                        </h3>
                      </div>
                      <div className="md-form">
                        <MDBInput
                          readOnly 
                          value={"Email: " + email}
                          iconClass="grey-text"
                          type="text"
                          id="form-name"
                        />
                      </div>
                      <div className="md-form">
                        <MDBInput
                          readOnly
                          value={"Especialidad: " + speciality}
                          iconClass="grey-text"
                          type="text"
                          id="form-email"
                        />
                      </div>
                      <div className="md-form">
                        <MDBInput
                          readOnly
                          value={"Plan Seleccionado: " + stripe_plan_name}
                          iconClass="grey-text"
                          type="text"
                          id="form-subject"
                        />
                      </div>
                      <div className="md-form">
                        <MDBInput
                          readOnly
                          value={"Ubicacion del Consultorio: " + location}
                          iconClass="grey-text"
                          type="textarea"
                          id="form-text"
                        />
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="7">
                  <div
                    id="map-container"
                    className="rounded z-depth-1-half map-container"
                    style={{ height: "400px" }}
                  >
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
                  {/* <MDBRow className="text-center">
                    <MDBCol md="6">
                      <MDBBtn tag="a" floating color="blue" className="accent-1">
                        <MDBIcon icon="map-marker-alt" />
                      </MDBBtn>
                      <p>{location}</p>
                      <p className="mb-md-0">United States</p>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBBtn tag="a" floating color="blue" className="accent-1">
                        <MDBIcon icon="phone" />
                      </MDBBtn>
                      <p>+ 01 234 567 89</p>
                      <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBBtn tag="a" floating color="blue" className="accent-1">
                        <MDBIcon icon="envelope" />
                      </MDBBtn>
                      <p>{email}</p>
                    </MDBCol>
                  </MDBRow> */}
                </MDBCol>
              </MDBRow>
              {!this.props.profileData.complete && 
              <MDBAlert color="danger" >
                  Some required fields are not completed
              </MDBAlert>}
              {this.props.profileData.backEndError && 
              <MDBAlert color="danger" >
                  There are an application error, please contact your software vendor. {this.props.profileData.error}
              </MDBAlert>}
              
            </section>
          );
    }
  
}

export default CompanyUserProfile;