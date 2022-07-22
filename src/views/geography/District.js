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
  CAlert,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import "../masters/style.css";
import {
  retrieveStateCategory,
  retrieveState,
  retrieveDistrictCategory,
  retrieveDistricts,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class District extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        name: "",
        districtCategoryId: 0,
        stateCategoryId: 0,
        stateId: 0,
        masterStatus: 0,
      },
      districtCategory: [],
      stateCategory: [],
      states: [],
      editValue: {
        id: 0,
        name: "",
        districtCategoryId: 0,
        stateCategoryId: 0,
        stateId: 0,
        masterStatus: 0,
      },
      edit: false,
      users: [],
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors: {},
    };
  }
  componentDidMount() {
    this.props.retrieveState();
    this.props.retrieveStateCategory();
    this.props.retrieveDistrictCategory();
    this.props.retrieveDistricts();
  }

  handleChange = (e) => {
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
    if (value.name == "") errors.name = "Please enter the name.";
    if (value.stateCategoryId == 0)
      errors.stateCategoryId = "Select the State Category.";
    if (value.stateId == 0) errors.stateId = "Select the State.";
    if (value.districtCategoryId == 0)
      errors.districtCategoryId = "Select the District Category.";
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
      let check = this.props.districtsList.map((data) => {
        if (value.value.name == data.name) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/Districts", {
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
          this.props.retrieveState();
          this.setState({
            value: {
              name: "",
              districtCategoryId: 0,
              stateCategoryId: 0,
              stateId: 0,
            },
          });
          this.props.retrieveDistricts();
          console.log("result", resp);
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true, errors: {}, checkingMsg: false });
    axios.get(`http://5.9.111.198:13880/api/Districts/${id}`).then((res) => {
      console.log(res.data);
      let data = res.data;
      this.setState({ editValue: data });
    });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.name == "") errors.name = "Please enter the name.";
    if (this.state.editValue.stateCategoryId == 0)
      errors.stateCategoryId = "Select the State Category.";
    if (this.state.editValue.districtCategoryId == 0)
      errors.districtCategoryId = "Select the District Category.";
    if (this.state.editValue.stateId == 0) errors.stateId = "Select the State.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/Districts/${id}`, {
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
            name: "",
            districtCategoryId: 0,
            stateCategoryId: 0,
            stateId: 0,
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrieveDistricts();
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
        path: "/masterStatus",
        value: status == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/Districts/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      setTimeout(() => {
        this.setState({
          checkingMsg: false,
          edit: false,
          errors: {},
        });
      }, 5000);
      console.log("result", resp);
      this.props.retrieveDistricts();
    });
  };
  render() {
    const { errors, editValue } = this.state;
    console.log(this.state.users, "************");
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>District</h4>
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
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="form"
                            name="name"
                            onChange={this.updateChange}
                            defaultValue={editValue.name || ""}
                            value={editValue.name || ""}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            District Category
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtCategoryId"
                            name="districtCategoryId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.districtCategoryId || ""}
                            invalid={errors.districtCategoryId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtCategoryList &&
                              this.props.districtCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>
                            {errors.districtCategoryId}
                          </FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State Category</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateCategoryId"
                            name="stateCategoryId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.stateCategoryId || ""}
                            invalid={errors.stateCategoryId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateCategoryList &&
                              this.props.stateCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateCategoryId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Status </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="masterStatus"
                            name="masterStatus"
                            placeholder="Select"
                            onChange={this.updateStatus}
                            value={editValue.masterStatus || ""}
                          >
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
                          Update
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    className="form-horizontal"
                    onSubmit={this.submitData}
                  >
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> District </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            placeholder="District"
                            value={this.state.value.name}
                            onChange={this.handleChange}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            District Category
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtCategoryId"
                            name="districtCategoryId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.districtCategoryId || ""}
                            invalid={errors.districtCategoryId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtCategoryList &&
                              this.props.districtCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>
                            {errors.districtCategoryId}
                          </FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State Category</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateCategoryId"
                            name="stateCategoryId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.stateCategoryId || ""}
                            invalid={errors.stateCategoryId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateCategoryList &&
                              this.props.stateCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateCategoryId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Status </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="masterStatus"
                            name="masterStatus"
                            placeholder="Select"
                            onChange={this.handleStatus}
                            value={this.state.value.masterStatus || ""}
                          >
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    {/* end */}
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
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
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>District List</h4>
                </CCardHeader>
                <CCardBody>
                  <Table
                    dataSource={this.props.districtsList.sort((a, b) =>
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
                      title="District"
                      dataIndex="name"
                      key="name"
                    ></Table.Column>
                    <Table.Column
                      title="District Category"
                      dataIndex="districtCategoryId"
                      key="districtCategoryId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.districtCategoryList
                            .filter(
                              (data) => data.id == user.districtCategoryId
                            )
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="State Category"
                      dataIndex="stateCategoryId"
                      key="stateCategoryId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.stateCategoryList
                            .filter((data) => data.id == user.stateCategoryId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="State"
                      dataIndex="stateId"
                      key="stateId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.stateList
                            .filter((data) => data.id == user.stateId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Status"
                      dataIndex="masterStatus"
                      key="masterStatus"
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
                          {user.masterStatus.toString() == 1 ? (
                            <CButton
                              color="danger"
                              style={{ backgroundColor: "red" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.masterStatus)
                              }
                            >
                              Inactivate
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              style={{ backgroundColor: "green" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.masterStatus)
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stateList: state.apiadd.stateList,
    stateCategoryList: state.apiadd.stateCategoryList,
    districtsList: state.apiadd.districtsList,
    districtCategoryList: state.apiadd.districtCategoryList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveState,
      retrieveDistrictCategory,
      retrieveDistricts,
      retrieveStateCategory,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(District);
