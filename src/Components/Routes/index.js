import React from 'react';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import AuthComponent from '../Authentication/AuthComponent';
import Profile from '../Profile';
import ConfigureProfile from '../Profile/Company/ProfileManagement/ConfigureProfile';
import MedicalAppointmentsManagement from '../MedicalAppointmentsManagement';
import Reports from '../Reports';
import Error from '../Error'
import IntroductionPage from '../IntroductionPage';
import ContactPage from '../IntroductionPage/ContactUs';
import Features from '../IntroductionPage/Features';

import Diagnosis from '../IntroductionPage/Features/diagnosis';
import PatientHistory from '../IntroductionPage/Features/patient_history';
import PendingAnalysis from '../IntroductionPage/Features/pending_analysis';
import PhysicalExploration from '../IntroductionPage/Features/physical_exploration';
import Prescriptions from '../IntroductionPage/Features/prescriptions';
import RegisterPatients from '../IntroductionPage/Features/register_patients';

import EcommercePage from '../IntroductionPage/PricingPlans/index2';
import ConsultationProcess from '../Consultations/ConsultationProcess';
import Consultations from '../Consultations/index';
import Patients from '../Patients';

import {Template} from '../Reports/Prescriptions/Template_1';

export const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path="/" render={() => <IntroductionPage/>} />
    <Route exact path="/features" render={() => <Features/>} />
    
    <Route exact path="/features/diagnosis" render={() => <Diagnosis/>} />
    <Route exact path="/features/patienthistory" render={() => <PatientHistory/>} />
    <Route exact path="/features/pendinganalysis" render={() => <PendingAnalysis/>} />
    <Route exact path="/features/physicalexploration" render={() => <PhysicalExploration/>} />
    <Route exact path="/features/prescriptions" render={() => <Prescriptions/>} />
    <Route exact path="/features/registerpatients" render={() => <RegisterPatients/>} />

    <Route exact path="/pricing" render={() => <EcommercePage/>} />
    <Route exact path="/contactus" render={() => <ContactPage/>} />
    {/* <Route exact path="/patients" render={() => <Patients/>} />
    <Route exact path="/reports" render={() => <Reports/>} /> */}
    <ProppedRoute exact path="/signin" render={AuthComponent} props={childProps} />
    <ProppedRoute exact path="/error" render={() => <Error childProps={childProps}/>} props={childProps} />
    <Doctor exact path="/subscribe" render={() => <ConfigureProfile childProps={childProps}/>} props={childProps} />
    <ProtectedRoute exact path="/profile" render={() => <Profile childProps={childProps}/>} props={childProps} />

    <DoctorSecretary exact path="/patients" render={() => <Patients childProps={childProps}/>} props={childProps} />
    <Doctor exact path="/reports" render={() => <Reports childProps={childProps}/>} props={childProps} />
    <DoctorSecretary exact path="/medicalappointmentsmanagement" render={() => <MedicalAppointmentsManagement childProps={childProps}/>} props={childProps} />
    <Doctor exact path="/consultations" render={() => <Consultations childProps={childProps} />} props={childProps} />
    <Doctor exact path="/consultations/process/:consultation/:patient" render={() => <ConsultationProcess childProps={childProps} />} props={childProps} />
    {/* <ProtectedCardiology exact path="/consultations/cardiology/:consultation/:patient" render={() => <ConsultationProcess childProps={childProps} />} props={childProps} /> */}
    <Route exact path="/template" render={() => <Template />} />
  </Switch>
);

//cardiology process

export const Clients = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      (childProps.isLoggedIn) ? (
          (childProps.state.user_roll === "client" || childProps.state.user_roll === "admin") ? (
            <C {...rProps} {...childProps} />
          ) : (<Redirect to="/profile"/>)
      ) : (
        <Redirect
          to={`/signin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export const Doctor = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      (childProps.isLoggedIn) ? (
          (childProps.state.user_roll === "doctor" || childProps.state.user_roll === "admin") ? (
            <C {...rProps} {...childProps} />
          ) : (<Redirect to="/profile"/>)
      ) : (
        <Redirect
          to={`/signin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export const DoctorSecretary = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      (childProps.isLoggedIn) ? (
          (childProps.state.user_roll === "secretary" || childProps.state.user_roll === "doctor" || childProps.state.user_roll === "admin") ? (
            <C {...rProps} {...childProps} />
          ) : (<Redirect to="/profile"/>)
      ) : (
        <Redirect
          to={`/signin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export const Admin = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      (childProps.isLoggedIn) ? (
          (childProps.state.user_roll === "admin") ? (
            <C {...rProps} {...childProps} />
          ) : (<Redirect to="/profile"/>)
      ) : (
        <Redirect
          to={`/signin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      childProps.isLoggedIn ? (
        <C {...rProps} {...childProps} />
      ) : (
        <Redirect
          to={`/signin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

export const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
);