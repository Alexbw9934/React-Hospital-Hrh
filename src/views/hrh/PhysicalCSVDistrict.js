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

function PhysicalCSVDistrict({hId,pId,dId,setTable}) {
  const [file, setFile] = useState();
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
  const [stateList, setStateList] = useState([]);
  const placeOfPositionArray = [
    { id: "1", name: "District" },
    { id: "3", name: "Block" },
    { id: "2", name: "City" },
  ];
  const [cityList, setCityList] = useState([]);
  const [blockList, setBlockList] = useState([]);
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
      url: `${process.env.REACT_APP_API_URL}Cities`,
      method: "GET",
    }).then((response) => {
      setCityList(response.data);
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Blocks`,
      method: "GET",
    }).then((response) => {
      setBlockList(response.data);
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}TypeofFacilityOffices`,
      method: "GET",
    }).then((response) => {
      setFacilityList(response.data);
    });
  }, []);
  const location = useLocation();
  const handleSubmit = (e) => {
    console.log("location found", location);
    e.preventDefault();
      console.log("location found");
      let obj={}
     let arr= array.map((val) => {
        let city = cityList
          .filter((data) => data.name === val["City"])
          .map((data) => {
            return data.id;
          });
        let block = blockList
          .filter((data) => data.name === val["Block"])
          .map((data) => {
            return data.id;
          });
        let select = placeOfPositionArray
          .filter((data) => data.name === val["Select District/Block/City"])
          .map((data) => {
            return data.id;
          });
        let facility = facilityTypeList
          .filter((data) => data.facilityType === val["Facility Type"])
          .map((data) => {
            return data.id;
          });
        console.log(val["Amount\r"], "handleSubmit");
        obj = {
          ...obj,
          humanResourceProposalNationalId: hId,
          physicalStatusId: pId,
          selectedValue: select[0],
          districtId: dId,
          blockId: block[0],
          cityId: city[0],
          facilityTypeId: facility[0],
          numofPostApprov: val['Number of Post approved(On going)'],
          numofPostProposed: val['Number of Post proposed'],
          numofPostDrop: val['Number of Post dropped'],
          numofPostPlace: val['Number of Post In place'],
          numofNewPostApprov: val['Number of new post approved'],
          monthlyAverSalary: val['Monthly average salary per month per post (in INR)'],
          totalNoPostApprov: val['Total number of posts approved in RoP - ((Ongoing + new approved)- Dropped)'],
          totalNoPostVacant: val['Total number of post vacant- (Total Approved in RoP- In Place)\r'],
        };
       return obj
      });
      setTable(e,arr)
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
                    color="succss"
                    className="d-flex align-items-center"
                  >
                     <CIcon
                    name="cilCheckCircle"
                    className="flex-shrink-0 me-2"
                    width={24}
                    height={24}
                  />
                      <div>{msg}</div>
                    </CAlert>
                  ) : null}
                  <CForm onSubmit={handleSubmit}>
                    {array.length > 0 ? (
                      <div>
                      <table className="table table-bordered table-sm">
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
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <CButton color="primary" type="submit">
                                Save Data
                              </CButton>
                              </div>
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
export default PhysicalCSVDistrict;
