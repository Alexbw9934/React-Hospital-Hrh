import React, { Component } from 'react'
import {
  // CButton,
   CCard,
   CCardBody,
   CCardHeader,
   CCol,
  // CInput,
   CRow,
  // CSelect,
 } from "@coreui/react";
 import axios from 'axios';

export class PaymentChannels extends Component {
  constructor(){
    super();
    this.state={
      users:[]
    }
  }
  componentDidMount(){
     axios.get('https://50qme35rkf.execute-api.us-east-1.amazonaws.com/readPayee')
     .then(res => res.data.body)
     .then((data)=>{
       this.setState({users:data})
       console.log(this.state.users)
     })
  }
  render() {
    return (
      <div>
      <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>PaymentChannels</h4>
              </CCardHeader>
              <CCard>
                <CCardBody>

                  <table className="table">
                    <tr>
                      <th>
                        <b>Name</b>
                      </th>
                      <th>
                        <b>PaymentChannels</b>
                      </th>

                      {/* <th><b>Status</b></th>
                      <th><b>Status</b></th> */}
                    </tr>
                    { (this.state.users.length > 0) ? this.state.users.map((user,index)=>{
                      return(
                        <tr key={index}>
                          {/* <td>{user.email}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.last_name}</td> */}
                        </tr>
                        )
                      }): <tr><td colSpan="5">Loading...</td></tr>
                    }
                   </table>
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

export default PaymentChannels
