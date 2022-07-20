import React from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
  CSelect,
} from "@coreui/react";
import {
  retrieveState,
  retrieveDistricts,
  retrieveDistrictCategory,
  retrieveFinancialYear,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { FormFeedback } from "reactstrap";
const config = localStorage.getItem("token");
class AddPerformanceAppraisal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {},
      role: localStorage.getItem("access_role"),
      errors: {},
      FMR: "",
      categoryofPositionId: 0,
      positionId: 0,
      PositionSanctioned: "",
      PersoninPlace: "",
      newRecruitment: "",
      vacantPlace: "",
      vacantPosition: "",
      casteId: 0,
      performanceAppraisalId: null,
      fromDate: "",
      toDate: "",
    };
  }

  async componentDidMount() {
    this.props.retrieveDistrictCategory();
    this.props.retrieveDistricts();
    this.props.retrieveFinancialYear();
    this.props.retrieveState();
    let locationState = this.props.location.state;
    let performanceAppraisalId = locationState
      ? locationState.performanceAppraisalId
      : null;
    performanceAppraisalId &&
      this.getPerformanceAppraisalBYId(performanceAppraisalId);
    this.setState({ performanceAppraisalId: performanceAppraisalId });
  }
  getPerformanceAppraisalBYId(Id) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}PerformanceAppraisals/${Id}`,
    }).then((response) => {
      let data = response.data;
      this.setState({
        FMR: data.fmr,
        categoryofPositionId: data.categoryPositionId,
        positionId: data.positionId,
        PositionSanctioned: data.totalNumberPosition,
        PersoninPlace: data.numberofPersonPlace,
        newRecruitment: data.numberofNewRecuritment,
        vacantPlace: data.totalNoofVacantPlace,
        vacantPosition: data.totalNoofVacantPosition,
        casteId: data.casteId,
        toDate: data.toDate.split("T")[0],
        fromDate: data.fromDate.split("T")[0],
      });
    });
  }
  handleSubmit = () => {
    this.setState({ submitting: true });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}PerformanceAppraisals`,
      data: {
        fmr: this.state.FMR,
        categoryPositionId: this.state.categoryofPositionId,
        positionId: this.state.positionId,
        totalNumberPosition: this.state.PositionSanctioned,
        numberofPersonPlace: this.state.PersoninPlace,
        numberofNewRecuritment: this.state.newRecruitment,
        totalNoofVacantPlace: this.state.vacantPlace,
        totalNoofVacantPosition: this.state.vacantPosition,
        casteId: this.state.casteId,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      },
    }).then((response) => {
      if (response.data) {
        console.log(response.data);
        this.setState({
          submitting: false,
        });
        this.props.history.goBack();
      }
    });
  };
  handleUpdate = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}PerformanceAppraisals/${this.state.performanceAppraisalId}`,
      data: {
        id: this.state.performanceAppraisalId,
        fmr: this.state.FMR,
        categoryPositionId: this.state.categoryofPositionId,
        positionId: this.state.positionId,
        totalNumberPosition: this.state.PositionSanctioned,
        numberofPersonPlace: this.state.PersoninPlace,
        numberofNewRecuritment: this.state.newRecruitment,
        totalNoofVacantPlace: this.state.vacantPlace,
        totalNoofVacantPosition: this.state.vacantPosition,
        casteId: this.state.casteId,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      },
    }).then((response) => {
      if (response) {
        this.props.history.goBack();
      }
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { obj, errors,role } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Add Performance Appraisal</h4>
              </CCardHeader>
              <CCardBody>
                {role === "district_role" ? (
                  <CForm onSubmit={this.handleSubmit}>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Date of Reporting
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            onChange={this.handleChange}
                            value={this.state.fromDate}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">Financial Year</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
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
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                          <FormFeedback>{errors.financialYear}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">Category of Post</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                categoryofPositionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.categoryofPositionId}
                          >
                            <option value="0">-Select-</option>
                            {this.props.positionList &&
                              this.props.positionList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Name of the Post{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                positionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.positionId}
                          >
                            <option value="0">-Select-</option>
                            {this.props.postList &&
                              this.props.postList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Name of the State/UT{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                positionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.positionId}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Name of the District{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                positionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.positionId}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Total number of Position Sanctioned
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="PositionSanctioned"
                            name="PositionSanctioned"
                            onChange={this.handleChange}
                            value={this.state.PositionSanctioned}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Type of the District{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                positionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.positionId}
                          >
                           <option value="0">-Select-</option>
                           {this.props.districtCategoryList &&
                              this.props.districtCategoryList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Number of post in place
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">Program Type</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                casteId: Number(e.target.value),
                              });
                            }}
                            value={this.state.casteId}
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
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Total number of positions in place(Except new
                            Joinee)
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Number of new joinee who's appraisal to be conducted
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">Type of post</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                casteId: Number(e.target.value),
                              });
                            }}
                            value={this.state.casteId}
                          >
                            <option value="0">-Select-</option>
                            {this.props.postList &&
                              this.props.postList.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel>
                            Number of post vacant(Sanctioned (old+new) in place
                            dropped)
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel>Number of staff to be appraised</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel>Number of staff appraised</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel>
                            Number of staff with appraisals in process
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel>
                            Number of staff with appraisals not initiated (Based
                            on[Formula:Staff to be appraised- (Staff appraised +
                            Staff appraisal in process)])
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="number"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel>
                            Remarks highlighting reasons for appraisals not
                            initiated
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="vacantPlace"
                            name="vacantPlace"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol></CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton
                          color="primary"
                          type="submit"
                        >
                          Save
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">From Date</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            placeholder="From"
                            onChange={this.handleChange}
                            value={this.state.fromDate}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">To Date</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="date"
                            id="toDate"
                            name="toDate"
                            placeholder="To"
                            onChange={this.handleChange}
                            value={this.state.toDate}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">FMR</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="FMR"
                            name="FMR"
                            placeholder="FMR"
                            onChange={this.handleChange}
                            value={this.state.FMR}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">Category of Post</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                categoryofPositionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.categoryofPositionId}
                          >
                            <option value="0">-Select-</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Name of the Post{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                positionId: Number(e.target.value),
                              });
                            }}
                            value={this.state.positionId}
                          >
                            <option value="0">-Select-</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Total number of Position Sanctioned
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="PositionSanctioned"
                            name="PositionSanctioned"
                            placeholder="Total PositionSanctioned"
                            onChange={this.handleChange}
                            value={this.state.PositionSanctioned}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Number of Person in Place{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="PersoninPlace"
                            name="PersoninPlace"
                            placeholder="Number of Person in Place"
                            onChange={this.handleChange}
                            value={this.state.PersoninPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Number of new Recruitment
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="newRecruitment"
                            name="newRecruitment"
                            placeholder="Number of new Recruitment"
                            onChange={this.handleChange}
                            value={this.state.newRecruitment}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Total number of vacant Place
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="vacantPlace"
                            name="vacantPlace"
                            placeholder="Total number of vacant Place"
                            onChange={this.handleChange}
                            value={this.state.vacantPlace}
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="8">
                          <CLabel htmlFor="text-input">
                            Total number of vacant Job Position
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            type="text"
                            id="vacantPosition"
                            name="vacantPosition"
                            placeholder="Total number of vacant Position"
                            onChange={this.handleChange}
                            value={this.state.vacantPosition}
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="6">
                          <CLabel htmlFor="text-input">
                            Break-up of vacant Job Position
                          </CLabel>
                        </CCol>
                        <CCol xs="6" sm="6">
                          <CSelect
                            placeholder="Select"
                            id="name"
                            name="name"
                            onChange={(e) => {
                              this.setState({
                                casteId: Number(e.target.value),
                              });
                            }}
                            value={this.state.casteId}
                          >
                            <option value="0">-Select-</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton
                          color="primary"
                          type="submit"
                        >
                          Save
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                )}
              </CCardBody>
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
    districtCategoryList: state.apiadd.districtCategoryList,
    financialYearList: state.apiadd.financialYearList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveFinancialYear,
      retrieveDistrictCategory,
      retrieveDistricts,
      retrieveState,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPerformanceAppraisal);
