import React, { useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBModalFooter, MDBCard, MDBCardUp, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBContainer, MDBBox, MDBSpinner} from "mdbreact";

import image_back from '../../../../../../images/modern-blue-medical-background.jpg';

import { Storage } from "aws-amplify";
import { S3Image } from 'aws-amplify-react';


const UserInformation = ({ company: company }) => {
  const [ flipped, setFlipped ] = useState(false);
  const [ loading, setloading ] = useState(true);
  const [ specs, setspecs ] = useState([]);

  useEffect(() => { 
      const _specs = [];
      const _ss = company.subspecialities
      const _sss = company.subspecialitiessec
    console.log(company.subspecialities);
    
      company.specialities.forEach(s => {
        const data = {};
        data.spe = s.speciality.name;
          s.speciality.subSpeciality.items.forEach(ss => {
            console.log(_ss.findIndex(ss_ => ss_.subspeciality.id === ss.id));
            
            const _sso = _ss[_ss.findIndex(ss_ => ss_.subspeciality.id === ss.id)];
            if (ss.subSpeciality.items.length > 0) {
              ss.subSpeciality.items.forEach(sss => {              
                const _ssso = _sss[_sss.findIndex(sss_ => sss_.subspecialitysec.id === sss.id)];
                data.sssec = data.sssec !== undefined ?  data.sssec+" - "+_ssso.subspecialitysec.name : "- "+_ssso.subspecialitysec.name
              });
              data.subesp = data.sssec !== undefined ? _sso.subspeciality.name +" ("+data.sssec+" )" : _sso.subspeciality.name;
              _specs.push({spe: s.speciality.name, sub: data.subesp});
            }else{
              data.subesp = _sso.subspeciality.name; 
              _specs.push({spe: s.speciality.name, sub: data.subesp});
            }
          });
      });

      setspecs(_specs)
      setTimeout(() => {  
        setloading(false)
      }, 2000);
      
      
      
  }, []);

  const {image, sex} = company

  const F_image = "https://lh3.googleusercontent.com/proxy/wZnkKM30pKo_zEfJkj2QoeXos6yrZUMi_sSvHgLfX8_rL8y3e-YZpjqvRaBchnCws8mUaBXN4ahb9QltBf11_33WYJogBhHbUkGbwVwCcyBl2GxqaQGV67_tVdfA-GBGElYd89ZhJa_QgadjTt6Ac9v1OYmuZEuqd7Oi3l0omO81GAs"
  const M_image = "https://neumoexpertosdotorg.files.wordpress.com/2015/10/icon-doctor.png";
  const image_ = sex !== undefined ? (sex === 'MALE' ? M_image : F_image) : null;

  const _image = (image !== null && image !== undefined)?(<S3Image imgKey={image} height="100" width="60" alt="" className="rounded-circle" />):(
    <S3Image src={image_} height="100" width="60" alt="" className="rounded-circle" />
  );

  const list = (specs !== null)?([].concat(specs)
    .map((item,i)=> 
        <li key={i}>{item.spe+" | "+item.sub}</li>
    )):(<div></div>)


  if (loading) return (<MDBContainer className="mb-3"><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner big/></MDBBox></MDBContainer>)

  return (
    <MDBRow>
      <MDBCol style={{ minHeight: '26rem' }}>
        <MDBRotatingCard flipped={flipped} className="text-center h-100 w-100">
          <MDBCard className="face front">
            <MDBCardUp>
              <img className="card-img-top" src={image_back} alt="" />
            </MDBCardUp>
            <MDBAvatar size="4x" className="mx-auto white">
              {_image}
            </MDBAvatar>
            <MDBCardBody>
              <h4 className="font-weight-bold mb-3">{company.doctorname}</h4>
              <ul style={{listStyleType:'none'}}>{list}</ul>
              {/* <h5>{subspecsec}</h5> */}
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
                <a href="https://www.freepik.es/fotos-vectores-gratis/fondo">Vector de Fondo creado por Creative_hat - www.freepik.es</a>
            </MDBModalFooter>
          </MDBCard>
        </MDBRotatingCard>
      </MDBCol>
    </MDBRow>
    );
}

export default UserInformation;