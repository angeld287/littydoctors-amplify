import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBTable, MDBTableBody, MDBTableHead,  
         MDBCol, MDBRow, MDBContainer, MDBRotatingCard, MDBIcon  } from 'mdbreact';

import PaymentMethod from '../../ConfigureProfile/PaymentMethod'

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
      stripe_source_token: '',
      stripe_customer_id: this.props.childProps.state.stripe_customer_id,
      user_cards_list: '',
    }

    this.handleFlipping = this.handleFlipping.bind(this)
  }

  handleSetCard = (param) => {
    this.setState({ stripe_source_token: param });
    
    
    this.cardsList()

    /* fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/card/'+this.state.stripe_customer_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.state.stripe_source_token
        })
      }).then((r) => r.json()).then((r) => {
          this.cardsList();
      }).catch((err) => { // Error response
          console.log(err);
      }); */
    this.handleFlipping()
  }

  cardsList = () => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/card/'+this.state.stripe_customer_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
          this.setState({ user_cards_list: responseObject.stripeResponse.data });
          this.getCardFinguerprint()
      }).catch((err) => { // Error response
          console.log(err);
      });
  };

  getCardFinguerprint = () => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/token/'+this.state.stripe_source_token , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        } 
      }).then((r) => r.json()).then((r) => {
          //var responseObject = JSON.parse(r.body);
          /* for (const [i, value] of this.state.user_cards_list.entries()) {
            if(value.fingerprint === responseObject.stripeResponse.card.fingerprint){
                console.log(i)
            }else{
                console.log("no igual")
            }
          } */
      }).catch((err) => { // Error response
          console.log(err);
      });
  };

  handleFlipping = () => {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    const data_panel = {
      columns: [
        {
          'label': 'Credit Card',
          'field': 'card_number',
          'sort': 'asc'
        },
        {
          'label': 'Card Name',
          'field': 'card_name',
          'sort': 'asc'
        },
        {
          'label': 'Expired Date',
          'field': 'expired_date',
          'sort': 'asc'
        },
        {
          'label': 'Actions',
          'field': 'actions_buttons',
          'sort': 'asc'
        }
      ],
      rows: [
        {
          'card_number': 'Mark',
          'card_name': 'Otto',
          'expired_date': '@mdo',
          'actions_buttons':  <div>
            <MDBBtn outline rounded size="sm" color="indigo" className="px-2">
              <i className="fas fa-pencil-alt mt-0"></i>
            </MDBBtn>
            <MDBBtn outline rounded size="sm" color="indigo" className="px-2">
              <i className="fas fa-times mt-0"></i>
            </MDBBtn>
            <MDBBtn outline rounded size="sm" color="indigo" className="px-2">
              <i className="fa fa-info-circle mt-0"> Set as Default</i>
            </MDBBtn>
          </div>
        },
        {
          'card_number': 'Jacob',
          'card_name': 'Thornton',
          'expired_date': '@fat',
          'actions_buttons': '@fat'
        }
      ]
    };

    return(
      <MDBContainer>
        <MDBRow>
          <MDBCol style={{ minHeight: '26rem' }}>
            <MDBRotatingCard flipped={this.state.flipped} className="text-center h-100 w-100" /* style={colStyle} */>
              <MDBCard className="face front">

                  <MDBCard narrow>
                  <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                    <a href="/#" className="white-text mx-3" onClick={event => {event.preventDefault()}}>Table name</a>
                    <div>
                      <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.handleFlipping}>
                        <i className="fa fa-plus mt-0"> add card</i>
                      </MDBBtn>
                    </div>
                  </MDBCardHeader>
                  <MDBCardBody cascade>
                    <MDBTable btn fixed>
                      <MDBTableHead columns={data_panel.columns} />
                      <MDBTableBody rows={data_panel.rows} />
                    </MDBTable>
                  </MDBCardBody>
                </MDBCard>
              </MDBCard>
              <MDBCard className="face back">
                  <PaymentMethod handleSetCard={this.handleSetCard}/>
                  <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={event => {
                                                                                              event.preventDefault();
                                                                                              this.handleFlipping();
                                                                                            }}>
                    <MDBIcon icon="undo" /> Cancel
                  </a>
              </MDBCard>
            </MDBRotatingCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

export default Cards;