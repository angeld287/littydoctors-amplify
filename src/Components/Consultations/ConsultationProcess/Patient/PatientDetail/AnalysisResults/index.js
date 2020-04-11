import React from "react";
import { MDBContainer, MDBInputGroup, MDBSpinner, MDBBox } from "mdbreact";
import useAnalysisResults from './useAnalysisResults';

const AnalysisResults = ({result: result}) => {

    const { loading, error } = useAnalysisResults(result)

    if (loading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner/></MDBBox></MDBContainer>)

    return (
      <MDBContainer>
        <MDBInputGroup material containerClassName="mb-3 mt-0" prepend="@" hint="Username"/>
        <MDBInputGroup
          material
          hint="Recipient's username"
          containerClassName="mb-3 mt-0"
          append="@example.com"
        />
        <MDBInputGroup
          material
          label="Your vanity URL"
          labelClassName="mb-0 ml-2"
          containerClassName="mb-3 mt-0"
          prepend="https://example.com/users/"
          id="basic-url-material"
        />
        <MDBInputGroup
          material
          containerClassName="mb-3"
          prepend="$"
          append=".00"
        />
        <MDBInputGroup
          material
          className="mb-0"
          prepend="With textarea"
          type="textarea"
        />
      </MDBContainer>
    );
}

export default AnalysisResults;