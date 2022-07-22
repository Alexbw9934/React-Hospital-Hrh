import React from "react";
import { CCardHeader, CCol, CRow, CCard, CCardBody } from "@coreui/react";
import { withRouter } from "react-router";
import axios from "axios";
import {
  Form,
  Row,
  Select,
  Col,
  Button,
  Spin,
  Input,
  InputNumber,
  notification,
  Checkbox,
} from "antd";

const config = localStorage.getItem("token");

class AddPositions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      facilityTypes: [],
      programTypes: [],
      state: [],
      district: [],
      postCategory: [],
      componentSize: "default",
      submitting: false,
      category: [
        { key: "1", value: "Specialist" },
        { key: "2", value: "Medical Officer" },
        { key: "3", value: "Nurse" },
        { key: "4", value: "Paramedics" },
      ],
      qual: [],
      offer: "",
      resvCat: [],
      hiring: [
        { key: "1", value: "Normal" },
        { key: "2", value: "Biding" },
      ],
      isDisplayHiring: false,
      checked:false
    };
  }

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
      loading: false,
    });
    let qual = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}EducationQualification`,
    });
    this.setState({ qual: qual.data });
  }

  handleSubmit = (values) => {
    this.setState({ submitting: true });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}PublishPositions`,
      data: {
        programTypeId: values.programType,
        positionId: 0,
        catgoryofPositionId: values.postCategory,
        postionSpecialist: "",
        typesofofficefacilityId: values.postType,
        stateId: values.state,
        districtId: values.district,
        numberofPosition: values.noOfPositions,
        qual: values.qual,
        category: values.category,
        url: "string",
      },
    })
      .then((response) => {
        if (response.data) {
          this.setState({
            submitting: false,
          });
          this.props.history.goBack();
        }
      })
      .catch((error) => {
        this.setState({
          submitting: false,
        });
        notification.error({
          message:
            "There was a problem publishing this post, please try again later",
        });
      });
  };
  handleCategory = async (value) => {
    if (value == 1) this.setState({ isDisplayHiring: true });
    else this.setState({ isDisplayHiring: false });
  };
  handleCheck = (e) =>{
    this.setState({
      checked: e.target.checked,
    });
  }

  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Add Job Position</h4>
              </CCardHeader>
              <CCardBody>
                {this.state.loading ? (
                  <Spin />
                ) : (
                  <Form
                    onFinish={(values) => {
                      this.handleSubmit(values);
                    }}
                    layout="vertical"
                    initialValues={{
                      size: this.state.componentSize,
                    }}
                    size={this.state.componentSize}
                  >
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Category"
                          name="category"
                          rules={[
                            {
                              required: true,
                              message: "Please select a category!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select category"
                            onChange={this.handleCategory}
                          >
                            {this.state.category.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.key}>
                                  {item.value}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Type of Position"
                          name="postCategory"
                          rules={[
                            {
                              required: true,
                              message: "Please select type of position!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Type of Position">
                            {this.state.postCategory.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Essential Qualification"
                          name="qual"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please select a essential qualification!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Essential Qualification">
                            {this.state.qual.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Year of Experience"
                          name="exp"
                          rules={[
                            {
                              required: true,
                              message: "Please enter year of experience!",
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            placeholder="Please enter year of experience"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="What do We Offer"
                          name="offer"
                          rules={[
                            {
                              required: true,
                              message: "Please enter what do we offer!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Please enter what do we offer"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Types of Health facility"
                          name="postType"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please select types of health facility!",
                            },
                          ]}
                        >
                          <Select placeholder="Select types of health facility">
                            {this.state.facilityTypes.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Reservation by Category"
                          name="resvCat"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please select a reservation by category!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Reservation by Category">
                            {this.state.resvCat.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Program Type"
                          name="programType"
                          rules={[
                            {
                              required: true,
                              message: "Please select a program type!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Program Type">
                            {this.state.programTypes.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="State"
                          name="state"
                          rules={[
                            {
                              required: true,
                              message: "Please select a state!",
                            },
                          ]}
                        >
                          <Select placeholder="Select State">
                            {this.state.state.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="District"
                          name="district"
                          rules={[
                            {
                              required: true,
                              message: "Please select a district!",
                            },
                          ]}
                        >
                          <Select placeholder="Select District">
                            {this.state.district.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="No. of Job Positions"
                          name="noOfPositions"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter number of job positions available!",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Enter no. of job positions"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Application Link"
                          name="url"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter applicationl link for the post!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter application link" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Add a scanned copy of the Advertisement"
                          name="advet"
                          rules={[
                            {
                              required: true,
                              message:
                                "Add a scanned copy of the Advertisement!",
                            },
                          ]}
                        >
                          <Input
                            type="file"
                            placeholder="Add a scanned copy of the Advertisement"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Last date"
                          name="lastDate"
                          rules={[
                            {
                              required: true,
                              message: "Last date!",
                            },
                          ]}
                        >
                          <Input type="date" placeholder="Last date" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Hiring Type"
                          name="hiringType"
                          rules={[
                            {
                              required: true,
                              message: "Select Hiring Type!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Hiring Type"
                          >
                            {this.state.isDisplayHiring
                              ? this.state.hiring.map((item, index) => {
                                  return (
                                    <Select.Option key={index} value={item.key}>
                                      {item.value}
                                    </Select.Option>
                                  );
                                })
                              : <Select.Option value={1} selected>
                              Normal
                            </Select.Option>}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Advertisement"
                          name="adv"
                          
                        >
                          <Checkbox checked={this.state.checked} onChange={this.handleCheck}></Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={12} style={{display:this.state.checked?'block':'none'}}>
                        <Form.Item
                          label="Advt"
                          name="advt"
                          rules={[
                            {
                              required: true,
                              message: "Enter Advertisement!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Advertisement" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button
                        loading={this.state.submitting}
                        className="float-right"
                        type="primary"
                        htmlType="submit"
                      >
                        Publish Job Position
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default withRouter(AddPositions);
