import React, { useState, useRef, useEffect } from "react";
import { CCol } from "@coreui/react";
import { withRouter } from "react-router";
import $, { Callbacks } from "jquery";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Tabs,
  message,
  Upload,
  Row,
  Modal,
  InputNumber,
  Col,
} from "antd";
import './JoinWithus.css'
import moment from "moment";
const { confirm } = Modal;
const categories = [
  { id: "1", name: "Specialist" },
  { id: "2", name: "Medical Officer" },
  { id: "3", name: "Nurse" },
  { id: "4", name: "Paramedics" },
];
const domcile = [
  { id: "1", name: "Yes" },
  { id: "2", name: "No" },
];
// const Disctricts = [
//   { id: "1", name: "Andhra Pradesh" },
//   { id: "2", name: "Arunachal Pradesh" },
//   { id: "3", name: "Assam" },
//   { id: "4", name: "Bihar" },
// ];
const CandidateDashboard = () => {
  const componentRef = useRef();
  const [States, setStates] = useState([]);
  const [Positions, setPositions] = useState([]);
  const [Genders, setGenders] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [Cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabName, setTabName] = useState("1");
  const [componentSize, setComponentSize] = useState("default");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState();
  const [name, setName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [place, setPlace] = useState("");
  const [expInField, setExpInField] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [experience, setExperience] = useState("");
  const [cityPersonal, setCityPersonal] = useState("");
  const [districtPersonal, setDistrictPersonal] = useState("");
  const [statePersonal, setStatePersonal] = useState("");
  const [countryPersonal, setCountryPersonal] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [district1, setDistrict1] = useState([]);
  const [district2, setDistrict2] = useState([]);
  const [district3, setDistrict3] = useState([]);
  const [state1, setState1] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const [stateCouncil, setStateCouncil] = useState([]);
  const [councilName, setCouncilName] = useState("");
  const [councilPlace, setCouncilPlace] = useState("");
  const [year, setCouncilYear] = useState("");
  const [file, setfile] = useState([]);
  const [category, setcategory] = useState([]);
  const [Pos, setPos] = useState([]);
  const [qual, setQual] = useState([]);
  const [addQual, setAddQual] = useState("");
  const [streetPersonal1, setStreetPersonal1] = useState("");
  const [streetPersonal2, setStreetPersonal2] = useState("");
  const [statePersonalPrem, setStatePersonalPrem] = useState("");
  const [streetPersonalPrem1, setStreetPersonalPrem1] = useState("");
  const [streetPersonalPrem2, setStreetPersonalPerm2] = useState("");
  const [zipCodePrem, setZipCodePrem] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [dobProof, setDOBProof] = useState([]);
  const [domcileProof, setDomcileProof] = useState([]);
  const [qualProof, setQualProof] = useState([]);
  const [addQualProof, setAddQualProof] = useState([]);
  const [expProof, setExpProof] = useState([]);
  const [casteCategory, setCasteCategory] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedPos, setSelectedPos] = useState([]);
  const [selectedQual, setSelectedQual] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCasteCategory, setSelectedCasteCategory] = useState([]);
  const [selectedDomcileCert, setSelectedDomcileCert] = useState([]);
  const [selectedCityPersonal, setSelectedCityPersonal] = useState('');
  const [selectedDistrictPersonal, setSelectedDistrictPersonal] = useState([]);
  const [selectedStatePersonal, setSelectedStatePersonal] = useState([]);
  const [cityPrem, setCityPrem] = useState('');
  const [districtPerm, setDistrictPerm] = useState([]);
  const [statePrem, setStatePrem] = useState([]);
  const [specQual, setSpecQual] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [salary, setSalary] = useState("");
  const [specQualProof, setSpecQualProof] = useState([]);
  const [Disctricts, setDisctricts] = useState([]);

  const { TabPane } = Tabs;

  function callback(key) {
    setTabName(key + "");
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  function bootstrapTabControl() {
    // setSelectedTab((selectedtab+1)%tabCount)
    var i,
      items = $(".nav-link"),
      pane = $(".tab-pane");
    // next
    for (i = 0; i < items.length; i++) {
      if ($(items[i]).hasClass("active") === true) {
        break;
      }
    }
    console.log("i>>", i);
    if (i < items.length - 1) {
      // for tab
      $(items[i]).removeClass("active");
      $(items[i + 1]).addClass("active");
      // for pane
      $(pane[i]).removeClass("show active");
      $(pane[i + 1]).addClass("show active");
    }
    // Prev
  }

  function prev() {
    // setSelectedTab((selectedtab+tabCount-1)%tabCount)
    var i,
      items = $(".nav-link"),
      pane = $(".tab-pane");
    for (i = 0; i < items.length; i++) {
      if ($(items[i]).hasClass("active") === true) {
        break;
      }
    }
    if (i != 0) {
      // for tab
      $(items[i]).removeClass("active");
      $(items[i - 1]).addClass("active");
      // for pane
      $(pane[i]).removeClass("show active");
      $(pane[i - 1]).addClass("show active");
    }
  }

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      setStates(response.data);
      axios({
        url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
        method: "GET",
      }).then((response) => {
        setPositions(response.data);
        axios({
          url: `${process.env.REACT_APP_API_URL}Genders`,
          method: "GET",
        }).then((response) => {
          console.log("RESPONSE Gender", response.data);
          setGenders(response.data);
          axios({
            url: `${process.env.REACT_APP_API_URL}Countries`,
            method: "GET",
          }).then((response) => {
            setCountries(response.data);
            axios({
              url: `${process.env.REACT_APP_API_URL}Cities`,
              method: "GET",
            }).then((response) => {
              setCities(response.data);
            });
            axios({
              url: `${process.env.REACT_APP_API_URL}Districts`,
              method: "GET",
            }).then((response) => {
              setDisctricts(response.data);
              setLoading(false);
            });
          });
        });
      });
    });
    // setLoading(false);
    console.log(Cities);
  }, []);

  const handlePosition = (data) => {
    console.log("FORM DATA ", data);
    setPosition(data);
  };

  const submitApplication = () => {
    var params = {
      id: 0,
      name: name,
      email: email,
      fatherName: fathersName,
      dob: dob,
      phone: phone,
      address: address1,
      street1: address1,
      street2: address2,
      pincode: zipCode,
      image: "string",
      cityId: cityPersonal.id,
      // city: {
      //   id: 0,
      //   name: "string",
      //   cityCode: "string",
      // },
      countryId: countryPersonal.id,
      // country: countryPersonal,
      registrationNo: registrationNo,
      yearofIssue: "2021-09-08T14:43:41.503Z",
      nameofIssueCouncil: "string",
      place: place,
      stateId: statePersonal.id,
      // states: statePersonal,
      districtId: districtPersonal.id,
      // districtCategories: districtPersonal,
      statePref1: state1,
      statePref2: state2,
      statePref3: state3,
      districPref1: district1,
      districPref2: district2,
      districPref3: district3,
      categoryofPostId: position.id,
      // catgoryofPosition: position,
      positionId: position.id,
      // position: position,
      genderId: gender,
      experience: experience,
      additionalQualification: "string",
    };
    console.log("PARAMS ", params);

    axios
      .post(`${process.env.REACT_APP_API_URL}Applications`, params)
      .then((response) => {
        console.log("RESPONSE ", response);
        message.success("Application Submitted.");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const SameAsAbove = (e) => {
    let val = e.target.checked;
    if (val) {
      setIsDisabled(true);
    }
  };
  const setUploadFile = (e) => {
    // console.log("########",e.fileList)
    setQualProof(e.fileList);
    // console.log('***',qualProof)
  };
  function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must smaller than 2MB!");
    }
    return isLt2M;
  }
  const handleCategory = (e) => {
    setcategory(categories[e]);
    if (categories[e].id === "1") {
      setIsSpecial(true);
    } else setIsSpecial(false);
  };
  function showConfirm(value) {
    confirm({
      title:
        value === "submit" ? "Do you Want to Submit?" : "Do you Want to Print?",
      content: "Are you Sure",
      onOk() {
        value === "submit" ? submitApplication() : window.print();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Join Hands With NHM Portal</h2>
          <Tabs
            type="card"
            activeKey={tabName}
            onChange={(e) => {
              callback(e.toString());
            }}
          >
            <TabPane tab="BASIC DETAILS" key="1">
              {/* Home */}
            </TabPane>
            <TabPane tab="PERSONAL DETAILS" key="2">
              {/* Profile */}
            </TabPane>
            <TabPane tab="EDUCATION QUALIFICATION" key="3">
              {/* Education Qualification */}
            </TabPane>
            <TabPane tab="COUNCIL REGISTRATION" key="4">
              {/* Council Registration */}
            </TabPane>
            <TabPane tab="EXPERIENCE" key="5">
              {/* Experience */}
            </TabPane>
            <TabPane tab="LOCATION PREFERENCES" key="6">
              {/* Location Preferences */}
            </TabPane>
          </Tabs>
          {tabName === "1" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="APPLICATION ID">
                  <span>1234567</span>
                </Form.Item>
                <Form.Item label="NAME">
                  <Input
                    placeholder="Enter  Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="MOBILE NUMBER">
                  <Input
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="EMAIL">
                  <Input
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="SELECT CATEGORY">
                  <Select
                    placeholder="Select category"
                    // onChange={handleCategory}
                    value={category.name}
                    disabled
                  >
                    {categories.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {/* <Form.Item label="TYPE OF THE JOB POSITION">
                  <Select
                    placeholder="Select Position"
                    onChange={(e) => {
                      setSelectedPositions(Positions[e]);
                    }}
                    value={selectedPositions.id}
                  >
                    {Positions.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item> */}
                <Form.Item label="SELECT POSITION">
                  <Select
                    placeholder="Select Position"
                    onChange={(e) => {
                      setSelectedPos(Pos[e]);
                    }}
                    value={selectedPos.name}
                  >
                    {Pos.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {/* <Form.Item label="QUALIFICATION">
                  <Select
                    placeholder="Select Qualification"
                    onChange={(e) => {
                      setSelectedQual(qual[e]);
                    }}
                    value={selectedQual.name}
                  >
                    {qual.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="UPLOAD QUALIFICATION PROOF">
                  <Upload
                    type="file"
                    beforeUpload={beforeUpload}
                    onChange={setUploadFile}
                    maxCount="1"
                    fileList={[...qualProof]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item> */}
                {isSpecial && (
                  <Form.Item label="EXPECTED SALARY">
                    <Input
                      placeholder="Expected salary"
                      type="number"
                      onChange={(e) => {
                        setSalary(e.target.value);
                      }}
                      value={salary}
                    />
                  </Form.Item>
                )}
                {/* <Form.Item label="EXPERIENCE IN RELEVENT FIELD">
                  <InputNumber
                    min={0}
                    max={99}
                    style={{ width: "100%" }}
                    placeholder="Enter Experience"
                    id="expInField"
                    // onKeyPress={twoDigit()}
                    onChange={(value) => {
                      setExpInField(value);
                    }}
                    // maxCount="1"
                    value={expInField}
                  />
                </Form.Item>
                <Form.Item label="UPLOAD EXPERIENCE PROOF">
                  <Upload
                    onChange={(e) => setExpProof(e.fileList)}
                    beforeUpload={beforeUpload}
                    maxCount="1"
                    fileList={[...expProof]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item> */}
                <Form.Item>
                {(tabName === "0" || tabName === "1") && (
                  <button
                    className="nexttab btn btn-success"
                    id="nexttab"
                    onClick={() => callback(2)}
                  >
                    Next
                  </button> 
                )}
                 <button
                    className="btn btn-primary"
                    id="save"
                    style={{margin:5}}
                  >
                    save
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{margin:5}}
                  >
                    Withdraw
                  </button>
                  </Form.Item>
              </Form>
            </>
          )}
          {tabName === "2" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="FATHER'S NAME">
                  <Input
                    placeholder="Enter Father's Name"
                    onChange={(e) => setFathersName(e.target.value)}
                    value={fathersName}
                  />
                </Form.Item>
                <Form.Item label="GENDER">
                  <Select
                    placeholder="Select Gender"
                    onChange={(e) => {
                      setSelectedGender(Genders[e - 1]);
                    }}
                    value={selectedGender.name}
                  >
                    {Genders.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="DATE OF BIRTH">
                  <DatePicker
                    size={12}
                    onChange={(date, dateString) => {
                      setDOB(date);
                    }}
                    value={moment(dob)}
                  />
                </Form.Item>
                <Form.Item label="UPLOAD DOB PROOF">
                  <Upload
                    onChange={(e) => setDOBProof(e.fileList)}
                    beforeUpload={beforeUpload}
                    maxCount="1"
                    fileList={[...dobProof]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item>
                <Form.Item label="CASTE CATEGORY">
                  <Select
                    placeholder="Select Caste Category"
                    onChange={(e) => {
                      setSelectedCasteCategory(casteCategory[e]);
                    }}
                    value={selectedCasteCategory.name}
                  >
                    {casteCategory.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="DOMCILE CERTIFICATE">
                  <Select
                    placeholder="Select Domcile Certificate"
                    onChange={(e) => {
                      setSelectedDomcileCert(domcile[e]);
                    }}
                    value={selectedDomcileCert.name}
                  >
                    {domcile.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="UPLOAD DOMCILE PROOF">
                  <Upload
                    onChange={(e) => setDomcileProof(e.fileList)}
                    beforeUpload={beforeUpload}
                    maxCount="1"
                    fileList={[...domcileProof]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item>
                {/* <Form.Item label="PLACE">
                  <Input
                    placeholder="Enter Place"
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </Form.Item> */}
                <Form.Item>
                  <h5>Vacation ADDRESS</h5>
                </Form.Item>
                <Form.Item label="STREET 1">
                  <Input
                    placeholder="Enter Street"
                    value={streetPersonal1}
                    onChange={(e) => setStreetPersonal1(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="STREET 2">
                  <Input
                    placeholder="Enter Street"
                    value={streetPersonal2}
                    onChange={(e) => setStreetPersonal2(e.target.value)}
                  />
                </Form.Item>
                <Row>
                  <CCol>
                    <Form.Item>
                      <label>CITY/TOWN/VILLAGE</label>
                      <Input placeholder="Enter City" onChange={(e) => {
                          setSelectedCityPersonal(e.target.value);
                        }}/>
                      {/* <Select
                        placeholder="Select City"
                        onChange={(e) => {
                          setSelectedCityPersonal(Cities[e]);
                        }}
                        value={selectedCityPersonal.name}
                      >
                        {Cities.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select> */}
                    </Form.Item>
                  </CCol>
                  <CCol>
                    <Form.Item>
                      <label>DISTRICT</label>
                      <Select
                        placeholder="Select District"
                        onChange={(e) => {
                          setSelectedDistrictPersonal(Disctricts[e]);
                        }}
                        value={selectedDistrictPersonal.name}
                      >
                        {Disctricts.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </CCol>
                </Row>
                <Row>
                  <CCol>
                    <Form.Item>
                      <label>STATE</label>
                      <Select
                        placeholder="Select State"
                        onChange={(e) => {
                          setSelectedStatePersonal(States[e]);
                        }}
                        value={selectedStatePersonal.name}
                      >
                        {States.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </CCol>
                  <CCol>
                    <Form.Item>
                      <label>ZIP CODE</label>
                      <Input
                        placeholder="Enter Zip Code"
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                      />
                    </Form.Item>
                  </CCol>
                </Row>
                <Form.Item>
                  <h5>PERMANENT ADDRESS</h5>
                </Form.Item>
                <Form.Item label="SAME AS ABOVE">
                  <Input type="checkbox" onClick={SameAsAbove} />
                </Form.Item>
                <Form.Item label="STREET 1">
                  <Input
                    placeholder="Enter Street"
                    onChange={(e) => setStreetPersonalPrem1(e.target.value)}
                    disabled={isDisabled}
                    value={streetPersonalPrem1}
                  />
                </Form.Item>
                <Form.Item label="STREET 2">
                  <Input
                    placeholder="Enter Street 2"
                    onChange={(e) => setStreetPersonalPerm2(e.target.value)}
                    disabled={isDisabled}
                    value={streetPersonalPrem2}
                  />
                </Form.Item>
                {/* <Form.Item label="Experience in this Field">
                  <Input
                    placeholder="Enter Experience"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Form.Item> */}
                <Row>
                  <CCol>
                    <Form.Item>
                      <label>CITY/TOWN/VILLAGE</label>
                      <Input placeholder="Enter City" onChange={(e) => {
                          setCityPrem(e.target.value);
                        }}/>
                      {/* <Select
                        placeholder="Select City"
                        onChange={(e) => {
                          setCityPrem(Cities[e]);
                        }}
                        value={cityPrem.name}
                        disabled={isDisabled}
                      >
                        {Cities.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select> */}
                    </Form.Item>
                  </CCol>
                  <CCol>
                    <Form.Item>
                      <label>DISTRICT</label>
                      <Select
                        placeholder="Select District"
                        onChange={(e) => {
                          setDistrictPerm(Disctricts[e]);
                        }}
                        value={districtPerm.name}
                        disabled={isDisabled}
                      >
                        {Disctricts.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </CCol>
                </Row>
                <Row>
                  <CCol>
                    <Form.Item>
                      <label>STATE</label>
                      <Select
                        placeholder="Select State"
                        onChange={(e) => {
                          setStatePrem(States[e]);
                        }}
                        value={statePrem.name}
                        disabled={isDisabled}
                      >
                        {States.map((item, index) => {
                          return (
                            <Select.Option key={index} value={index}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </CCol>
                  <CCol>
                    <Form.Item>
                      <label>ZIP CODE </label>
                      {/* <Select
                    placeholder="Select Zip Code"
                    onChange={(e) => setZipCode(e)}
                  >
                    <Select.Option value="select">Select</Select.Option>
                  </Select> */}
                      <Input
                        placeholder="Enter Zip Code"
                        onChange={(e) => setZipCodePrem(e.target.value)}
                        value={zipCodePrem}
                        disabled={isDisabled}
                      />
                    </Form.Item>
                  </CCol>
                </Row>
                {/* <Form.Item label="COUNTRY">
                  <Select
                    placeholder="Select Country"
                    onChange={(e) => {
                      setCountryPersonal(Countries[e]);
                    }}
                  >
                    {Countries.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <div
                    style={
                      {
                        // marginLeft: "auto",
                        // marginRight: "auto",
                        // justifyContent: "center",
                        // textAlign: "center",
                      }
                    }
                  >
                    <Image
                      style={{
                        // width: "25%",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                      src="data:image/jpeg;base64,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"
                      // hight="20%"
                      rounded-left
                    />
                  </div>
                </Form.Item> */}
                <button
                  className="prevtab btn btn-danger"
                  id="prevtab"
                  onClick={() => callback(1)}
                >
                  Prev
                </button>
                <button
                  className="nexttab btn btn-success"
                  id="nexttab"
                  onClick={() => callback(3)}
                  style={{ marginLeft: "10px" }}
                >
                  Next
                </button>
                <button
                    className="btn btn-primary"
                    id="save2"
                    style={{margin:10}}
                  >
                    save
                  </button>
              </Form>
            </>
          )}

          {tabName === "3" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <div className="card" style={{ width: "20%" }}>
                  <button className="btn btn-info">Add More</button>
                </div>
                 <Form.Item label="ADDITIONAL QUALIFICATION">
                  <Input
                    placeholder="Additional Qualification"
                    type="text"
                    onChange={(e) => {
                      setAddQual(e.target.value);
                    }}
                    value={addQual}
                  />
                </Form.Item>
                <Form.Item label="UPLOAD ADD QUALIFICATION PROOF">
                  <Upload
                    onChange={(e) => setAddQualProof(e.fileList)}
                    beforeUpload={beforeUpload}
                    maxCount="1"
                    fileList={[...addQualProof]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item>
                {isSpecial && (
                  <Form.Item label="SPECIALIZED QUALIFICATION">
                    <Input
                      placeholder="Specialized Qualification"
                      type="text"
                      onChange={(e) => {
                        setSpecQual(e.target.value);
                      }}
                      value={specQual}
                    />
                  </Form.Item>
                )}
                {isSpecial && (
                  <Form.Item label="UPLOAD SPECIALIZED QUALIFICATION PROOF">
                    <Upload
                      onChange={(e) => setSpecQualProof(e.fileList)}
                      beforeUpload={beforeUpload}
                      maxCount="1"
                      fileList={[...specQualProof]}
                    >
                      <Button type="primary">Upload</Button>
                      <small>File must be less than 2MB</small>
                    </Upload>
                  </Form.Item>
                )}
                <table
                  id="dtBasicExample"
                  cellSpacing="0"
                  width="100%"
                  className="table table-striped table-bordered table-sm"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>Qualification Type</th>
                      <th>Qualification</th>
                      <th>Institute</th>
                      <th>From Year</th>
                      <th>To Year</th>
                      <th>Marks %/CGPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>Post Graduation</div>
                      </td>
                      <td>
                        <span>MBA</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>HITM Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>2016</span>
                      </td>
                      <td>
                        <span>2018</span>
                      </td>
                      <td>
                        <span>71.64</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>Grauduation</div>
                      </td>
                      <td>
                        <span>B.Tech</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>IET Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>2008</span>
                      </td>
                      <td>
                        <span>2012</span>
                      </td>
                      <td>
                        <span>68.51%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>10+2</div>
                      </td>
                      <td>
                        <span>Intermediate</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>MP Inter College</span>
                        </div>
                      </td>
                      <td>
                        <span>2005</span>
                      </td>
                      <td>
                        <span>2007</span>
                      </td>
                      <td>
                        <span>51%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>10th</div>
                      </td>
                      <td>
                        <span>High School</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>MP Inter Collage</span>
                        </div>
                      </td>
                      <td>
                        <span>2003</span>
                      </td>
                      <td>
                        <span>2005</span>
                      </td>
                      <td>
                        <span>54.45%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="prevtab btn btn-danger"
                  id="prevtab"
                  onClick={() => callback(2)}
                >
                  Prev
                </button>
                <button
                  className="nexttab btn btn-success"
                  id="nexttab"
                  onClick={() => callback(4)}
                  style={{ marginLeft: "10px" }}
                >
                  Next
                </button>
                <button
                    className="btn btn-primary"
                    id="save3"
                    style={{margin:10}}
                  >
                    save
                  </button>
              </Form>
            </>
          )}
          {tabName === "4" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="REGISTRATION NO">
                  <Input
                    placeholder="Enter REGISTRATION NO"
                    onChange={(e) => setRegistrationNo(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="YEAR">
                  <DatePicker
                    size={12}
                    onChange={(date) => {
                      setCouncilYear(date);
                    }}
                    value={moment(year)}
                  />
                </Form.Item>
                <Form.Item label="NAME OF ISSUING COUNCIL">
                  <Input
                    placeholder="Enter  Name"
                    onChange={(e) => setCouncilName(e.target.value)}
                    value={councilName}
                  />
                </Form.Item>
                <Form.Item label="PLACE">
                  <Input
                    placeholder="Enter place"
                    onChange={(e) => setCouncilPlace(e.target.value)}
                    value={councilPlace}
                  />
                </Form.Item>
                <Form.Item label="STATE">
                  <Select
                    placeholder="Select State"
                    onChange={(e) => {
                      setStateCouncil(States[e]);
                    }}
                    value={stateCouncil.name}
                  >
                    {States.map((item, index) => {
                      return (
                        <Select.Option key={index} value={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="SELF ATTESTED CERTIFICATE">
                  <Upload
                    onChange={(e) => setfile(e.fileList)}
                    beforeUpload={beforeUpload}
                    maxCount="1"
                    fileList={[...file]}
                  >
                    <Button type="primary">Upload</Button>
                    <small>File must be less than 2MB</small>
                  </Upload>
                </Form.Item>
                <button
                  className="prevtab btn btn-danger"
                  id="prevtab"
                  onClick={() => callback(3)}
                >
                  Prev
                </button>
                <button
                  className="nexttab btn btn-success"
                  id="nexttab"
                  onClick={() => callback(5)}
                  style={{ marginLeft: "10px" }}
                >
                  Next
                </button>
                <button
                    className="btn btn-primary"
                    id="save4"
                    style={{margin:10}}
                  >
                    save
                  </button>
              </Form>
            </>
          )}
          {tabName === "5" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="EXPERIENCE">
                  <Input
                    placeholder="Enter Experience"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Form.Item>
               
                <table
                  id="dtBasicExample"
                  cellSpacing="0"
                  width="100%"
                  className="table table-striped table-bordered table-sm"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Organization</th>
                      <th> Experience</th>
                      <th> Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>12/06/2010</div>
                      </td>
                      <td>
                        <span>22/06/2015</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>HITM Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>React Js</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>12/06/2010</div>
                      </td>
                      <td>
                        <span>22/06/2015</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>HITM Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>React Js</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>12/06/2010</div>
                      </td>
                      <td>
                        <span>22/06/2015</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>HITM Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>React Js</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>12/06/2010</div>
                      </td>
                      <td>
                        <span>22/06/2015</span>
                      </td>
                      <td>
                        <div className="clearfix">
                          <span>HITM Lucknow</span>
                        </div>
                      </td>
                      <td>
                        <span>React Js</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="prevtab btn btn-danger"
                  id="prevtab"
                  onClick={() => callback(4)}
                >
                  Prev
                </button>
                <button
                  className="nexttab btn btn-success"
                  id="nexttab"
                  onClick={() => callback(6)}
                  style={{ marginLeft: "10px" }}
                >
                  Next
                </button>
                <button
                    className="btn btn-primary"
                    id="save5"
                    style={{margin:10}}
                  >
                    save
                  </button>
              </Form>
            </>
          )}

          {tabName === "6" && (
            <>
              <Form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: 10,
                }}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Form.Item label="STATE 1" className="col-md-6">
                    <Select
                      placeholder="Select State 1"
                      onChange={(e) => setState1(States[e - 1])}
                      value={state1.name}
                    >
                      {States.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="DISTRICT 1" className="col-md-6">
                    <Select
                      placeholder="Select District 1"
                      onChange={(event) => {
                        setDistrict1(Disctricts[event - 1]);
                      }}
                      value={district1.name}
                    >
                      {Disctricts.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Form.Item label="STATE 2" className="col-md-6">
                    <Select
                      placeholder="Select State 2"
                      onChange={(event) => setState2(States[event])}
                      valu={state2.name}
                    >
                      {States.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="DISTRICT 2" className="col-md-6">
                    <Select
                      placeholder="Select District 2"
                      onChange={(event) => setDistrict2(Disctricts[event - 1])}
                      value={district2.name}
                    >
                      {Disctricts.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Form.Item label="STATE 3" className="col-md-6">
                    <Select
                      onChange={(event) => setState3(States[event - 1])}
                      value={state3.name}
                      placeholder="Select State 3"
                    >
                      {States.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="DISTRICT 3" className="col-md-6">
                    <Select
                      placeholder="Select District 3"
                      onChange={(event) => setDistrict3(Disctricts[event - 1])}
                      value={district3.name}
                    >
                      {Disctricts.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <Row>
                  <CCol>
                    <button
                      className="prevtab btn btn-danger"
                      id="prevtab"
                      onClick={() => callback(4)}
                    >
                      Prev
                    </button>
                    <button
                    className="btn btn-primary"
                    id="save6"
                    style={{margin:10}}
                  >
                    save
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{margin:5}}
                  >
                    Withdraw
                  </button>
                    <button
                      className="nexttab btn btn-info"
                      id="prevtab"
                      style={{ marginLeft: "10px" }}
                      onClick={() => showConfirm("submit")}
                    >
                      Submit
                    </button>
                  </CCol>
                  <CCol>
                    <button
                      className="nexttab btn btn-info"
                      id="prevtab"
                      style={{ marginLeft: "10px" }}
                      onClick={() => showConfirm("print")}
                    >
                      Print
                    </button>
                  </CCol>
                </Row>
              </Form>
            </>
          )}

          <div className="tab-content" id="myTabContent">
            {/* <div
              className="tab-pane fade show active"
              id="1"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <CRow>
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardHeader>Register as Specialist</CCardHeader>
                    <CCardBody>
                      <CForm className="form-horizontal">
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Type of the Position </b>
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CSelect
                              id="jobposition"
                              name="jobposition"
                              placeholder="Sales Manager"
                              // onChange={handleChange }
                            >
                              <option>select</option>
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Gender </b>{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CSelect
                              id="jobposition"
                              name="jobposition"
                              placeholder="Sales Manager"
                              // onChange={handleChange }
                            >
                              <option>select</option>
                              <option>M</option>
                              <option>F</option>
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Date of Birth </b>{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CInput
                              type="date"
                              id="date-input"
                              name="date-input"
                              placeholder="From"
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Qualification</b>{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CSelect
                              id="jobposition"
                              name="jobposition"
                              placeholder="Sales Manager"
                              // onChange={handleChange }
                            >
                              <option>select</option>
                              <option>a</option>
                              <option>b</option>
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Additional Qualification</b>{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CInputGroup className="mb-3">
                              <CInputGroupText
                                component="label"
                                htmlFor="inputGroupFile01"
                              >
                                Upload
                              </CInputGroupText>
                            </CInputGroup>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="2">
                            <CLabel htmlFor="text-input">
                              {" "}
                              <b>Experience in the relevant field</b>{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="8">
                            <CInput
                              id="jobposition"
                              name="jobposition"
                              placeholder="Sales Manager"
                              // onChange={handleChange }
                            />
                          </CCol>
                        </CFormGroup>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <button
                className="nexttab btn btn-success"
                id="nexttab"
                onClick={bootstrapTabControl}
              >
                Next
              </button>
            </div> */}
            {/* <div
              className="tab-pane fade"
              id="2"
              role="tabpanel"
              aria-labelledby="profile-tab"
              style={{ marginTop: "" }}
            >
              <CRow>
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardHeader>
                      <h4>
                        Personal Informations
                      </h4>
                    </CCardHeader>
                    <CCardBody>
                      <CForm className="form-horizontal" ref={componentRef}>
                        <CFormGroup row style={{ marginTop: "1%" }}>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                Father's Name{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                id="name"
                                name="name"
                                placeholder=""
                                // onChange={this.handleCountry}
                              />
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Place </CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                id="countryCode"
                                name="countryCode"
                                placeholder="ABC"
                                // onChange={this.handleCountry}
                              />
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Address 1</CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                id="countryCode"
                                name="countryCode"
                                placeholder=""
                                // onChange={this.handleCountry}
                              />
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Address 2</CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                id="countryCode"
                                name="countryCode"
                                placeholder=""
                                // onChange={this.handleCountry}
                              />
                            </CCol>
                          </CCol>

                          <CImg
                            style={{ width: "25%" }}
                            src="data:image/jpeg;base64,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"
                            hight="20%"
                            rounded-left
                          />
                          <CCol sm="1"></CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">District </CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Address 1"
                                // onChange={this.handleCountry}
                              ></CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"> State </CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="From"
                                // onChange={this.handleCountry}
                              ></CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Zip Code</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Address 1"
                                // onChange={this.handleCountry}
                              ></CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"> Country </CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="From"
                                // onChange={this.handleCountry}
                              ></CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <button className="prevtab btn btn-danger" onClick={prev}>
                Prev
              </button>
              <button
                className="nexttab btn btn-success"
                onClick={bootstrapTabControl}
              >
                Next
              </button>
            </div> */}
            {/* <div
              className="tab-pane fade"
              id="3"
              role="tabpanel"
              aria-labelledby="EducationQualifications-tab"
              style={{ padding: "0%", marginTop: "", background: "aliceblue" }}
            >
              <div>
                <CRow>
                  <CCol xs="12" sm="12">
                    <CCard>
                      <CCardHeader>
                        <h4>Education Qualifications</h4>
                      </CCardHeader>
                      <CCard>
                        <CCardBody>
                          <table
                            id="dtBasicExample"
                            cellSpacing="0"
                            width="100%"
                            className="table table-striped table-bordered table-sm"
                          >
                            <thead className="thead-light">
                              <tr>
                                <th>Qualification Type</th>
                                <th>Qualification</th>
                                <th>Institute</th>
                                <th>From Year</th>
                                <th>To Year</th>
                                <th>Marks %/CGPA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div>Post Graduation</div>
                                </td>
                                <td>
                                  <span>MBA</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>HITM Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>2016</span>
                                </td>
                                <td>
                                  <span>2018</span>
                                </td>
                                <td>
                                  <span>71.64</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>Grauduation</div>
                                </td>
                                <td>
                                  <span>B.Tech</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>IET Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>2008</span>
                                </td>
                                <td>
                                  <span>2012</span>
                                </td>
                                <td>
                                  <span>68.51%</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>10+2</div>
                                </td>
                                <td>
                                  <span>Intermediate</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>MP Inter College</span>
                                  </div>
                                </td>
                                <td>
                                  <span>2005</span>
                                </td>
                                <td>
                                  <span>2007</span>
                                </td>
                                <td>
                                  <span>51%</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>10th</div>
                                </td>
                                <td>
                                  <span>High School</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>MP Inter Collage</span>
                                  </div>
                                </td>
                                <td>
                                  <span>2003</span>
                                </td>
                                <td>
                                  <span>2005</span>
                                </td>
                                <td>
                                  <span>54.45%</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCard>
                  </CCol>
                </CRow>
              </div>
              <button
                className="prevtab btn btn-danger"
                id="prevtab"
                onClick={prev}
              >
                Prev
              </button>
              <button
                className="nexttab btn btn-success"
                id="nexttab"
                onClick={bootstrapTabControl}
              >
                Next
              </button>
            </div> */}
            {/* <div
              className="tab-pane fade"
              id="4"
              role="tabpanel"
              aria-labelledby="Experience-tab"
              style={{ marginTop: "" }}
            >
              <div>
                <CRow>
                  <CCol xs="12" sm="12">
                    <CCard>
                      <CCardHeader>
                        <h4>Experience</h4>
                      </CCardHeader>
                      <CCard>
                        <CCardBody>
                          <CForm className="form-horizontal">
                            <CFormGroup row>
                              <CCol md="6">
                                <CLabel htmlFor="text-input">
                                  <small>Experience</small>
                                </CLabel>
                              </CCol>
                              <CCol xs="12" sm="12">
                                <CInput
                                  id="name"
                                  name="name"
                                  placeholder="Experience"
                                />
                              </CCol>
                            </CFormGroup>
                          </CForm>
                          <table
                            id="dtBasicExample"
                            cellSpacing="0"
                            width="100%"
                            className="table table-striped table-bordered table-sm"
                          >
                            <thead className="thead-light">
                              <tr>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Organization</th>
                                <th> Experience</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div>12/06/2010</div>
                                </td>
                                <td>
                                  <span>22/06/2015</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>HITM Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>React Js</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>12/06/2010</div>
                                </td>
                                <td>
                                  <span>22/06/2015</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>HITM Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>React Js</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>12/06/2010</div>
                                </td>
                                <td>
                                  <span>22/06/2015</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>HITM Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>React Js</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>12/06/2010</div>
                                </td>
                                <td>
                                  <span>22/06/2015</span>
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <span>HITM Lucknow</span>
                                  </div>
                                </td>
                                <td>
                                  <span>React Js</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCard>
                  </CCol>
                </CRow>
              </div>
              <button
                className="prevtab btn btn-danger"
                id="prevtab"
                onClick={prev}
              >
                Prev
              </button>
              <button
                className="nexttab btn btn-success"
                id="nexttab"
                onClick={bootstrapTabControl}
              >
                Next
              </button>
            </div> */}
            {/* <div
              className="tab-pane fade"
              id="6"
              role="tabpanel"
              aria-labelledby="AdditionalInfo-tab"
            >
              <CRow>
                <CCol xs="12" sm="12">
                  <CCard>
                    <CCardHeader>
                      <h4>
                        Additional Info
                      </h4>
                    </CCardHeader>
                    <CCardBody>
                      <CForm className="form-horizontal">
                        <CFormGroup row>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">District 1</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select Disctrict 1"
                                onChange={(event) =>
                                  setDistrict1(event.target.value)
                                }
                              >
                                {Disctricts.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">District 2</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select District 2"
                                onChange={(event) =>
                                  setDistrict2(event.target.value)
                                }
                              >
                                {Disctricts.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">District 3</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select District 3"
                                onChange={(event) =>
                                  setDistrict3(event.target.value)
                                }
                              >
                                {Disctricts.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">State 1</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select State 1"
                                onChange={(event) =>
                                  setState1(event.target.value)
                                }
                              >
                                {States.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">State 2</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select State 2"
                                onChange={(event) =>
                                  setState2(event.target.value)
                                }
                              >
                                {States.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="4">
                              <CLabel htmlFor="text-input">State 3</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Select State 3"
                                onChange={(event) =>
                                  setState3(event.target.value)
                                }
                              >
                                {States.map((item, index) => {
                                  return (
                                    <option key={index}>{item.name}</option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Zip Code</CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="Address 1"
                              ></CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"> Country </CLabel>
                            </CCol>
                            <CCol xs="12" sm="11">
                              <CSelect
                                id="name"
                                name="name"
                                placeholder="From"
                                // onChange={this.handleCountry}
                              ></CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <button
                className="prevtab btn btn-danger"
                id="prevtab"
                onClick={prev}
              >
                Prev
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(CandidateDashboard);
