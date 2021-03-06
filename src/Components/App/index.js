import React, { Component } from 'react';

import { MDBBox, MDBSpinner } from "mdbreact";

import HeaderLinks from '../HeaderLinks';

import {Routes} from '../Routes';

import { listConsultingRoomsSecretary, listConsultingRooms, listPatientsForAppjs } from '../../graphql/custom-queries';

import {API, graphqlOperation, Auth} from 'aws-amplify';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authState: {
        isLoggedIn: false,
        error: false,
      },
      username: null,
      loading: true
    };

    this._isMounted = false;
  }

  componentWillMount = () => {
    //this.handleUserSignIn();
    this._isMounted = true;
    this.GetCompanyUserProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  GetCompanyUserProfile = () => {
    Auth.currentSession().then(data => {
      const roll = data.accessToken.payload['cognito:groups'][0];
      this.setState({user_roll: roll, authState: { isLoggedIn: true }});
      if (roll === 'doctor') {
        API.graphql(graphqlOperation(listConsultingRooms)).then( async (result) =>{
          if(result.data.listConsultingRooms.items.length > 0) {
            this.setState({
                id: result.data.listConsultingRooms.items[0].id,
                doctorid: result.data.listConsultingRooms.items[0].doctor.id,
                doctorname: result.data.listConsultingRooms.items[0].doctor.name,
                doctorusername: result.data.listConsultingRooms.items[0].doctor.username,
                specialities: result.data.listConsultingRooms.items[0].doctor.specialities.items,
                subspecialities: result.data.listConsultingRooms.items[0].doctor.subspecialities.items,
                sssec: result.data.listConsultingRooms.items[0].doctor.subspecialitiessec.items,
                image: result.data.listConsultingRooms.items[0].doctor.image,
                email: result.data.listConsultingRooms.items[0].doctor.email,
                location: result.data.listConsultingRooms.items[0].location.name,
                secretary: result.data.listConsultingRooms.items[0].secretary,
                loading: false,
                username: data.accessToken.payload.username
            });
          }else{
            const user = await Auth.currentUserInfo();
            
            this.setState({
              username: user.username,
              email: user.attributes.email,
              phonenumber: user.attributes.phone_number,
              name: user.attributes.name,
              loading: false,
            })
          }
          
        }).catch( err => {
          this.setState({
              error: true,
              loading: false,
          });
          console.log(err);
        });

      }else if(roll === 'secretary'){
        API.graphql(graphqlOperation(listConsultingRoomsSecretary,{
          filter:{
            secretary:{
              contains: this.state.username
            }
          }
        })).then( result =>{
            this.setState({
                id: result.data.listConsultingRooms.items[0].id,
                doctorid: result.data.listConsultingRooms.items[0].doctor.id,
                doctorname: result.data.listConsultingRooms.items[0].doctor.name,
                doctorusername: result.data.listConsultingRooms.items[0].doctor.username,
                specialities: result.data.listConsultingRooms.items[0].doctor.specialities.items,
                subspecialities: result.data.listConsultingRooms.items[0].doctor.subspecialities.items,
                sssec: result.data.listConsultingRooms.items[0].doctor.subspecialitiessec.items,
                image: result.data.listConsultingRooms.items[0].doctor.image,
                email: result.data.listConsultingRooms.items[0].doctor.email,
                location: result.data.listConsultingRooms.items[0].location.name,
                secretary: result.data.listConsultingRooms.items[0].secretary,
                loading: false,
                username: data.accessToken.payload.username,
            });
        }).catch( err => {
          this.setState({
              error: true,
              loading: false,
          });
          console.log('There was an error: ' + err);
        });
      }
      else if(roll === 'client'){
        API.graphql(graphqlOperation(listPatientsForAppjs)).then( result =>{
            this.setState({
                username: result.data.listPatients.items[0].username,
                email: result.data.listPatients.items[0].email,
                phonenumber: result.data.listPatients.items[0].phone,
                name: result.data.listPatients.items[0].name,
                patientid: result.data.listPatients.items[0].id,
                approved_terms_conditions: result.data.listPatients.items[0].approved_terms_conditions,
                loading: false,
            });
        }).catch( err => {
          this.setState({
              error: true,
              loading: false,
          });
          console.log('There was an error: ' + err);
        });
      }
      else if(roll === 'admin'){
        this.setState({
            loading: false,
            error: false,
        });
      }
    }).catch(err => {
      console.log('There was an error: ' + err);
      this.setState({
        error: true,
        loading: false,
      });
    });
  }

  handleUserSignIn = async () => {
    this.setState({ authState: { isLoggedIn: true } });
    const user = await Auth.currentUserInfo();
    
    this.setState({
      username: user.username,
      email: user.attributes.email,
      phonenumber: user.attributes.phone_number,
      name: user.attributes.name,
    })
    
    this.GetCompanyUserProfile();
  };

  handleUserLogOut = () => {
    this.setState({ authState: { isLoggedIn: false } });
  }; 
  
  render() {

    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn,
      onUserLogOut: this.handleUserLogOut,
      state: this.state
    };


    return (
      <div> 
          {!this.state.loading &&
            <div className="App">
              <HeaderLinks childProps={childProps}/>
              <Routes childProps={childProps} />
            </div>
          }
          {this.state.loading &&
            <MDBBox display="flex" justifyContent="center" className="mt-5">
              <MDBSpinner big/>
            </MDBBox>
          }
      </div>
    );
  }
}