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
} from "../../../actions/apiadd";
import moment from "moment";
const { confirm } = Modal;
const config = localStorage.getItem("token");

export class StatePending extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      users: [],
      userState: [],
      userDistrict: [],
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
          title: "Form ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Financial Year",
          dataIndex: "financialYear",
          key: "financialYear",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id == object.financialYear)
                .map((ob) => {
                  return `${new Date(
                    ob.fromDate
                  ).getFullYear()}-${new Date(
                    ob.toDate
                  ).getFullYear()}`})}
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
          title: "Status",
          dataIndex: "stateStatus",
          key: "stateStatus",
          render: (text) => (
            <a>
              Pending Approval
            </a>
          ),
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
              <CButton
                style={{ backgroundColor: "blue" }}
                 onClick={(e) => this.StoreCollector(e, record.id)}
              >
                <b style={{ color: "#fff" }}>Open</b>
              </CButton>
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
    axios({
      url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals`,
      method: "GET",
    }).then((response) => {
      console.log(response.data,'response');
      let arr=response.data.filter(data=>data.formStatus == 4 &&data.stateStatus==1)
      this.setState({ users: arr });
    });
   
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  StoreCollector = (e,id) => {
    this.props.history.push({
      pathname:  "/hrh/HumanResourceProposalDetails/HumanResourceProposalState",
      state: {
        data: id,
      },
    });
  };
  newCollector = () => {
      this.props.history.push({
        pathname: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState",
      });
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
                    <h4>Human Resource Proposal - State</h4>
                </div>
              </CCardHeader>
              <CCard>
                <CCardBody>

                    <Table
                      dataSource={this.state.users.sort((a, b) =>
                        a.id < b.id ? 1 : -1
                      )}
                      rowKey={"id"}
                      columns={this.state.columns}
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
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePending);
