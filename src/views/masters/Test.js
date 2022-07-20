import React, { Component } from "react";
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
import axios from "axios";
const config=localStorage.getItem('token')
export class Test extends Component {
  constructor() {
    super();
    this.state = {
      users:{},

    };
  }

  componentDidMount() {
    axios.get("http://5.9.111.198:13880/api/users",
      {
        headers: {
          "Authorization":`Bearer ${config}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }
    )
      .then((res) =>{
        console.log(res.data)
        let data=res.data;
        console.log(data)
        // this.setState({users:data})
      })
  }
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Cities</h4>
              </CCardHeader>
              <CCard >
                <CCardBody >
                <table className="table striped bordered">
                      <tr>
                        <th>
                          <b>Resitration No.</b>
                        </th>
                        <th>
                          <b>Name</b>
                        </th>
                        <th>
                          <b>Email</b>
                        </th>
                        <th>
                          <b>State</b>
                        </th>
                        <th>
                          <b>District</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                      {this.state.users.length > 0 ? (
                        this.state.users.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.registrationNo}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.statePref1}</td>
                              <td>{user.districPref1}</td>
                              <td>

                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      )}
                    </table>
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default Test;
