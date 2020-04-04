import React, {Component } from "react";
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';


const TooltipButton = ({helperMessage: helperMessage, component: component, placement: placement}) => (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip" >{helperMessage}</Tooltip>}
    >
      {component}
    </OverlayTrigger>
);

  


export default TooltipButton;