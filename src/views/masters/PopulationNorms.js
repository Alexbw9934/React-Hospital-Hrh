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
  CAlert,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import {
  retrievePopulationNorms,
  retrievePlaceOfFacility,
  retrieveTypeOfFacility,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import "./style.css";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class PopulationNorms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add:false,
      value: {
        id: 0,
        population: "",
        typeofFacilityId: 0,
        placeofFacilityId: 0,
        status: 0,
      },
      editValue: {
        id: 0,
        population: "",
        typeofFacilityId: 0,
        placeofFacilityId: 0,
        status: 0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors: {},
    };
  }

  componentDidMount() {
    this.props.retrievePopulationNorms();
    this.props.retrievePlaceOfFacility();
    this.props.retrieveTypeOfFacility();
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  handleStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  validate = () => {
    const { value } = this.state;
    let errors = {};
    if (value.population == "")
      errors.population = "Please enter the population.";
    if (value.typeofFacilityId == 0)
      errors.typeofFacilityId = "Please Select the type of Facility.";
    if (value.placeofFacilityId == 0)
      errors.placeofFacilityId = "Please Select the place of Facility.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const value = this.state;
    const errors = this.validate();
    console.log("########", value.value);
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      let check = this.props.populationNormsList.map((data) => {
        if (value.value.population == data.population) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/PopulationNorms", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value.value),
        }).then((resp) => {
          this.setState({
            postMsg: true,
          });
          setTimeout(() => {
            this.setState({
              postMsg: false,
            });
          }, 5000);
          this.setState({
            value: {
              population: "",
              typeofFacilityId: 0,
              placeofFacilityId: 0,
            },
          });
          this.props.retrievePopulationNorms();
          console.log("result", resp);
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true,add:true, errors: {}, checkingMsg: false });
    axios
      .get(`http://5.9.111.198:13880/api/PopulationNorms/${id}`)
      .then((res) => {
        console.log(res.data, "edit");
        let data = res.data;
        this.setState({ editValue: data });
      });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.population == "")
      errors.population = "Please enter the name.";
    if (this.state.editValue.typeofFacilityId == 0)
      errors.typeofFacilityId = "Please Select the type of Facility.";
    if (this.state.editValue.placeofFacilityId == 0)
      errors.placeofFacilityId = "Please Select the place of Facility.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/PopulationNorms/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.editValue),
      }).then((resp) => {
        this.setState({
          updateMsg: true,
        });
        setTimeout(() => {
          this.setState({
            updateMsg: false,
          });
        }, 5000);
        this.setState({
          editValue: {
            id: 0,
            population: "",
            typeofFacilityId: 0,
            placeofFacilityId: 0,
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrievePopulationNorms();
      });
    } else {
      this.setState({ errors });
    }
  };
  updateChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      editValue: {
        ...this.state.editValue,
        [evt.target.name]: value,
      },
      errors: {
        ...this.state.errors,
        [evt.target.name]: "",
      },
    });
  };
  updateStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      editValue: {
        ...this.state.editValue,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  showConfirm = (value, status) => {
    confirm({
      title:
        status.toString() == 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk: () => {
        return this.changeStatus(value, status);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  changeStatus = (id, status) => {
    let operation = [
      {
        op: "replace",
        path: "/status",
        value: status == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/PopulationNorms/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      if (resp.status == 200) {
        this.setState({
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrievePopulationNorms();
      } else {
        console.log("result", resp);
      }
    });
  };
  render() {
    const { errors, editValue } = this.state;
    return (
      <div>
        {this.state.add?
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Population Norm</h4>
              </CCardHeader>
              <CCardBody>
                {this.state.checkingMsg ? (
                  <CAlert color="warning" className="d-flex align-items-center">
                    <CIcon
                      name="cilWarning"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>This name is already exist</div>
                  </CAlert>
                ) : this.state.updateMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Updated Successfully</div>
                  </CAlert>
                ) : this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Data save Successfully</div>
                  </CAlert>
                ) : this.state.deleteMsg ? (
                  <CAlert
                    color="danger"
                    className="d-flex align-items-center"
                    id="delete"
                  >
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Deleted Successfully</div>
                  </CAlert>
                ) : null}
                {this.state.edit ? (
                  <CForm
                    id="form1"
                    className="form-horizontal"
                    onSubmit={(e) => this.updateData(e, editValue.id)}
                  >
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Population Norm</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="population"
                          name="population"
                          onChange={this.updateChange}
                          defaultValue={editValue.population || ""}
                          value={editValue.population || ""}
                          invalid={errors.population ? true : false}
                        />
                        <FormFeedback>{errors.population}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Facility</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofFacilityId"
                          name="typeofFacilityId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.typeofFacilityId || ""}
                          invalid={errors.typeofFacilityId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeFacilityList &&
                            this.props.typeFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.facilityType}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofFacilityId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Place of Facilitity
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="placeofFacilityId"
                          name="placeofFacilityId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.placeofFacilityId || ""}
                          invalid={errors.placeofFacilityId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.placeOfFacilityList &&
                            this.props.placeOfFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.placeofFacilityId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Status </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="status"
                          name="status"
                          placeholder="Select"
                          onChange={this.updateStatus}
                          value={editValue.status || ""}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup> */}
                    <CFormGroup>
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" type="submit">
                        Update
                      </CButton>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    className="form-horizontal"
                    onSubmit={this.submitData}
                  >
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Population Norm </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="population"
                          name="population"
                          placeholder=" Population Norm"
                          value={this.state.value.population}
                          onChange={this.handleChange}
                          invalid={errors.population ? true : false}
                        />
                        <FormFeedback>{errors.population}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Facility</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofFacilityId"
                          name="typeofFacilityId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.typeofFacilityId || ""}
                          invalid={errors.typeofFacilityId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeFacilityList &&
                            this.props.typeFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.facilityType}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofFacilityId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Place of Facilitity
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="placeofFacilityId"
                          name="placeofFacilityId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.placeofFacilityId || ""}
                          invalid={errors.placeofFacilityId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.placeOfFacilityList &&
                            this.props.placeOfFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.placeofFacilityId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Status </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="status"
                          name="status"
                          placeholder="Select"
                          onChange={this.handleStatus}
                          value={this.state.value.status || ""}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup> */}
                    <CFormGroup>
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" type="submit">
                        Save
                      </CButton>
                    </CFormGroup>
                  </CForm>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
       : <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>Population Norm List</h4>
                </CCardHeader>
                <CCardBody>
                <CButton color="primary" onClick={()=>this.setState({ add: true })}>
                      Add New
                    </CButton>
                  <Table
                    dataSource={this.props.populationNormsList.sort((a, b) =>
                      a.id < b.id ? 1 : -1
                    )}
                    rowKey={"id"}
                  >
                    <Table.Column
                      title="ID"
                      dataIndex="id"
                      key="id"
                      render={(text, obj, i) => <>{i + 1}</>}
                    ></Table.Column>
                    <Table.Column
                      title="Population Norm"
                      dataIndex="population"
                      key="population"
                    ></Table.Column>
                    <Table.Column
                      title="Type of Facility"
                      dataIndex="typeofFacilityId"
                      key="typeofFacilityId"
                      render={(text, user) => (
                        <>
                          {this.props.typeFacilityList
                            .filter((data) => data.id == user.typeofFacilityId)
                            .map((id) => {
                              return id.facilityType;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Place of Facility"
                      dataIndex="placeofFacilityId"
                      key="placeofFacilityId"
                      render={(text, user) => (
                        <>
                          {this.props.placeOfFacilityList
                            .filter((data) => data.id == user.placeofFacilityId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Status"
                      dataIndex="status"
                      key="status"
                      render={(status) => (
                        <>{status.toString() == 0 ? "Inactive" : "Active"}</>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Action"
                      key="action"
                      render={(text, user) => (
                        <Space size="middle">
                          <CButton
                            color="primary"
                            style={{ backgroundColor: "#0D6EFD" }}
                            onClick={() => this.editForm(user.id)}
                          >
                            Edit
                          </CButton>
                          {user.status.toString() == 1 ? (
                            <CButton
                              color="danger"
                              style={{ backgroundColor: "red" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
                            >
                              Inactivate
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              style={{ backgroundColor: "green" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
                            >
                              Activate
                            </CButton>
                          )}
                        </Space>
                      )}
                    ></Table.Column>
                  </Table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
  }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    populationNormsList: state.apiadd.populationNormsList,
    typeFacilityList: state.apiadd.typeFacilityList,
    placeOfFacilityList: state.apiadd.placeOfFacilityList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrievePopulationNorms,
      retrievePlaceOfFacility,
      retrieveTypeOfFacility,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PopulationNorms);
