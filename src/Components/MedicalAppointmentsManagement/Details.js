import React, {Component} from 'react';
import {
MDBCard, MDBBtn,
MDBRow, MDBContainer, MDBNavItem, MDBNavLink, MDBNav, MDBTabContent, MDBTabPane, MDBCol, MDBInput, MDBIcon,
MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";

import moment from 'moment';

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value
  });

class Details extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            modal: false,
            data: null,
            activeItemClassicTabs1: "1",
            activeItemClassicTabs2: "1",
            insertedCost: null,
            rejectionReason: null,
        };

        this.changeTab = this.changeTab.bind(this);
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal,
          rejectionReason: null
        });
    }

    changeTab(event, tab){
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.
    
        if (this.state.activeItemClassicTabs1 !== tab) {
          this.setState({ activeItemClassicTabs1: tab, activeItemClassicTabs2: tab})
        }
      }
    
    changeState = (id, state) =>{
        if (state === "FINISHED") {
            if(this.state.insertedCost === "" || this.state.insertedCost === null){
                alert("debe ingregar el costo")
            }else{
                this.props.updateMedicalAppointmentData({id: id, state: state}, "state");
            }
        }else{
            this.props.updateMedicalAppointmentData({id: id, state: state}, "state");
        }
    }

    createRejection = (id, patient, doctor, secretary) => {
        const patientPhoneId = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.phone_id) : (null);
        const object = {
                        medicalAppointmentRejectionId: id,
                        description: this.state.rejectionReason,
                        doctor: doctor,
                        secretary: secretary,
                        patient: patient,
                        createdAt: String(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')),
                    }
        const notification = {
                        consultation_id: id,
                        to: patientPhoneId,
                        title: "Rechazo de Consulta",
                        message: "Verifique la razon de rechazo",
                    };

        this.props.createRejection(object)
        this.changeState(id, "REJECTED")
        this.setState({rejectionReason: null})
        this.sendNotifications(notification);
        this.toggle()
    }

    createNotification = (id, patient, doctor, secretary, state) => {
        const patientPhoneId = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.phone_id) : (null);
        const consult_date = (this.props.ItemData !== null) ? (this.props.ItemData.date_of_medical_appointment) : (null);
        const date = moment(consult_date).format('YYYY-DD-MM')
        const object = {
                        medicalAppointmentNotificationId: id,
                        state: state,
                        doctor: doctor,
                        secretary: secretary,
                        patient: patient,
                        createdAt: String(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')),
                    }
        this.props.createNotification(object)
        const notification = {
            consultation_id: id,
            to: patientPhoneId,
            title: "Confirmar Consulta",
            message: "Favor confirmar su consulta medica para la fecha "+date ,
        };
        this.sendNotifications(notification);
    }

    sendNotifications = (object) => {
        fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyBnmavsrltI_zvcP8kmZVpwr8fS0e95fQY'
                },
                body: JSON.stringify({
                        to: object.to,
                        notification: {
                            title: object.title,
                            body: object.message,
                            sound: 'default',
                        },
                        data: {
                            consult_id: object.consultation_id,
                        }
                    })
            }).then((r) => r.json()).then().catch((err) => { // Error response
                console.log(err);
            });
        
    }

    render(){

        const insertedcost = (this.state.insertedCost !== null) ? (this.state.insertedcost) : ("")
        const rejectionReason = (this.state.rejectionReason !== null) ? (this.state.rejectionReason) : ("")
        const patientName = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.name) : (null);
        const consult_details = (this.props.ItemData !== null) ? (this.props.ItemData.details) : (null);
        const id = (this.props.ItemData !== null) ? (this.props.ItemData.id) : (null);
        const consult_date = (this.props.ItemData !== null) ? (this.props.ItemData.date_of_medical_appointment) : (null);
        const patientUserName = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.username) : (null);
        const patientPhone = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.phone) : (null);
        const patientEmail = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.email) : (null);
        const patientPhoneId = (this.props.ItemData !== null && this.props.ItemData.patient !== null) ? (this.props.ItemData.patient.phone_id) : (null);
        const mutation_date = moment((this.props.ItemData !== null) ? (this.props.ItemData.date_created) : (null)).format('DD-MM HH:mm');
        const consult_cost = (this.props.ItemData !== null) ? (this.props.ItemData.consult_cost) : (0);
        const state = (this.props.ItemData !== null) ? (this.props.ItemData.state) : (null);

        const doctorUserName = (this.props.ItemData !== null) ? (this.props.ItemData.doctorname) : (null);
        const secretaryUserName = (this.props.ItemData !== null) ? (this.props.ItemData.secretary) : (null);

        const rejections = (this.props.ItemData !== null && this.props.ItemData.rejection.items !== null) ? (this.props.ItemData.rejection.items) : (null);
        const notifications = (this.props.ItemData !== null && this.props.ItemData.notification.items !== null) ? (this.props.ItemData.notification.items) : (null);

        const details = "Detalle de Consulta: "+ consult_details;
        const cost = "Costo: "+ consult_cost +" RD$";
        const date = "Fecha: "+ moment(consult_date).format('YYYY-DD-MM')

        const aprove =  (this.props.ItemData !== null && this.props.ItemData.state === "INSERTED") ? (true) : (false);
        const confirm = false;//(this.props.ItemData !== null && this.props.ItemData.state === "APPROVED") ? (true) : (false);
        const reject = (this.props.ItemData !== null && this.props.ItemData.state === "INSERTED") ? (true) : (false);
        const present = (this.props.ItemData !== null && this.props.ItemData.state === "CONFIRMED") ? (true) : (false);
        const inProcess = (this.props.ItemData !== null && this.props.ItemData.state === "PRESENT") ? (true) : (false);
        const finalize = (this.props.ItemData !== null && this.props.ItemData.state === "IN_PROCESS") ? (true) : (false);
        const cancel = (this.props.ItemData !== null && (this.props.ItemData.state === "CONFIRMED" || this.props.ItemData.state === "INSERTED" || this.props.ItemData.state === "APPROVED")) ? (true) : (false);
        const notify = (this.props.ItemData !== null && this.props.ItemData.state === "APPROVED") ? (true) : (false);

        const finlizeDisabled = (insertedcost === "") ? (true) : (false)
        //const secretary = (patientName === null) ? (null) : (patientName); {moment(date).format('YYYY-DD-MM')}

        const rejectionsList = (rejections !== null && rejections !== undefined)?([].concat(rejections)
            //.sort((a, b) => new Date(...a.date_created.split('-').reverse()) - new Date(...b.date_created.split('-').reverse()))
            .map((item,i)=> 
                <tr key={i}>
                    <td>
                        {moment(item.createdAt).format('DD-MM-YYYY HH:mm')}
                    </td>
                    <td>
                        {item.description}
                    </td>
                </tr>
            )):(<tr></tr>)

        const notificationsList = (notifications !== null && notifications !== undefined)?([].concat(notifications)
            //.sort((a, b) => new Date(...a.date_created.split('-').reverse()) - new Date(...b.date_created.split('-').reverse()))
            .map((item,i)=> 
                <tr key={i}>
                    <td>
                        {moment(item.createdAt).format('DD-MM-YYYY HH:mm')}
                    </td>
                    <td>
                        {item.state}
                    </td>
                </tr>
            )):(<tr></tr>)

        return (
            <MDBContainer>
              <MDBRow center>
                <MDBCard className="card w-100 mb-5">
                    <MDBNav color="grey">
                        <MDBNavItem>
                            <MDBNavLink to="#" style={{height: 20}} className={ this.state.activeItemClassicTabs1 === "1" ? "active" : "" } onClick={(e) => {
                                this.changeTab(e, "1")
                            }} >
                                Cita
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" style={{height: 20}} className={ this.state.activeItemClassicTabs1 === "2" ? "active" : "" } onClick={(e) => {
                                this.changeTab(e, "2")
                            }} >
                                Rechazos
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" style={{height: 20}} className={ this.state.activeItemClassicTabs1 === "3" ? "active" : "" } onClick={(e) => {
                                this.changeTab(e, "3")
                            }} >
                                Notificaciones
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent
                        activeItem={this.state.activeItemClassicTabs2}
                    >
                        <MDBTabPane tabId="1">
                            <MDBContainer>
                                <h5 className="h5-responsive font-weight-bold text-center">
                                    Paciente: {patientName}
                                </h5>
                                <MDBRow>
                                    <MDBCol md="9" className="md-0 mb-5">
                                    <form>
                                        <MDBRow>
                                        <MDBCol md="6">
                                            <div className="md-form mb-0">
                                            <MDBInput disabled type="text" id="contact-name" label={date} />
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <div className="md-form mb-0">
                                                
                                                <MDBInput
                                                    type="number"
                                                    disabled={!finalize}
                                                    label={cost}
                                                    value={insertedcost}
                                                    onChange={event => this.setState(updateByPropertyName("insertedCost", event.target.value))}
                                                />
                                            </div>
                                        </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                        <MDBCol md="12">
                                            <div className="md-form mb-0">
                                            <MDBInput
                                                type="textarea"
                                                id="contact-message"
                                                disabled
                                                label={details}
                                            />
                                            </div>
                                        </MDBCol>
                                        </MDBRow>
                                    </form>
                                    </MDBCol>
                                    <MDBCol md="3" className="text-center">
                                        <ul className="list-unstyled mb-0">
                                            <li>
                                                <small>Fecha de Creacion o Modificacion:</small>
                                                <div>
                                                    <small> {mutation_date}</small>
                                                </div>
                                            </li>
                                            <li>
                                                <MDBIcon icon="phone" size="1x" className="blue-text mt-4" />
                                                <div>
                                                    <small>{patientPhone}</small>
                                                </div>
                                            </li>
                                            <li>
                                                <MDBIcon icon="envelope" size="1x" className="blue-text mt-4" />
                                                <div>
                                                    <small>{patientEmail}</small>
                                                </div>
                                            </li>
                                        </ul>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    {aprove &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                        e.preventDefault();
                                                        const object = {
                                                            consultation_id: id,
                                                            to: patientPhoneId,
                                                            title: "Consulta Aprobada",
                                                            message: "Su consulta ha sido aprobada para la "+date ,
                                                        };
                                                        this.changeState(id, "APPROVED")
                                                        this.sendNotifications(object);
                                                    }}>

                                                Aprobar
                                            </MDBBtn>
                                        </div>
                                    }

                                    {confirm &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={this.sendNotifications}>
                                                Confirmar
                                            </MDBBtn>
                                        </div>
                                    }
                                    
                                    {reject &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.toggle()
                                                    }}>
                                                Rechazar
                                            </MDBBtn>
                                        </div>
                                    }

                                    {present &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                        e.preventDefault()
                                                        this.changeState(id, "PRESENT")
                                                    }}>
                                                Paciente Presente
                                            </MDBBtn>
                                        </div>
                                    }

                                    {inProcess &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                        e.preventDefault()
                                                        this.changeState(id, "IN_PROCESS")
                                                    }}>
                                                Poner en Proceso
                                            </MDBBtn>
                                        </div>
                                    }
                                    
                                    {finalize &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn disabled={finlizeDisabled} color="primary" size="md" onClick={(e) => {
                                                e.preventDefault()
                                                this.changeState(id, "FINISHED")
                                            }}>
                                                Finalizar
                                            </MDBBtn>
                                        </div>
                                    }
                                    
                                    {cancel &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                        e.preventDefault()
                                                        this.changeState(id, "CANCELED")
                                                    }}>
                                                Cancelar
                                            </MDBBtn>
                                        </div>
                                    }

                                    {notify &&
                                        <div className="text-center text-md-left">
                                            <MDBBtn color="primary" size="md" onClick={(e) => {
                                                            e.preventDefault()
                                                            this.createNotification(id, patientUserName, doctorUserName, secretaryUserName, state)
                                                        }}>
                                                Notificar Confirmacion
                                            </MDBBtn>
                                        </div>
                                    }
                                </MDBRow>
                            </MDBContainer>
                        </MDBTabPane>
                        <MDBTabPane tabId="2">
                            <MDBContainer>
                                <MDBTable scrollY maxHeight="400px">
                                    <MDBTableHead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Rezon de Rechazo</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {rejectionsList}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBContainer>
                        </MDBTabPane>
                        <MDBTabPane tabId="3">
                            <MDBContainer>
                                <MDBTable scrollY maxHeight="400px">
                                    <MDBTableHead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {notificationsList}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBContainer>
                        </MDBTabPane>
                    </MDBTabContent>
                </MDBCard>
              </MDBRow>
              <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>Razon de Rechazo</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput type="textarea" label="Describe la razon por la que se rechaza la solicitud" rows="5" 
                              onChange={event => this.setState(updateByPropertyName("rejectionReason", event.target.value))} 
                              value={rejectionReason}/>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Cancelar</MDBBtn>
                    <MDBBtn color="primary" onClick={(e) => {
                                e.preventDefault()
                                this.createRejection(id, patientUserName, doctorUserName, secretaryUserName)
                            }}>
                                Rechazar
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            </MDBContainer>
        );
    }
}

export default Details;