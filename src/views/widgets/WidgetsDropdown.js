import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = () => {
  // render
  return (
    <CRow>
      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header=""
          text="Sharing of Information"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '10px'}}
              backgroundColor="rgba(255,255,255,.2)"
              // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              // pointHoverBackgroundColor="primary"
              // label="Members"
              // labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header=""
          text="Status on HR"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '10px'}}
              backgroundColor="rgba(255,255,255,.2)"
              // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              // options={{ elements: { line: { borderWidth: 2.5 }}}}
              // pointHoverBackgroundColor="warning"
              // label="Members"
              // labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-danger"
          header=""
          text="Performance Appraisal"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '10px'}}
              backgroundColor="rgba(255,255,255,.2)"
              // backgroundColor="rgb(250, 152, 152)"
              // label="Members"
              // labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
