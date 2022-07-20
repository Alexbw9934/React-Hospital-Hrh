import React, {Component, createRef } from 'react'
import $ from "jquery";  //load jquery

import {

  CCard,
  CCardBody,

} from "@coreui/react";

window.jQuery=$;
window.$=$;

require("jquery-ui-sortable");
require("formBuilder");

const fromData=[];
document.body.style.margin="30px";

class FormBuilder extends Component{
  fb=createRef();
  componentDidMount(){
    $(this.fb.current).formBuilder({fromData});
  }
  render(){
    return<div id="fb-editer" ref={this.fb}/>
  }
}

export default function Drag_drop() {
  return (
    <div>
      <CCard>
        <CCardBody>
     <FormBuilder />
     </CCardBody>
     </CCard>
    </div>
  )
}


