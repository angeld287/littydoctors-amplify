import React, {Component} from "react";
import { MDBFormInline, MDBModal, MDBBtn, MDBSpinner, MDBBox, MDBModalBody, MDBIcon, MDBModalHeader, MDBFreeBird, MDBInput, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBContainer, MDBEdgeHeader } from
"mdbreact";

import TooltipButton from '../../TooltipButton';
import { API, graphqlOperation, Storage } from "aws-amplify";

import { updatePatient } from '../../../graphql/mutations';

class ClientUserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: this.props.childProps.state.username,
        email: this.props.childProps.state.email,
        phonenumber: this.props.childProps.state.phonenumber,
        name: this.props.childProps.state.name,
        approved_terms_conditions: this.props.childProps.state.approved_terms_conditions === "false" ? false : true,
        loadingTC: false,
        patientid: this.props.childProps.state.patientid,
      }
    }

    openPDF = async () => {
      const file = await Storage.get('LEGAL_DOCUMENTS/TERMS_CONDITIONS.pdf');
      var win = window.open(file, '_blank');
      win.focus();
    }

    onClickRadioTC= async () => {
      this.setState({loadingTC: true});
      const setTC = await API.graphql(graphqlOperation(updatePatient,{input: {id: this.state.patientid, approved_terms_conditions: true}}));
      this.setState({approved_terms_conditions: true, loadingTC: false});
    }

    render(){

      const { username, email, phonenumber, name, approved_terms_conditions, loadingTC } = this.state;

      const showPdf = (<MDBBtn social="slack" floating size="sm" onClick={(ev) => {ev.preventDefault(); this.openPDF()}} ><MDBIcon icon="external-link-alt" size="2x" /></MDBBtn>);

      const TermsConditionsModal = (<MDBModal isOpen={!approved_terms_conditions}>
                                    <MDBModalHeader>Verificacion de Terminos y Condiciones del Paciente</MDBModalHeader>
                                    <MDBModalBody>
                                      {!loadingTC && 
                                        <div>
                                            <MDBFormInline><MDBInput className="mt-4 mb-4" label="Aceptar Terminos y Condiciones" checked={approved_terms_conditions} onChange={this.onClickRadioTC} type="checkbox" id="terms_conditions" /><TooltipButton helperMessage={"Ver Terminos y Condiciones"} component={showPdf} placement="top"></TooltipButton></MDBFormInline>
                                        </div>}
                                      {loadingTC && <MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-3"><MDBSpinner big/></MDBBox></MDBContainer>}
                                    </MDBModalBody>
                                  </MDBModal>);

      return (
        <MDBContainer className="mt-3">
          {TermsConditionsModal}
          <MDBEdgeHeader color="mdb-color darken-2"></MDBEdgeHeader>
          <MDBFreeBird>
            <MDBRow>
              <MDBCol md="8" lg="7" className="mx-auto float-none white z-depth-1 py-2 px-2">
                <MDBCardBody>
                  <MDBCardTitle>{username}</MDBCardTitle>
                  <p className="pb-4">Estamos en proceso de desarrollo de este modulo.</p>
                  <form>
                    <MDBInput readOnly group value={name} type="text" />
                    <MDBInput readOnly group value={email} />
                    <MDBInput readOnly rows="2" value={phonenumber}  />
                  </form>
                  {/* <div className="my-2">
                    <p style={{ fontWeight: "300", fontSize: "0.75rem" }}>Never submit your passwords here</p>
                  </div> */}
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
        </MDBContainer>
      );
    }
};

export default ClientUserProfile;