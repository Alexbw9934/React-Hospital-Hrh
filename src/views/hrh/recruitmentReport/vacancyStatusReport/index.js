import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton,
} from "@coreui/react";
import { Button, Space, Modal, Table } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  retrieveState,
  retrieveDistricts,
  retrieveDivision,
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  retrievePlaceOfPost,
} from "../../../../actions/apiadd";
import moment from "moment";
const { confirm } = Modal;
const config = localStorage.getItem("token");

export class VacancyStatusReportDetails extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      users: [],
      userState: [],
      states: [],
      role: localStorage.getItem("access_role"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: [
        { id: "1", name: "State" },
        { id: "2", name: "District" },
        { id: "3", name: "Division" },
      ],
      divisionArray: [],
      catPos: [],
      districtCategory: [],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text, object, index) => <a>{index + 1}</a>,
        },
        {
          title: "Place of Position",
          dataIndex: "placeofPostId",
          key: "placeofPostId",
          render: (text, object) => (
            <a>
              {this.state.placeOfPosition
                .filter((data) => data.id == object.placeofPostId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "State",
          dataIndex: "stateId",
          key: "stateId",
          render: (text, obj) => (
            <a>
              {this.props.stateList
                .filter((data) => data.id == obj.stateId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Division",
          dataIndex: "divisionId",
          key: "divisionID",
          render: (text, obj) => (
            <a>
              {this.props.districtsList
                .filter((data) => data.id == obj.districtId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "District",
          dataIndex: "districtId",
          key: "districtId",
          render: (text, obj) => (
            <a>
              {this.props.districtsList
                .filter((data) => data.id == obj.districtId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Facility",
          dataIndex: "typeofFacilityOfficeId",
          key: "typeofFacilityOfficeId",
          render: (text, obj) => (
            <a>
              {this.props.typeFacilityList
                .filter((data) => data.id == obj.typeofFacilityOfficeId)
                .map((id) => {
                  return id.facilityType;
                })}
            </a>
          ),
        },
        {
          title: "Sanctioned Posts",
          dataIndex: "sacnctionPost",
          key: "sacnctionPost",
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (text, record) => (
        //     <Space size="middle">
        //       <CButton
        //         style={{ backgroundColor: "blue" }}
        //         onClick={(e) => this.StoreCollector(e, record.id)}
        //       >
        //         <b style={{ color: "#fff" }}>Open</b>
        //       </CButton>
        //     </Space>
        //   ),
        // },
      ],
      columnsNational: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text, object, index) => <a>{index + 1}</a>,
        },
        {
          title: "Financial Year",
          dataIndex: "financialYearId",
          key: "financialYearId",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id == object.financialYearId)
                .map((ob) => {
                  return ob.name;
                })}
            </a>
          ),
        },
        {
          title: "State",
          dataIndex: "stateId",
          key: "stateId",
          render: (text, obj) => (
            <a>
              {this.props.stateList
                .filter((data) => data.id == obj.stateId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Name of Post",
          dataIndex: "namePost",
          key: "namePost",
        },
        {
          title: "Place of the Post",
          dataIndex: "placeOfPostId",
          key: "placeOfPostId",
          render: (text, obj) => (
            <a>
              {this.props.placeOfPostList
                .filter((data) => data.id == obj.placeOfPostId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <Link
              to={{
                pathname: `/hrh/recruitmentReports/AdvsertisementStatusReport`,
                state: { data: record.id },
              }}
            >
              <CButton
                style={{ backgroundColor: "blue" }}
                // onClick={(e) => this.StoreCollector(e, record.id)}
              >
                <b style={{ color: "#fff" }}>Open</b>
              </CButton>
            </Link>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    this.props.retrieveState();
    this.props.retrieveDistricts();
    this.props.retrieveDivision();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveFinancialYear();
    this.props.retrievePlaceOfPost();
    axios({
      url: `${process.env.REACT_APP_API_URL}RegularCadreSD`,
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}StateDetailsTab`,
      method: "GET",
    }).then((response) => {
      console.log(response.data, "yyyyyyyyyyy");
      this.setState({ userState: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  StoreCollector = (id) => {
    this.props.history.push({
      pathname: "/hrh/humanResourceProposalReports/SDNHM",
      state: {
        data: id,
      },
    });
  };
  newCollector = () => {
    if (this.state.role == "admin_role") {
      this.props.history.push({
        pathname: "/hrh/recruitmentReports/VacancyStatusReport",
      });
    } else {
      this.props.history.push({
        pathname: "/hrh/recruitmentReports/VacancyStatusReport",
      });
    }
  };
  render() {
    const { isSupplementary, role } = this.state;
    return (
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
                  
                    <h4>Vacancy Status Report </h4>
                    </div>
               
              </CCardHeader>
              <CCard>
                <CButton
                  color="primary"
                  onClick={() => this.newCollector()}
                  style={{
                    height: "20%",
                    width: "10%",
                    marginLeft: 15,
                    marginTop: 10,
                  }}
                >
                  Add New
                </CButton>
                <CCardBody>
                  <Table
                    dataSource={this.state.users.sort((a, b) =>
                      a.id < b.id ? 1 : -1
                    )}
                    rowKey={"id"}
                    columns={this.state.columnsNational}
                  />
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateList: state.apiadd.stateList,
    districtsList: state.apiadd.districtsList,
    divisionList: state.apiadd.divisionList,
    typeFacilityList: state.apiadd.typeFacilityList,
    financialYearList: state.apiadd.financialYearList,
    placeOfPostList: state.apiadd.placeOfPostList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveState,
      retrieveDistricts,
      retrieveDivision,
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrievePlaceOfPost,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacancyStatusReportDetails);
