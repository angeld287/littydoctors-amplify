import React,{ useForm } from 'react';
import { MDBContainer, MDBModalFooter, MDBSpinner, MDBBox, MDBBtn, MDBFileInput } from "mdbreact";
import useAnalysisResults from './useAnalysisResults';

const AnalysisResults = ({result: result, global: global, toggleResult: toggleResult, setResultLoading: setResultLoading}) => {

    const { register, handleSubmit, errors, formState, loading, _error, fieldsForm, setPdfFile, addResultData } = useAnalysisResults(result, global, setResultLoading)

    if (loading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner/></MDBBox></MDBContainer>)
    if (_error) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><h2>Ha ocurrido un error</h2></MDBBox></MDBContainer>)

    return (
      <MDBContainer>
		<form onSubmit={handleSubmit(addResultData)}>
            {fieldsForm}
            <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleResult}>Cancelar</MDBBtn>
            <MDBBtn color="primary" type="submit" disabled={formState.isSubmitting}>Guardar</MDBBtn>
            </MDBModalFooter>
        </form>
      </MDBContainer>
    );
}

export default AnalysisResults;