import React, { Component } from "react";
import {   MDBContainer, MDBCol, MDBRow, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import { Redirect } from 'react-router'
import List from './List'
import Details from './Details'

import moment from 'moment';

import { API, graphqlOperation } from 'aws-amplify';

import { onCreateMedicalAppointment, onUpdateMedicalAppointment } from './../../graphql/subscriptions';

import { updateMedicalAppointment, createRejection, createNotification } from './../../graphql/mutations';
import { listMedicalAppointments } from './../../graphql/custom-queries';

class MedicalAppointmentsManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItemClassicTabs1: "1",
      activeItemClassicTabs2: "1",
      redirect: false,
      appointments: null,
      ItemData: null,
      selectedItem: null,
      insertedAppointments: null,
      approvedAppointments: null,
      confirmedAppointments: null,
      presentAppointments: null,
      inProcessAppointments: null,
      finishedAppointments: null,
      rejectedAppointments: null,
      canceledAppointments: null,
    };

    this._isMounted = false;

    this.changeState = this.changeState.bind(this);
    this.GetAppointmentsList = this.GetAppointmentsList.bind(this);
    this.ActiveElement = this.ActiveElement.bind(this);
    this.updateMedicalAppointmentData = this.updateMedicalAppointmentData.bind(this);
    this.updateFieldFromAppointments = this.updateFieldFromAppointments.bind(this);
    this.createRejection = this.createRejection.bind(this);
  }

  changeState(event, tab){
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({ activeItemClassicTabs1: tab, activeItemClassicTabs2: tab})
      this.setState({ItemData: null, selectedItem: null});
      this.GetAppointmentsList();
    }
  }

  ActiveElement = (item, i) => {
    //el problema del cambio de item es por es state
    this.setState({ItemData: item, selectedItem: i});
  }

  componentDidMount = async () => {
    this._isMounted = true;
    this.redirect();

    //suscripcion para ingresos de consulta
    this.subscription = API.graphql(
      graphqlOperation(onCreateMedicalAppointment, {
        doctorname: this.props.childProps.state.doctorusername,
        secretary: this.props.childProps.state.secretary,
      })
    ).subscribe({
      next: MedicalConsultation => {
        const consultation = MedicalConsultation.value.data.onCreateMedicalAppointment

        if (this.state.appointments !== null) {
          const appointments = [
            ...this.state.appointments.filter(r => {
              return (
                r.id !== consultation.id
              )
            }),
            consultation
          ]
          this.setState({ appointments });
          this.SetAppointmentsList();
        }
      }
    })
    
    //suscripcion para modificaciones de consulta | se decidio no utilizar esta suscripcion porque hay otra forma de hacerlo que evita consumir este servicio
    this.subscription = API.graphql(
      graphqlOperation(onUpdateMedicalAppointment, {
        read_client: true,
        read_secretary: false,
        read_doctor: false,
        doctorname: this.props.childProps.state.doctorusername,
        secretary: this.props.childProps.state.secretary,
      })
    ).subscribe({
      next: MedicalConsultation => {
        const consultation = MedicalConsultation.value.data.onUpdateMedicalAppointment
        if (this.state.appointments !== null) {
          this.state.appointments.splice(this.state.appointments.findIndex(v => v.id === consultation.id), 1);
        
          const appointments = [
            ...this.state.appointments.filter(r => {
              return (
                r.id !== consultation.id
              )
            }),
            consultation
          ]
          
          this.setState({ appointments });
          this.SetAppointmentsList();
        }
      }
    })
  }

  redirect = () => {
    if(this.props.childProps.state.user_roll === 'client'){
          this.setState({ redirect: true });
    }
    if (this.state.appointments === null) {
      this.GetAppointmentsList(); 
    }
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
    this._isMounted = false;
  }

  GetAppointmentsList = () => {
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    API.graphql(graphqlOperation(listMedicalAppointments, {
      filter: {
        or: [
          {date_created: {gt: String(moment(prev_date).format('YYYY-MM-DDTHH:mm:ss.SSS'))}}, 
          {date_created: {eq: String(moment(prev_date).format('YYYY-MM-DDTHH:mm:ss.SSS'))}},
        ]
      },
      limit: 100
    })).then( result =>{
        
        this.setState({appointments: result.data.listMedicalAppointments.items});
        this.SetAppointmentsList();

    }).catch( err => {
        console.warn(err)
    });
  }

  SetAppointmentsList = () => {
    const items = this.state.appointments;

    let insertedAppointments = items.filter(obj => {return obj.state === "INSERTED"})
    let approvedAppointments = items.filter(obj => {return obj.state === "APPROVED"})
    let confirmedAppointments = items.filter(obj => {return obj.state === "CONFIRMED"})
    let presentAppointments = items.filter(obj => {return obj.state === "PRESENT"})
    let inProcessAppointments = items.filter(obj => {return obj.state === "IN_PROCESS"})
    let finishedAppointments = items.filter(obj => {return obj.state === "FINISHED"})
    let rejectedAppointments = items.filter(obj => {return obj.state === "REJECTED"})
    let canceledAppointments = items.filter(obj => {return obj.state === "CANCELED"})

    this.setState(
      { 
        insertedAppointments: insertedAppointments,
        approvedAppointments: approvedAppointments,
        confirmedAppointments: confirmedAppointments,
        presentAppointments: presentAppointments,
        inProcessAppointments: inProcessAppointments,
        finishedAppointments: finishedAppointments,
        rejectedAppointments: rejectedAppointments,
        canceledAppointments: canceledAppointments
      })
  }

  updateMedicalAppointmentData = async (object, update) =>{
    await API.graphql(graphqlOperation(updateMedicalAppointment, {input: object}))
    .then( result =>{
      this.updateFieldFromAppointments(object, update);
    });
  }

  updateFieldFromAppointments = (object, update) => {
    switch(update) {
        case 'read':
            if (this.props.childProps.state.user_roll === 'doctor') {
              const read_doctor = object.read_doctor
              this.setState({
                appointments: this.state.appointments.map(el => (el.id === object.id ? Object.assign({}, el, { read_doctor }) : el))
              });
            }else if (this.props.childProps.state.user_roll === 'secretary') {
              const read_secretary = object.read_secretary
              this.setState({
                appointments: this.state.appointments.map(el => (el.id === object.id ? Object.assign({}, el, { read_secretary }) : el))
              }); 
            }
            this.SetAppointmentsList();
            break;
        case 'state':
            const state = object.state
            this.setState({
              appointments: this.state.appointments.map(el => (el.id === object.id ? Object.assign({}, el, { state }) : el))
            });
            this.SetAppointmentsList();
            this.setState({ItemData: null, selectedItem: null});
            break;  
        default:
            break;
    }
  }

  createRejection = async (object) => {
    await API.graphql(graphqlOperation(createRejection, {input: object}))
    .then( result =>{
      //this.updateFieldFromAppointments(object, update);
    });
  }

  createNotification = async (object) => {
    await API.graphql(graphqlOperation(createNotification, {input: object}))
    .then( result =>{
      //this.updateFieldFromAppointments(object, update);
    });
  }

  render() {
    const {redirect, ItemData, selectedItem} = this.state

    const insertedAppointments = {selectedItem: selectedItem, data: this.state.insertedAppointments}
    const approvedAppointments = {selectedItem: selectedItem, data: this.state.approvedAppointments}
    const confirmedAppointments = {selectedItem: selectedItem, data: this.state.confirmedAppointments}
    const presentAppointments = {selectedItem: selectedItem, data: this.state.presentAppointments}
    const inProcessAppointments = {selectedItem: selectedItem, data: this.state.inProcessAppointments}
    const finishedAppointments = {selectedItem: selectedItem, data: this.state.finishedAppointments}
    const rejectedAppointments = {selectedItem: selectedItem, data: this.state.rejectedAppointments}
    const canceledAppointments = {selectedItem: selectedItem, data: this.state.canceledAppointments}

    return (
      <MDBContainer className="classic-tabs">
          <MDBNav classicTabs color="cyan" className="mt-5">
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "1" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "1")
              }} >
                ingresadas
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "2" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "2")
              }} >
                aprobadas
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "3" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "3")
              }} >
                confirmadas
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "4" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "4")
              }} >
                Presente
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "5" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "5")
              }} >
                En proceso
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "6" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "6")
              }} >
                Finalizada
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "7" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "7")
              }} >
                Rechazadas
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#" className={ this.state.activeItemClassicTabs1 === "8" ? "active" : "" } onClick={(e) => {
                  this.changeState(e, "8")
              }} >
                Canceladas
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent
            className="card mb-5"
            activeItem={this.state.activeItemClassicTabs2}
          >
            <MDBTabPane tabId="1">
              <MDBContainer>
                  <MDBRow>
                    <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                      <List Appointments={insertedAppointments}
                            childProps={this.props.childProps}
                            ActiveElement={this.ActiveElement}
                            updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                    </MDBCol>
                    <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                      <Details ItemData={ItemData}
                               updateMedicalAppointmentData={this.updateMedicalAppointmentData}
                               createRejection={this.createRejection}/>
                    </MDBCol>
                  </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="2">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={approvedAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}
                             createNotification={this.createNotification}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="3">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={confirmedAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="4">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={presentAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="5">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={inProcessAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="6">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={finishedAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="7">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={rejectedAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
            <MDBTabPane tabId="8">
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="9" lg="4" xl="5" className="mx-auto mt-3">
                    <List Appointments={canceledAppointments}
                          childProps={this.props.childProps}
                          ActiveElement={this.ActiveElement}
                          updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                  <MDBCol md="9" lg="6" xl="7" className="mx-auto mt-3">
                    <Details ItemData={ItemData}
                             updateMedicalAppointmentData={this.updateMedicalAppointmentData}/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBTabPane>
          </MDBTabContent>
          {
              (redirect) &&
              <Redirect to='/profile'/>
          }
        </MDBContainer>
    );
  }
}

export default MedicalAppointmentsManagement;