import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBNavLink } from "mdbreact";


class PricingPlans extends Component {
    render() {
        return (
            <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
              Presios de los Planes
            </h2>
            <p className="grey-text text-center w-responsive mx-auto mb-5">
              
            </p>
            <MDBRow>
              <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                <MDBCard pricing>
                  <div className="price header white-text blue rounded-top">
                    <h2 className="number">10</h2>
                    <div className="version">
                      <h5 className="mb-0">Basico</h5>
                    </div>
                  </div>
                  <MDBCardBody className="striped mb-1">
                    <ul>
                      <li>
                        <p className="mt-2">
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Mobile
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Web
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="times" className="red-text pr-2" />
                          Soporte Tecnico 24/7
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="times" className="red-text pr-2" />
                          Asistencia y Consultoria
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="times" className="red-text pr-2" />
                          Servicio de Reporteria
                        </p>
                      </li>
                    </ul>
                        {/* <MDBNavLink to="/subscribe"><MDBBtn color="blue">Buy now</MDBBtn></MDBNavLink> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                <MDBCard pricing>
                  <div className="price header white-text indigo rounded-top">
                    <h2 className="number">20</h2>
                    <div className="version">
                      <h5 className="mb-0">Pro</h5>
                    </div>
                  </div>
                  <MDBCardBody className="striped mb-1">
                    <ul>
                      <li>
                        <p className="mt-2">
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Mobile
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Web
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Soporte Tecnico 24/7
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Asistencia y Consultoria
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="times" className="red-text pr-2" />
                          Servicio de Reporteria
                        </p>
                      </li>
                    </ul>
                    {/* <MDBBtn color="indigo">Buy now</MDBBtn> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                <MDBCard pricing>
                  <div className="price header white-text deep-purple rounded-top">
                    <h2 className="number">30</h2>
                    <div className="version">
                      <h5 className="mb-0">Enterprise</h5>
                    </div>
                  </div>
                  <MDBCardBody className="striped mb-1">
                    <ul>
                      <li>
                        <p className="mt-2">
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Mobile
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Aplicacion Web
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Soporte Tecnico 24/7
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Asistencia y Consultoria
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon="check" className="green-text pr-2" />
                          Servicio de Reporteria
                        </p>
                      </li>
                    </ul>
                    {/* <MDBBtn color="deep-purple">Buy now</MDBBtn> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
          );
      }
}

export default PricingPlans;