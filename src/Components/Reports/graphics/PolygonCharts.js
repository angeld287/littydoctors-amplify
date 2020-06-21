import React from "react";
import { Radar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


const PolygonCharts = ({state: state, options: options, title: title}) => {
  const _state = {
    dataRadar: {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(194, 116, 161, 0.5)",
          borderColor: "rgb(194, 116, 161)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(71, 225, 167, 0.5)",
          borderColor: "rgb(71, 225, 167)",
          data: [28, 48, 40, 19, 96, 27,100]
        }
      ]
    }

  }

  return (
    <MDBContainer>
      {(title === undefined || title !== null) && <h3 className="text-center mt-3 mb-2">{title}</h3>}
      <Radar data={state === null || state === undefined ? _state.dataRadar: state.dataRadar} options={options === null || undefined ? { responsive: true } : options} />
    </MDBContainer>
  );
}

export default PolygonCharts;