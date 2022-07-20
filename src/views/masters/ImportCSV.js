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

function ImportCSV() {
  const [file, setFile] = useState();
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
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

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(array);
    setArray(array.slice(0, -1));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  console.log(headerKeys);
  // const handleChange=(e)=>{

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
  }, []);
  const location=useLocation();
  const handleSubmit = (e) => {
    console.log('location found',location)
    e.preventDefault();
    if (location.query != null) {
      console.log('location found')
     array.map((val) => {
      let district = districtList
        .filter((data) => data.name === val["District"])
        .map((data) => {
          return data.id;
        });
      let division = divsionList
        .filter((data) => data.name === val["Division"])
        .map((data) => {
          return data.id;
        });
      let select = placeOfPositionArray
        .filter((data) => data.name === val["Select State/Division/Distt"])
        .map((data) => {
          return data.id;
        });
      let facility = facilityTypeList
        .filter((data) => data.facilityType === val["Facility Type"])
        .map((data) => {
          return data.id;
        });
      console.log(val["Amount\r"], "handleSubmit");
      let obj = {
        humanResourceProposalNationalId: location.query.hId,
        financialStatusId: location.query.fId,
        selectedValue: select[0],
        stateId: location.query.sId,
        divisionId: division[0],
        districtId: district[0],
        facilityTypeId: facility[0],
        amount: val["Amount\r"],
      };
      fetch(`${process.env.REACT_APP_API_URL}StateFinancialDistributions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then((resp) => {
        setMsg("Submitted Successfully!");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      });
    });
  }
    console.log(data, "data");
  };
  return (
    <>
      <div>
        <CRow>
          <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <form>
                    <input
                      type="file"
                      id="csvFileInput"
                      accept=".csv"
                      value={data || ""}
                      onChange={(e) => handleOnChange(e)}
                    />

                    <button
                      onClick={(e) => {
                        handleOnSubmit(e);
                      }}
                    >
                      IMPORT CSV
                    </button>
                  </form>
                </CCardHeader>
                <CCardBody>
                  {msg ? (
                    <CAlert
                      color="warning"
                      className="d-flex align-items-center"
                    >
                      <CIcon
                        name="cilWarning"
                        className="flex-shrink-0 me-2"
                        width={24}
                        height={24}
                      />
                      <div>{msg}</div>
                    </CAlert>
                  ) : null}
                  <CForm onSubmit={handleSubmit}>
                    {array.length > 0 ? (
                      <table className="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <td colSpan={array.length}>
                              <CButton color="primary" type="submit">
                                Save Data
                              </CButton>
                            </td>
                          </tr>
                        </thead>
                        <thead gutter={24}>
                          <tr>
                            {headerKeys.map((key, i) => (
                              <th key={i}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {array.map((item, i) => (
                            <tr key={i}>
                              {Object.values(item).map((val, i) => (
                                <td key={i}>
                                  {val}
                                  {/* <CFormGroup>
                                    <CInput onChange={(e)=>handleChange} value={val||""} />
                                  </CFormGroup> */}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                  </CForm>
                </CCardBody>
              </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  );
}
export default ImportCSV;
