import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBSpinner,
  MDBModal, MDBModalBody, MDBModalFooter, MDBBox } from "mdbreact";

import { API, graphqlOperation } from "aws-amplify";

import { Storage } from "aws-amplify";

import Select from 'react-select'

//import { PhotoPicker, S3Image } from "aws-amplify-react";

import CompanyProfile from './CompanyProfileReview'

import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../../ImageUpload/cropImage'

import PlacesAutocomplete from 'react-places-autocomplete';

import ImageUploader from 'react-images-upload';

import { Redirect } from 'react-router'

//import PricingPlans from './PricingPlans'
//import PaymentMethod from './PaymentMethod'

import { createDoctor, createConsultingRoom, createLocation, updateDoctor } from '../../../../../graphql/mutations';
import { listSpecialitys } from '../../../../../graphql/custom-queries';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

//const Compress = require('compress.js')

// Se quitaron los pasos de que tienen que ver con subscrpcion y se comento la validacion de si el campo stripe_source_token esta completado
// Tambien se configuraron los botones next y previous para los dos pasos restantes
// Tambien se agrego el tocken de prueba directamente en state stripe_source_token
// En el insert de la tabla Doctor se cambio el valor del campo name por username porque al registrar el usuario directamente por cognito, no se puede agregar el nombre completo
class ConfigureProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formActivePanel1: 1,
      formActivePanel1Changed: false,
      username: this.props.childProps.state.username,
      name: '',
      email: this.props.childProps.state.email,
      stripe_plan_id: "plan_EnLie0bS3CW27X",
      stripe_plan_name: "Basic plan",
      specialty: "",
      sex: null,
      location: "",
      stripe_source_token: 'tok_visa',//"",
      stripe_customer_id: "",
      stripe_subscription_id: "",
      redirect: false,
      secretary: "dummy",
      loading: false,
      pageLoading: true,
      pageError: false,
      error: "",
      pictures: [],
      image: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 4 / 3,
      modal: false,
      croppedImage: null,
      file: null,
      previewSource: null,
      key: null,
      specialities: [],
      _specialty: {},
      speciality: "",
      specialityName: "",
      subspecialities: [],
      _subspecialty: {},
      subspeciality: null,
      subspecialityName: "",
      subspecialitiessec: [],
      _subspecialtysec: {},
      subspecialitysec: null,
      subspecialitysecName: "",
    }

    this.handleSetPlan = this.handleSetPlan.bind(this);
    this.handleSetCard = this.handleSetCard.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this._isMounted = false;
  }

  componentWillMount = () => {
    this._isMounted = true;
    this.redirect();
    this.setSpecialityList();
  }

  redirect = () => {
      if((this.props.childProps.state.user_roll !== 'doctor' && this.props.childProps.state.user_roll !== '' && this.props.childProps.state.user_roll !== 'undefined' && this.props.childProps.state.user_roll !== undefined && this.props.childProps.state.user_roll !== null)
          || (this.props.childProps.state.doctorname !== '' && this.props.childProps.state.doctorname !== 'undefined' && this.props.childProps.state.doctorname !== undefined && this.props.childProps.state.doctorname !== null)){
            this.setState({ redirect: true });
      }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //upload S3 image
  onChange(e) {
      //const file = e.target.files[0];
      /* Storage.put('example2.png', file, {
          contentType: 'image/png'
      })
      .then (result => {
         this.setState({croppedImage: result.key})
         //console.log(result)
      })
      .catch(err => console.log(err));

      let type = file.type;
      Storage.put(this.state.username+'.'+type.replace("image/", ""), file, {
          contentType: 'image/png'
      })
      .then (result =>{
        this.setState({croppedImage: result.key})
        //console.log(result.key)
      })
      .catch(err => console.log(err)); */
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
      let file = picture.pop();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          file: file,
          image: reader.result
        });

        if(this.state.image !== null){
          this.toggle()
        }
      };
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({ croppedAreaPixels })
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  showCroppedImage = async () => {
    const croppedImage = await getCroppedImg(
      this.state.image,
      this.state.croppedAreaPixels
    )
    this.setState({ croppedImage })
    this.toggle()
  }

  handleSelect = location => {
    this.setState({ location });
    /* geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error)); */
  };

  handleChange = location => {
    this.setState({ location });
  };

  handleSetPlan = (tab) => {
    if (tab === '1')
      this.setState({ stripe_plan_id: 'plan_EnLie0bS3CW27X', stripe_plan_name: 'Basic plan' });
    if (tab === '2')
      this.setState({ stripe_plan_id: 'plan_EnLja8uK6pDmJw', stripe_plan_name: 'Premium plan'  });
    if (tab === '3')
      this.setState({ stripe_plan_id: 'plan_EnLkLPMWO5Hz6x', stripe_plan_name: 'Advanced plan'  });
  }

  handleSetCard = (param) => {
    this.setState({ stripe_source_token: param });
  }

  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleNextPrevClick = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }

  handleSubmission = () => {
    this.setState({ loading: true });
    
    if (this.state.croppedImage !== null) {
      Storage.put("DOCTORS/"+this.state.username+".png", this.state.croppedImage, {
          contentType: 'image/png'
      })
      .then (result =>{
        this.setState({croppedImage: result.key})
        this.insertUserProfileData();
      })
      .catch((err) => { // Error response
          this.setState({ loading: false });
          console.log(err);
      });
    }else{
      this.insertUserProfileData();
    }
    
  }

  createCustomer = () => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: 'Customer Name: '+ this.state.name,
          email: this.state.email,
          source: this.state.stripe_source_token
        })
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
          this.setState({ stripe_customer_id: responseObject.stripeResponse.id });
          /* Auth.updateUserAttributes(this.state.username, {
              'name': this.state.name
          }); */
          this.subscribeCustomer();
      }).catch((err) => { // Error response
          this.setState({ loading: false });
          console.log(err);
      });
  };

  setspeciality = (e) => {
    this.setState({speciality: e.value, specialityName: e.label, _specialty: e, subspecialities: [], subspeciality: null, subspecialityName: "", _subspecialty: null, subspecialitiessec: [], subspecialitysec: null, subspecialitysecName: "", _subspecialtysec: null});
    const items = [];
    e.subspecialities.forEach(ss => {
        var item = {value: ss.id, label: ss.name, subspecialitiessec: ss.subSpeciality.items};
        items.push(item);
    });
    this.setState({subspecialities: items});
  }

  setsubspeciality = (e) => {
    if (e !== null) {
        this.setState({subspeciality: e.value, subspecialityName: e.label, _subspecialty: e, subspecialitiessec: [], subspecialitysec: null, subspecialitysecName: "", _subspecialtysec: null})
        const items = [];
        e.subspecialitiessec.forEach(ss => {
            var item = {value: ss.id, label: ss.name};
            items.push(item);
        });
        this.setState({subspecialitiessec: items});      
    }
  }

  setsubspecialitysec = (e) => {
    if (e !== null) {
        this.setState({subspecialitysec: e.value, subspecialitysecName: e.label, _subspecialtysec: e})   
    }
  }

  setsex = (e) => {
    if (e !== null) {
        this.setState({sex: e})      
    }
  }

  setSpecialityList = async () => {
    try {
      const _specialtys = await API.graphql(graphqlOperation(listSpecialitys, {limit: 400}));
      const _items = _specialtys.data.listSpecialitys.items;
      console.log(_items);
      
      const items = [];
      _items.forEach(e => {
        var item = {value: e.id, label: e.name, subspecialities: e.subSpeciality.items};
        items.push(item);
      });
      this.setState({specialities: items, pageLoading: false});

    } catch (error) {
      this.setState({pageLoading: false, pageError: true});
      console.log(error);
    } 
  }

  subscribeCustomer = () => {
    fetch('https://ugwnuazczk.execute-api.us-east-1.amazonaws.com/dev/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.stripe_customer_id,
          plan: this.state.stripe_plan_id
        })
      }).then((r) => r.json()).then((r) => {
          var responseObject = JSON.parse(r.body);
          this.setState({ stripe_subscription_id: responseObject.stripeResponse.id });
          
          /* Storage.put(this.state.username+".png", this.state.croppedImage, {
              contentType: 'image/png'
          })
          .then (result =>{
            this.setState({croppedImage: result.key})
            this.insertUserProfileData();
          }) 
          .catch(err => console.log(err));*/
      }).catch((err) => { // Error response
          this.setState({ loading: false });
          console.log(err);
      });
  };

  insertUserProfileData = () =>{
    //set the username to dynamodb with appsync
    const locationInsert = {
      input:{name: this.state.location}
    }

    const stripeInsert = {
      input:{
        source_token: this.state.stripe_source_token,
        plan_id: this.state.stripe_plan_id,
        plan_name: this.state.stripe_plan_name,
        customer_id: this.state.stripe_customer_id,
        subscription_id: this.state.stripe_subscription_id
      }
    }

    const doctorInsert = {
      input:{
        name: this.state.name, //this.state.name,
        email: this.state.email,
        username: this.state.username,
        doctorSpecialityId: this.state.speciality,
        doctorSubspecialityId: this.state.subspeciality,
        sex: this.state.sex.value,
        image: this.state.croppedImage
      }
    }

     API.graphql(graphqlOperation(createLocation, locationInsert)).then( data =>{
      this.setState({ consultingRoomLocationId: data.data.createLocation.id});
      //API.graphql(graphqlOperation(createStripe, stripeInsert)).then( data =>{
        //this.setState({ consultingRoomStripeId: 'data.data.createStripe.id'});
        API.graphql(graphqlOperation(createDoctor, doctorInsert)).then( data =>{
          this.setState({ consultingRoomDoctorId: data.data.createDoctor.id});
            API.graphql(graphqlOperation(createConsultingRoom, {
              input:{
                secretary: this.state.secretary,
                consultingRoomDoctorId: this.state.consultingRoomDoctorId,
                //consultingRoomStripeId: this.state.consultingRoomStripeId,
                consultingRoomLocationId: this.state.consultingRoomLocationId
              }
            })).then( data =>{
              API.graphql(graphqlOperation(updateDoctor, {
                input:{
                  id: this.state.consultingRoomDoctorId,
                  doctorConsultingroomId: data.data.createConsultingRoom.id,
                }
              })).then( data =>{

                //console.log(data)
                this.setState({ redirect: true, loading: false });
                window.location.reload()

              }).catch( err => {
                console.log(err);
                this.setState({ error: err, loading: false });
              });
            }).catch( err => {
              console.log(err);
              this.setState({ error: err, loading: false });
            });
        }).catch( err => {
          console.log(err);
          this.setState({ error: err, loading: false });
        });

      //}).catch( err => {
      //  console.log(err);
      //  this.setState({ error: err, loading: false });
      //});
    }).catch( err => {
      console.log(err);
      this.setState({ error: err, loading: false });
    });
  }

render() {

  const { subspecialitiessec, _subspecialtysec, sex, pageError, location, redirect, error, loading, name, croppedImage, specialities, pageLoading, speciality, _specialty, _subspecialty, subspecialities, subspeciality } = this.state
  //const image = (croppedImage !== null)?(<img src={croppedImage} height="200" width="200" className="img-fluid" alt="" />):(null);
  const complete = (!(location === '') && !(speciality === '') && !(name === '') && !(sex === null) /*  && !(stripe_source_token === '') */)
  const validation = (complete && (error === ''))

  const profileData = {
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      speciality: this.state.specialityName,
      sex: this.state.sex === null ? "" : this.state.sex.value,
      subspeciality: this.state.subspecialityName,
      location: this.state.location,
      stripe_customer_id: this.state.stripe_customer_id,
      stripe_subscription_id: this.state.stripe_subscription_id,
      stripe_plan_id: this.state.stripe_plan_id,
      stripe_plan_name: this.state.stripe_plan_name,
      stripe_source_token: this.state.stripe_source_token,
      complete: complete,
      backEndError: (error !== ""),
      error: error,
      croppedImage: croppedImage,
  }

  const searchOptions = {
    location: new window.google.maps.LatLng(19, -71),
    radius: 2000,
    types: ['establishment']
  }

  const sexs = [{value: "MALE", label: "Masculino"}, {value: "FEMALE", label: "Femenino"}]

  if (pageLoading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner big/></MDBBox></MDBContainer>)
  if (pageError) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><h2>Ha Ocurrido un Error</h2></MDBBox></MDBContainer>)

  return (
    <MDBContainer>
      <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2"><strong>Formulario de Registro</strong></h2>
      <MDBStepper icon>
        <MDBStep far icon="folder-open" stepName="Informacion Basica" onClick={this.swapFormActive(1)(1)}></MDBStep>
        {/* <MDBStep icon="pencil-alt" stepName="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStep> */}
        <MDBStep icon="image" stepName="Imagen de Perfil" onClick={this.swapFormActive(1)(3)}></MDBStep>
        <MDBStep icon="check" stepName="Finalizar" onClick={this.swapFormActive(1)(4)}></MDBStep>
      </MDBStepper>
        <MDBRow>
          {this.state.formActivePanel1 === 1 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4">
            <strong>Informacion Basica</strong></h3>

            <MDBRow className="mb-3 mt-5" style={{width: '100%'}}>
              <MDBCol md="7">
                <MDBInput label="Nombre Completo" className="mt-4" value={name} onChange={event => this.setState(updateByPropertyName("name", event.target.value)) }/>
              </MDBCol>
              <MDBCol md="5">
                <div className="mt-4">
                  <Select id="sex" placeholder="Sexo" defaultValue={sex} options={sexs} onChange={ (v) => {this.setsex(v)}} />
                </div>
              </MDBCol>
            </MDBRow>            
            
            {/* <MDBInput label="Especialidad" className="mt-4" autoFocus={this.calculateAutofocus(1)} value={specialty} onChange={event => this.setState(updateByPropertyName("specialty", event.target.value)) }/> */}
            <MDBRow className="mb-3 mt-5" style={{width: '100%'}}>
              <MDBCol md="3">
                <label htmlFor="evolution" className="mt-2" >Especialidad:</label>
              </MDBCol>
              <MDBCol md="9">
                <Select id="speciality" placeholder="Epecialidad" defaultValue={_specialty} options={specialities} onChange={ (v) => {this.setspeciality(v)}} />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol md="3">
                <label htmlFor="evolution" className="mt-2" >Sub-Especialidad:</label>
              </MDBCol>
              <MDBCol md="9">
                <Select id="subspeciality" placeholder="Sub-Epecialidad" value={_subspecialty} options={subspecialities} onChange={ (v) => {this.setsubspeciality(v)}} />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-5" style={{width: '100%'}}>
              <MDBCol md="3">
                <label htmlFor="evolution" className="mt-2" >Segunda Sub-Especialidad:</label>
              </MDBCol>
              <MDBCol md="9">
                <Select id="subspeciality" placeholder="Sub-Epecialidad" value={_subspecialtysec} options={subspecialitiessec} onChange={ (v) => {this.setsubspecialitysec(v)}} />
              </MDBCol>
            </MDBRow>
            
              <PlacesAutocomplete
                value={this.state.location}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <MDBInput
                      {...getInputProps({
                        label: 'Digite el nombre del hospital donde Trabaja...',
                        className: "mt-4",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

                {/* 
                <S3Image imgKey={key}/>
                <PhotoPicker
                  title="Priview PhotoPicker"
                  preview="hidden"
                  onLoad={url => console.log(url)}
                  onPick={data => console.log("data: ",data)}
                  /> 
                  
                  <input
                      type="file" accept='image/*'
                      onChange={(e) => this.onChange(e)}
                  />*/}
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
          </MDBCol>)}

          {/*this.state.formActivePanel1 === 2 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4"><strong>Select a plan</strong></h3>
            <PricingPlans handleSetPlan={this.handleSetPlan}/>
            <h3 className="font-weight-bold pl-0 my-4"><strong>Payment Method</strong></h3>
            <PaymentMethod handleSetCard={this.handleSetCard}/>
            <br/>
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
          </MDBCol>)*/}
          {this.state.formActivePanel1 === 3 &&
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4"><strong>Imangen de Perfil</strong></h3>
            <br/>


            <ImageUploader
                    withIcon={true}
                    buttonText='Agrege una Imagen de Perfil (opcional)'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
            />

            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn>
          </MDBCol>)}
          {this.state.formActivePanel1 === 4 && 
          (<MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4"><strong>Review</strong></h3>
            <CompanyProfile profileData={profileData}/>
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
            <MDBBtn color="success" rounded className="float-right" disabled={!validation} onClick={this.handleSubmission}>Subscribe</MDBBtn>
            {loading && <MDBSpinner />}
          </MDBCol>)}
          {
              (redirect) &&
              <Redirect to='/profile'/>
          }
        </MDBRow>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          {/* <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader> */}
          <MDBModalBody>
            <MDBContainer style={{width: 300, height: 300}}>
              <Cropper
                image={this.state.image}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.showCroppedImage}>Guardar Cambios</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
    </MDBContainer>
    );
  };
}

export default ConfigureProfile;