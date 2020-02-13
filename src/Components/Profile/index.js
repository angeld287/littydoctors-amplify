import React, { Component } from 'react';

import ClientUserProfile from './Client/ClientProfile';
import CompanyUserProfile from './Company';

class Profile extends Component {



  render() {
    
    return (
      <div>
        {this.props.childProps.state.user_roll === 'doctor' && <CompanyUserProfile childProps={this.props.childProps}/>} 
        {this.props.childProps.state.user_roll === 'secretary' && <h5>You have no access to the profile</h5> }
        {this.props.childProps.state.user_roll === 'client' && <ClientUserProfile childProps={this.props.childProps}/> }
      </div>
      )
    }
}

export default Profile;