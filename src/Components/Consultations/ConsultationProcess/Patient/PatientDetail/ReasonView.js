import React, { Component } from "react";
import { MDBScrollspyBox, MDBScrollspyText, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";

class ReasonView extends Component {
  constructor(props) {
    super(props);
      this.state = {
        active: 0,
        sections: []
      };

    this.scrollSpyText = React.createRef();
  }

  componentDidMount() {
    let sections = this.scrollSpyText.current.getElementsByTagName("h4");
    this.setState({ sections });
  }

  handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const sections = this.state.sections;
    const lastIndex = sections.length - 1;

    for (let i = 0; i < lastIndex; i++) { if ((scrollTop> sections[i].offsetTop - 20) && (scrollTop < sections[i +
        1].offsetTop - 20)) { this.setState({ active: i }); } }; if (scrollTop> sections[lastIndex].offsetTop - 20)
        this.setState({ active: lastIndex });
  }

render() {
  return (
    <MDBScrollspyBox>
      <MDBRow>
        <MDBCol>
          <MDBScrollspyText onScroll={this.handleScroll} scrollSpyRef={this.scrollSpyText}>
            <h4 id="section1"></h4>
              {this.props.reason}
          </MDBScrollspyText>
        </MDBCol>
      </MDBRow>
    </MDBScrollspyBox>
    );
  }
}

export default ReasonView;