import React from "react";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withRouter, useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  let history = useHistory();
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={""}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
          <h5>LogOut</h5>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem>
          {/* <Link to="/"> */}
          <CButton
            // onClick={() => {
            //   localStorage.clear();
            //   history.push("/Login");
            // }}
          >
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Change Password
          </CButton>
          {/* </Link> */}
        </CDropdownItem>
        <CDropdownItem>
          {/* <Link to="/"> */}
          <CButton
            onClick={() => {
              localStorage.clear();
              history.push("/Login");
            }}
          >
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Log Out
          </CButton>
          {/* </Link> */}
        </CDropdownItem>       
      </CDropdownMenu>
    </CDropdown>
  );
};

export default withRouter(TheHeaderDropdown);
