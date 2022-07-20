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
export class DistrictCategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      users:{},

    };
  }
  componentDidMount() {
    axios.get("DistrictCategories",
      {
        headers: {
          // "Authorization":`Bearer ${config}`,
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
        this.setState({users:data})
      })
  }
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>DistrictCategoriesList</h4>
              </CCardHeader>
              <CCard >
                <CCardBody >
                  <table className="table striped bordered">
                    <tr>
                    <th>
                        <b>ID</b>
                      </th>
                      <th>
                        <b>Name</b>
                      </th>

                    </tr>
                    {this.state.users.length > 0 ? (
                      this.state.users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>

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

export default DistrictCategoriesList;
