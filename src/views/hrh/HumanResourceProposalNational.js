import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CAlert,
  CFormGroup,
  CSelect,
  CInput,
  CForm,
  CLabel,
  CButton,
} from "@coreui/react";
import {
  Form,
  Row,
  Select,
  Col,
  Input,
  Modal,
  Radio,
  Button,
  Tabs,
  Table,
  Space,
  Checkbox,
  message,
} from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  retrieveDistricts,
  retrieveProgramType,
  retrieveFinancialStatus,
  addHR,
} from "../../actions/apiadd";
import {
  fmrToCat,
  prorammToTypeofPost,
  subToFmr,
  typeToSubType,
  catToNamePost,
  retrieveSubTypeofPost,
  retrievePost,
  retrieveReprtingPeriod
} from "../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import "./style.css";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HumanResourceProposalNational extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      statusMsg: false,
      disableSub: false,
      modalShow: false,
      formStatus: 0,
      statusAmend: false,
      proToType: {},
      objAmend: {},
      opTypeToSubtype: {},
      opSubToFmr: {},
      opFmrToCat: {},
      opCatToPost: {},
      opCatToPost2: {},
      states: [],
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      amendList: [],
      tableData: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        // { id: "3", name: "Need Clarification" },
        { id: "3", name: "Approved" },
        // { id: "5", name: "Rejected" },
      ],
      statusArray: [
        { id: "0", name: "Draft" },
        { id: "1", name: "Pending Approval" },
        { id: "5", name: "Need Amendment" },
        { id: "4", name: "Approve" },
        { id: "6", name: "Canceled" },
        { id: "7", name: "Rejected" },
      ],
      nameofPostListN: [
        { id: "1", name: "ANM" },
        { id: "2", name: "Staff Nurse" },
      ],
      nameofPostListS: [
        { id: "1", name: "Surgeon" },
        { id: "2", name: "General Physician" },
      ],
      subTypePostList: [
        { id: "1", name: "SD(HRH)" },
        { id: "2", name: "SD (SS)- Support Staff SD" },
        { id: "3", name: "PM (HRH)" },
        { id: "4", name: "PM (DEO) -DEO" },
        { id: "5", name: "PM (SS)- Support Staff SD)" },
      ],
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        programType: 0,
        programCheck: false,
        submission: "",
        stateId: 0,
        typeofApprovalId: 0,
        financialYear: "",
        number: 0,
        reportPrdId: 0,
        userName: "Admin",
        formStatus: 0,
      },
      numberTableRows: [
        {
          humanResourceProposalNationalId: 0,
          programTypeId: 0,
          typeofPostId: 0,
          subTypeofPostId: 0,
          fmrCodeId: 0,
          categoryofPostId: 0,
          postId: 0,
          approvalTypeId: 0,
          numofPostApprov: 0,
          numofPostProposed: 0,
          numofPostDrop: 0,
          numofPostPlace: 0,
          numofNewPostApprov: 0,
          monthlyAverSalary: 0,
          sacnctionPost: 0,
          totalNoPostApprov: 0,
          totalNoPostVacant: 0,
        },
      ],
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      object: localStorage.getItem("object"),
      arrayObject: localStorage.getItem("arrayObject"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: 0,
      placeOfPositionArray: [
        { id: "1", name: "State" },
        { id: "3", name: "Division" },
        { id: "2", name: "District" },
      ],
      tableRows: [
        {
          finacialYearId: 0,
          categoryofPostId: 0,
          postId: 0,
          reqirementNo: 0,
          regSanctioned: 0,
          regInPlace: 0,
          contractualApprov: 0,
          contractualInPlace: 0,
          regContractSanctioned: 0,
          regContractInPlace: 0,
          percHrAvail: 0,
          totalAvail: 0,
        },
      ],
      paramId: 0,
      tabView: [],
      fmrList: [],
      programList: [],
      nameOfPostList: [],
    };
  }
  showConfirm = (value, status) => {
    confirm({
      // title:"",
      content: "Are you Sure?",
      onOk: () => {
        return status === 1
          ? this.changeStatus(value)
          : status === 4
          ? this.approv(value)
          : status === 6
          ? this.cancel(value)
          : status === 5
          ? this.need(value)
          : console.log("none");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  getObject = () => {
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      axios({
        url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
        method: "GET",
      }).then((response) => {
        this.setState({ obj: response.data });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}PhysicalStatus`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ numberTableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}FinancialStatus`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        console.log(arr, "checking array");
        let obj = {};
        const r = arr.map((data) => {
          let val = this.props.financialStatusList
            .filter((y) => y.id === data.budget)
            .map((x) => x.name);
          obj = {
            ...obj,
            programTypeId: data.programTypeId,
            budget: data.budget,
            name: val[0],
            amount: data.amount,
            finacialYearId: data.finacialYearId,
          };
          return obj;
        });
        this.setState({
          programList: [r],
        });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}KeyDeliverables`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}NationalPostProposalAmendmentReasons`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ amendList: arr });
      });
    }
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrieveFinancialStatus();
    this.props.retrieveReprtingPeriod()
    this.getObject();
    axios({
      url: `${process.env.REACT_APP_API_URL}Posts`,
      method: "GET",
    }).then((response) => {
      console.log(response,'name of posts')
      this.setState({ nameOfPostList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}FMRs`,
      method: "GET",
    }).then((response) => {
      this.setState({ fmrList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
      method: "GET",
    }).then((response) => {
      this.setState({ catPos: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Districts`,
      method: "GET",
    }).then((response) => {
      this.setState({ districtCategory: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Divisions`,
      method: "GET",
    }).then((response) => {
      this.setState({ divisionArray: response.data });
    });
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    this.props.retrievePost();
    this.props.retrieveSubTypeofPost();
  }
  handleChange = (e) => {
    console.log(e.target.value);
    const { obj } = this.state;
    this.setState({
      obj: {
        ...this.state.obj,
        [e.target.name]: e.target.value,
      },
      objAmend: {
        ...this.state.objAmend,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  handleTablePlace = (e, i) => {
    const { name, value } = e.target;
    let numberTableRows = [...this.state.numberTableRows];
    if (name === "categoryofPostId") {
      fetch(`${process.env.REACT_APP_API_URL}Posts/PostIdList?id=${value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp, "response");
          const { opCatToPost } = this.state;
          opCatToPost[i] = resp;
          this.setState({
            opCatToPost,
          });
        });
    }
    numberTableRows[i] = {
      ...numberTableRows[i],
      [name]: value,
    };
    this.setState({
      numberTableRows,
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    if (obj.submission === "")
      errors.submission = "Please pick date of submission.";
    if (obj.financialYear === 0)
      errors.financialYear = "Please enter the financial year.";
    if (obj.typeofApproval === "")
      errors.typeofApproval = "Please select Type of Approval.";
    if (obj.stateId === 0) errors.stateId = "Please select State.";
    if (obj.numberOfDivDist === "")
      errors.numberOfDivDist = "Please enter Division.";
    // if (obj.districtCategoryId === 0)
    //   errors.districtCategoryId = "Please select District.";
    if (obj.divsionId === "") errors.divsionId = "Please select Division.";
    if (obj.programType === 0)
      errors.programType = "Please select programe type.";
    if (obj.typeofPost === 0) errors.typeofPost = "Please select type of post.";
    if (obj.categoryofPostion === 0)
      errors.categoryofPostion = "Please select category of post.";
    if (obj.fmr === 0 || obj.fmr < 0) errors.fmr = "Please enter FMR number.";
    if (obj.numberofPostSanc === 0)
      errors.numberofPostSanc = "Please enter number of post sanction.";
    if (obj.numberofPostSanc < 0)
      errors.numberofPostSanc = "Please enter a valid number.";
    if (obj.numberofNewPost === 0 || obj.numberofNewPost < 0)
      errors.numberofNewPost = "Please enter number of new post.";
    if (obj.numberofOldSanc === 0 || obj.numberofOldSanc < 0)
      errors.numberofOldSanc = "Please enter number of old sanction.";
    if (obj.totalNoPostionApprov === 0 || obj.totalNoPostionApprov < 0)
      errors.totalNoPostionApprov =
        "Please enter total number of old position approve.";
    if (obj.numberofPostVaccant === 0 || obj.numberofPostVaccant < 0)
      errors.numberofPostVaccant = "Please enter number of post vacant.";
    if (obj.nameofPost === "") errors.nameofPost = "Please enter name of post.";
    if (
      obj.totalBudgetAprrINR === 0 ||
      obj.totalBudgetAprrINR < 0 ||
      obj.totalBudgetAprrINR.length > 10
    )
      errors.totalBudgetAprrINR = "Please enter total budget INR.";
    if (obj.numberofNewPostion === 0 || obj.numberofNewPostion < 0)
      errors.numberofNewPostion = "Please enter number of new position.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.obj),
        }
      ).then((resp) => {
        let id = resp.data.id;
        console.log("result", resp);
        if (this.state.numberTableRows.length > 0) {
          this.state.numberTableRows.map((data, i) => {
            fetch(
              `${process.env.REACT_APP_API_URL}PhysicalStatus/${data.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                }})
                  .then((response) => {
                    console.log(response, 'delete response from line')
                  })
                  .catch((error) => {})
            data.humanResourceProposalNationalId = id;
            data.stateId=this.state.obj.stateId
            data.financialYearId=this.state.obj.financialYear
            data.reportingPeriodId=this.state.obj.reportPrdId
            fetch(`${process.env.REACT_APP_API_URL}PhysicalStatus`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${config}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((resp) => {
              if (resp.status === 404) {
                this.setState({
                  errorMsg: true,
                });
                setTimeout(() => {
                  this.setState({ errorMsg: false });
                }, 10000);
              } else {
                this.setState({
                  postMsg1: true,
                  numberTableRows: [
                    {
                      programTypeId: 0,
                      typeofPostId: 0,
                      subTypeofPostId: 0,
                      fmrCodeId: 0,
                      categoryofPostId: 0,
                      postId: 0,
                      approvalTypeId: 0,
                      numofPostApprov: 0,
                      numofPostProposed: 0,
                      numofPostDrop: 0,
                      numofPostPlace: 0,
                      numofNewPostApprov: 0,
                      monthlyAverSalary: 0,
                      sacnctionPost: 0,
                      totalNoPostApprov: 0,
                      totalNoPostVacant: 0,
                    },
                  ],
                });
                setTimeout(() => {
                  this.setState({ postMsg1: false });
                }, 10000);
              }
              console.log("result", resp);
            });
          });
        }
        if (this.state.programList.length > 0) {
          this.state.programList.map((data, i) => {
            data.map((item, j) => {
              fetch(
                `${process.env.REACT_APP_API_URL}FinancialStatus/${item.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${config}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  }})
                    .then((response) => {
                      console.log(response, 'delete response from line')
                    })
                    .catch((error) => {})
              item.humanResourceProposalNationalId = id;
              item.stateId=this.state.obj.stateId
              item.financialYearId=this.state.obj.financialYear
              item.reportingPeriodId=this.state.obj.reportPrdId
              fetch(`${process.env.REACT_APP_API_URL}FinancialStatus`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    programList: [],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                }
                console.log("result", resp);
              });
            });
          });
        }
        if (this.state.tableRows.length > 0) {
          this.state.tableRows.map((data, i) => {
            fetch(
              `${process.env.REACT_APP_API_URL}KeyDeliverables/${data.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                }})
                  .then((response) => {
                    console.log(response, 'delete response from line')
                  })
                  .catch((error) => {})
            data.humanResourceProposalNationalId = id;
            data.stateId=this.state.obj.stateId
            data.financialYearId=this.state.obj.financialYear
            data.reportingPeriodId=this.state.obj.reportPrdId
            fetch(`${process.env.REACT_APP_API_URL}KeyDeliverables`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${config}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((resp) => {
              if (resp.status === 404) {
                this.setState({
                  errorMsg: true,
                });
                setTimeout(() => {
                  this.setState({ errorMsg: false });
                }, 10000);
              } else {
                this.setState({
                  postMsg1: true,
                  tableRows: [
                    {
                      humanResourceProposalNationalId: 0,
                      finacialYearId: 0,
                      categoryofPostId: 0,
                      postId: 0,
                      reqirementNo: 0,
                      regSanctioned: 0,
                      regInPlace: 0,
                      contractualApprov: 0,
                      contractualInPlace: 0,
                      regContractSanctioned: 0,
                      regContractInPlace: 0,
                      percHrAvail: 0,
                      totalAvail: 0,
                    },
                  ],
                });
                setTimeout(() => {
                  this.setState({ postMsg1: false });
                }, 10000);
              }
              console.log("result", resp);
            });
          });
        }
        this.setState({
          obj: {
            programType: 0,
            programCheck: false,
            submission: "",
            stateId: 0,
            typeofApprovalId: 0,
            financialYear: "",
            number: 0,
            reportPrdId: 0,
            userName: "Admin",
            formStatus: 0,
          },
          postMsg: true,
          disableSub: false,
        });
        setTimeout(() => {
          this.setState({ postMsg: false });
        }, 10000);
      });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}HumanResourceProposalNationals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.obj),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("SUCCESSS");
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`Error! status: ${response.status}`);
          }
        })
        .then((resp) => {
          console.log("result", resp);
          const id = resp.id;
          if (this.state.numberTableRows.length > 0) {
            this.state.numberTableRows.map((data, i) => {
              data.humanResourceProposalNationalId = id;
              data.stateId=this.state.obj.stateId
              data.financialYearId=this.state.obj.financialYear
              data.reportingPeriodId=this.state.obj.reportPrdId
              fetch(`${process.env.REACT_APP_API_URL}PhysicalStatus`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    numberTableRows: [
                      {
                        programTypeId: 0,
                        typeofPostId: 0,
                        subTypeofPostId: 0,
                        fmrCodeId: 0,
                        categoryofPostId: 0,
                        postId: 0,
                        approvalTypeId: 0,
                        numofPostApprov: 0,
                        numofPostProposed: 0,
                        numofPostDrop: 0,
                        numofPostPlace: 0,
                        numofNewPostApprov: 0,
                        monthlyAverSalary: 0,
                        sacnctionPost: 0,
                        totalNoPostApprov: 0,
                        totalNoPostVacant: 0,
                      },
                    ],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                }
                console.log("result", resp);
              });
            });
          }
          if (this.state.programList.length > 0) {
            this.state.programList.map((data, i) => {
              data.map((item, j) => {
                item.humanResourceProposalNationalId = id;
                item.stateId=this.state.obj.stateId
                item.financialYearId=this.state.obj.financialYear
                item.reportingPeriodId=this.state.obj.reportPrdId
                fetch(`${process.env.REACT_APP_API_URL}FinancialStatus`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${config}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(item),
                }).then((resp) => {
                  if (resp.status === 404) {
                    this.setState({
                      errorMsg: true,
                    });
                    setTimeout(() => {
                      this.setState({ errorMsg: false });
                    }, 10000);
                  } else {
                    this.setState({
                      postMsg1: true,
                      programList: [],
                    });
                    setTimeout(() => {
                      this.setState({ postMsg1: false });
                    }, 10000);
                  }
                  console.log("result", resp);
                });
              });
            });
          }
          if (this.state.tableRows.length > 0) {
            this.state.tableRows.map((data, i) => {
              data.humanResourceProposalNationalId = id;
              data.stateId=this.state.obj.stateId
              data.financialYearId=this.state.obj.financialYear
              data.reportingPeriodId=this.state.obj.reportPrdId
              fetch(`${process.env.REACT_APP_API_URL}KeyDeliverables`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    tableRows: [
                      {
                        humanResourceProposalNationalId: 0,
                        finacialYearId: 0,
                        categoryofPostId: 0,
                        postId: 0,
                        reqirementNo: 0,
                        regSanctioned: 0,
                        regInPlace: 0,
                        contractualApprov: 0,
                        contractualInPlace: 0,
                        regContractSanctioned: 0,
                        regContractInPlace: 0,
                        percHrAvail: 0,
                        totalAvail: 0,
                      },
                    ],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                }
                console.log("result", resp);
              });
            });
          }
          this.setState({
            obj: {
              programType: 0,
              programCheck: false,
              submission: "",
              stateId: 0,
              typeofApprovalId: 0,
              financialYear: "",
              number: 0,
              reportPrdId: 0,
              userName: "Admin",
              formStatus: 0,
            },
            postMsg: true,
            disableSub: false,
          });
          setTimeout(() => {
            this.setState({ postMsg: false });
          }, 10000);
        })
        .catch(() => {});
    }
  };
  removeClick = (i) => {
    let numberTableRows = [...this.state.numberTableRows];
    numberTableRows.splice(i, 1);
    this.setState({ numberTableRows });
  };
  handleTableFinance = (e, i, j) => {
    const { name, value } = e.target;
    let programList = [...this.state.programList];
    programList[j][i] = {
      ...programList[j][i],
      [name]: value,
    };
    this.setState({
      programList,
    });
  };
  handleFinance = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        programCheck: e.target.checked,
        programType: e.target.value,
      },
    });
    console.log(this.props.financialStatusList, "arra");
    if (e.target.checked === true) {
      let ob = {};
      let arr = this.props.programTypeList.map((val, i) => {
        return this.props.financialStatusList.map((item) => {
          ob = {
            ...ob,
            programTypeId: val.id,
            budget: item.id,
            name: item.name,
          };
          return ob;
        });
      });
      this.setState({
        programList: arr,
      });
    }
    if (e.target.name === "programType") {
      let ob = {};
      let arr = this.props.programTypeList
        .filter((data) => data.id === e.target.value)
        .map((val, i) => {
          return this.props.financialStatusList.map((item) => {
            ob = {
              ...ob,
              programTypeId: val.id,
              budget: item.id,
              name: item.name,
            };
            return ob;
          });
        });
      this.setState({
        programList: arr,
      });
    }
  };
  handleKeyTable = (e, i) => {
    const { name, value } = e.target;
    let tableRows = [...this.state.tableRows];
    tableRows[i] = {
      ...tableRows[i],
      [name]: value,
    };
    if (name === "categoryofPostId") {
      fetch(`${process.env.REACT_APP_API_URL}Posts/PostIdList?id=${value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp, "response");
          const { opCatToPost2 } = this.state;
          opCatToPost2[i] = resp;
          this.setState({
            opCatToPost2,
          });
        });
    }
    this.setState({
      tableRows,
    });
  };
  removeClick2 = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  changeStatus = async (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/formStatus",
          value: 1,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          message.success("Changed Successfully!");
          console.log("SUCCESSS");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 10000);
          this.getObject();
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    } else {
      this.setState({ obj: { ...this.state.obj, formStatus: 1 } });
      await fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.obj),
        }
      )
        .then((response) => {
          if (response.status === 201) {
            console.log("SUCCESSS");
            return response.json();
          } else if (response.status === 404) {
            throw new Error(`Error! status: ${response.status}`);
          }
        })
        .then((resp) => {
          console.log("result", resp);
          const id = resp.id;
          if (this.state.numberTableRows.length > 0) {
            this.state.numberTableRows.map((data, i) => {
              data.humanResourceProposalNationalId = id;
              fetch(`${process.env.REACT_APP_API_URL}PhysicalStatus`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    numberTableRows: [
                      {
                        programTypeId: 0,
                        typeofPostId: 0,
                        subTypeofPostId: 0,
                        fmrCodeId: 0,
                        categoryofPostId: 0,
                        postId: 0,
                        approvalTypeId: 0,
                        numofPostApprov: 0,
                        numofPostProposed: 0,
                        numofPostDrop: 0,
                        numofPostPlace: 0,
                        numofNewPostApprov: 0,
                        monthlyAverSalary: 0,
                        sacnctionPost: 0,
                        totalNoPostApprov: 0,
                        totalNoPostVacant: 0,
                      },
                    ],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                }
                console.log("result", resp);
              });
            });
          }
          if (this.state.programList.length > 0) {
            this.state.programList.map((data, i) => {
              data.map((item, j) => {
                item.humanResourceProposalNationalId = id;
                fetch(`${process.env.REACT_APP_API_URL}FinancialStatus`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${config}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(item),
                }).then((resp) => {
                  if (resp.status === 404) {
                    this.setState({
                      errorMsg: true,
                    });
                    setTimeout(() => {
                      this.setState({ errorMsg: false });
                    }, 10000);
                  } else {
                    this.setState({
                      postMsg1: true,
                      programList: [],
                    });
                    setTimeout(() => {
                      this.setState({ postMsg1: false });
                    }, 10000);
                  }
                  console.log("result", resp);
                });
              });
            });
          }
          if (this.state.tableRows.length > 0) {
            this.state.tableRows.map((data, i) => {
              data.humanResourceProposalNationalId = id;
              fetch(`${process.env.REACT_APP_API_URL}KeyDeliverables`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    tableRows: [
                      {
                        humanResourceProposalNationalId: 0,
                        finacialYearId: 0,
                        categoryofPostId: 0,
                        postId: 0,
                        reqirementNo: 0,
                        regSanctioned: 0,
                        regInPlace: 0,
                        contractualApprov: 0,
                        contractualInPlace: 0,
                        regContractSanctioned: 0,
                        regContractInPlace: 0,
                        percHrAvail: 0,
                        totalAvail: 0,
                      },
                    ],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                  this.setState({ statusMsg: true });
                  setTimeout(() => {
                    this.setState({ statusMsg: false });
                  }, 5000);
                }
                console.log("result", resp);
              });
            });
          }
          this.setState({
            obj: {
              programType: 0,
              programCheck: false,
              submission: "",
              stateId: 0,
              typeofApprovalId: 0,
              financialYear: "",
              number: "",
              reportPrdId: 0,
              userName: "Admin",
              formStatus: 1,
            },
            postMsg: true,
            disableSub: false,
          });
          setTimeout(() => {
            this.setState({ postMsg: false });
          }, 10000);
          this.getObject();
        })
        .catch(() => {});
    }
  };
  need = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/formStatus",
          value: 5,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          this.getObject();
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  cancel = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/formStatus",
          value: 6,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          message.success("Canceled Successfully!");
          console.log("SUCCESSS");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
          this.getObject();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  approv = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/formStatus",
          value: 4,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Approved Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          this.getObject();
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  handleAmend = () => {
    console.log(true);
    this.setState({ statusAmend: true });
  };
  submitAmmend = (e) => {
    e.preventDefault();
    if (this.state.obj.id) {
      let obj = {
        humanResourceProposalNationalId: this.state.obj.id,
        createdBy: "Admin",
        createdAt: new Date(),
        amendmentReason: this.state.objAmend.amendmentReason,
      };
      fetch(
        `${process.env.REACT_APP_API_URL}NationalPostProposalAmendmentReasons`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          let operation = [
            {
              op: "replace",
              path: "/formStatus",
              value: 5,
            },
          ];
          fetch(
            `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${this.state.obj.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${config}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(operation),
            }
          ).then((response) => {
            if (response.status === 201) {
              console.log("SUCCESSS");
              this.setState({ statusMsg: true });
              setTimeout(() => {
                this.setState({ statusMsg: false });
              }, 5000);
              return response.json();
            } else if (response.status === 404) {
              throw new Error(`Error! status: ${response.status}`);
            }
          });
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          this.setState({ statusAmend: false });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);

          this.getObject();
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  render() {
    const { obj, role, errors, programList, objAmend, amendList } = this.state;
    const propState = Object.assign({}, this.props.history.location.state);
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
                  {role === "admin_role" ? (
                    <h4>Human Resource Proposal - National</h4>
                  ) : role === "state_role" ? (
                    <h4>Human Resource Proposal - State</h4>
                  ) : (
                    <h4>Human Resource Proposal - District</h4>
                  )}
                </div>
              </CCardHeader>
              <CCard>
                {this.state.statusMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Changed Status Successfully!</div>
                  </CAlert>
                ) : null}
                {this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    {this.props.history.location.state ? (
                      <div>Updated Successfully</div>
                    ) : (
                      <div>Data save Successfully</div>
                    )}
                  </CAlert>
                ) : null}
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of submission</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="submission"
                              type="date"
                              placeholder="Date"
                              onChange={this.handleChange}
                              value={
                                obj && obj.submission
                                  ? obj.submission.split("T")[0] || ""
                                  : obj.submission || ""
                              }
                              // disabled={role === "admin_role" ? false : true}
                              invalid={errors.submission ? true : false}
                            />
                            <FormFeedback>{errors.submission}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Name of State/UT</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select State"
                              name="stateId"
                              value={obj.stateId || ""}
                              onChange={this.handleChange}
                              invalid={errors.stateId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Type of Approval</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    typeofApprovalId: e.target.value,
                                  },
                                })
                              }
                              value={obj.typeofApprovalId || ""}
                            >
                              <Radio value={1}>Annual RoP</Radio>
                              <Radio value={2}>Supplementary RoP</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.typeofApproval === ""
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {errors.typeofApproval}
                            </span>
                            {/* <FormFeedback>{errors.typeofApproval}</FormFeedback> */}
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Select Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select Number"
                              onChange={this.handleChange}
                              name="number"
                              value={obj.number || ""}
                              disabled={
                                obj.typeofApprovalId === 2 ? false : true
                              }
                            >
                              <option value="0">-Select-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </CSelect>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Reporting Period</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="reportngPriod"
                              value={obj.reportngPriod || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.reportingPeriodList &&
                                this.props.reportingPeriodList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="financialYear"
                              value={obj.financialYear || ""}
                              invalid={errors.financialYear ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {`${new Date(
                                          item.fromDate
                                        ).getFullYear()}-${new Date(
                                          item.toDate
                                        ).getFullYear()}`}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="formStatus"
                              value={obj.formStatus || ""}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.formStatus ? true : false}
                            >
                              <option value="0">Draft</option>
                              {this.state.statusArray.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Form ID</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.id || ""}
                              disabled
                              name="formId"
                              onChange={this.handleChange}
                            />
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                      <TabPane tab="Physical Status" key="1">
                        <table className="table table-bordered table-sm table-responsive">
                          <thead>
                            <tr>
                              <th style={{ width: "6.66%" }}>
                                <b>Program Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Sub type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>FMR Code</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Category of post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Approval Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post proposed</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post dropped</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post In place</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of new post approved</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of post vacant- (Total Approved
                                  in RoP- In Place)
                                </b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              data.totalNoPostApprov =
                                Number(data.numofPostApprov) +
                                Number(data.numofNewPostApprov) -
                                Number(data.numofPostDrop);
                              data.totalNoPostVacant =
                                Number(data.totalNoPostApprov) -
                                Number(data.numofPostPlace);
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                       style={{ width: "150px" }}
                                        name="programTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.programTypeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.programTypeList &&
                                          this.props.programTypeList.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.typeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.postList
                                          .filter(
                                            (val) =>
                                              val.programTypeId ===
                                              data.programTypeId
                                          )
                                          .map((user) => {
                                            return (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            );
                                          })}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="subTypeofPostId"
                                        value={data.subTypeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.subTypeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.subTypeofPostList
                                          .filter(
                                            (val) =>
                                              val.typeofPostId ===
                                              data.typeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="fmrCodeId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrCodeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList
                                          .filter(
                                            (val) =>
                                              val.subTypeofPost ===
                                              data.subTypeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.fmrCodeId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos
                                          .filter(
                                            (val) => val.fmrId === data.fmrCodeId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.categoryName}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.filter(d=>d.categoryofPostionId===data.categoryofPostId).map(
                                          (user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          )
                                        )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="approvalTypeId"
                                        value={data.approvalTypeId || ""}
                                        invalid={
                                          errors.approvalTypeId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        <option value="1">Number</option>
                                        <option value="2">Lumpsum </option>
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "150px" }}
                                        type={
                                          data.approvalTypeId === 1
                                            ? "number"
                                            : "text"
                                        }
                                        value={data.numofPostApprov || ""}
                                        name="numofPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostApprov ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostProposed || ""}
                                        name="numofPostProposed"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostProposed
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        name="numofPostDrop"
                                        value={data.numofPostDrop || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostDrop ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostPlace || ""}
                                        name="numofPostPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostPlace ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofNewPostApprov || ""}
                                        name="numofNewPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofNewPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.monthlyAverSalary || ""}
                                        name="monthlyAverSalary"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.monthlyAverSalary
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.totalNoPostApprov || ""}
                                        disabled
                                        name="totalNoPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        disabled
                                        value={data.totalNoPostVacant || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
                                    <td>
                                      <CIcon
                                        name="cilXCircle"
                                        className="flex-shrink-0 me-2"
                                        width={20}
                                        height={20}
                                        onClick={() => this.removeClick(i)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                            {obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
                              <tr>
                                <td colSpan={15}>
                                  <CButton
                                    color="primary"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onClick={() =>
                                      // console.log('hi')
                                      this.setState((prevState) => ({
                                        numberTableRows: [
                                          ...prevState.numberTableRows,
                                          {
                                            programTypeId: 0,
                                            typeofPostId: 0,
                                            subTypeofPostId: 0,
                                            fmrCodeId: 0,
                                            categoryofPostId: 0,
                                            postId: 0,
                                            approvalTypeId: 0,
                                            numofPostApprov: 0,
                                            numofPostProposed: 0,
                                            numofPostDrop: 0,
                                            numofPostPlace: 0,
                                            numofNewPostApprov: 0,
                                            monthlyAverSalary: 0,
                                            sacnctionPost: 0,
                                            totalNoPostApprov: 0,
                                            totalNoPostVacant: 0,
                                          },
                                        ],
                                      }))
                                    }
                                  >
                                    Add Line
                                  </CButton>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Financial Status" key="2">
                        <Row gutter={20}>
                          <Col span={12}>
                            <CFormGroup>
                              <Col>
                                <CLabel>Show all Program Types</CLabel>
                              </Col>
                              <Col>
                                <Checkbox
                                  checked={
                                    obj.programCheck === true ? true : false
                                  }
                                  onChange={(e) => this.handleFinance(e)}
                                />

                                <FormFeedback>{errors.program}</FormFeedback>
                              </Col>
                            </CFormGroup>
                          </Col>
                          <Col span={12}>
                            <CFormGroup>
                              <Col>
                                <CLabel>
                                  Filter Entry line for the Program Type
                                </CLabel>
                              </Col>
                              <Col>
                                <CSelect
                                  placeholder="Select"
                                  onChange={(e) => {
                                    this.handleFinance(e);
                                  }}
                                  name="programType"
                                  value={obj.programType || ""}
                                  invalid={errors.programType ? true : false}
                                  disabled={
                                    obj.programCheck === true ? true : false
                                  }
                                >
                                  <option value="0">-Select-</option>
                                  {this.props.programTypeList &&
                                    this.props.programTypeList.map(
                                      (item, index) => {
                                        return (
                                          <option key={index} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    )}
                                </CSelect>
                                <FormFeedback>{errors.program}</FormFeedback>
                              </Col>
                            </CFormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <CAlert color="primary">
                            Above filter will show data entry line for the
                            selected Program Type. You should ensure that you
                            are doing the data entry for all Program Types
                          </CAlert>
                        </Row>

                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>
                                <b>Program Type</b>
                              </th>
                              <th>
                                <center>
                                  <b>Budget Recommended under NRHM</b>
                                </center>
                              </th>
                              <th>
                                <b>Financial year</b>
                              </th>
                              <th>
                                <b> Amount (In Lakh)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {programList.map((val, j) => {
                              return val.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <CFormGroup>
                                        <CSelect
                                          name="programTypeId"
                                          placeholder="Select"
                                          disabled
                                          value={item.programTypeId || ""}
                                        >
                                          <option value="0">-Select-</option>
                                          {this.props.programTypeList &&
                                            this.props.programTypeList.map(
                                              (user) => (
                                                <option
                                                  key={user.id}
                                                  value={user.id}
                                                >
                                                  {user.name}
                                                </option>
                                              )
                                            )}
                                        </CSelect>
                                        <FormFeedback>
                                          {errors.placeofPostId}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      <b>{item.name}</b>
                                    </td>
                                    <td>
                                      {" "}
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTableFinance(e, i, j)
                                        }
                                        name="finacialYearId"
                                        value={item.finacialYearId || ""}
                                        invalid={
                                          errors.finacialYearId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.financialYearList &&
                                          this.props.financialYearList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {`${new Date(
                                                    item.fromDate
                                                  ).getFullYear()}-${new Date(
                                                    item.toDate
                                                  ).getFullYear()}`}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          type="number"
                                          value={item.amount || ""}
                                          name="amount"
                                          onChange={(e) =>
                                            this.handleTableFinance(e, i, j)
                                          }
                                          invalid={errors.amount ? true : false}
                                        />
                                      </CFormGroup>
                                    </td>
                                  </tr>
                                );
                              });
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Key Deliverables" key="3">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                Financial Year
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Category of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Name of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>
                                  Requirement
                                  <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Regular <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Contractual <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Regular + Contractual <br />
                                  (In Number)
                                </b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Percentage of HRH Available</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                {" "}
                                Target available (%)
                              </th>
                            </tr>
                            <tr>
                              <th>Sanctioned</th>
                              <th>IN place</th>
                              <th> Approved</th>
                              <th>In place</th>
                              <th>Sanctioned</th>
                              <th>In place</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        name="finacialYearId"
                                        value={data.finacialYearId || ""}
                                        invalid={
                                          errors.financialYear ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.financialYearList &&
                                          this.props.financialYearList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {`${new Date(
                                                    item.fromDate
                                                  ).getFullYear()}-${new Date(
                                                    item.toDate
                                                  ).getFullYear()}`}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos &&
                                          this.state.catPos.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList
                                          .filter(
                                            (d) =>
                                              d.categoryofPostionId ===
                                              data.categoryofPostId
                                          )
                                          .map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          })}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.reqirementNo || ""}
                                        name="reqirementNo"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.reqirementNo ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regSanctioned || ""}
                                        name="regSanctioned"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regSanctioned ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regInPlace || ""}
                                        name="regInPlace"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regInPlace ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.contractualApprov || ""}
                                        name="contractualApprov"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.contractualApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.contractualInPlace || ""}
                                        name="contractualInPlace"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.contractualInPlace
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regContractSanctioned || ""}
                                        name="regContractSanctioned"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regContractSanctioned
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regContractInPlace || ""}
                                        name="regContractInPlace"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regContractInPlace
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.percHrAvail || ""}
                                        name="percHrAvail"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.percHrAvail ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.totalAvail || ""}
                                        name="totalAvail"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.totalAvail ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7  ? null : (
                                    <td>
                                      <CIcon
                                        name="cilXCircle"
                                        className="flex-shrink-0 me-2"
                                        width={20}
                                        height={20}
                                        onClick={() => this.removeClick2(i)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {obj.formStatus === 4 ||
                        obj.formStatus === 6 ||
                        obj.formStatus === 7 ? null : (
                          <Row>
                            <CButton
                              color="primary"
                              style={{ marginTop: 10, marginBottom: 10 }}
                              onClick={() =>
                                // console.log('hi')
                                this.setState((prevState) => ({
                                  tableRows: [
                                    ...prevState.tableRows,
                                    {
                                      finacialYearId: 0,
                                      categoryofPostId: 0,
                                      postId: 0,
                                      reqirementNo: 0,
                                      regSanctioned: 0,
                                      regInPlace: 0,
                                      contractualApprov: 0,
                                      contractualInPlace: 0,
                                      regContractSanctioned: 0,
                                      regContractInPlace: 0,
                                      percHrAvail: 0,
                                      totalAvail: 0,
                                    },
                                  ],
                                }))
                              }
                            >
                              Add Line
                            </CButton>
                          </Row>
                        )}
                      </TabPane>
                      <TabPane tab="Amendments" key="4">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>Created By</th>
                              <th>Created At</th>
                              <th>Amendment Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {amendList.length > 0 ? (
                              amendList.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={data.createdBy}
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={
                                            data.createdAt
                                              ? data.createdAt.split("T")[0] ||
                                                ""
                                              : data.createdAt || ""
                                          }
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={data.amendmentReason}
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={3}>Loading...</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Audit logs" key="5">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>Created By</th>
                              <th>Created At</th>
                              <th>Field Name</th>
                              <th>Old Value</th>
                              <th>New Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    id="form"
                                    name="submission"
                                    type="text"
                                    disabled
                                    onChange={this.handleChange}
                                    value={objAmend.createdBy}
                                    invalid={errors.submission ? true : false}
                                  />
                                  <FormFeedback>
                                    {errors.submission}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    id="form"
                                    name="submission"
                                    type="text"
                                    disabled
                                    onChange={this.handleChange}
                                    value={objAmend.createdBy}
                                    invalid={errors.submission ? true : false}
                                  />
                                  <FormFeedback>
                                    {errors.submission}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    id="form"
                                    name="submission"
                                    type="text"
                                    disabled
                                    onChange={this.handleChange}
                                    value={objAmend.createdBy}
                                    invalid={errors.submission ? true : false}
                                  />
                                  <FormFeedback>
                                    {errors.submission}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    id="form"
                                    name="submission"
                                    type="text"
                                    disabled
                                    onChange={this.handleChange}
                                    value={objAmend.createdBy}
                                    invalid={errors.submission ? true : false}
                                  />
                                  <FormFeedback>
                                    {errors.submission}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    id="form"
                                    name="submission"
                                    type="text"
                                    disabled
                                    onChange={this.handleChange}
                                    value={objAmend.createdBy}
                                    invalid={errors.submission ? true : false}
                                  />
                                  <FormFeedback>
                                    {errors.submission}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    <Space size="middle" style={{ paddingTop: "5px" }}>
                      {obj.formStatus === 4 ||
                      obj.formStatus === 6 ||
                      obj.formStatus === 7 ? null : (
                        <CButton
                          disabled={this.state.disableSub}
                          color="primary"
                          type="submit"
                        >
                          {this.state.paramId ? "Update" : "Submit"}
                        </CButton>
                      )}
                      {obj.formStatus === 4 ||
                      obj.formStatus === 6 ||
                      obj.formStatus === 7 ? null : (
                        <CButton
                          color="light"
                          onClick={(e) => {
                            e.preventDefault();
                            this.partialSave();
                          }}
                        >
                          Save
                        </CButton>
                      )}
                      <CButton
                        color="dark"
                        // onClick={(e) => {
                        //      message.success('This is a success message');
                        //     }}
                      >
                        Download
                      </CButton>
                      {obj.formStatus === 0 || obj.formStatus === 5 ? (
                        <CButton
                          color="info"
                          onClick={() => {
                            this.showConfirm(obj.id, 1);
                          }}
                        >
                          Submit for Approval
                        </CButton>
                      ) : null}

                      {obj.formStatus === 1 ? (
                        <CButton
                          color="success"
                          onClick={() => this.showConfirm(obj.id, 4)}
                        >
                          Approve
                        </CButton>
                      ) : null}
                      {obj.formStatus === 1 ? (
                        <CButton
                          color="secondary"
                          onClick={() => this.handleAmend()}
                        >
                          Send for Amendment
                        </CButton>
                      ) : null}
                      {obj.formStatus === 0 || obj.formStatus === 1 ? (
                        <CButton
                          color="danger"
                          onClick={() => this.showConfirm(obj.id, 6)}
                        >
                          Cancel
                        </CButton>
                      ) : null}
                    </Space>
                  </CForm>
                  <Modal
                    width={1000}
                    height={500}
                    centered
                    visible={this.state.statusAmend}
                    onOk={() => this.submitAmmend}
                    onCancel={() => this.setState({ statusAmend: false })}
                  >
                    <CForm onSubmit={this.submitAmmend}>
                      <table className="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <th>Amendment Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <CFormGroup>
                                <CInput
                                  id="form"
                                  name="amendmentReason"
                                  type="text"
                                  onChange={this.handleChange}
                                  value={objAmend.amendmentReason}
                                  invalid={
                                    errors.amendmentReason ? true : false
                                  }
                                />
                                <FormFeedback>
                                  {errors.amendmentReason}
                                </FormFeedback>
                              </CFormGroup>
                            </td>
                            <td>
                              {" "}
                              <CButton color="primary" type="submit">
                                Submit
                              </CButton>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CForm>
                  </Modal>
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
    typeFacilityList: state.apiadd.typeFacilityList,
    financialYearList: state.apiadd.financialYearList,
    districtList: state.apiadd.districtsList,
    hrList: state.apiadd.hrList,
    programTypeList: state.apiadd.programTypeList,
    financialStatusList: state.apiadd.financialStatusList,
    catToPost: state.masterapi.catToPost,
    fmrToCatOption: state.masterapi.fmrToCatOption,
    subToFmrOption: state.masterapi.subToFmrOption,
    typeToSub: state.masterapi.typeToSub,
    optionTypeofPost: state.masterapi.optionTypeofPost,
    postList: state.masterapi.postList,
    subTypeofPostList: state.masterapi.subTypeofPostList,
    reportingPeriodList: state.masterapi.reportingPeriodList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      retrieveFinancialStatus,
      addHR,
      fmrToCat,
      prorammToTypeofPost,
      subToFmr,
      typeToSubType,
      catToNamePost,
      retrieveSubTypeofPost,
      retrievePost,
      retrieveReprtingPeriod,
      
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanResourceProposalNational);
