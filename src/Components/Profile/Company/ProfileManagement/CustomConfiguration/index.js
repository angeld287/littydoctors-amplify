import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCol, MDBRow } from
'mdbreact';
import Card from './Card'

import Module from './Module';

import { API, graphqlOperation } from 'aws-amplify';

import { getModule, listDoctorCustomFieldPropss } from './../../../../../graphql/queries';

class ModalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OpenModal: false,
            item: null,
            fields: null,
            module: null,
        }
        this.toggleOpen = this.toggleOpen.bind(this)
        this.toggleClose = this.toggleClose.bind(this)
    }

toggleOpen = (item) => {
    this.GetModuleDetails(item)
}

GetModuleDetails = (item) => {
  API.graphql(graphqlOperation(getModule, {id: item.module_id})).then( result =>{
      const fieldsCharged = result.data.getModule.fields.items;
      this.setState({item: item, OpenModal: true, fields: fieldsCharged})
  })
}

toggleClose = () => {
    this.setState({item: null, OpenModal: false})
}
 

render() {
    const { item, CustomPropsfields } = this.state;

    const fields = this.state.fields;
    const name = (item != null) ? item.name : "no data"

    const childProps = {
      ...this.props.childProps,
      fields
    }

  return (
      <MDBContainer>
        <Card childProps={this.props.childProps} toggleOpen={this.toggleOpen}/>

        <MDBModal isOpen={this.state.OpenModal} toggle={this.toggleClose} fullHeight position="top">
          <MDBModalHeader toggle={this.toggleClose}>{name}</MDBModalHeader>

          <MDBModalBody>
            <MDBContainer fluid className="text-white">
                <Module childProps={childProps} toggleClose={this.toggleClose}/>
            </MDBContainer>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;