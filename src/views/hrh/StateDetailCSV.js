import { cibDynatrace } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CRow,
} from "@coreui/react";
import { Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StateDetailCSV() {
  const location = useLocation();
  const [detail, setDetail] = useState([]);
  const [stateList, setStateList] = useState([]);
  const placeOfPositionArray = [
    { id: 1, name: "State" },
    { id: 2, name: "Division" },
    { id: 3, name: "District" },
  ];
  const [districtList, setDistrictList] = useState([]);
  const [divsionList, setDivisionList] = useState([]);
  const [facilityTypeList, setFacilityList] = useState([]);
  const role = localStorage.getItem("access_role");
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      setStateList(response.data);
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Districts`,
      method: "GET",
    }).then((response) => {
      setDistrictList(response.data);
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Divisions`,
      method: "GET",
    }).then((response) => {
      setDivisionList(response.data);
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}TypeofFacilityOffices`,
      method: "GET",
    }).then((response) => {
      setFacilityList(response.data);
    });
    console.log(location, "location");
    if (location.state.data) {
      axios({
        url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions`,
        method: "GET",
      }).then((response) => {
        console.log(response, "res");
        let arr=response.data.filter(d=>d.financialStatusId===location.state.data)
        setDetail(arr)
      });
    }
    if (location.state.pData) {
        axios({
          url: `${process.env.REACT_APP_API_URL}StatePysicalDistributions`,
          method: "GET",
        }).then((response) => {
            let arr=response.data.filter(d=>d.physicalStatusId===location.state.pData)
            setDetail(arr)
        });
      }
  }, []);

  return (
    <>
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>Distribution in State</h4>
                </div>
              </CCardHeader>
              <CCardBody>
                {location.state.data? 
                 <table className="table table-bordered table-sm">
                    <thead gutter={24}>
                      <tr>
                        <th>
                          <b>State</b>
                        </th>
                        <th>
                          <b>District</b>
                        </th>
                        <th>
                          <b>Division</b>
                        </th>
                        <th>
                          <b>Amount</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                       { detail.map((data,i)=>{
                         return( <tr key={i}>
                            <td>
                              {" "}
                              {stateList
                                .filter((obj) => obj.id === data.stateId)
                                .map((id) => {
                                  return id.name;
                                })}
                            </td>
                            <td>
                              {" "}
                              {districtList
                                .filter((obj) => obj.id === data.districtId)
                                .map((id) => {
                                  return id.name;
                                })}
                            </td>
                            <td>
                              {" "}
                              {divsionList
                                .filter((obj) => obj.id === data.divisionId)
                                .map((id) => {
                                  return id.name;
                                })}
                            </td>
                            <td>{data.amount}</td>
                          </tr>)})}
                    </tbody>
                  </table>:
                  <table className="table table-bordered table-sm">
                  <thead gutter={24}>
                    <tr>
                      <th>
                        <b>State</b>
                      </th>
                      <th>
                        <b>District</b>
                      </th>
                      <th>
                        <b>Division</b>
                      </th>
                      <th>
                        <b>No of Post Approve</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  { detail.map((data,i)=>{
                          return(<tr key={i}>
                          <td>
                            {" "}
                            {stateList
                              .filter((ob) => ob.id === data.stateId)
                              .map((id) => {
                                return id.name;
                              })}
                          </td>
                          <td>
                            {" "}
                            {districtList
                              .filter((ob) =>ob.id === data.districtId)
                              .map((id) => {
                                return id.name;
                              })}
                          </td>
                          <td>
                            {" "}
                            {divsionList
                              .filter((ob) => ob.id === data.divisionId)
                              .map((id) => {
                                return id.name;
                              })}
                          </td>
                          <td>{data.numofPostApprov}</td>
                        </tr>)})}
                  </tbody>
                </table>}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  );
}
export default StateDetailCSV;
