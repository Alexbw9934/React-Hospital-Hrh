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
// import axios from 'axios'
const config=localStorage.getItem('token')
function CityF(){
const [name,setName]=useState('');
const [stateId,setStateCode]=useState('');
const [state,setState]=useState('');
const [countryId,setCountryId]=useState('');
const [country,setCountry]=useState('')
const [cityCode,setCityCode]=useState('');

function submitData (){
  console.log({name,cityCode,stateId
    ,countryId, })
  let data={name,cityCode,stateId,countryId};

  fetch("cities",{
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
                  Cities
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
                      <CLabel htmlFor="text-input"> CityCode </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="CityCode"
                        name="CityCode"
                        placeholder="City Code"
                        onChange={(e)=>setCityCode(e.target.value)
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> StateId </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="countryCode"
                        name="countryCode"
                        placeholder="Country Code"
                        onChange={(e)=>setStateCode(e.target.value)
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> State </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="state"
                        name="state"
                        placeholder="state"
                        onChange={(e)=>setState(e.target.value)
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> Country </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="country"
                        name="country"
                        placeholder="Country"
                        onChange={(e)=>setCountry(e.target.value)
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> CountryId </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="countryId"
                        name="countryId"
                        placeholder="CountryId"
                        onChange={(e)=>setCountryId(e.target.value)
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

export default CityF;
