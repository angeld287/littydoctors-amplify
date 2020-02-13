import React, { Component } from 'react';
import {Container, MDBCard, MDBCol, MDBRow, MDBCardBody, MDBCardTitle} from 'mdbreact';

import ModuleTable from './ModuleTable';

import { MDBInput, MDBBtn } from 'mdbreact';

import { updateDoctorCustomFieldProps, createDoctorCustomFieldProps } from '../../../../../graphql/mutations';
import { listDoctorCustomFieldPropss, listFields } from '../../../../../graphql/queries';
import { GetDiferenstOfObjects, isObjectEmpty } from '../../../../../Functions/JsonObjects';

import { API, graphqlOperation } from 'aws-amplify';


class Module extends Component {
    constructor(props) {
        super(props);   

        this.state = {
            fields: null,
            oldFields: null,
        };

        this.updateField = this.updateField.bind(this);
    }

    componentDidMount = () => {
        this.getFieldsCustomProps();
    }

    updateField = (e, changed_field, id) => {
        const field = this.state.fields.find(f => f.field_id === id);
        this.state.fields.splice(this.state.fields.findIndex(f => f.field_id === id), 1);

        switch (changed_field) {
            case "front_field_name":
                    field.name = e.target.value
                break;
            case "visible":
                    if(field.visible && field.required){
                        field.visible = !field.visible;
                        field.required = !field.required;
                    }else{
                        field.visible = !field.visible;
                    }
                break;
            case "required":
                    field.required = !field.required;
                break;
            default:
                break;
        }
        const nextIndex = this.state.fields.length + 1;
        //this.state.fields.splice(nextIndex, 1, field);
        const oldFields = this.state.oldFields;

        this.setState({fields: [ ...this.state.fields, field]});
    }

    saveChangesToTheCloud = () => {
        var ArrayObjects = JSON.parse(localStorage.getItem("ArrayObjects"));
        this.state.fields.forEach(localelem => {
            const cloudElem = ArrayObjects.find(ce => ce.field_id === localelem.field_id);
            if(localelem.registred_in_cloud){
                const objectToUpdate = GetDiferenstOfObjects(localelem, cloudElem);
                if(!isObjectEmpty(objectToUpdate)){
                    objectToUpdate.id = localelem.id;
                    API.graphql(graphqlOperation(updateDoctorCustomFieldProps, {input: objectToUpdate})).then( result =>{ console.log(result) })
                }
            }else{
                if(!isObjectEmpty(GetDiferenstOfObjects(localelem, cloudElem))){
                    const objectToCreate = {
                        name: localelem.name,
                        required: localelem.required,
                        visible: localelem.visible,
                        doctorCustomFieldPropsFieldId: localelem.field_id
                    }
                    API.graphql(graphqlOperation(createDoctorCustomFieldProps, {input: objectToCreate})).then( result =>{})
                }        
            }
        });
        this.props.toggleClose();       
    }

    getFieldsCustomProps = () => {
        const fieldsObjects = [];
        const dbfields = this.props.childProps.fields;
        API.graphql(graphqlOperation(listDoctorCustomFieldPropss)).then( result =>{
            const DoctorCustomPropsFields = result.data.listDoctorCustomFieldPropss.items;
            [].concat(dbfields).map((field, f) => {
                const cProp = DoctorCustomPropsFields.find(item => item.field.id === field.id);
                if(cProp === undefined){
                    const field_result = {
                        id: undefined,
                        field_id: field.id,
                        name: field.name,
                        field_name: field.name,
                        required: false,
                        visible: false,
                        registred_in_cloud: false,
                    }
                    fieldsObjects.push(field_result);
                }else{
                    const field_result = {
                        id: cProp.id,
                        field_id: field.id,
                        name: cProp.name,
                        field_name: field.name,
                        required: cProp.required,
                        visible: cProp.visible,
                        registred_in_cloud: true,
                    }

                    fieldsObjects.push(field_result);
                }
            })
            this.setState({ fields: fieldsObjects });
            localStorage.setItem("ArrayObjects", JSON.stringify(fieldsObjects));
        })
    }               

    render(){
       
             const columns = [
                {
                'label': 'Campo',
                'field': 'campo',
                'sort': 'asc'
                },
                {
                'label': 'Visible',
                'field': 'visible',
                'sort': 'asc'
                },
                {
                'label': 'Campo Visual',
                'field': 'front_field_name',
                'sort': 'asc'
                },
                {
                'label': 'Requerido',
                'field': 'required',
                'sort': 'asc'
                }
            ];

            const dummy = [{
                id: "iddummy",
                field: "fieldummy",
                front_field_name: "frontdummy",
                required: false,
                visible: false,
                registred_in_cloud: false,
            }];
            const fields = this.state.fields === null ? dummy : this.state.fields;

            const rows = [];

            [].concat(fields)
                .sort((a, b) => {
                    if(a.field_name > b.field_name){return 1}
                    if(a.field_name < b.field_name){return -1}
                    return 0
                })
                .map((field,i)=> 
                    {
                        const inputTextValue = field.name;
                        const visibleChecked = field.visible;
                        const requiredChecked = field.required;
                        const row = {
                            'field': field.field_name,
                            'visible': <MDBInput label=" " type="checkbox" id={"visible"+i} checked={visibleChecked || false} onChange={() => {this.updateField(null, "visible",field.field_id)}}/>,
                            'front_field_name': <MDBInput type="text" value={inputTextValue} disabled={!field.visible} onChange={(e) => {this.updateField(e, "front_field_name",field.field_id)}}/>,
                            'required': <MDBInput label=" " type="checkbox" id={"required"+i} checked={requiredChecked || false} disabled={!field.visible} onChange={() => {this.updateField(null,"required",field.field_id)}}/>,
                        }

                        rows.push(row);
                    }
                );

        const childProps = {
            ...this.props.childProps,
            columns,
            rows
        };

        return (
                <Container>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>Card title</MDBCardTitle>
                                    <ModuleTable childProps={childProps}/>
                                    <MDBBtn type="button" onClick={this.saveChangesToTheCloud}>Guardar Cambios</MDBBtn>
                                    <MDBBtn type="button" onClick={this.props.toggleClose}>Cancelar</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </Container>
            )
    }
}

    

export default Module;