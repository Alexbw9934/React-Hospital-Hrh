import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Human Resource Proposals",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Saved Draft",
        to: "/hrh/HRDetailsDraft",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending Approval",
        to: "/hrh/HRDetailsPending",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Need Amendment",
        to: "/hrh/HRDetailsAmend",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/hrh/HRDetailsApprove",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Canceled",
        to: "/hrh/HRDetailsCancel",
      },
      
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HR Status Report",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Saved Draft",
        to: "/hrh/DraftReport",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending Approval",
        to: "/hrh/PendingReport",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Need Amendment",
        to: "/hrh/AmendReport",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/hrh/ApprovedReport",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Canceled",
        to: "/hrh/CancelReport",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "New Menu",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "HR Approval Report",
        to: "/hrh/hr-approval",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Annex 2C (Vacancy)",
        to: "/menu/AnnexureVaccancyDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Annex 2C (Recruitment)",
        to: "/hrh/recruitmentReports/AdvsertisementStatusReportDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Regular Cadre",
        to: "/hrh/HumanResourceProsal/RegularCadreD",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HRH National ",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Advertised Positions",
        to: "/hrh/publish-positions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Applications ",
        to: "/hrh/Applications",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Human Resource Proposal",
        to: "/hrh/HumanResourceProposalDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Report New",
        to: "/hrh/HRStatusReportDetails",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "HR Financial Status",
      //   to: "/hrh/HRFinancialStatusDetails",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "HR Key Deliverables",
      //   to: "/hrh/HRKeyDeliverablesDetails",
      // },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Status Report",
        to: "/hrh/humanResourceProposalReports",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Contractual staff-NHM",
            to: "/hrh/humanResourceProposalReports/ContractualStaffDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- Regular Cadre",
            to: "/hrh/humanResourceProposalReports/RegularCadreDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- NHM",
            to: "/hrh/humanResourceProposalReports/SDNHMDetails",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Recruitment Reports",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Advertisement Status Reports",
            to: "/hrh/recruitmentReports/AdvsertisementStatusReportDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Status Reports",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Reports",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Consolidated Vacancy Status Report",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Building Status Report ",
        to: "/hrh/CapacityBuildingStatusDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Performance Monitoring ",
        to: "/hrh/performanceMonitoring/PerformanceMonitoringDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "State HRIS Dashboards",
        to: "/hrh/stateHRISDashboards/StateHRISDashboardsDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Empanelled Agency",
        to: "/hrh/hrEmpanelledAgency",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Agency Registration",
            to: "/hrh/hrEmpanelledAgency/AgencyRegistrationDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Pending Approval",
            to: "/hrh/hrEmpanelledAgency",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Approved",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report (Quarterly)",
            to: "/hrh/hrEmpanelledAgency/QuarterlyDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report by Adv ID",
            to: "/hrh/hrEmpanelledAgency/advertisedIDDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Advertisement",
            to: "/hrh/hrEmpanelledAgency/VacancyAdvertisementDetail",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Tools",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions in States",
            to: "/hrh/HumanResourceProposalDetai",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions In Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Posts in State/Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Cadre wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required PMUs",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "PMU Wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Program Management Cost",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Assessment of the Caseload for Service Delivery Human Resource ",
        to: "/hrh/AssessmentCaseloadDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Feedback / Grievances",
        to: "/feedback/Feedback",
      },
      {
        _tag: "CSidebarNavItem",
        name: "User ",
        to: "/forms/user",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Recruitment Status ",
      //   to: "/hrh/RecruitmentStatus",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "ApplicationForm ",
      //   to: "/hrh/ApplicationForm",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Sharing of information ",
      //   to: "/hrh/SharingOfIn",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Status on HR ",
      //   to: "/hrh/StatusHr",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Performance Appraisal ",
      //   to: "/hrh/PerformanceAppraisal",
      // },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "National Approved",
    to: "/hrh/HRDetailsApprove",
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HR Proposal Distribution",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Saved Draft",
        to: "/hrh/StateDraft",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending Approval",
        to: "/hrh/StatePending",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Need Amendment",
      //   to: "/hrh/StatePending",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/hrh/StateApprove",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Canceled",
        to: "/hrh/StateCancel",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejected",
        to: "/hrh/StateReject",
      },
      
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HRH State ",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Advertised Positions",
        to: "/hrh/publish-positions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Applications ",
        to: "/hrh/Applications",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Report New",
        to: "/hrh/HRStatusReportDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Human Resource Proposal Details",
        to: "/hrh/HumanResourceProposalDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Status Report",
        to: "/hrh/humanResourceProposalReports",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Contractual staff-NHM",
            to: "/hrh/humanResourceProposalReports/ContractualStaffDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- Regular Cadre",
            to: "/hrh/humanResourceProposalReports/RegularCadreDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- NHM",
            to: "/hrh/humanResourceProposalReports/SDNHMDetails",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Recruitment Reports",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Advertisement Status Reports",
            to: "/hrh/recruitmentReports/AdvsertisementStatusReportDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Status Reports",
            to: "/hrh/recruitmentReports/VacancyStatusReportDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Reports",
            to: "/hrh/recruitmentReports/RecruitmentStatusReportDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Consolidated Vacancy Status Report",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Building Status Report ",
        to: "/hrh/CapacityBuildingStatusDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Performance Monitoring ",
        router: "/hrh/performanceMonitoring",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "State Performance Monitoring ",
            to: "/hrh/performanceMonitoring/PerformanceMonitoringDetails",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "State HRIS Dashboards",
        to: "/hrh/stateHRISDashboards/StateHRISDashboardsDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Empanelled Agency",
        to: "/hrh/hrEmpanelledAgency",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Agency Registration",
            to: "/hrh/hrEmpanelledAgency/AgencyRegistrationDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Pending Approval",
            to: "/hrh/hrEmpanelledAgency",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Approved",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report (Quarterly)",
            to: "/hrh/hrEmpanelledAgency/QuarterlyDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report by Adv ID",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Advertisement",
            to: "/hrh/hrEmpanelledAgency/VacancyAdvertisementDetail",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Tools",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions in States",
            to: "/hrh/HumanResourceProposalDetai",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions In Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Posts in State/Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Cadre wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required PMUs",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "PMU Wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Program Management Cost",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Recruitment Status ",
        to: "/hrh/RecruitmentStatus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sharing of information ",
        to: "/hrh/SharingOfIn",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Status on HR",
        to: "/hrh/StatusHr",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Performance Appraisal ",
        to: "/hrh/PerformanceAppraisal",
      },
      {
        _tag: "CSidebarNavItem",
        name: "JWU",
        to: "/home/JoinWithUs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sanctioned Positions - States",
        to: "/feedback/SanctionedPositionsStates",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Contractual Distt To -States",
        to: "/forms/HRStatusContractualDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Regular Distt To -States",
        to: "/forms/HRStatusRegularDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Contract Distt To -States",
        to: "/forms/CapacityBuildStatusContractDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Regular Distt To -States",
        to: "/forms/CapacityBuildStatusRegularDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Assessment of the Caseload for Service Delivery Human Resource ",
        to: "/hrh/AssessmentCaseloadDetails",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HR Proposal Distribution",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Saved Draft",
        to: "/hrh/DistrictDraft",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending Approval",
        to: "/hrh/DistrictPending",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Need Amendment",
      //   to: "/hrh/StatePending",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/hrh/DistrictApproved",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Canceled",
        to: "/hrh/DistrictCancel",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejected",
        to: "/hrh/DistrictReject",
      },
      
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HRH District ",
    icon: "cil-puzzle",
    router: "/hrh",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Advertised Positions",
        to: "/hrh/publish-positions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Applications ",
        to: "/hrh/Applications",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Human Resource Proposal",
        to: "/hrh/HumanResourceProposalDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Report New",
        to: "/hrh/HRStatusReportDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Status Report",
        to: "/hrh/humanResourceProposalReports",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Contractual staff-NHM",
            to: "/hrh/humanResourceProposalReports/ContractualStaffDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- Regular Cadre",
            to: "/hrh/humanResourceProposalReports/RegularCadreDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Service Delivery- NHM",
            to: "/hrh/humanResourceProposalReports/SDNHMDetails",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Recruitment Reports",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Advertisement Status Reports",
            to: "/hrh/recruitmentReports/AdvsertisementStatusReportDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Status Reports",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Reports",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Consolidated Vacancy Status Report",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Building Status Report ",
        to: "/hrh/CapacityBuildingStatusDetails",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Performance Monitoring ",
        router: "/hrh/performanceMonitoring",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "District Performance Monitoring ",
            to: "/hrh/performanceMonitoring/PerformanceMonitoringDetails",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "State HRIS Dashboards",
        to: "/hrh/RecruitmentStat",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "HR Empanelled Agency",
        to: "/hrh/hrEmpanelledAgency",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Agency Registration",
            to: "/hrh/hrEmpanelledAgency/AgencyRegistrationDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Pending Approval",
            to: "/hrh/hrEmpanelledAgency",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Agencies - Approved",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report (Quarterly)",
            to: "/hrh/hrEmpanelledAgency/QuarterlyDetails",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Recruitment Status Report by Adv ID",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Vacancy Advertisement",
            to: "/hrh/hrEmpanelledAgency/VacancyAdvertisementDetail",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Tools",
        to: "/hrh/HumanResourceProposalDeta",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions in States",
            to: "/hrh/HumanResourceProposalDetai",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Institutions In Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required Posts in State/Districts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Cadre wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Required PMUs",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "PMU Wise Posts",
            to: "/hrh/HumanResourceProposalDeta",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Program Management Cost",
            to: "/hrh/HumanResourceProposalDeta",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Feedback / Grievances",
        to: "/feedback/Feedback",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sharing of information ",
        to: "/hrh/SharingOfIn",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Status on HR ",
        to: "/hrh/StatusHr",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Performance Appraisal ",
        to: "/hrh/PerformanceAppraisal",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sanctioned Positions - States",
        to: "/feedback/SanctionedPositionsStates",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Contractual Distt To Div",
        to: "/forms/HRStatusContractualDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Regular Distt To -District",
        to: "/forms/HRStatusRegularDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Contract Distt To -District",
        to: "/forms/CapacityBuildStatusContractDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Regular Distt To -District",
        to: "/forms/CapacityBuildStatusRegularDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Recruitment Status ",
        to: "/hrh/RecruitmentStatus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Assessment of the Caseload for Service Delivery Human Resource ",
        to: "/hrh/AssessmentCaseloadDetails",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "HRH Masters",
    icon: "cil-puzzle",
    router: "/masters",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Program Types",
        to: "/masters/ProgramType",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Types of Post",
        to: "/masters/type-of-post",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sub Types of Post",
        to: "/masters/sub-type-of-post",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Fmr Code",
        to: "/masters/fmr-code",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Category of Post",
        to: "/masters/category-of-post",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Name of Post",
        to: "/masters/name-of-post",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Types of Facility/Office",
        to: "/masters/TypeofFacility",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Financial Years",
        to: "/masters/FinancialYear",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Places of Post",
        to: "/masters/PlaceofPost",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Job Positions",
        to: "/masters/JobPosition",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Places of Facility",
        to: "/masters/PlaceOfFacility",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Specialist/Services",
        to: "/masters/Specialist",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Reservation Categories",
        to: "/masters/ReservationCategory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Recruitment Conductors",
        to: "/masters/RecruitmentConuctor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Type of Associations",
        to: "/masters/TypeOfAssociation",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Types of Course",
        to: "/masters/TypeOfCourse",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Courses",
        to: "/masters/Course",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Types Of Approval",
        to: "/masters/TypeOfApproval",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Gradings",
        to: "/masters/Grading",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Types Of Vacancy Advertisement",
        to: "/masters/TypeOfVacancyAdvertisement",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Empanelment Statuses",
        to: "/masters/EmpanelmentStatus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Statuses Of Vacancy Advertisement",
        to: "/masters/StatusOfVacancyAdvertisement",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Population Norms",
        to: "/masters/PopulationNorms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Education Categories",
        to: "/masters/EducationCategory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Education Qualifications",
        to: "/masters/EducationQualifications",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Domain/Skills",
        to: "/masters/DomainSkills",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Job Category",
      //   to: "/masters/JobCategory",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Reporting Period",
        to: "/masters/reporting-period",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Financial Status Parameters",
        to: "/masters/financial-status",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Key Deliverable Parameters",
        to: "/masters/key-deliverables",
      },
      {
        _tag: "CSidebarNavItem",
        name: "importCSV",
        to: "/masters/import-csv",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "General Masters",
    icon: "cil-puzzle",
    router: "/masters",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Salutations",
        to: "/masters/Salutations",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Blood Groups",
        to: "/masters/BloodGroup",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Genders",
        to: "/masters/Gender",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Nationalities",
        to: "/masters/Nationality",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Languages",
        to: "/masters/Language",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Religions",
        to: "/masters/Religion",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Castes",
        to: "/masters/Caste",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Marital Statuses",
        to: "/masters/MaritalStatus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Fee Grades",
        to: "/masters/FeeGrade",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Places of Post",
        to: "/masters/PlaceofPost",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Application Status",
        to: "/masters/PlaceofPot",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Type of Feedback",
        to: "/masters/PlaceofPot",
      },
    ],
  },
  // Client menu
  {
    _tag: "CSidebarNavItem",
    name: "Join Hands With NHM Portal",
    to: "/CandidateDashboard",
    icon: <CIcon name="cilPencil" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Advertised Positions",
    to: "/AvailablePosition",
    icon: <CIcon name="cilPencil" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Feedback / Grievances",
    to: "/feedback/Feedback",
    icon: <CIcon name="cilPencil" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Geography",
    icon: "cil-puzzle",
    router: "/geography",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "State Categories",
        to: "/geography/StateCategory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "States/UT",
        to: "/geography/State",
      },
      {
        _tag: "CSidebarNavItem",
        name: "District Categories",
        to: "/geography/DistrictCategories",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Divisions/Mandals",
        to: "/geography/Divisions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Districts",
        to: "/geography/District",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Block Categories",
        to: "/geography/BlockCategories",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Blocks",
        to: "/geography/Block",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Urban Areas",
        to: "/geography/UrbanArea",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Cities",
        to: "/geography/Cities",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "BlockList",
      //   to: "/geography/BlockList",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "BlockCategoriesList",
      //   to: "/geography/BlockCategoriesList",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "CitiesList",
      //   to: "/geography/CitiesList",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Countries",
        to: "/geography/Countries",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "CountriesList",
      //   to: "/geography/CountriesList",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "DistrictCategoriesList",
      //   to: "/geography/DistrictCategoriesList",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "DivisionLIst",
      //   to: "/geography/DivisionList",
      // },

      // {
      //   _tag: "CSidebarNavItem",
      //   name: "StateLIst",
      //   to: "/geography/StateLIst",
      // },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Forms",
    icon: "cil-puzzle",
    router: "/forms/",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Required Positions at State Level",
        to: "/forms/RequiredPositionsatStateLevel",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Required Positions at District Level",
        to: "/forms/requiredpositionsatdistrictlevel",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Post Status by States",
        to: "/forms/PostStatusbyStates",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Required PMUS at State Level",
        to: "/forms/requiredpmusatstatelevel",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Project Management Cost",
        to: "/forms/projectmanagementcost",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Required HR Post wise at PMU",
        to: "/forms/RequiredHRPostWiseAtPMU",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Feedback / Grievances",
        to: "/feedback/Feedback",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sanctioned Positions - States",
        to: "/feedback/SanctionedPositionsStates",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Post Status by States Cadre",
        to: "/forms/PostStatusByCadre",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Human Resource Proposal",
        to: "/hrh/HumanResourceProposalDetails",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Contractual Distt To National",
        to: "/forms/HRStatusContractualDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "HR Status Regular Distt To -National",
        to: "/forms/HRStatusRegularDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Contract Distt To -National",
        to: "/forms/CapacityBuildStatusContractDisttTo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Capacity Build Status Regular Distt To -National",
        to: "/forms/CapacityBuildStatusRegularDisttTo",
      },
    ],
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Drag-Drop",
  //   icon: "cil-puzzle",
  //   router: "/formbuilder",
  //   _children:[
  //     {
  //             _tag: "CSidebarNavItem",
  //             name: "Drag_Drop",
  //             to: "/formbuilder/Drag_drop",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Formeo",
  //             // icon: "cil-puzzle",
  //             router: "/formbuilder",
  //             to:"/formbuilder/Formeo"
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Form",
  //             // icon: "cil-puzzle",
  //             router: "/formbuilder",
  //             to:"/formbuilder/Form"
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "ReatFormBuilder",
  //             // icon: "cil-puzzle",
  //             router: "/formbuilder",
  //             to:"/formbuilder/ReactFormbuilder"
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "formio",
  //             // icon: "cil-puzzle",
  //             router: "/formbuilder",
  //             to:"/formbuilder/ReactFormio"
  //           },
  //         ]
  // },

  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Ereceipt",
  //   icon: "cil-puzzle",
  //   router: "/ereceipt",

  //   _children:[
  //     {
  //             _tag: "CSidebarNavItem",
  //             name: "ReadSelectAsync",
  //             to: "/ereceipt/ReadSelectAsync",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Country",
  //             to: "/ereceipt/Country",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "State",
  //             to: "/ereceipt/State",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "City",
  //             to: "/ereceipt/City",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Currency",
  //             to: "/ereceipt/Currency",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Company",
  //             to: "/ereceipt/Company",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Branch",
  //             to: "/ereceipt/Branch",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "SalesChanneltype",
  //             to: "/ereceipt/SalesChannelType",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "SalesChannels",
  //             to: "/ereceipt/SalesChannels",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "ReceiptType",
  //             to: "/ereceipt/ReceiptType",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "Customer",
  //             to: "/ereceipt/Customer",
  //           },
  //   ]
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "EreceiptForm",
  //   icon: "cil-puzzle",
  //   router: "/ereceipt",

  //   _children:[
  //     {
  //             _tag: "CSidebarNavItem",
  //             name: "Country",
  //             to: "/ereceiptForm/CountryF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "StateF",
  //             to: "/ereceiptForm/StateF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "CityF",
  //             to: "/ereceiptForm/CityF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "CurrenciesF",
  //             to: "/ereceiptForm/CurrenciesF",
  //           },
  //           // {
  //           //   _tag: "CSidebarNavItem",
  //           //   name: "SalesChannelTypeF",
  //           //   to: "/ereceiptForm/SalesChannelTypeF",
  //           // },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "CompanyF",
  //             to: "/ereceiptForm/CompanyF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "BranchesF",
  //             to: "/ereceiptForm/BranchF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "SalesChannlTypeF",
  //             to: "/ereceiptForm/SalesChannlTypeF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "SalesChannelsF",
  //             to: "/ereceiptForm/SalesChannelsF",
  //           },
  //           {
  //             _tag: "CSidebarNavItem",
  //             name: "CustomerF",
  //             to: "/ereceiptForm/CustomerF",
  //           },
  //         ]
  // }
  //   {
  //     _tag: "CSidebarNavDropdown",
  //     name: "All Payees",
  //     route: "/payout",
  //     icon: "cil-puzzle",
  //     _children: [
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Payees",
  //         to: "/payout/Payees",
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Create Payee",
  //         to: "/payout/CreatePayee",
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Payee Details",
  //         to: "/payout/PayeeDetails",
  //       },
  //     ],
  //   },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Future Transaction",
  //     route: "/payout",
  //     to: "/payout/FutuTransaction",
  //     icon: "cil-puzzle",
  //   },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Executed Transaction",
  //     route: "/payout",
  //     to: "/payout/ExecTransaction",
  //     icon: "cil-puzzle",
  //   },
  //   {
  //     _tag: "CSidebarNavDropdown",
  //     name: "ALL Batches",
  //     route: "/payout",
  //     icon: "cil-puzzle",
  //     _children:[
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Batches",
  //         to: "/payout/Batches",
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Batche Details",
  //         to: "/payout/BatchDetails",
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Transaction Details",
  //         to: "/payout/TransactionDetails",
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Create Payout",
  //         to: "/payout/CreatePayout",
  //       },
  //     ]
  //   },
  //   {
  //     _tag: "CSidebarNavDropdown",
  //     name: "Setting",
  //     route: "/Payout",
  //     icon: "cil-puzzle",
  //     _children: [
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Setting",
  //         to: "/payout/Setting"
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Create Edit Admin",
  //         to: "/payout/CreateEditAdmin"
  //       },
  //     ]
  //   },{
  //     _tag: "CSidebarNavItem",
  //     name: "Webhook",
  //     route: "/Payout",
  //     icon: "cil-puzzle",
  //     to: "/payout/Webhook"
  //   },
  //   {
  //     _tag: 'CSidebarNavDropdown',
  //     name: 'Tags',
  //     route: '/payout',
  //     icon: 'cil-puzzle',
  //     _children: [
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "Tag",
  //         to: "/payout/Tag"
  //       },
  //       {
  //         _tag: "CSidebarNavItem",
  //         name: "CreateEdit Tag",
  //         to: "/payout/CreateEditTag"
  //       },
  //    ]
  //  },
];

export default _nav;
