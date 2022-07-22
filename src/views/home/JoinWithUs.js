import React, { useState, useRef } from "react";
import $ from "jquery";
import { useReactToPrint } from "react-to-print";
import {
  CInputGroupText,
  CInputGroup,
  CCardBody,
  CCard,
  CLabel,
  CRow,
  CCol,
  CCardHeader,
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CImg,
} from "@coreui/react";
import { Navigation } from "./navigation";
import { Contact } from "./contact";
function JoinWithus() {
  const [selectedtab, setSelectedTab] = useState(0);
  const tabCount = 5;

  const componentRef = useRef();
  function handlePrint() {
    useReactToPrint({
      content: () => componentRef.current,
    });
  }

  function bootstrapTabControl() {
    // setSelectedTab((selectedtab+1)%tabCount)
    var i,
      items = $(".nav-link"),
      pane = $(".tab-pane");
    // next
    for (i = 0; i < items.length; i++) {
      if ($(items[i]).hasClass("active") == true) {
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
      if ($(items[i]).hasClass("active") == true) {
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
  // const ref = React.createRef();
  // const componentRef = useRef();
  // bootstrapTabControl
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        <div style={{ marginTop: "118px" }}>
          <h2>JoinWithUs</h2>
        </div>
        <ul
          class="nav nav-tabs"
          id="myTab"
          role="tablist"
          style={{ marginTop: "32px" }}
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="1"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="2"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="3"
              data-toggle="tab"
              href="#EducationQualifications"
              role="tab"
              aria-controls=" EducationQualifications"
              aria-selected="false"
            >
              {" "}
              Education Qualifications
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="4"
              data-toggle="tab"
              href="#Experience"
              role="tab"
              aria-controls="Experience"
              aria-selected="false"
            >
              {" "}
              Experience
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="5"
              data-toggle="tab"
              href="#AdditionalInfo"
              role="tab"
              aria-controls="AdditionalInfo"
              aria-selected="false"
            >
              {" "}
              Additional Info
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="1"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {/* <h1>Tab Home</h1> */}
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
                            <b>Type of the Job Position </b>
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
                            {/* <CFormControl type="file" id="inputGroupFile01" /> */}
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
              class="nexttab btn btn-success"
              id="nexttab"
              onClick={bootstrapTabControl}
            >
              Next
            </button>
          </div>
          <div
            class="tab-pane fade"
            id="2"
            role="tabpanel"
            aria-labelledby="profile-tab"
            style={{ marginTop: "" }}
          >
            {/* <h1>Tab Profile</h1> */}
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <h4>
                      Personal Informations
                    </h4>
                  </CCardHeader>
                  <CCardBody>
                    {/* <button  style={{marginLeft:"94%"}} onClick={handlePrint}>click</button> */}
                    {/* <Pdf targetRef={ref} filename="code-example.pdf">
                      {({ toPdf }) => (
                        <button onClick={toPdf} style={{marginLeft:"94%"}}>Generate Pdf</button>
                      )}
                    </Pdf> */}

                    {/*
                    <button className="primary" style={{ marginLeft: "94%" }} onClick={handlePrint}>
                      Print
                    </button> */}

                    <CForm className="form-horizontal" ref={componentRef}>
                      <CFormGroup row style={{ marginTop: "1%" }}>
                        {/* <CRow> */}
                        <CCol>
                          <CCol md="6">
                            <CLabel htmlFor="text-input">Father's Name </CLabel>
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

                        {/* <CCol xs="12" sm="6"> */}
                        <CImg
                          style={{ width: "25%" }}
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIWFhIWFxgXFxgYFRcfGBcZGhcYGBgaGRgYHSgiGBolGxgVITEhJSkrLi4vFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EAD0QAAEDAQYEAwYDBwMFAAAAAAEAAhEDBBIhMUFRBSJhcROBkQYyobHB8EJS0SNikqKy4fEUM3IHJFOC0v/EABsBAQACAwEBAAAAAAAAAAAAAAABAgMEBQYH/8QALxEAAgEDAgQFAwQDAQAAAAAAAAERAgMhBDESQVFhBXGBkfATIqEGMrHBFNHhcv/aAAwDAQACEQMRAD8A+ZoiKDVCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiyiAwiLKAwiyiAwiysIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIsoSgCwuv8AZ32ZaXNNarTc852c0qrzGzy2pTuPjS8fNWvtR/08aGOrWIVeUXn2eqxwfAEk0XOH7WNpJ65A1daRnq012hTVS154ftv+D52iwvSsYDCIsoAsLdZbI+q67Tbedn2G56LuKXDKNNoYKLDy+8QDeOsk/YVaqkjpeH+F3dZLpcJc3z8usc+hwIE4DM4hXo9l6hcwCo0h2BdB5DdnmG04SNwp9TgdNrxVYSGgg+GcYO18ukAHHVW1lBgnTf77hUdecHa0P6fTor/ylDlJQ8Qt3jrtnKjbZvl7b7L2inOAfGPI6TG4BgnyUfhPC/FJL5DRhhm47dF3dOvebicRiDt07KtrvlxdgJJMdVFVbg3LX6d06vKpy6VvS8pvl3jtz2eJTpuN8GE0/CbnykBxjAAgku7GTrChcT4P4TA/xL2MEXYicoxxXUzh6KDxay+I2nTybeLnHYAAAdSbyimt+hOv8EscFy5RTNdUcKWEnhYSxl5qbwk3tlvjry9LuLCxjOVjQGmQROYIjE6rja1ndDnsY40gcHXTETuslNaqPO+I+EXNFTS3UqpnCTxES+6zlwo9TQiysK5yAiIgCIiAIiIAiIgCIiAIiIAiIgMq19mLD41drcDEQ0uguJMAAwdYz3VUr/2cPhkOLcHHWQYAwcCCDgccD1iFWpwjc0NHFeTjbPtt+YPtvs1YalCm27TotwF65TbJOt57Xm8euA7ZK3tXEQRdGDgZI8l864Px6qyJdzfmB5X9R16Kx4vxq+0VBHit2OLuhXD1esrdt0qVU/VZ6PdfJ3M12OJurc4T2/4RT/1tSoHNo0i1r3uIMXyXAhg/E4wCRvO+PK1RQg3XVCYwJayCfWQF9WsnEqznctOjzY+JVoOqOcJMT+1ZACpf+oVkd4JqPslndBaBXoXqb2k5eJSN68w5e8YnRb+jdTtpVVPEdF77z+MYiZObu2fN3LsbDwazgN5Q4kA3nFwmRpGWK48ldNw213qbccWth37pGAHp8ltXanSkd/8AT1vT3b9dF1JuE1KT2eYnnld4TjmWNm4XTpVL9K82QWFmJiSDOJnRTzJEEQfrv2OX+FApWqYnMEEKbVrQRPun4FYuKcs9na09Fmngt0pLLx/S2XksEe0O5e+a82S0FsjdeLU7A91GpvxUNwza4VEMnWipBkaj/P31Wik/Ges+iVKstH30+i1MdiBuVLLJYJtV2Pmtd+8e3otFepjHr54rbZzh036K05giIRsLRBkTOY7rYyofKMjl27KNUtA0WKdQ5qpHBz5lAPZ2r+Zh/wDb9QoFssj6TrtRpafges6hdkwaDNcrxq2+JVJBljeUddz5n5BZbdbqZ4rxnwnSaOzTVabVTcJNzPX2691OGQVhZWFlPMBERAEREAREQBERAEREAREQBd7wXiVA0wx1GmSJh5aLxBM4OzaRlAOy4NTbDb7ouOaHMmR+YdiMSOhWG/TVVR9u/b5D8mbOnvfTml7OPx/WX6w+R9CspoDIuZ0vSP5lT8dtAp/taby5rXNaQOp3nQfJU1Hi9Nv4Q7vf+UqFxXi7q0DJoyAEAdgFzLekuVXU6047wv8Apa9dVXM7rhXHKgphzWtcw5cu2ESMVVe3HHfGpNpxcdOLWkm+Os+6BnriuX4bbHNBaHuaDoCYO+G6n2ThdMm9UJeCcBJAI6nMrbptO3VmpwuW8++3v5E6PQXdTVw2onu4jz59sJs2+y3EIa6lAn3h+8NQVY1LHQJvNp3H7sJ/pOEeS0izU2YspBrtCCfqVnxfXUK9VzLg93otC6LFFvUcNTo2a5LlDhQ11X5cnipRjFpkfEeSnsrhzMcsj9CojqJcJYZO2R8t/mvNnfHyIULB00kzVaiQY9DuF6osJDnaBs/fx9F5tLhEHyK92IkMIP4gR5QfrCcyW2jX4uHb9V6o1I5px0+pVfWddd8uxXqvVgx5DsMlCZXjJ4qA8xy+8Fl1Yu1VfWrZBeqVRTJZV5LGmwExKCtsFGpVZywG6k0mM/OSegw+JHyUl1Uj3eDgWnJ2B38ioI4DQ/8AI/0HylTQANVuf4hF4NvHQFwb2knRTS6lsaGs0Wmvfffolpd59Iy/y+hyXE7H4TyybwgEGIkEbd5Hkoyn8SstcE1KzIB15S0bCQTAUBbK2PnGqoVN6pU0ulS4VWGlymfmInBhERSa4REQBERAEREAREQBERAFlYRAZRYWUABVvw+2GCM2Z474qnVnZrJVAhzAAN3N/wArBfX29zs+B1VU6qVMRmE35JwnC33xgneLsfVDX3XinZnnIN7l4/8Alb6PDy7M5Zlv0Wqk+R7umpvZP2aX5MC0kYhSy8VRebhUGBH5u+x6qBbKQZgFEp2ktM4xqrJwXdUPJZMs1R4Lm0n3WmCQ0kA4HEjLMLVXtMQdlLs9skXmujfv1C1W5wqe8ObffrOoV4xKDbzlfPnYrnMvAEmIU91Sm4Bri07CQHT0JiPluqtzgx3OY2cfc7H8qjV6TpLgC1gjEYxIBz74ZaKqbNW5qVbxEt79vPp647k+nZiXEHCDHvN0wzyPcKRarBkKbpMe7I+BwntCiWSqYicfzRIHcBbIr0xeJL25yDPSdo7ZbKyQVynhW/n/ALPIDhmLsb4H0zUig8qQ+vSqU21XTekMd1kOIOG0Eei8OpMgmm8GMS1wIPkSIPbPuodJnt1rqbqVXopjK7dyqqlJKnU6e6iTYTbRvtdUspVHReAadMMcMfWfJcQuq4nxYUmFrffcIA2BAJJ8lyq2bKweF/Ul6m5qKaaak+FQ0uTb69e3KO5lERZTzoREQBERAEREAREQBERAEREAWVhEBvsdYMcHESAugo1gQHZgiWj9VzKkUbdUaLoIj/iMPULDdtcWVudzwfxWnSTRcTdLzhKZ9WsQveDoDaHON1ozUiq8gBoy+JVJZbQ65enmJ5sALs+799F7r8QLs81rPDaZ7TT6qm7bpuqYqSamJz5N+vR4LV9mgZSd4+SrLU12y12R9R7oa5wgSeYrNrtVVuHiOnuUlGZ3E6ZjBFYXg4NjfMesKbw2uSKrSCXQ10NmSA4B0TrDvgvFZzvCaHEl1TmM6D8I+vmoXD7QadanzOAvAGDod9xMGOnmrU7mnXXwcLzn+zbauNMdTfTdTuGA4Y5ua4ETrMwtFitrhzBhG+3oRBC9VqI/1Ph1je8QHm2c7Fvb3T/Evdo4XWoZ840IN0/w49MlblJpcWo+o6nspThZXNSvXl3nkbKT2HFkT+V0D+F2Q/lW6vWe1ppC+Ri5jZF6Qxwe10w8CCccJ6qBStN8i9TZUPYXv4/1kLFerhBgiC3SGE7RAEb7wrIrcu/b9r/r56PDh8jNGs4nkLebnIeBOwe3SDr1norH/VHCWs6wG4/MhUlxwcCS2+ReLrrvevOJwGF70VhZGE5mfve6sdXY2NFdraiqfdflcn5Suhb02gxdc3teC2stBGBEqDZ3tGYPkrFppu3B7FVOsngrvaOkXRVAwa0AjUY4HqMVRqytfFXQ5jQGjFpOZI8xgq1bltVKmGfOvF7mnu6l12G2nvPXtOY81vMSYREVzlhERAEREAREQBERAEREAREQBERAElZW6xEXwTp3z0yUVOFJktW/qXKaJiWlL2U8/TckUKRpzJ5nDFv6rL6wKzWBzx7xgojiDhMn4FaP3XHJ7lXLGgt02k4XJNy3POOcvoo6F9wctayo/DMD0E/VVNseXErdw+0MZTex0zMjDPCFiysLmF0Zuw8v7yoex0VVx0qnzwT+J0SAAB+Bo8oEQq+z2Rt2XVAwknM810RkM8/ototlRkUsHAi8bwm43piq22sJxM47f0hWlNlL1xUri4Zax22+fweqg8V7mtJcJab5ze4S1uGgbj3z2U2hbrQ+KMtLxTbBImCYwmdeR0qNRpeGHuMQ1vhifxvJwHXInstFktD6VYViL78XEExfkEYxthlssiaNGp1WolOW3xR0bfLfd/y3L382OkMjUAAwIazEHIg44LY9jQQLzTTHMLjMfMHH+ZWTbTZ7QLz4p1tSHXS7HHAa67LXQe+5DomBiWzdxzkYxp55KJLUaalUJKH3zmOTl7dpPFks7XxdDS7aYef1Uikw6Y9CvVrpANlzQ14xBGLKg2BGR1GeRE5LdZnioSS6HnE3tTqZ37qrN6xSlj/h4bUEwQR3Um10Kgpk0i6/nAAkjWMdvNTGWaWwbp9I/stNoqNoi8XdmyCT2OiJNPYy6lU/Rq+pXwqH9ycNd5/juckCsr3aaoc5zgIBJMbTivC3T5fUkm0nPfae5hERCoREQBERAEREAREQBERAEREAREQBZRZY0kgASSYA6oSYa0mAJOwH0CnOsL6cBzecgENzLRj6HPsuk4RwxtBt9wmpGJ23jZeeK2hoYXAAOfAJ1I1x1gaKt1Pg3Nrw+umnUU4l7Lom9m+y3x+Nzl3tgR5lWlnrCnZmlwzvkN1OJj6KstFduMczj8PgtdoeYBcZjDsBhgtLhdO/M9ta1tv6lStOeFZjZS8Z57OeXXJaWGmIqVXnHU9BoPPCOy12eleax8auPo8x8AtdupkG5PLMx9+ancF5qTm/keR6wf1ULODfpp+/ge2fff8AoqeKPccTk3EDQHXzOCkPsshtQZELxxWCYblv1VnYKg8MCM/dHaAQpmTHRbpd2pPt7lJaKV185Y3T33VtTZeYJwvNw2xGh3BR9Br5AMlp5u51+a8WZxpghzb7BmNR1CSXt2lQ2+TNtiokg03HDroTr6wtQs5aexg9CFIdWpuZea6cD0cdR5jpst7bRTeA7xWAwA4kxeI1IORiPRGsF+K0qlTxKYlZU/O54cyIcPNVPGmxUmSQQCOkiCPW8uis1IFsNIcMfdIJHouZ4na2vLbs3Wg5nmM/RZbKaqk4v6jqtf4iTqy2ml1jD84n3jnBEWFlYW0eHCIiAIiIAiIgCIiAIiIAiIgCIiAIiIDKk8NrhlVjyJAP9vhn5KKsIDruI2s3S84N0HT6yuXtVodUMuPYaAdFMFsv0nNceYDXWPqq4JORBmn7y21mSxvY/wBRUuhwiocXC4Ouf8P6wpL+GEMMOLgJgbZk+awXqG8rkdnwvWW7M2q1+578lslP5n41ArW1724wOoGJ7rzY3lrgZIaSJE4HvvGKmUbCQwy3EG8AdVps9jdUE/HT12WtFXQ9G9XazU603TE5wvN9cbKXONywtFkGZwa2SVX2R94uaOUnGn6e73j6qXwd1RzheDqgDSABkMIJMdC4SdytVp4a5roIiOYduh6I0kXteJ2r+pdq3ySf/rqsdFDx67Cxk03TGmI3GqtSGuiMb2W6k+z1gNoa5z+VwEAx7xxjsI264aKx4JwJzLRTkywFxJ2h3uk6ki4eod0KJNrY2KvEtNa46HUpp3Tw/wBvEvdY84XNTyVlpOaAYiMHA6jXzVZaqN17mflPw0X1bjlazMcPHuBxyIIvEDU6nzXA+07aBcKtCo0tdDS2ZcLrQAd4IGq2bVuqip5weR8S8Qs6yxbSoaqT5w1DWYfmk8pc99yhuL2iws5xkktgiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgMtbJgZnALpOHWPw27uOZ+gOyobCJqMxjmbjtiMV1QM4lGQ5Djuo7ySpJYF6FVrchL9CRIHUDfuobwQQ7TZ6jWzIE5DU+SoBaKtNxwIDpJw9SujeXSbxk67qit1jJeXOktJKxQ05kmlqSR7P2tzJcDnIgjAqyPFG1XQaZBH70jDbZVdmp3aRafwuInuJafmvdCnEOjOVLiIL8Tpq4qcPqsM6/hNvY1gusiSZMzJ0w+8lc2KsDBOB2u6+S4qwulwxDR8CfNdPRtRzLwQdgMCIByVrbwUruVV1Oqty3u3u2Qfaf2TdaHePTeb8QWvyMDC7Aw81wNtsj6TzTqNuvESCRhIBGRjIruuP8e8JnJWcah91t3AdTlguDtNodUcXvcXOdiSVcJya0REJCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAmcG/3mT18+U4LrTSjRchws/tqX/Nv9QXa1DGJ79uqmCtTIr2x3UK3WkUxeOejZxd/bcrXaOMybtFt8/mPujy184VRUsr3G89wvHOSZ+UKHgJdS7o2kPbeHmNQVrtrC6mYGWPp9lVFmovaZY6D2wV/TrubQJqU5g4uacIJ2jBYbrxKIfYp6DjIYQOY5nKG4+uPxWXVQMB+I5bDVSrRZi5rJFxl4kEtM4tMg+gURrAHTM/ei1qa/qLBEyi84ZTDWg8sjRzo+ixxK0VAL7KZJ/dk59tFBoVQr+yVdNh/hZ6VkrJw9trPc79pN7YiI8loX0x1kZVF2owOH72MTscwuQ9q+CNs5a6nPhvkY43XDSeo+RWwjKnJQosrCEhERAEREAREQBERAEREAREQBERAEREAREQBZWEQE7gv+/S/wCYXYWzL72WUVkUqKGgOX1+a0uRFjWxVmaWamcZP/b+YRFWv9j+cySBVefBpYnM6rWURc63uQSLP9VeWL6oi26CrLqyFSrcwOstWQDyaidyiLbtlqT5CFlEUGUIiIAiIgCIiAIiIAiIgP/Z"
                          hight="20%"
                          rounded-left
                        />
                        <CCol sm="1"></CCol>
                        {/* </CCol> */}
                        {/* </CRow> */}
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
                            >
                              {/* <option>Nurses and Paramedical staff</option> */}
                            </CSelect>
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
                            >
                              {/* <option>Defoult Input</option> */}
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
                              // onChange={this.handleCountry}
                            >
                              {/* <option>Nurses and Paramedical staff</option> */}
                            </CSelect>
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
                            >
                              {/* <option>Defoult Input</option> */}
                            </CSelect>
                          </CCol>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <button class="prevtab btn btn-danger" onClick={prev}>
              Prev
            </button>
            <button
              class="nexttab btn btn-success"
              onClick={bootstrapTabControl}
            >
              Next
            </button>
          </div>
          <div
            class="tab-pane fade"
            id="3"
            role="tabpanel"
            aria-labelledby="EducationQualifications-tab"
            style={{ padding: "0%", marginTop: "", background: "aliceblue" }}
          >
            {/* <h1>Tab Contact</h1> */}
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
                              {/* <th className="text-center"><CIcon name="cil-people" /></th> */}
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
                              {/* <td className="text-center"> */}
                              {/* <div className="c-avatar">
                        <img src={'public/avatars/2.jpg'} className="c-avatar-img"  />
                        {/* <span className="c-avatar-status bg-success"></span> */}
                              {/* </div> */}
                              {/* </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div> */}
                              {/* </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td> */}
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
            <button class="prevtab btn btn-danger" id="prevtab" onClick={prev}>
              Prev
            </button>
            <button
              class="nexttab btn btn-success"
              id="nexttab"
              onClick={bootstrapTabControl}
            >
              Next
            </button>
          </div>
          <div
            class="tab-pane fade"
            id="4"
            role="tabpanel"
            aria-labelledby="Experience-tab"
            style={{ marginTop: "" }}
          >
            {/* <h1>Tab Profile</h1> */}
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
                                // onChange={this.handleCountry}
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
                              {/* <th className="text-center"><CIcon name="cil-people" /></th> */}
                              <th>From Date</th>
                              <th>To Date</th>
                              <th>Organization</th>
                              <th> Experience</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {/* <td className="text-center"> */}
                              {/* <div className="c-avatar">
                        <img src={'public/avatars/2.jpg'} className="c-avatar-img"  />
                        {/* <span className="c-avatar-status bg-success"></span> */}
                              {/* </div> */}
                              {/* </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div> */}
                              {/* </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td> */}
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
                              {/* <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td> */}
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
            <button class="prevtab btn btn-danger" id="prevtab" onClick={prev}>
              Prev
            </button>
            <button
              class="nexttab btn btn-success"
              id="nexttab"
              onClick={bootstrapTabControl}
            >
              Next
            </button>
          </div>
          <div
            class="tab-pane fade"
            id="6"
            role="tabpanel"
            aria-labelledby="AdditionalInfo-tab"
          >
            {/* <h1>Tab Profile</h1> */}
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
                          <CCol md="6">
                            <CLabel htmlFor="text-input">District </CLabel>
                          </CCol>
                          <CCol xs="12" sm="11">
                            <CSelect
                              id="name"
                              name="name"
                              placeholder="Address 1"
                              // onChange={this.handleCountry}
                            >
                              {/* <option>Nurses and Paramedical staff</option> */}
                            </CSelect>
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
                            >
                              {/* <option>Defoult Input</option> */}
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
                              // onChange={this.handleCountry}
                            >
                              {/* <option>Nurses and Paramedical staff</option> */}
                            </CSelect>
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
                            >
                              {/* <option>Defoult Input</option> */}
                            </CSelect>
                          </CCol>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <button class="prevtab btn btn-danger" id="prevtab" onClick={prev}>
              Prev
            </button>
          </div>
        </div>
        {/* <!-- Tab carousel --> */}
        <div style={{ marginTop: "1%" }}>
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default JoinWithus;
