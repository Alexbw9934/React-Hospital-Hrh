import React from 'react';
import {CForm} from "@coreui/react";
 // import ReactDOM from 'react-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

class FormBuilder extends React.Component{
  render(){
    return(
      <div>
        <CForm>
          <button onClick={()=>alert("submited")}>submit</button>
      <ReactFormBuilder/>
        </CForm>
        </div>

    )
  }
}

export default function ReactFormbuilder() {
  return (
    <div>
     <FormBuilder />
    </div>
  )
}

