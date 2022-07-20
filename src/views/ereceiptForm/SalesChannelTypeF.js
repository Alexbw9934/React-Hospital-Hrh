import React, { Component } from "react";
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
// import axios from "axios";
// import AsyncSelect from "react-select";
const config = localStorage.getItem("token");

export class SalesChannelTypeF extends Component {
  constructor(){
    super();
    this.state={
      name:""
    }
  }
  onSubmit=()=>{
    alert("hell")
    fetch("http://5.9.111.198:13880/api/SalesChannelTypes",{
      method:"POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
    .then((resp) => {
      console.log("result", resp);
    });
  }
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  SalesChannelType
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="1">
                      <CLabel htmlFor="text-input"> SalesChanneltypeName </CLabel>
                    </CCol>
                    <CCol md="2"></CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CCol sm="10"></CCol>
                    <CCol sm="8"></CCol>
                    <CCol></CCol>
                    <CButton color="primary" onClick={this.onSubmit}>
                      Save
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default SalesChannelTypeF;
