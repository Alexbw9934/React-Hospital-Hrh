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
  CSelect,
} from "@coreui/react";
import axios from "axios";
const config = localStorage.getItem("token");
class SalesChannelsF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      salesChannelTypeId: 0,
      salesChannelType: {
        id: 0,
        name: "",
      }
    }
    this.states={
      users:[]
    }
  }
  componentDidMount(){
    axios.get('http://5.9.111.198:13880/api/salesChannelTypes',{
       headers: {
         "Authorization":`Bearer ${config}`,
         "Accept": "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(this.states),
    })
    .then(res =>{
      // console.log("SalesChannltype",res)
      // let data=res.data;
      // console.log("arraydata",data)
      this.setState(this.states={users:res.data})
    })
 }
  submitData = () => {
    let bigData=this.state
    console.log(bigData)
    fetch("http://5.9.111.198:13880/api/SalesChannels", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bigData),
    }).then((resp) => {
      console.log("result", resp);
    });
  };
  render(){
    let megaData = this.states;
    console.log(megaData);
    let data1=this.state.salesChannelType
    console.log(data1)

    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  SalesChannelsF
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input"> Name </CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={(e) =>
                          this.setState(this.state={ name: e.target.value })
                        }
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">SalesType</CLabel>
                    </CCol>
                    <CCol xs="12" sm="8">
                      <CSelect
                        id="name1"
                        name="name1"
                        placeholder="name1"
                        onChange={(e) =>
                          this.setState(this.state.salesChannelType={name:e.target.value})
                        }
                     >
                        {megaData.users.map((user) => (
                          <option key={user.id}>{user.name}</option>
                        ))}
                      </CSelect>
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
    );
  }
}

export default SalesChannelsF;
