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
import {
  retrieveProgramType,
  retrieveTypeOfPositions,
  retrieveCategoryOfPosition,
  retrieveTypeOfFacility,
  retrieveJobPosition,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class JobPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        categoryNameId: 0,
        typeofPosition: 0,
        programTypeId: 0,
        positionName: "",
        facilityTypeId: 0,
        status: 0,
      },
      editValue: {
        id: 0,
        categoryNameId: "",
        typeofPosition: 0,
        programTypeId: 0,
        positionName: "",
        facilityTypeId: 0,
        status: 0,
      },
      statusData: {
        operationType: 0,
        path: "",
        op: "replace",
        from: "string",
        value: 0,
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
    this.props.retrieveTypeOfPositions();
    this.props.retrieveProgramType();
    this.props.retrieveCategoryOfPosition();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveJobPosition();
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
    if (value.categoryNameId == 0)
      errors.categoryNameId = "Select the Category name.";
    if (value.programTypeId == 0)
      errors.programTypeId = "Select the Program Type.";
    if (value.positionName == "")
      errors.positionName = "Please enter the Position name.";
    if (value.facilityTypeId == 0)
      errors.facilityTypeId = "Select the place of post.";
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
      let check = this.props.jobPositionList.map((data) => {
        if (value.value.positionName == data.positionName) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/JobPositions", {
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
              categoryNameId: 0,
              typeofPosition: 0,
              programTypeId: 0,
              positionName: "",
              facilityTypeId: 0,
            },
          });
          this.props.retrieveJobPosition();
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
    axios.get(`http://5.9.111.198:13880/api/JobPositions/${id}`).then((res) => {
      console.log(res.data, "edit");
      let data = res.data;
      this.setState({ editValue: data });
    });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.categoryNameId == 0)
      errors.categoryNameId = "Select the Category name.";
    if (this.state.editValue.programTypeId == 0)
      errors.programTypeId = "Select the Type of Position.";
    if (this.state.editValue.facilityTypeId == 0)
      errors.facilityTypeId = "Select the Place of Post.";
    if (this.state.editValue.positionName == "")
      errors.positionName = "Please enter Position Name.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    console.log(this.state.editValue);
    // return
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/JobPositions/${id}`, {
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
            categoryNameId: 0,
            typeofPosition: 0,
            programTypeId: 0,
            positionName: "",
            facilityTypeId: 0,
          },
          statusData: {
            path: "",
            op: "replace",
            value: "",
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrieveJobPosition();
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
        value: status.toString() == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/JobPositions/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      this.setState({
        checkingMsg: false,
      });
      console.log("result", resp);
      this.props.retrieveJobPosition();
    });
  };
  render() {
    const { errors, editValue } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Job Position</h4>
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
                        <CLabel htmlFor="text-input">Position Name</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="positionName"
                          name="positionName"
                          onChange={this.updateChange}
                          defaultValue={editValue.positionName || ""}
                          value={editValue.positionName || ""}
                          invalid={errors.positionName ? true : false}
                        />
                        <FormFeedback>{errors.positionName}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Program Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="programTypeId"
                          name="programTypeId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.programTypeId || ""}
                          invalid={errors.programTypeId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.programTypeList &&
                            this.props.programTypeList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.programTypeId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Position</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPosition"
                          name="typeofPosition"
                          placeholder="Select"
                          readOnly
                          value={editValue.typeofPosition || ""}
                          //   invalid={errors.typeofPosition ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeOfPositionList &&
                            this.props.typeOfPositionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPosition}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Category Name</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="categoryNameId"
                          name="categoryNameId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.categoryNameId || ""}
                          invalid={errors.categoryNameId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.categoryOfPOsitionList &&
                            this.props.categoryOfPOsitionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.categoryName}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.categoryNameId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Facility Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="facilityTypeId"
                          name="facilityTypeId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.facilityTypeId || ""}
                          invalid={errors.facilityTypeId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeFacilityList &&
                            this.props.typeFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.facilityType}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.facilityTypeId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
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
                    </CFormGroup>
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
                        <CLabel htmlFor="text-input">Position Name </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="positionName"
                          name="positionName"
                          placeholder="Position Name"
                          value={this.state.value.positionName}
                          onChange={this.handleChange}
                          invalid={errors.positionName ? true : false}
                        />
                        <FormFeedback>{errors.positionName}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Program Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="programTypeId"
                          name="programTypeId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.programTypeId || ""}
                          invalid={errors.programTypeId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.programTypeList &&
                            this.props.programTypeList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.programTypeId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Position</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPosition"
                          name="typeofPosition"
                          placeholder="Select"
                          readOnly
                          value={this.state.value.typeofPosition || ""}
                          //   invalid={errors.typeofPosition ? true : false}
                        >
                          {/* <option value="0">-Select-</option> */}
                          {this.props.typeOfPositionList &&
                            this.props.typeOfPositionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPosition}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Category Name</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="categoryNameId"
                          name="categoryNameId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.categoryNameId || ""}
                          invalid={errors.categoryNameId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.categoryOfPOsitionList &&
                            this.props.categoryOfPOsitionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.categoryName}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.categoryNameId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Facility Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="facilityTypeId"
                          name="facilityTypeId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.facilityTypeId || ""}
                          invalid={errors.facilityTypeId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeFacilityList &&
                            this.props.typeFacilityList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.facilityType}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.facilityTypeId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
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
                    </CFormGroup>
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
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>Job Position List</h4>
                </CCardHeader>
                <CCardBody>
                  <Table
                    dataSource={this.props.jobPositionList.sort((a, b) =>
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
                      title="Position Name"
                      dataIndex="positionName"
                      key="positionName"
                    ></Table.Column>
                    <Table.Column
                      title="Program Type"
                      dataIndex="programTypeId"
                      key="programTypeId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.programTypeList
                            .filter((data) => data.id == user.programTypeId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Type of Position"
                      dataIndex="typeofPosition"
                      key="typeofPosition"
                      render={(text, user) => (
                        <>
                          {this.props.typeOfPositionList
                            .filter((data) => data.id == user.typeofPosition)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Category Name"
                      dataIndex="categoryNameId"
                      key="categoryNameId"
                      render={(text, user) => (
                        <>
                          {this.props.categoryOfPOsitionList
                            .filter((data) => data.id == user.categoryNameId)
                            .map((id) => {
                              return id.categoryName;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Facility Type"
                      dataIndex="facilityTypeId"
                      key="facilityTypeId"
                      render={(text, user) => (
                        <>
                          {this.props.typeFacilityList
                            .filter((data) => data.id == user.facilityTypeId)
                            .map((id) => {
                              return id.facilityType;
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    programTypeList: state.apiadd.programTypeList,
    typeOfPositionList: state.apiadd.typeOfPositionList,
    categoryOfPOsitionList: state.apiadd.categoryOfPOsitionList,
    typeFacilityList: state.apiadd.typeFacilityList,
    jobPositionList: state.apiadd.jobPositionList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveProgramType,
      retrieveTypeOfPositions,
      retrieveCategoryOfPosition,
      retrieveTypeOfFacility,
      retrieveJobPosition,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(JobPosition);
