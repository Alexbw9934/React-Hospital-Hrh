import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { withRouter } from "react-router";
import { Spin } from "antd";
const config = localStorage.getItem("token");

class PublishPositions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availablePositions: "",
      loading: true,
    };
  }

  StoreCollector = (id) => {
    localStorage.setItem("document", JSON.stringify(id));
    this.props.history.push("/hrh/PersonalInformation");
  };

  async componentDidMount() {
    let programTypes = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}ProgramTypes`,
    });
    let facilityTypes = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}FacilityTypes`,
    });
    let state = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}States`,
    });
    let district = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}DistrictCategories`,
    });
    let postCategory = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
    });
    this.setState({
      programTypes: programTypes.data,
      facilityTypes: facilityTypes.data,
      state: state.data,
      district: district.data,
      postCategory: postCategory.data,
    });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}PublishPositions`,
    }).then((response) => {
      this.setState({
        availablePositions: response.data,
        loading: false,
      });
    });
  }

  filterProgramType = (id) => {
    let programType = this.state.programTypes;
    let finalType = "";
    programType.map((item) => {
      if (item.id === id) {
        finalType = item.name;
      }
    });
    return finalType;
  };

  filterCategoryOfPost = (id) => {
    let postCategory = this.state.postCategory;
    let finalType = "";
    postCategory.map((item) => {
      if (item.id === id) {
        finalType = item.name;
      }
    });
    return finalType;
  };

  filterTypeOfPost = (id) => {
    let facilityTypes = this.state.facilityTypes;
    let finalType = "";
    facilityTypes.map((item) => {
      if (item.id === id) {
        finalType = item.name;
      }
    });
    return finalType;
  };

  filterState = (id) => {
    let state = this.state.state;
    let finalType = "";
    state.map((item) => {
      if (item.id === id) {
        finalType = item.name;
      }
    });
    return finalType;
  };

  filterDistrict = (id) => {
    let district = this.state.district;
    let finalType = "";
    district.map((item) => {
      if (item.id === id) {
        finalType = item.name;
      }
    });
    return finalType;
  };

  render() {
    return (
      <div>
        {/* <Pdf targetRef={ref} filename="Applications.pdf">
        {({ toPdf }) => <button onClick={()=>this.props.history.push("/hrh/PdF")}>Generate Pdf</button>}
      </Pdf> */}
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Advertised Job Positions</h4>
                  <CButton
                    style={{ backgroundColor: "blue" }}
                    onClick={() =>
                      this.props.history.push("/hrh/add-positions")
                    }
                  >
                    <b style={{ color: "white" }}>Add Job Position</b>
                  </CButton>
                </CCardHeader>
                <CCard>
                  <CCardBody>
                    <table className="table striped bordered">
                      <tr>
                        <th>
                          <b>Program Type</b>
                        </th>
                        <th>
                          <b>Program Post</b>
                        </th>
                        <th>
                          <b>Category of Post</b>
                        </th>
                        <th>
                          <b>Type of office/facility</b>
                        </th>
                        <th>
                          <b>State</b>
                        </th>
                        <th>
                          <b>District</b>
                        </th>
                        <th>
                          <b>No. of Job Positions</b>
                        </th>
                        <th>
                          <b>URL</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                      {this.state.loading ? (
                        <Spin />
                      ) : (
                        this.state.availablePositions.map((item) => {
                          return (
                            <tr className="ml-5">
                              <td>
                                {this.filterProgramType(item.programTypeId)}
                              </td>
                              <td>-</td>
                              <td>
                                {this.filterCategoryOfPost(
                                  item.catgoryofPositionId
                                )}
                              </td>
                              <td>
                                {this.filterTypeOfPost(
                                  item.typesofofficefacilityId
                                )}
                              </td>
                              <td>{this.filterState(item.stateId)}</td>
                              <td>{this.filterDistrict(item.districtId)}</td>
                              <td>{item.numberofPosition}</td>
                              <td>{item.url}</td>
                              <td>
                                <CButton
                                  style={{ backgroundColor: "green" }}
                                  onClick={() =>
                                    this.props.history.push(
                                      "/hrh/edit-positions/" + item.id
                                    )
                                  }
                                >
                                  <b style={{ color: "white" }}>Edit</b>
                                </CButton>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </table>
                    {/* <CButton onClick={()=>this.props.history.push("/hrh/PdF")}>Generate Pdf</CButton> */}
                  </CCardBody>
                </CCard>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}

export default withRouter(PublishPositions);

//  export class Example extends React.PureComponent {
//   render() {
//     return (
//       <div>
//       <ReactToPrint
//         trigger={() => <button>Print this out!</button>}
//         content={() => this.componentRef}
//       />
//       <Applications ref={(el) => (this.componentRef = el)} />
//     </div>
//     );
//   }
// }
// export default withRouter(Example);
