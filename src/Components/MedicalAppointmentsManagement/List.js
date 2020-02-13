import React, {Component} from "react";
import { MDBTable, MDBTableBody, MDBContainer, MDBIcon } from "mdbreact";

import moment from 'moment';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "1",
      redirect: false,
      appointments: null,
      selectedItem: "0",
    };

    this.details = this.details.bind(this);
  }
  
  details(event, item, i){
    
    event.preventDefault();
    if (this.state.activeItem !== item) {
      this.setState({ 
          activeItem: item,
          selectedItem: i
        })
    }
    this.props.ActiveElement(item, i);
    if (this.props.childProps.state.user_roll === 'doctor') {
      if (item.read_doctor === false) {
        this.props.updateMedicalAppointmentData({id: item.id, read_doctor: true}, "read"); 
      }
    }else if (this.props.childProps.state.user_roll === 'secretary') {
      if (item.read_secretary === false) {
        this.props.updateMedicalAppointmentData({id: item.id, read_secretary: true}, "read"); 
      }
    }
  }

  render(){
    const {selectedItem, data} = this.props.Appointments

    const lista = (data !== null)?([].concat(data)
    .sort((a, b) => new Date(...a.date_created.split('-').reverse()) - new Date(...b.date_created.split('-').reverse()))
    .map((item,i)=> 
        <tr
          key={i}
          onClick={(e) => {
              this.details(e, item, i)
          }} 
          >
          <td bgcolor={(selectedItem === i) ? ("#4285F4") : ("#fff")} 
              style={(selectedItem === i) ? ({color:"#fff", width: "80%"}) : ({color:"#000", width: "80%"})} 
              >
            {item.patient.name}    
          </td>
          <td bgcolor={(selectedItem === i) ? ("#4285F4") : ("#fff")} style={(selectedItem === i) ? ({color:"#fff"}) : ({color:"#000"})}>
            {!((this.props.childProps.state.user_roll === 'doctor')?(item.read_doctor):((this.props.childProps.state.user_roll === 'secretary')?(item.read_secretary):( null ) )) && <MDBIcon icon="bell" size="1x" className="red-text" />}
          </td>
          <td bgcolor={(selectedItem === i) ? ("#4285F4") : ("#fff")} style={(selectedItem === i) ? ({color:"#fff", width: "80%"}) : ({color:"#000", width: "80%"})} >
            <small>{moment(item.date_of_medical_appointment).format('DD-MM')}   </small>
          </td>
        </tr>
    )):(<tr></tr>)

      return (
        <MDBContainer>
          <MDBTable scrollY
            maxHeight="400px">
            <MDBTableBody>
              {lista}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      );
    }
}

export default List;