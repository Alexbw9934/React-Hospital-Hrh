import React, { useState, useEffect } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  // CLabel,
  CForm,
  CButton,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { setTimeout } from "core-js";
// const config=localStorage.getItem('token')
function CatgoryofPosition() {
  const [data, setData] = useState({
    id: 0,
    name: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    listApi();
  }, []);

  function listApi() {
    axios.get("http://5.9.111.198:13880/api/CatgoryofPositions").then((res) => {
      console.log(res.data);
      let data = res.data;
      setList(data);
      // console.log("arraydata",users);
      // setUsers(res.data.slice(0, 10));
      // console.log(list);
    });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  function submitData() {
    console.log("CatgoryofPositions", data);
    fetch("http://5.9.111.198:13880/api/CatgoryofPositions", {
      method: "POST",
      headers: {
        // "Authorization":`Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((resp) => {
      console.log("result", resp);
      listApi();
    });
  }
  return (
    <div>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <h4>
                Job Category
              </h4>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  {/* <CCol md="2">
                      <CLabel htmlFor="text-input"> <b>CatgoryofPosition</b></CLabel>
                    </CCol> */}
                  <CCol xs="12" sm="12">
                    <CInput
                      id="name"
                      name="name"
                      value={data.name}
                      placeholder="CatgoryofPosition"
                      onChange={handleChange}
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
            <CCard>
              <CCardHeader>Job Category List</CCardHeader>
              <CCardBody>
                <table
                  id="dtBasicExample"
                  cellSpacing="0"
                  width="100%"
                  className="table table-striped table-bordered table-sm"
                >
                  <tr>
                    <th>
                      <b>Sr.no</b>
                    </th>
                    <th>
                      <b>Caste</b>
                    </th>
                  </tr>
                  {list.length > 0 ? (
                    list.sort((a, b) => (a.id < b.id) ? 1 : -1).map((user, index) => {
                      return (
                        <tr key={user.id}>
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

export default CatgoryofPosition;
