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
                <MDBCard className="pb-3">
                    <ChartsPage title="Grafico de Lineas"/>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6" className="mt-3">
                <MDBCard className="pb-3">
                    <PolygonCharts title="Grafico de Radar"/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol md="6" className="mt-3">
                <MDBCard className="pb-3">
                    <HorizontalBarChart title="Grafico de Barras Horizontal"/>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6" className="mt-3">
                <MDBCard className="pb-3">
                    <PieChart title="Grafico de Pastel"/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <BarChartsPage title="Grafico de Barras"/>
        </MDBRow>
        <MDBRow>
            <MDBCol className="mt-3">
                <MDBCard className="pb-5">
                    <ChartsPagePro title="Grafico de Objetivo"/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
}

export default Reports;