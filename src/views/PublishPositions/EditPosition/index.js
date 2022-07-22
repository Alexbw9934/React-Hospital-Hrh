import React from "react";
import { CCardHeader, CCol, CRow, CCard, CCardBody } from "@coreui/react";
import { withRouter } from "react-router";
import axios from "axios";
import { Form, Row, Select, Col, Button, Spin, Input, InputNumber } from "antd";

const config = localStorage.getItem("token");

class EditPosition extends React.Component {
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
    };
  }

  async componentDidMount() {
    let currentPosition = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}PublishPositions/${this.props.match.params.id}`,
    });
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
      currentPosition: currentPosition.data,
      loading: false,
    });
  }

  handleSubmit = (values) => {
    this.setState({ submitting: true });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}PublishPositions/${this.state.currentPosition.id}`,
      data: {
        id: this.state.currentPosition.id,
        programTypeId: values.programType,
        positionId: 0,
        catgoryofPositionId: values.postCategory,
        postionSpecialist: "",
        typesofofficefacilityId: values.postType,
        stateId: values.state,
        districtId: values.district,
        numberofPosition: values.noOfPositions,
        url: "string",
      },
    })
      .then((response) => {
        if (response && response.status == 204) {
          this.setState({
            submitting: false,
          });
          this.props.history.goBack();
        }
      })
      .catch((error) => {
        console.log({
          programTypeId: values.programType,
          positionId: 0,
          catgoryofPositionId: values.postCategory,
          postionSpecialist: "",
          typesofofficefacilityId: values.postType,
          stateId: values.state,
          districtId: values.district,
          numberofPosition: values.noOfPositions,
          url: "string",
        });
        console.log(error.response);
      });
  };

  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Edit Job Position</h4>
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
                      programType: this.state.currentPosition.programTypeId,
                      programPost: this.state.currentPosition.positionId,
                      postCategory:
                        this.state.currentPosition.catgoryofPositionId,
                      postType:
                        this.state.currentPosition.typesofofficefacilityId,
                      state: this.state.currentPosition.stateId,
                      district: this.state.currentPosition.districtId,
                      noOfPositions:
                        this.state.currentPosition.numberofPosition,
                      url: this.state.currentPosition.url,
                    }}
                  >
                    <Row gutter={20}>
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
                      <Col span={12}>
                        <Form.Item
                          label="Program Post"
                          name="programPost"
                          rules={[
                            {
                              required: true,
                              message: "Please enter program post!",
                            },
                          ]}
                        >
                          <Input placeholder="Select Program Post" />
                          {/* <Select
                            placeholder="Select Program Post"
                            // onChange={(event) => {
                            //   setDistrict1(event);
                            // }}
                          >
                            {Disctricts.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select> */}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          label="Category Of Post"
                          name="postCategory"
                          rules={[
                            {
                              required: true,
                              message: "Please select category of post!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Post Category">
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
                      <Col span={12}>
                        <Form.Item
                          label="Type of Post / Facility"
                          name="postType"
                          rules={[
                            {
                              required: true,
                              message: "Please select type of post!",
                            },
                          ]}
                        >
                          <Select placeholder="Select Type of Post">
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
                          label="URL"
                          name="url"
                          rules={[
                            {
                              required: true,
                              message: "Please enter url for the post!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter URL" />
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

export default withRouter(EditPosition);
