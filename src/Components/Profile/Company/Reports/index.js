import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer, MDBBtn } from "mdbreact";

import { listMedicalAppointmentReports } from './../../../../graphql/custom-queries';

//import moment from 'moment';

import { API, graphqlOperation } from 'aws-amplify';

class Reports extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          selectedM: 3,
          dataLine: {
            labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
            datasets: [
              {
                label: "Consultas Medicas",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(225, 204,230, .3)",
                borderColor: "rgb(205, 130, 158)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(205, 130,1 58)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81]
              }
            ]
          },
          options: [
            { text: "Enero", value: "1" },
            { text: "Febrero", value: "2" },
            { text: "Marzo", value: "3" },
            { text: "Abril", value: "4" },
            { text: "Mayo", value: "5" },
            { text: "Junio", value: "6" },
            { text: "Julio", value: "7" },
            { text: "Agosto", value: "8" },
            { text: "Septiembre", value: "9" },
            { text: "Octubre", value: "10" },
            { text: "Noviembre", value: "11" },
            { text: "Diciembre", value: "12" },
          ],
          barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  barPercentage: 1,
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          },
          dataBar: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
            datasets: [
              {
                label: "% of Votes",
                backgroundColor: [
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(98,  182, 239,0.4)",
                ],
                borderWidth: 2,
                borderColor: [
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(98,  182, 239, 1)",
                ],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              }
            ]
          }
    }
  }

  GetConsultations = async () => {
    //this.setState({selectedM: event.target.value})
    //const m = value[0];
    const y = new Date().getFullYear();
    const fecha_desde = y +'-01-01T00:00:00.000';
    const fecha_hasta = y +'-12-31T00:00:00.000';
    await API.graphql(graphqlOperation(listMedicalAppointmentReports, {
      filter: {
        createdAt: {
          gt: fecha_desde, 
          lt: fecha_hasta
        }
      },
      limit: 100
    }))
    .then( result =>{
      const list = result.data.listMedicalAppointments.items;
      let enero = list.filter(obj => {return obj.createdAt.includes(y+'-01')})
      let febrero = list.filter(obj => {return obj.createdAt.includes(y+'-02')})
      let marzo = list.filter(obj => {return obj.createdAt.includes(y+'-03')})
      let abril = list.filter(obj => {return obj.createdAt.includes(y+'-04')})
      let mayo = list.filter(obj => {return obj.createdAt.includes(y+'-05')})
      let junio = list.filter(obj => {return obj.createdAt.includes(y+'-06')})
      let julio = list.filter(obj => {return obj.createdAt.includes(y+'-07')})
      let agosto = list.filter(obj => {return obj.createdAt.includes(y+'-08')})
      let septiembre = list.filter(obj => {return obj.createdAt.includes(y+'-09')})
      let octubre = list.filter(obj => {return obj.createdAt.includes(y+'-10')})
      let noviembre = list.filter(obj => {return obj.createdAt.includes(y+'-11')})
      let diciembre = list.filter(obj => {return obj.createdAt.includes(y+'-12')})
      const array = [enero.length, febrero.length, marzo.length, abril.length, mayo.length, junio.length, julio.length, agosto.length, septiembre.length, octubre.length, noviembre.length, diciembre.length];

      let color = "rgba(98,  182, 239,0.4)";
      const dataBar = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
        datasets: [
          {
            label: "% of Votes",
            backgroundColor: [color,color,color,color,color,color,color,color,color,color,color,color,],
            borderWidth: 2,
            borderColor: [color,color,color,color,color,color,color,color,color,color,color,color,],
            data: array,
          }
        ]
      };

      this.setState(prevState => ({
          ...prevState,
          dataBar
      }))
    });
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Cantidad de Consultas Creadas por Mes en el Año Actual</h3>
        <MDBBtn color="primary" size="md" onClick={(e) => {
                                                e.preventDefault()
                                                this.GetConsultations()
                                            }}>
                                                Mostrar Datos
        </MDBBtn>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        <br/>
        {/* <h3 className="mt-5">Grafico de Cantidad de Consultas Medicas Por Mes</h3>
        <div style={{width: 200}}>
          <MDBSelect
            options={this.state.options}
            value={this.state.selectedM}
            getValue={ (value) => {
              this.handleSelectChange(value)
            }}
            label="Seleccione el Mes"
          />
        </div>
        <Line data={this.state.dataLine} options={{ responsive: true }} /> */}
        <br></br>
      </MDBContainer>
    );
  }
}

export default Reports;