import React,{useState} from "react";
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

const config = localStorage.getItem("token");
function CountryF(){
const [name,setName]=useState('');
const [countryCode,setCountryCode]=useState('');

function submitData (){
  console.log({name,countryCode})
  let data={name,countryCode};

  fetch("http://5.9.111.198:13880/api/countries",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${config}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data)
  }).then(resp=>{
    console.log("result",resp)
  })
}

    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  Country
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
                        onChange={(e)=>setName(e.target.value)

                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> CountryCode </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="countryCode"
                        name="countryCode"
                        placeholder="Country Code"
                        onChange={(e)=>setCountryCode(e.target.value)
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CCol sm="10"></CCol>
                    <CCol sm="8"></CCol>
                    <CCol></CCol>
                    <CButton color="primary" onClick={submitData}>
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

export default CountryF;
