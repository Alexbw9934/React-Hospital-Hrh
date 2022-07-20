import React from "react";
// import Branch from './views/ereceipt/Branch';

// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const StateDashboard = React.lazy(() =>
  import("./views/dashboard/StateDashboard")
);
const DistrictDashboard = React.lazy(() =>
  import("./views/dashboard/DistrictDashboard")
);
const CandidateDashboard = React.lazy(() =>
  import("./views/dashboard/CandidateDashboard")
);

const AvailablePosition = React.lazy(() =>
  import("./views/Candidate/Positions")
);

const ReadSelectAsync = React.lazy(() =>
  import("./views/ereceipt/ReadSelectAsync")
);
const Country = React.lazy(() => import("./views/ereceipt/Country"));
// const State = React.lazy(() => import('./views/ereceipt/State'));
const City = React.lazy(() => import("./views/ereceipt/City"));
const Currency = React.lazy(() => import("./views/ereceipt/Currency"));
// const Company = React.lazy(() => import('./views/ereceipt/Company'));
// const Branch = React.lazy(() => import('./views/ereceipt/Branch'));
const SalesChannelType = React.lazy(() =>
  import("./views/ereceipt/SalesChannelType")
);
const SalesChannels = React.lazy(() =>
  import("./views/ereceipt/SalesChannels")
);
const ReceiptType = React.lazy(() => import("./views/ereceipt/ReceiptType"));
// const Customer = React.lazy(() => import('./views/ereceipt/Customer'));
//drag and drop
const Drag_drop = React.lazy(() => import("./views/formbuilder/Drag_drop"));
const Formeo = React.lazy(() => import("./views/formbuilder/Formeo"));
const Form = React.lazy(() => import("./views/formbuilder/Form"));
const ReactFormbuilder = React.lazy(() =>
  import("./views/formbuilder/ReactFormbuilder")
);
// const ReactFormio = React.lazy(() => import("./views/formbuilder/ReactFormio"));
//end

//form
const CountryF = React.lazy(() => import("./views/ereceiptForm/CountryF"));
const StateF = React.lazy(() => import("./views/ereceiptForm/StateF"));
const CityF = React.lazy(() => import("./views/ereceiptForm/CityF"));
const CurrenciesF = React.lazy(() =>
  import("./views/ereceiptForm/CurrenciesF")
);
const SalesChannelTypeF = React.lazy(() =>
  import("./views/ereceiptForm/SalesChannelTypeF")
);
const CompanyF = React.lazy(() => import("./views/ereceiptForm/CompanyF"));
const BranchF = React.lazy(() => import("./views/ereceiptForm/BranchF"));
const SalesChannlTypeF = React.lazy(() =>
  import("./views/ereceiptForm/SalesChannlTypeF")
);
const SalesChannelsF = React.lazy(() =>
  import("./views/ereceiptForm/SalesChannelsF")
);
const CustomerF = React.lazy(() => import("./views/ereceiptForm/CustomerF"));
//end

//masters
// const Master = React.lazy(() => import('./views/masters/Master'));
const Test = React.lazy(() => import("./views/masters/Test"));
const JobPosition = React.lazy(() => import("./views/masters/JobPosition"));
const Salutations = React.lazy(() => import("./views/masters/Salutations"));
const BloodGroup = React.lazy(() => import("./views/masters/BloodGroup"));
const Gender = React.lazy(() => import("./views/masters/Gender"));
const Nationality = React.lazy(() => import("./views/masters/Nationality"));
const Language = React.lazy(() => import("./views/masters/Language"));
const Religion = React.lazy(() => import("./views/masters/Religion"));
const Caste = React.lazy(() => import("./views/masters/Caste"));
const FmrNo = React.lazy(() => import("./views/masters/FmrCode"));
const MaritalStatus = React.lazy(() => import("./views/masters/MaritalStatus"));
const ReportingPriod = React.lazy(() => import("./views/masters/ReportingPeriod"));
const EducationCategory = React.lazy(() =>
  import("./views/masters/EducationCategory")
);
const EducationQualifications = React.lazy(() =>
  import("./views/masters/EducationQualifications")
);
const DomainSkills = React.lazy(() => import("./views/masters/DomainSkills"));
const FeeGrade = React.lazy(() => import("./views/masters/FeeGrade"));
const ProgramType = React.lazy(() => import("./views/masters/ProgramType"));
const PlaceofPost = React.lazy(() => import("./views/masters/PlaceofPost"));
const TypeofFacility = React.lazy(() =>
  import("./views/masters/TypeofFacility")
);
const TypeOfPost = React.lazy(() =>
  import("./views/masters/TypeofPost")
);
const JobCategory = React.lazy(() => import("./views/masters/JobCategory"));
const NameOfPost = React.lazy(() => import("./views/masters/NameofPost"));
const FinancialStatus = React.lazy(() => import("./views/masters/FinancialStatus"));
const KeyDeliverables = React.lazy(() => import("./views/masters/KeyDeliverable"));
const ImportCSV = React.lazy(() => import("./views/masters/ImportCSV"));
//geography
const Countries = React.lazy(() => import("./views/geography/Countries"));
const CountriesList = React.lazy(() =>
  import("./views/geography/CountriesList")
);
const CitiesList = React.lazy(() => import("./views/geography/CitiesList"));
const Cities = React.lazy(() => import("./views/geography/Cities"));
const Branch = React.lazy(() => import("./views/masters/Branch"));
const BranchList = React.lazy(() => import("./views/masters/BranchList"));
const State = React.lazy(() => import("./views/geography/State"));
const StateLIst = React.lazy(() => import("./views/geography/StateLIst"));
const Divisions = React.lazy(() => import("./views/geography/Divisions"));
const DivisionList = React.lazy(() =>
  import("./views/geography/DivisionsList")
);
const Block = React.lazy(() => import("./views/geography/Block"));
const BlockList = React.lazy(() => import("./views/geography/BlockList"));
const BlockCategories = React.lazy(() =>
  import("./views/geography/BlockCategories")
);
const BlockCategoriesList = React.lazy(() =>
  import("./views/geography/BlockCategoriesList")
);
const UrbanArea = React.lazy(() => import("./views/geography/UrbanArea"));
const Company = React.lazy(() => import("./views/masters/Company"));
const CompanyList = React.lazy(() => import("./views/masters/CompanyList"));
const Currencies = React.lazy(() => import("./views/masters/Currencies"));
const CurrenciesList = React.lazy(() =>
  import("./views/masters/CurrenciesList")
);
const Customer = React.lazy(() => import("./views/masters/Customer"));
const CustomerList = React.lazy(() => import("./views/masters/CustomerList"));
const FinancialYear = React.lazy(() => import("./views/masters/FinancialYear"));
const CategoryofPost = React.lazy(() =>
  import("./views/masters/CategoryofPost")
);
const PlaceOfFacility = React.lazy(() =>
  import("./views/masters/PlaceOfFacility")
);
const Specialist = React.lazy(() => import("./views/masters/Specialist"));
const ReservationCategory = React.lazy(() =>
  import("./views/masters/ReservationCategory")
);
const RecruitmentConuctor = React.lazy(() =>
  import("./views/masters/RecruitmentConuctor")
);
const TypeOfAssociation = React.lazy(() =>
  import("./views/masters/TypeOfAssociation")
);
const TypeOfCourse = React.lazy(() => import("./views/masters/TypeOfCourse"));
const Course = React.lazy(() => import("./views/masters/Course"));
const Grading = React.lazy(() => import("./views/masters/Grading"));
const TypeOfVacancyAdvertisement = React.lazy(() =>
  import("./views/masters/TypeOfVacancyAdvertisement")
);
const EmpanelmentStatus = React.lazy(() =>
  import("./views/masters/EmpanelmentStatus")
);
const StatusOfVacancyAdvertisement = React.lazy(() =>
  import("./views/masters/StatusOfVacancyAdvertisement")
);
const PopulationNorms = React.lazy(() =>
  import("./views/masters/PopulationNorms")
);
const TypeOfApproval = React.lazy(() =>
  import("./views/masters/TypeOfApproval")
);
const SubTypeofPost = React.lazy(() =>
  import("./views/masters/SubTypeOfPost")
);
const DistrictCategories = React.lazy(() =>
  import("./views/geography/DistrictCategories")
);
const DistrictCategoriesList = React.lazy(() =>
  import("./views/geography/DistrictCategoriesList")
);
const StateCategory = React.lazy(() =>
  import("./views/geography/StateCategory")
);
const District = React.lazy(() => import("./views/geography/District"));
//end
//HRH
const RecruitmentStatus = React.lazy(() =>
  import("./views/hrh/RecruitmentStatus")
);
const AddRecruitmentStatus = React.lazy(() =>
  import("./views/hrh/AddRecruitmentStatus")
);
const Applications = React.lazy(() => import("./views/hrh/Applications"));
const ApplicationForm = React.lazy(() => import("./views/hrh/ApplicationForm"));
// const PersonalInformation = React.lazy(() =>
//   import("./views/hrh/PersonalInformation")
// );
const SharingofIn = React.lazy(() => import("./views/hrh/SharingofIn"));
const StatusHr = React.lazy(() => import("./views/hrh/StatusHr"));
const AddStatusHr = React.lazy(() => import("./views/hrh/AddStatusHr"));
const PerformanceAppraisal = React.lazy(() =>
  import("./views/hrh/PerformanceAppraisal")
);
const AddPerformanceAppraisal = React.lazy(() =>
  import("./views/hrh/AddPerformanceAppraisal")
);
// const PdF = React.lazy(() => import("./views/hrh/PdF"));
const Tabs = React.lazy(() => import("./views/hrh/Tabs"));
const QuarterlyDetails = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/QuarterlyDetails")
);
const Quarterly = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/Quarterly")
);
const AdvertisedID = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/advertisedID/AdvertisedID")
);
const AdvertisedIDDetails = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/advertisedID/index")
);
const PerformanceMonitoring = React.lazy(() =>
  import("./views/hrh/performanceMonitoring/PerformanceMonitoring")
);
const PerformanceMonitoringDetails = React.lazy(() =>
  import("./views/hrh/performanceMonitoring/PerformanceMonitoringDetails")
);
const PerformanceMonitoringState = React.lazy(() =>
  import("./views/hrh/performanceMonitoring/StatePerformanceMonitoring")
);
const StateHRISDashboards = React.lazy(() =>
  import("./views/hrh/stateHRISDashboards/StateHRISDashboards")
);
const StateHRISDashboardsDetails = React.lazy(() =>
  import("./views/hrh/stateHRISDashboards/StateHRISDashboardsDetails")
);
const HRStatusReportDetail = React.lazy(() =>
  import("./views/hrh/hrStatusReport/HRStatusReportDetail")
);
const HRStatusReportForm = React.lazy(() =>
  import("./views/hrh/hrStatusReport/HRStatusReportForm")
);
const HRStatusState = React.lazy(() =>
  import("./views/hrh/hrStatusReport/HRStatusState")
);
const AnnexureVacancyDetails = React.lazy(() =>
  import("./views/hrh/vacancy/AnnexureVacancyDetails")
);
const AnnexureVacancyDistrict = React.lazy(() =>
  import("./views/hrh/vacancy/AnnexureVacancyDistrict")
);
const DistributeFinancial = React.lazy(() =>
  import("./views/hrh/DistributeFinancial")
);
const KeyDelivDistrict = React.lazy(() =>
  import("./views/hrh/KeyDelivDistrict")
);
const DistributeDistrictFinancial = React.lazy(() =>
  import("./views/hrh/DistributeDistrictFinancial")
);
const PhysicalCSVDistrict = React.lazy(() =>
  import("./views/hrh/PhysicalCSVDistrict")
);
const PhysicalCSVState = React.lazy(() =>
  import("./views/hrh/PhysicalCSVState")
);
const FinanceCSV = React.lazy(() =>
  import("./views/hrh/FinanceCSV")
);
const StateDetailCSV = React.lazy(() =>
  import("./views/hrh/StateDetailCSV")
);
const HRDraft = React.lazy(() =>
  import("./views/hrh/status/HRDraft")
);
const HRAmend = React.lazy(() =>
  import("./views/hrh/status/HRAmend")
);
const HRApprove = React.lazy(() =>
  import("./views/hrh/status/HRApprove")
);
const HRPending = React.lazy(() =>
  import("./views/hrh/status/HRPending")
);
const HRCancel = React.lazy(() =>
  import("./views/hrh/status/HRCancel")
);
const StateApproved = React.lazy(() =>
  import("./views/hrh/stateStatus/StateApproved")
);
const StateCancel = React.lazy(() =>
  import("./views/hrh/stateStatus/StateCancel")
);
const StateDraft = React.lazy(() =>
  import("./views/hrh/stateStatus/StateDraft")
);
const StatePending = React.lazy(() =>
  import("./views/hrh/stateStatus/StatePending")
);
const StateReject = React.lazy(() =>
  import("./views/hrh/stateStatus/StateReject")
);
const KeyDeliv = React.lazy(() =>
  import("./views/hrh/KeyDeliv")
);
const DistrictDraft = React.lazy(() =>
  import("./views/hrh/districtStatus/DistrictDraft")
);
const DistrictCancel = React.lazy(() =>
  import("./views/hrh/districtStatus/DistrictCancel")
);
const DistrictReject = React.lazy(() =>
  import("./views/hrh/districtStatus/DistrictReject")
);
const DistrictPending = React.lazy(() =>
  import("./views/hrh/districtStatus/DistrictPending")
);
const DistrictApprove = React.lazy(() =>
  import("./views/hrh/districtStatus/ApproveDistrict")
);
const AmendReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/status/AmendReport")
);
const ApprovedReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/status/ApprovedReport")
);
const CancelReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/status/CancelReport")
);
const DraftReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/status/DraftReport")
);
const PendingReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/status/PendingReport")
);
const HRApprovalReport = React.lazy(() =>
  import("./views/hrh/hrStatusReport/HRApprovalReport")
);
const HRApprovalDetail = React.lazy(() =>
  import("./views/hrh/hrStatusReport/HRApprovalDetail")
);
//HRH end
//home
// const JoinWithUs  = React.lazy(() => import('./views/home/JoinWithUs'));
//end
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const PublishPositions = React.lazy(() => import("./views/PublishPositions"));

const AddPosition = React.lazy(() =>
  import("./views/PublishPositions/AddPosition")
);

const EditPosition = React.lazy(() =>
  import("./views/PublishPositions/EditPosition")
);
const Feedback = React.lazy(() => import("./views/feedback/Feedback"));
const SanctionedPositionsStates = React.lazy(() =>
  import("./views/feedback/SanctionedPositionsStates")
);
const HumanResourceProposalDetails = React.lazy(() =>
  import("./views/hrh/HumanResourceProposalDetails")
);
const HumanResourceProposalNational = React.lazy(() =>
  import("./views/hrh/HumanResourceProposalNational")
);
const HRProposalDistrict = React.lazy(() =>
  import("./views/hrh/HRProposalDistrict")
);
const HRFinancialStatusDetails = React.lazy(() =>
  import("./views/hrh/HRFinancialStatusDetails")
);
const HRKeyDeliverablesDetails = React.lazy(() =>
  import("./views/hrh/HRKeyDeliverablesDetails")
);
const HRFinancialStatus = React.lazy(() =>
  import("./views/hrh/HRFinancialStatus")
);
const HRKeyDeliverables = React.lazy(() =>
  import("./views/hrh/HRKeyDeliverables")
);
const HRKeyDeliverablesD = React.lazy(() =>
  import("./views/hrh/HRKeyDeliverablesD")
);
const HumanResourceProposalDetailsForm = React.lazy(() =>
  import("./views/hrh/HumanResourceProposalDetailsForm")
);
const HumanResourceProposalState = React.lazy(() =>
  import("./views/hrh/HumanResourceProposalState")
);
const ContractualStaff = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/ContractualStaff")
);
const ContractualStaffDetails = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/ContractualStaffDetails")
);
const RegularCadre = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/RegularCadre")
);
const RegularCadreDetails = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/RegularCadreDetails")
);
const SDNHM = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/SDNHM")
);
const SDNHMState = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/SDNHMState")
);
const SDNHMDetails = React.lazy(() =>
  import("./views/hrh/humanResourceProposalReports/SDNHMDetails")
);
const AgencyRegistrationDetails = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/AgencyRegistrationDetails")
);
const AgencyRegistration = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/AgencyRegistration")
);
const VacancyAdvertisement = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/VacancyAdvertisement")
);
const VacancyAdvertisementDetail = React.lazy(() =>
  import("./views/hrh/hrEmpanelledAgency/VacancyAdvertisementDetail")
);
const AdvertisementReportDetails = React.lazy(() =>
  import("./views/hrh/recruitmentReport/advertisementReport/index")
);
const AdvertisementReport = React.lazy(() =>
  import(
    "./views/hrh/recruitmentReport/advertisementReport/AdvertisementReport"
  )
);
const AdvertisementReportNational = React.lazy(() =>
  import(
    "./views/hrh/recruitmentReport/advertisementReport/AdvertisementReportNationl"
  )
);
const VacancyStatusReport = React.lazy(() =>
  import(
    "./views/hrh/recruitmentReport/vacancyStatusReport/VacancyStatusReport"
  )
);
const VacancyStatusReportDetails = React.lazy(() =>
  import("./views/hrh/recruitmentReport/vacancyStatusReport/index")
);
const RecruitmentStatusReport = React.lazy(() =>
  import(
    "./views/hrh/recruitmentReport/recruitmentStatusReport/RecruitmentStatusReport"
  )
);
const RecruitmentStatusReportDetails = React.lazy(() =>
  import("./views/hrh/recruitmentReport/recruitmentStatusReport/index")
);
const CapacityBuildingStatusDetails = React.lazy(() =>
  import("./views/hrh/capacityBuilding/index")
);
const CapacityBuildingStatus = React.lazy(() =>
  import("./views/hrh/capacityBuilding/CapacityBuildingStatus")
);
const CapacityBuildingStatusNational = React.lazy(() =>
  import("./views/hrh/capacityBuilding/CapacityBuildingStatusNational")
);
const AssessmentCaseload = React.lazy(() =>
  import("./views/hrh/AssessmentCaseload/AssessmentSDHR")
);
const AssessmentCaseloadDetails = React.lazy(() =>
  import("./views/hrh/AssessmentCaseload/index")
);
const UserForm = React.lazy(() => import("./views/forms/UserForm"));
const Distribute = React.lazy(() => import("./views/hrh/Distribute"));
const DistributeDistrict = React.lazy(() => import("./views/hrh/DistributeDistrict"));
const RegularCadreD = React.lazy(() => import("./views/hrh/newMenu/RegulaCadreD"));
const RegularCadreDis = React.lazy(() => import("./views/hrh/newMenu/RegularCadreDis"));
const HRStatusDistrict = React.lazy(() => import("./views/hrh/hrStatusReport/HRStatusDistrict"));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "National Dashboard", component: Dashboard },
  {
    path: "/StateDashboard",
    name: "StateDashboard",
    component: StateDashboard,
  },
  {
    path: "/DistrictDashboard",
    name: "DistrictDashboard",
    component: DistrictDashboard,
  },
  // Candidate Dashboard
  {
    path: "/CandidateDashboard",
    name: "Join Hands With NHM Portal",
    component: CandidateDashboard,
  },
  {
    path: "/AvailablePosition",
    name: "Advertised Positions",
    component: AvailablePosition,
  },
  { path: "/formbuilder/Drag_drop", name: "Drag_drop", component: Drag_drop },
  { path: "/formbuilder/Formeo", name: "Formeo", component: Formeo },
  { path: "/formbuilder/Form", name: "Form", component: Form },
  {
    path: "/formbuilder/ReactFormbuilder",
    name: "ReactFormbuilder",
    component: ReactFormbuilder,
  },
  {
    path: "/ereceipt/ReadSelectAsync",
    name: "ReadSelectAsync",
    component: ReadSelectAsync,
  },
  { path: "/ereceipt/Country", name: "Country", component: Country },
  { path: "/ereceipt/State", name: "State", component: State },
  { path: "/ereceipt/City", name: "City", component: City },
  { path: "/ereceipt/Currency", name: "Currency", component: Currency },
  { path: "/ereceipt/Company", name: "Company", component: Company },
  { path: "/ereceipt/Branch", name: "Branch", component: Branch },
  {
    path: "/ereceipt/SalesChannelType",
    name: "SalesChannelType",
    component: SalesChannelType,
  },
  {
    path: "/ereceipt/SalesChannels",
    name: "SalesChannels",
    component: SalesChannels,
  },
  {
    path: "/ereceipt/ReceiptType",
    name: "ReceiptType",
    component: ReceiptType,
  },
  { path: "/ereceipt/Customer", name: "Customer", component: Customer },

  //form
  { path: "/ereceiptForm/CountryF", name: "CountryF", component: CountryF },
  { path: "/ereceiptForm/StateF", name: "StateF", component: StateF },
  { path: "/ereceiptForm/CityF", name: "CityF", component: CityF },
  {
    path: "/ereceiptForm/CurrenciesF",
    name: "CurrenciesF",
    component: CurrenciesF,
  },
  {
    path: "/ereceiptForm/SalesChannelTypeF",
    name: "SalesChannelTypeF",
    component: SalesChannelTypeF,
  },
  { path: "/ereceiptForm/CompanyF", name: "CompanyF", component: CompanyF },
  { path: "/ereceiptForm/BranchF", name: "BranchF", component: BranchF },
  {
    path: "/ereceiptForm/SalesChannlTypeF",
    name: "SalesChannlTypeF",
    component: SalesChannlTypeF,
  },
  {
    path: "/ereceiptForm/SalesChannelsF",
    name: "SalesChannelsF",
    component: SalesChannelsF,
  },
  { path: "/ereceiptForm/CustomerF", name: "CustomerF", component: CustomerF },
  //end

  //masters
  // {path: '/masters/Master', name: 'Master', component:Master},
  {
    path: "/masters/JobPosition",
    name: "Job Positiion",
    component: JobPosition,
  },
  { path: "/masters/Salutations", name: "Salutation", component: Salutations },
  { path: "/masters/BloodGroup", name: "Blood Group", component: BloodGroup },
  { path: "/masters/Gender", name: "Gender", component: Gender },
  { path: "/masters/Nationality", name: "Nationality", component: Nationality },
  { path: "/masters/Language", name: "Language", component: Language },
  { path: "/masters/Religion", name: "Religion", component: Religion },
  { path: "/masters/Caste", name: "Caste", component: Caste },
  { path: "/masters/fmr-code", name: "Fmr Code", component: FmrNo },
  {
    path: "/masters/MaritalStatus",
    name: "Marital Status",
    component: MaritalStatus,
  },
  {
    path: "/masters/EducationCategory",
    name: "Education Category",
    component: EducationCategory,
  },
  {
    path: "/masters/EducationQualifications",
    name: "Education Qualification",
    component: EducationQualifications,
  },
  {
    path: "/masters/DomainSkills",
    name: "Domain/Skill",
    component: DomainSkills,
  },
  { path: "/masters/FeeGrade", name: "Fee Grade", component: FeeGrade },
  {
    path: "/masters/ProgramType",
    name: "Program Type",
    component: ProgramType,
  },
  {
    path: "/masters/PlaceofPost",
    name: "Place of Post",
    component: PlaceofPost,
  },
  {
    path: "/masters/TypeofFacility",
    name: "Type of Facility/Office",
    component: TypeofFacility,
  },
  {
    path: "/masters/JobCategory",
    name: "Job Category",
    component: JobCategory,
  },
  { path: "/masters/name-of-post", name: "Name of Post", component: NameOfPost },
  {
    path: "/masters/FinancialYear",
    name: "Financial Year",
    component: FinancialYear,
  },
  {
    path: "/masters/type-of-post",
    name: "Type of Position",
    component: TypeOfPost,
  },
  {
    path: "/masters/category-of-post",
    name: "Category of Post",
    component: CategoryofPost,
  },
  {
    path: "/masters/PlaceOfFacility",
    name: "PlaceOfFacility",
    component: PlaceOfFacility,
  },
  { path: "/masters/Specialist", name: "Specialist", component: Specialist },
  {
    path: "/masters/ReservationCategory",
    name: "Reservation Category",
    component: ReservationCategory,
  },
  {
    path: "/masters/RecruitmentConuctor",
    name: "Recruitment Conductor",
    component: RecruitmentConuctor,
  },
  {
    path: "/masters/TypeOfAssociation",
    name: "Type of Association",
    component: TypeOfAssociation,
  },
  {
    path: "/masters/TypeOfCourse",
    name: "Type of Course",
    component: TypeOfCourse,
  },
  {
    path: "/masters/Course",
    name: "Course",
    component: Course,
  },
  {
    path: "/masters/Grading",
    name: "Grading",
    component: Grading,
  },
  {
    path: "/masters/TypeOfVacancyAdvertisement",
    name: "Type Of Vacancy Advertisement",
    component: TypeOfVacancyAdvertisement,
  },
  {
    path: "/masters/EmpanelmentStatus",
    name: "Empanelment Status",
    component: EmpanelmentStatus,
  },
  {
    path: "/masters/StatusOfVacancyAdvertisement",
    name: "Status Of Vacancy Advertisement",
    component: StatusOfVacancyAdvertisement,
  },
  {
    path: "/masters/PopulationNorms",
    name: "Population Norm",
    component: PopulationNorms,
  },
  {
    path: "/masters/TypeOfApproval",
    name: "Type of Approval",
    component: TypeOfApproval,
  },
  {
    path: "/masters/reporting-period",
    name: "Reporting Period",
    component: ReportingPriod,
  },
  {
    path: "/masters/sub-type-of-post",
    name: "Sub Type Of Post",
    component: SubTypeofPost,
  },
  {
    path: "/masters/financial-status",
    name: "Financial Status",
    component: FinancialStatus,
  },
  {
    path: "/masters/key-deliverables",
    name: "Key Deliverables",
    component: KeyDeliverables,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/import-csv",
    name: "importCSV",
    component: ImportCSV,
  },
  //geography
  { path: "/geography/Countries", name: "Position", component: Countries },
  {
    path: "/geography/CountriesList",
    name: "Position",
    component: CountriesList,
  },
  { path: "/geography/CitiesList", name: "CitiesList", component: CitiesList },
  { path: "/geography/Cities", name: "Cities", component: Cities },
  { path: "/masters/Branch", name: "Branch", component: Branch },
  { path: "/masters/BranchList", name: "BranchList", component: BranchList },
  { path: "/geography/State", name: "State", component: State },
  { path: "/geography/StateLIst", name: "StateList", component: StateLIst },
  {
    path: "/geography/Divisions",
    name: "Divisions",
    component: Divisions,
  },
  {
    path: "/geography/DivisionList",
    name: "DivisionList",
    component: DivisionList,
  },
  {
    path: "/geography/Block",
    name: "Block",
    component: Block,
  },
  {
    path: "/geography/BlockList",
    name: "BlockList",
    component: BlockList,
  },
  {
    path: "/geography/BlockCategories",
    name: "BlockCategories",
    component: BlockCategories,
  },
  {
    path: "/geography/BlockCategoriesList",
    name: "BlockCategoriesList",
    component: BlockCategoriesList,
  },
  {
    path: "/geography/StateCategory",
    name: "StateCategory",
    component: StateCategory,
  },
  { path: "/geography/District", name: "District", component: District },
  { path: "/geography/UrbanArea", name: "UrbanArea", component: UrbanArea },
  { path: "/masters/Company", name: "Company", component: Company },
  { path: "/masters/CompanyList", name: "CompanyList", component: CompanyList },
  { path: "/masters/Currencies", name: "Currencies", component: Currencies },
  {
    path: "/masters/CurrenciesList",
    name: "CurrenciesList",
    component: CurrenciesList,
  },
  { path: "/masters/Customer", name: "Customer", component: Customer },
  {
    path: "/masters/CustomerList",
    name: "CustomerList",
    component: CustomerList,
  },
  {
    path: "/geography/DistrictCategories",
    name: "DistrictCategories",
    component: DistrictCategories,
  },
  {
    path: "/geography/DistrictCategoriesList",
    name: "DistrictCategoriesList",
    component: DistrictCategoriesList,
  },
  { path: "/masters/Test", name: "Test", component: Test },
  //end
  //HRH
  {
    path: "/hrh/RecruitmentStatus",
    name: "Recruitment Status",
    component: RecruitmentStatus,
  },
  {
    path: "/hrh/AddRecruitmentStatus",
    name: "Recruitment Status",
    component: AddRecruitmentStatus,
  },
  { path: "/hrh/Applications", name: "Applications", component: Applications },
  {
    path: "/hrh/ApplicationForm",
    name: "ApplicationForm",
    component: ApplicationForm,
  },
  // {
  //   path: "/hrh/PersonalInformation",
  //   name: "Personal Information",
  //   component: PersonalInformation,
  // },
  {
    path: "/hrh/SharingofIn",
    name: "Sharing of Infomation",
    component: SharingofIn,
  },
  { path: "/hrh/StatusHr", name: "Status HR", component: StatusHr },
  {
    path: "/hrh/AddStatusHr",
    name: "Status Hr",
    component: AddStatusHr,
  },
  {
    path: "/hrh/PerformanceAppraisal",
    name: "PerformanceAppraisal",
    component: PerformanceAppraisal,
  },
  {
    path: "/hrh/AddPerformanceAppraisal",
    name: "PerformanceAppraisal",
    component: AddPerformanceAppraisal,
  },
  {
    path: "/hrh/publish-positions",
    name: "Publish Positions",
    component: PublishPositions,
  },
  {
    path: "/hrh/add-positions",
    name: "Add Position",
    component: AddPosition,
  },
  {
    path: "/hrh/edit-positions/:id",
    name: "Edit Position",
    component: EditPosition,
  },
  // { path: "/hrh/PdF", name: "PdF", component: PdF },
  // { path: "/hrh/Tabs", name: "PdF", component: Tabs },
  {
    path: "/hrh/HumanResourceProposalDetails",
    name: "Human Resource Proposal Details",
    component: HumanResourceProposalDetails,
    exact:true,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict",
    name: "Human Resource Proposal District",
    component: HRProposalDistrict,
    exact:true
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalNational",
    name: "Human Resource Proposal ",
    component: HumanResourceProposalNational,
  },
  {
    path: "/hrh/HRFinancialStatus",
    name: "Human Resource Proposal ",
    component: HRFinancialStatus,
  },
  {
    path: "/hrh/HRFinancialStatusDetails",
    name: "Human Resource Proposal ",
    component: HRFinancialStatusDetails,
  },
  {
    path: "/hrh/HRKeyDeliverablesDetails",
    name: "Human Resource Proposal ",
    component: HRKeyDeliverablesDetails,
  },
  {
    path: "/hrh/HRKeyDeliverables",
    name: "Human Resource Proposal ",
    component: HRKeyDeliverables,
  },
  {
    path: "/hrh/HRKeyDeliverables2",
    name: "Human Resource Proposal ",
    component: HRKeyDeliverablesD,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState",
    name: "Human Resource Proposal ",
    component: HumanResourceProposalState,
    exact:true,
  },
  {
    path: "/hrh/HumanResourceProposalDetailsForm",
    name: "Human Resource Proposal Details",
    component: HumanResourceProposalDetailsForm,
  },
  {
    path: "/hrh/humanResourceProposalReports/ContractualStaff",
    name: "Human Resource Proposal Reports",
    component: ContractualStaff,
  },
  {
    path: "/hrh/humanResourceProposalReports/RegularCadre",
    name: "Human Resource Proposal Reports",
    component: RegularCadre,
  },
  {
    path: "/hrh/humanResourceProposalReports/SDNHM",
    name: "Human Resource Proposal Reports/Service Delivery - NHM",
    component: SDNHM,
  },
  {
    path: "/hrh/humanResourceProposalReports/SDNHMState",
    name: "Human Resource Proposal Reports/Service Delivery - NHM",
    component: SDNHMState,
  },
  {
    path: "/hrh/humanResourceProposalReports/SDNHMDetails",
    name: "Human Resource Proposal Reports/Service Delivery - NHM",
    component: SDNHMDetails,
  },
  {
    path: "/hrh/humanResourceProposalReports/ContractualStaffDetails",
    name: "Human Resource Proposal Reports",
    component: ContractualStaffDetails,
  },
  {
    path: "/hrh/humanResourceProposalReports/RegularCadreDetails",
    name: "Human Resource Proposal Reports",
    component: RegularCadreDetails,
  },
  {
    path: "/hrh/hrEmpanelledAgency/AgencyRegistrationDetails",
    name: "Human Resource Empanelled Agency",
    component: AgencyRegistrationDetails,
  },
  {
    path: "/hrh/hrEmpanelledAgency/AgencyRegistration",
    name: "Human Resource Empanelled Agency",
    component: AgencyRegistration,
  },
  {
    path: "/hrh/hrEmpanelledAgency/VacancyAdvertisement",
    name: "Human Resource Empanelled Agency",
    component: VacancyAdvertisement,
  },
  {
    path: "/hrh/hrEmpanelledAgency/VacancyAdvertisementDetail",
    name: "Human Resource Empanelled Agency",
    component: VacancyAdvertisementDetail,
  },
  {
    path: "/hrh/hrEmpanelledAgency/Quarterly",
    name: "Human Resource Empanelled Agency",
    component: Quarterly,
  },
  {
    path: "/hrh/hrEmpanelledAgency/QuarterlyDetails",
    name: "Human Resource Empanelled Agency",
    component: QuarterlyDetails,
  },
  {
    path: "/hrh/hrEmpanelledAgency/advertisedID",
    name: "Human Resource Empanelled Agency/Recruitment Status Report by Advertisement ID",
    component: AdvertisedID,
  },
  {
    path: "/hrh/hrEmpanelledAgency/advertisedIDDetails",
    name: "Human Resource Empanelled Agency/Recruitment Status Report by Advertisement ID",
    component: AdvertisedIDDetails,
  },
  {
    path: "/hrh/performanceMonitoring/PerformanceMonitoring",
    name: "Performance Monitoring Details",
    component: PerformanceMonitoring,
  },
  {
    path: "/hrh/performanceMonitoring/StatePerformanceMonitoring",
    name: "Performance Monitoring Details",
    component: PerformanceMonitoringState,
  },
  {
    path: "/hrh/performanceMonitoring/PerformanceMonitoringDetails",
    name: "Performance Monitoring Details",
    component: PerformanceMonitoringDetails,
  },
  {
    path: "/hrh/stateHRISDashboards/StateHRISDashboards",
    name: "State HRIS Dashboards",
    component: StateHRISDashboards,
  },
  {
    path: "/hrh/stateHRISDashboards/StateHRISDashboardsDetails",
    name: "State HRIS Dashboards Details",
    component: StateHRISDashboardsDetails,
  },
  {
    path: "/hrh/recruitmentReports/AdvsertisementStatusReport",
    name: "Recruitment Report/Advsertisement Status Report",
    component: AdvertisementReport,
  },
  {
    path: "/hrh/recruitmentReports/AdvsertisementStatusReportNational",
    name: "Recruitment Report/Advsertisement Status Report",
    component: AdvertisementReportNational,
  },
  {
    path: "/hrh/recruitmentReports/AdvsertisementStatusReportDetails",
    name: "Recruitment Report/Advsertisement Status Report",
    component: AdvertisementReportDetails,
  },
  {
    path: "/hrh/recruitmentReports/VacancyStatusReportDetails",
    name: "Recruitment Report/Vacancy Status Report",
    component: VacancyStatusReportDetails,
  },
  {
    path: "/hrh/recruitmentReports/VacancyStatusReport",
    name: "Recruitment Report/Vacancy Status Report",
    component: VacancyStatusReport,
  },
  {
    path: "/hrh/recruitmentReports/RecruitmentStatusReportDetails",
    name: "Recruitment Report/Recruitment Status Report",
    component: RecruitmentStatusReportDetails,
  },
  {
    path: "/hrh/recruitmentReports/RecruitmentStatusReport",
    name: "Recruitment Report/Recruitment Status Report",
    component: RecruitmentStatusReport,
  },
  {
    path: "/hrh/CapacityBuildingStatusDetails",
    name: "Capacity Building Status Report",
    component: CapacityBuildingStatusDetails,
  },
  {
    path: "/hrh/CapacityBuildingStatus",
    name: "Capacity Building Status Report",
    component: CapacityBuildingStatus,
  },
  {
    path: "/hrh/CapacityBuildingStatusNational",
    name: "Capacity Building Status Report",
    component: CapacityBuildingStatusNational,
  },
  {
    path: "/hrh/AssessmentCaseloadDetails",
    name: "Assessment of the Caseload for Service Delivery Human Resource",
    component: AssessmentCaseloadDetails,
  },
  {
    path: "/hrh/AssessmentCaseload",
    name: "Assessment of the Caseload for Service Delivery Human Resource",
    component: AssessmentCaseload,
  },
  {
    path: "/hrh/HRStatusReportDetails",
    name: "HR Status Report",
    component: HRStatusReportDetail,
    exact:true,
  },
  {
    path: "/hrh/HRStatusReportDetails/HRStatusReport",
    name: "HR Status Report",
    component: HRStatusReportForm,
  },
  {
    path: "/hrh/HRStatusReportDetails/state",
    name: "HR Status Report State",
    component: HRStatusState,
  },
  {
    path: "/hrh/AssessmentCaseload",
    name: "Assessment of the Caseload for Service Delivery Human Resource",
    component: AssessmentCaseload,
  },
  {
    path: "/menu/AnnexureVaccancyDetails",
    name: "Annexure Vaccancy Details",
    component: AnnexureVacancyDetails,
  },
  {
    path: "/menu/AnnexureVaccancyDistrict",
    name: "Annexure Vaccancy Details",
    component: AnnexureVacancyDistrict,
  },
  {
    path: "/hrh/AssessmentCaseload",
    name: "Assessment of the Caseload for Service Delivery Human Resource",
    component: AssessmentCaseload,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/physicalCsv",
    name: "Physical State Distribution",
    component: PhysicalCSVState,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict/physicalCsvDistrict",
    name: "Physical District Distribution",
    component: PhysicalCSVDistrict,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict/financialCsv",
    name: "Financial District Distribution",
    component: FinanceCSV,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/import-csv",
    name: "importCSV",
    component: ImportCSV,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/detailCsv",
    name: "Distribution Detail",
    component: StateDetailCSV,
  },
  { path: "/forms/user", name: "UserForm", component: UserForm },
  {
    path: "/hrh/HRDetailsDraft",
    name: "Human Resource Proposal",
    component: HRDraft,
    exact:true,
  },
  {
    path: "/hrh/HRDetailsAmend",
    name: "Human Resource Proposal",
    component: HRAmend,
    exact:true,
  },
  {
    path: "/hrh/HRDetailsCancel",
    name: "Human Resource Proposal",
    component: HRCancel,
    exact:true,
  },
  {
    path: "/hrh/HRDetailsPending",
    name: "Human Resource Proposal",
    component: HRPending,
    exact:true,
  },
  {
    path: "/hrh/HRDetailsApprove",
    name: "Human Resource Proposal",
    component: HRApprove,
    exact:true,
  },
  {
    path: "/hrh/StateApprove",
    name: "Human Resource Proposal",
    component: StateApproved,
    exact:true,
  },
  {
    path: "/hrh/StateCancel",
    name: "Human Resource Proposal",
    component: StateCancel,
    exact:true,
  },
  {
    path: "/hrh/StateDraft",
    name: "Human Resource Proposal",
    component: StateDraft,
    exact:true,
  },
  {
    path: "/hrh/StatePending",
    name: "Human Resource Proposal",
    component: StatePending,
    exact:true,
  },
  {
    path: "/hrh/StateReject",
    name: "Human Resource Proposal",
    component: StateReject,
    exact:true,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/KeyDistribute",
    name: "Distribute",
    component: KeyDeliv,
  },
  {
    path: "/hrh/DistrictReject",
    name: "Human Resource Proposal",
    component: DistrictReject,
    exact:true,
  },
  {
    path: "/hrh/DistrictCancel",
    name: "Human Resource Proposal",
    component: DistrictCancel,
    exact:true,
  },
  {
    path: "/hrh/Districtapproved",
    name: "Human Resource Proposal",
    component: DistrictApprove,
    exact:true,
  },
  {
    path: "/hrh/DistrictPending",
    name: "Human Resource Proposal",
    component: DistrictPending,
    exact:true,
  },
  {
    path: "/hrh/DistrictDraft",
    name: "Human Resource Proposal",
    component: DistrictDraft,
    exact:true,
  },
  {
    path: "/hrh/DraftReport",
    name: "HR Status Report Details",
    component: DraftReport,
    exact:true,
  },
  {
    path: "/hrh/CancelReport",
    name: "HR Status Report Details",
    component: CancelReport,
    exact:true,
  },
  {
    path: "/hrh/PendingReport",
    name: "HR Status Report Details",
    component: PendingReport,
    exact:true,
  },
  {
    path: "/hrh/AmendReport",
    name: "HR Status Report Details",
    component: AmendReport,
    exact:true,
  },
  {
    path: "/hrh/ApprovedReport",
    name: "HR Status Report Details",
    component: ApprovedReport,
    exact:true,
  },
  {
    path: "/hrh/hr-approval/hr-approval-report",
    name: "HR Approval Report",
    component: HRApprovalReport,
    exact:true,
  },
  {
    path: "/hrh/hr-approval",
    name: "HR Approval Report",
    component: HRApprovalDetail,
    exact:true,
  },
  //HRH end

  //home
  // {path: '/home/JoinWithUs', name: 'JoinWithUs', component:JoinWithUs},
  //end

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/feedback/Feedback",
    name: "Feedback / Grievances",
    component: Feedback,
  },
  {
    path: "/feedback/SanctionedPositionsStates",
    name: "Sanctioned Positions - States",
    component: SanctionedPositionsStates,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/Distribute",
    name: "Distribute",
    component: Distribute,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/DistributeFinancial",
    name: "Distribute Financial Status",
    component: DistributeFinancial,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictKeyDeliverable",
    name: "Distribute Key Deliverable",
    component: KeyDelivDistrict,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictFinancial",
    name: "Distribute Financial Status",
    component: DistributeDistrictFinancial,
  },
  {
    path: "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrict",
    name: "Distribute District",
    component: DistributeDistrict,
  },
  {
    path: "/hrh/HumanResourceProsal/RegularCadreD",
    name: "Regular Cadre Details",
    component: RegularCadreD,
  },
  {
    path: "/hrh/HumanResourceProsal/RegularCadreDistrict",
    name: "Regular Cadre District",
    component: RegularCadreDis,
  },
  {
    path: "/hrh/HRStatusReportDetails/HRStatusDistrict",
    name: "HR Status District",
    component: HRStatusDistrict,
  },
];

export default routes;
