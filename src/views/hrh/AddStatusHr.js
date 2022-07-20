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
import { withRouter } from "react-router";
import axios from "axios";

const config = localStorage.getItem("token");
const CatgoryofPositions = JSON.parse(
  localStorage.getItem("CatgoryofPositions")
);
const Positions = JSON.parse(localStorage.getItem("Positions"));
const Castes = JSON.parse(localStorage.getItem("Castes"));
class AddStatusHr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FMR: "",
      categoryofPositionId: 0,
      positionId: 0,
      PositionSanctioned: "",
      PersoninPlace: "",
      newRecruitment: "",
      vacantPlace: "",
      vacantPosition: "",
      casteId: 0,
      statusHrId: null,
      fromDate: "",
      toDate: "",
    };
  }

  async componentDidMount() {
    let locationState = this.props.location.state;
    let statusHrId = locationState ? locationState.statusHrId : null;
    statusHrId && this.getStatusHrBYId(statusHrId);
    this.setState({ statusHrId: statusHrId });
  }
  getStatusHrBYId(Id) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}StatusHRs/${Id}`,
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
      url: `${process.env.REACT_APP_API_URL}StatusHRs`,
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
      url: `${process.env.REACT_APP_API_URL}StatusHRs/${this.state.statusHrId}`,
      data: {
        id: this.state.statusHrId,
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
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  Add Status Hr
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
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
                          <option>select</option>
                          {CatgoryofPositions.map((user) => (
                            <option value={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Name of the Post </CLabel>
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
                          <option>select</option>
                          {Positions.map((user) => (
                            <option value={user.id}>{user.name}</option>
                          ))}
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
                            this.setState({ casteId: Number(e.target.value) });
                          }}
                          value={this.state.casteId}
                        >
                          <option>select</option>
                          {Castes.map((user) => (
                            <option value={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {!this.state.statusHrId ? (
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton
                          color="primary"
                          onClick={this.handleSubmit}
                          loading={this.state.submitting}
                        >
                          Save
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  ) : (
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton
                          color="primary"
                          onClick={this.handleUpdate}
                          loading={this.state.submitting}
                        >
                          Update
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default withRouter(AddStatusHr);
