import React from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
} from "@coreui/react";
// import axios from 'axios'
const config=localStorage.getItem('token')
class SalesChannelTypeF extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id:0,
      name: ""
    }
  }
 submitData=()=>{
  fetch("http://5.9.111.198:13880/api/salesChannelTypes",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${config}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify(this.state)
  }).then(resp=>{
    console.log("result",resp)
  })
}
   render(){
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  SalesChannelsTypeF
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> Name </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={(e)=>this.setState({name:e.target.value})

                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CCol sm="10"></CCol>
                    <CCol sm="8"></CCol>
                    <CCol></CCol>
                    <CButton color="primary" onClick={this.submitData}>
                      Save
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
   }
  }

export default SalesChannelTypeF;
