import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBContainer, MDBCardText, MDBListGroup, MDBBtn,  MDBListGroupItem } from "mdbreact";

import { Link } from 'react-router-dom';

import { API, graphqlOperation } from 'aws-amplify';

import { listDoctors } from '../../graphql/queries';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

class DoctorSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      doctorName: "",
      doctorList: "",
      selectedIndex: "",
      doctorDetails: {consultingroom:""}
     };
  }
  

  searchDoctor = () => {
    API.graphql(graphqlOperation(listDoctors, {
      filter:{
        name:{
          contains: this.state.doctorName
        }
      }
    })).then( result =>{
        this.setState({ doctorList: result.data.listDoctors.items})
    }).catch( err => {
    });
  }

  handleListItemClick = (event, item) => {
    //console.log(item)
    this.setState({ 
        selectedIndex: item.id,
        doctorDetails: item
    });
  }
  
  render(){
    const {doctorName, doctorList, selectedIndex, doctorDetails} = this.state

    const data = [].concat(doctorList)
    .map((item,i)=> 
        <MDBListGroupItem  
                    active={selectedIndex === item.id}
                    key={i}
                    //button
                    //selected={this.state.selectedIndex === item.id}
                    onClick={event => this.handleListItemClick(event, item)}
                    >
            {item.name}
        </MDBListGroupItem>
    )

    const isEmpty = (doctorName === '')
    const noDoctorSelected = (doctorDetails.name === undefined)
        
    return (
      <MDBContainer>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Find a Doctor
          </h2>
          <MDBRow>
            <MDBCol lg="5" className="lg-0 mb-4">
              <MDBCard>
                <MDBCardBody>
                  <div className="form-header blue accent-1">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          <i className="fa fa-search prefix"></i>
                        </span>
                      </div>
                      <input type="text" className="form-control" value={doctorName} onChange={event => this.setState(updateByPropertyName("doctorName", event.target.value)) }/>
                      <button disabled={isEmpty} onClick={this.searchDoctor}>search</button>
                    </div>
                  </div>
                  <MDBListGroup lg="4 ">{data}</MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="6">
            <MDBCard style={{ width: "22rem" }}>
              <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
              <MDBCardBody>
                <MDBCardTitle>{doctorDetails.name}</MDBCardTitle>
                <MDBCardText>
                  {doctorDetails.speciality}
                </MDBCardText>
                <MDBBtn disabled={noDoctorSelected}><Link to={"/consultingroom/"+doctorDetails.consultingroom.id}>Go to Doctor's Consulting Room</Link></MDBBtn>
                {/* <MDBNavLink to="/profile">{this.props.childProps.state.username}</MDBNavLink> */}
              </MDBCardBody>
            </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    );
  }
}

export default DoctorSearch;