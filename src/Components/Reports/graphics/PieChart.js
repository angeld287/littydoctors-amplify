import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const PieChart = ({title: title}) => {
  const state = {
    dataPie: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }

    return (
      <MDBContainer>
        {(title === undefined || title !== null) && <h3 className="text-center mt-3 mb-2">{title}</h3>}
        <Pie data={state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
}

export default PieChart;