import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const [access_role, setRole] = useState([navigation[0]]);

  useEffect(() => {
    let role = localStorage.getItem("access_role");
    if (role === "admin_role") {
      setRole([
        ...[navigation[1]],
        navigation[2],
        navigation[3],
        navigation[10],
        navigation[11],
        navigation[4],
       
      ]);
      // console.log("NAVIGATION I");
    } else if (role === "state_role") {
      setRole([...[navigation[5]],navigation[6],navigation[2]]);
      // console.log("NAVIGATION II");
    } else if (role === "district_role") {
      setRole([...[navigation[8]],navigation[2]]);
      // console.log("NAVIGATION III");
    } else if (role === "candidate_role") {
      setRole([navigation[7], navigation[8],navigation[9]]);
      // console.log("NAVIGATION IV");
    }
    // console.log("NAVIGATION ", navigation);
  }, []);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/Dashboard"></CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={access_role}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
