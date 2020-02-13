import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';

import { updateDoctorCustomModuleProps, createDoctorCustomModuleProps } from '../../../../../graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';

import { GetDiferenstOfObjects, isObjectEmpty } from '../../../../../Functions/JsonObjects';

class Card extends Component {
    constructor(props) {
        super(props);   

        this.state = {
            listModules: null
        };
    }

    static getDerivedStateFromProps(props, state){
        if(props.childProps.listModules!==state.listModules){
            return { listModules: props.childProps.listModules};
        }
        else return null;
    }

    ActiveOrUnactiveModule = (item) => {
        var ArrayObjects = JSON.parse(localStorage.getItem("Modules"));  
        item.active = !item.active;
        const cloudElem = ArrayObjects.find(ce => ce.module_id ===item.module_id);

        if(item.registred_in_cloud){
            const objectToUpdate = GetDiferenstOfObjects(item, cloudElem);
            if(!isObjectEmpty(objectToUpdate)){
                objectToUpdate.id = item.id;
                API.graphql(graphqlOperation(updateDoctorCustomModuleProps, {input: objectToUpdate}));
            }
        }else{
            const objectToCreate = {
                active: item.active,
                doctorCustomModulePropsModuleId: item.module_id
            };
            API.graphql(graphqlOperation(createDoctorCustomModuleProps, {input: objectToCreate})).then( result =>{ 
                item.id = result.data.createDoctorCustomModuleProps.id
            })
            item.registred_in_cloud = true;
        }

        this.updateLocalData(item);
    }

    updateLocalData = (item) => {
        const listModules = [
          ...this.state.listModules.filter(m => {
            return (
              m.module_id !== item.module_id
            )
          }),
          item
        ]
        
        this.setState({ listModules });
        localStorage.setItem("Modules", JSON.stringify(listModules));
    }

    render(){
        const cards = (this.state.listModules !== null)?([].concat(this.state.listModules)
                .sort((a, b) => {
                    if(a.name > b.name){return 1}
                    if(a.name < b.name){return -1}
                    return 0
                })
                .map((item,i)=> 
                    <MDBCol key={i} md="4">
                        <MDBCard>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>{item.name}</MDBCardTitle>
                                <MDBCardText>
                                    {item.description}
                                </MDBCardText>
                                <MDBRow>
                                    <MDBBtn disabled={!item.active} onClick={(e) => {
                                            e.preventDefault();
                                            this.props.toggleOpen(item);
                                        }}>
                                        Configurar
                                    </MDBBtn>
                                    <MDBInput label="Activo" type="checkbox" id={"checkbox"+i} checked={item.active || false} onChange={() => {this.ActiveOrUnactiveModule(item)}}/>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )):(<h1>No Data</h1>);

        return (
            <MDBRow>
                {cards}
            </MDBRow>
        )
    }
}

export default Card;