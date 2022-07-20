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
// import AsyncSelect from "react-select";
const config = localStorage.getItem("token");
const districts = JSON.parse(localStorage.getItem("districts"));
const ProgramTypes = JSON.parse(localStorage.getItem("ProgramTypes"));
const PlaceofPosts = JSON.parse(localStorage.getItem("PlaceofPosts"));
const TypeofFacilityOffices = JSON.parse(localStorage.getItem("TypeofFacilityOffices"));
const CatgoryofPositions = JSON.parse(localStorage.getItem("CatgoryofPositions"));
const Positions = JSON.parse(localStorage.getItem("Positions"));
const states = JSON.parse(localStorage.getItem("states"));
class AddRecruitmentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            reportingPeriod_From: "",
            reportingPeriod_To: "",
            financialYearFrom_Date: "2021-09-04T14:19:10.665Z",
            financialYearTo_Date: "2021-09-04T14:19:10.665Z",
            stateId: 0,
            states: {
                id: 0,
                name: "string",
                stateCode: "string",
                countryId: 0,
                country: {
                    id: 0,
                    name: "string",
                    countryCode: "string",
                },
            },
            districtId: 0,
            districtCategories: {
                id: 0,
                name: "string",
            },
            programTypeId: 0,
            programType: {
                id: 0,
                name: "string",
            },
            programPost: "string",
            placeofPostId: 0,
            placeofPost: {
                id: 0,
                name: "string",
            },
            typesofofficeId: 0,
            typeofFacility: {
                id: 0,
                name: "string",
            },
            categoryofPostId: 0,
            catgoryofPosition: {
                id: 0,
                name: "string",
            },
            positionId: 0,
            position: {
                id: 0,
                name: "string",
            },
            RecruitmentStatusId: null
        };

    }
    componentDidMount() {
        let locationState = this.props.location.state;
        let RecruitmentStatusId = locationState ? locationState.RecruitmentStatusId : null;
        RecruitmentStatusId && this.getRecruitmentStatusBYId(RecruitmentStatusId);
        this.setState({ RecruitmentStatusId: RecruitmentStatusId });
    }
    getRecruitmentStatusBYId(Id) {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}RecruitmentStatus/${Id}`,
        }).then((response) => {
            console.log(response);
            let data = response.data;
            this.setState({
                reportingPeriod_From: data.reportingPeriod_From,
                reportingPeriod_To: data.reportingPeriod_To,
                stateId: data.stateId,
                districtId: data.districtId,
                programTypeId: data.programTypeId,
                placeofPostId: data.placeofPostId,
                typesofofficeId: data.typesofofficeId,
                categoryofPostId: data.categoryofPostId,
                positionId: data.positionId,
                programPost: data.programPost
            });
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    submitData = () => {
        this.setState({ submitting: true });
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}RecruitmentStatus`,
            data: {
                reportingPeriod_From: this.state.reportingPeriod_From,
                reportingPeriod_To: this.state.reportingPeriod_To,
                stateId: this.state.stateId,
                districtId: this.state.districtId,
                programTypeId: this.state.programTypeId,
                placeofPostId: this.state.placeofPostId,
                typesofofficeId: this.state.typesofofficeId,
                categoryofPostId: this.state.categoryofPostId,
                positionId: this.state.positionId,
                programPost: this.state.programPost
            },
        }).then((response) => {
            if (response.data) {
                this.setState({
                    submitting: false,
                });
                this.props.history.goBack();
            }
            this.setState({
                submitting: false,
            });
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
                                    Recruitment Status
                                </h4>
                            </CCardHeader>
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    {/* <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Reporting Period From</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="reportingPeriod_From"
                          name="reportingPeriod_From"
                          placeholder="reportingPeriod_From"
                          onChange={this.handleChange}
                        >
                          <option>From</option>
                          <option>10:00</option>
                          <option>12:00</option>
                          <option>2:00</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Reporting Period To</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="reportingPeriod_To"
                          name="reportingPeriod_To"
                          placeholder="reportingPeriod_To"
                          onChange={this.handleChange}
                        >
                          <option>To</option>
                          <option>12:00</option>
                          <option>2:00</option>
                          <option>4:00</option>
                          <option>6:00</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup> */}
                                    <CFormGroup row>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">
                                                    Reporting Period From
                                                </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CInput
                                                    type="date"
                                                    id="reportingPeriod_From"
                                                    name="reportingPeriod_From"
                                                    placeholder="From"
                                                    onChange={this.handleChange}
                                                    value={this.state.reportingPeriod_From}
                                                />
                                            </CCol>
                                        </CCol>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">
                                                    Reporting Period To
                                                </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CInput
                                                    type="date"
                                                    id="reportingPeriod_To"
                                                    name="reportingPeriod_To"
                                                    placeholder="To"
                                                    onChange={this.handleChange}
                                                    value={this.state.reportingPeriod_To}
                                                />
                                            </CCol>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Name Of State </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ stateId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.stateId}
                                                >
                                                    <option>select</option>
                                                    {states && states.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Name of District </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ districtId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.districtId}
                                                >
                                                    <option>select</option>
                                                    {districts && districts.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Program Type </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ programTypeId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.programTypeId}
                                                >
                                                    <option>select</option>
                                                    {ProgramTypes && ProgramTypes.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Place of Post </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ placeofPostId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.placeofPostId}
                                                >
                                                    <option>select</option>
                                                    {PlaceofPosts && PlaceofPosts.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Category of Post </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ categoryofPostId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.categoryofPostId}
                                                >
                                                    <option>select</option>
                                                    {CatgoryofPositions && CatgoryofPositions.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">
                                                    {" "}
                                                    Position-specialist{" "}
                                                </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ positionId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.positionId}
                                                >
                                                    <option>select</option>
                                                    {Positions && Positions.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                                {/* <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Surgeon</option>
                          <option>General Physician</option>
                          <option>Obstetrician</option>
                          <option>Gynaecologist</option>
                          <option>Paediatrician</option>
                          <option>Anaesthetist</option>
                          <option>Orthopaedic Surgeon</option>
                          <option>ENT specialist</option>
                          <option>Cardiology</option>
                          <option> Dermatologist</option>
                          <option>Urology</option>
                          <option>Others</option>
                        </CSelect> */}
                                            </CCol>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">Program Post </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CInput
                                                    id="name"
                                                    name="name"
                                                    placeholder="Program post"
                                                    onChange={(e) => {
                                                        this.setState({ programPost: e.target.value })
                                                    }}
                                                    value={this.state.programPost}
                                                    />
                                            </CCol>
                                        </CCol>
                                        <CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="text-input">
                                                    Type of office/facility
                                                </CLabel>
                                            </CCol>
                                            <CCol xs="12" sm="12">
                                                <CSelect
                                                    placeholder="Select"
                                                    id="name"
                                                    name="name"
                                                    onChange={(e) => {
                                                        this.setState({ typesofofficeId: Number(e.target.value) })
                                                    }}
                                                    value={this.state.typesofofficeId}
                                                >
                                                    <option>select</option>
                                                    {TypeofFacilityOffices && TypeofFacilityOffices.map((user) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CCol>
                                    </CFormGroup>
                                    {/* end */}
                                    {!this.state.RecruitmentStatusId ?
                                        <CFormGroup>
                                            <CCol sm="4">
                                                <CCol sm="10"></CCol>
                                                <CCol sm="8"></CCol>
                                                <CCol></CCol>
                                                <CButton color="primary" onClick={this.submitData} loading={this.state.submitting}>
                                                    Save
                                                </CButton>
                                            </CCol>
                                        </CFormGroup> : null}
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        );
    }
}

export default withRouter(AddRecruitmentStatus);
