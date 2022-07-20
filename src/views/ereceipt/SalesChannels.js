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
 const config=localStorage.getItem('token')
export class SalesChannels extends Component {
  constructor(){
    super();
    this.state={
      users:[]
    }
  }
  componentDidMount(){
     axios.get('http://5.9.111.198:13880/api/SalesChannels',{
      headers:{
        "Authorization":`Bearer ${config}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(this.state)
     })
     .then(res =>{
       console.log(res)
       let data=res.data
      this.setState({users:data})
     })
  }
  render() {
    let megaData=this.state.users
    console.log("sales",megaData)
    return (
      <div>
      <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>SalesChannels</h4>
              </CCardHeader>
              <CCard>
                <CCardBody>

                  <table className="table">
                    <tbody>
                    <tr>
                    <th>
                        <b>Id</b>
                      </th>
                      <th>
                        <b>Name</b>
                      </th>
                      <th>
                        <b>SalesID</b>
                      </th>

                      {/* <th><b>Status</b></th>
                      <th><b>Status</b></th> */}
                    </tr>
                    { (megaData.length > 0) ? megaData.map((user,index)=>{
                      return(
                        <tr key={index}>
                           <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.salesChannelTypeId}</td>
                          {/* <td>{user.last_name}</td> */}
                        </tr>
                        )
                      }): <tr><td colSpan="5">Loading...</td></tr>
                    }
                    </tbody>
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

export default SalesChannels
