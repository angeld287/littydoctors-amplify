import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";
import BarChartsPage from './graphics/BarChartsPage';
import ChartsPage from './graphics/ChartsPage';
import HorizontalBarChart from './graphics/HorizontalBarChart';
import PieChart from './graphics/PieChart';
import PolygonCharts from './graphics/PolygonCharts';
import ChartsPagePro from './graphics/ChartsPagePro';


const Reports = () => {
    return (
      <MDBContainer>
        <MDBRow>
            <MDBCol md="6" className="mt-3">
                <MDBCard>
                    <ChartsPage/>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6" className="mt-3">
                <MDBCard>
                    <PieChart/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol className="mt-3">
                <MDBCard>
                    <ChartsPagePro/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol md="6" className="mt-3">
                <MDBCard>
                    <HorizontalBarChart/>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6" className="mt-3">
                <MDBCard>
                    <PolygonCharts/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <BarChartsPage/>
        </MDBRow>
      </MDBContainer>
    );
}

export default Reports;