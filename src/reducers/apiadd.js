import {
  RETRIEVE_CITY,
  RETRIEVE_STATE,
  RETRIEVE_STATE_CATEGORY,
  RETRIEVE_DISTRICTS_CATEGORY,
  RETRIEVE_DISTRICTS,
  RETRIEVE_BLOCKS,
  RETRIEVE_BLOCKS_CATEGORY,
  RETRIEVE_DIVISIONS,
  RETRIEVE_URBANAREAS,
  RETRIEVE_PROGRAM_TYPE,
  RETRIEVE_TYPE_OF_POSITION,
  RETRIEVE_CATEGORY_OF_POSITION,
  RETRIEVE_PLACE_OF_POST,
  RETRIEVE_JOB_POSITION,
  RETRIEVE_TYPE_OF_FACILITY,
  RETRIEVE_PLACE_OF_FACILITY,
  RETRIEVE_SPECIALIST,
  RETRIEVE_RSERVATION_CATEGORY,
  RETRIEVE_RECRUITMENT_CONDUCTOR,
  RETRIEVE_TYPE_OF_ASSOCIATION,
  RETRIEVE_TYPE_OF_COURSE,
  RETRIEVE_COURSE,
  RETRIEVE_GRADING,
  RETRIEVE_TYPE_OF_VACANCY_ADVERTISEMENT,
  RETRIEVE_EMPANELMENT_STATUS,
  RETRIEVE_STATUS_OF_VACANCY_ADVERTISEMENT,
  RETRIEVE_POPULATION_NORMS,
  RETRIEVE_TYPE_OF_APPROVAL,
  RETRIEVE_POSITION,
  RETRIEVE_FINANCIAL_YEAR,
  ADD_H_R,
  RETRIEVE_FINANCIAL_STATUS,
} from "../actions/type";

const initialState = {
  cityList: [],
  stateList: [],
  stateCategoryList: [],
  districtsList: [],
  districtCategoryList: [],
  blockList: [],
  blockCategoryList: [],
  divisionList: [],
  urbanList: [],
  programTypeList: [],
  typeOfPositionList: [],
  categoryOfPOsitionList: [],
  placeOfPostList: [],
  jobPositionList: [],
  typeFacilityList: [],
  placeOfFacilityList: [],
  SpecialistList: [],
  reservationCategoryList: [],
  recruitmentConductorList: [],
  typeofAssociationList: [],
  typeofCourseList: [],
  courseList: [],
  gradingList: [],
  typeofVacancyAdverstisementList: [],
  empanelmentStatusList: [],
  statusofVacancyAdverstisementList: [],
  populationNormsList: [],
  typeofApprovalList: [],
  positionList: [],
  financialYearList: [],
  hrList: "",
  financialStatusList: [],
};

function dataReducer(data = initialState, action) {
  // const { type, payload } = action;
  switch (action.type) {
    case RETRIEVE_CITY:
      return {
        ...data,
        cityList: action.payload.sort(),
      };
    case RETRIEVE_STATE:
      return {
        ...data,
        stateList: action.payload,
      };
    case RETRIEVE_STATE_CATEGORY:
      return {
        ...data,
        stateCategoryList: action.payload,
      };
    case RETRIEVE_DISTRICTS:
      return {
        ...data,
        districtsList: action.payload.sort(),
      };
    case RETRIEVE_DISTRICTS_CATEGORY:
      return {
        ...data,
        districtCategoryList: action.payload,
      };
    case RETRIEVE_DIVISIONS:
      return {
        ...data,
        divisionList: action.payload.sort(),
      };
    case RETRIEVE_URBANAREAS:
      return {
        ...data,
        urbanList: action.payload.sort(),
      };
    case RETRIEVE_BLOCKS:
      return {
        ...data,
        blockList: action.payload.sort(),
      };
    case RETRIEVE_BLOCKS_CATEGORY:
      return {
        ...data,
        blockCategoryList: action.payload,
      };
    case RETRIEVE_PROGRAM_TYPE:
      console.log("programTypeList", action.payload);
      return {
        ...data,
        programTypeList: action.payload,
      };
    case RETRIEVE_TYPE_OF_POSITION:
      return {
        ...data,
        typeOfPositionList: action.payload,
      };
    case RETRIEVE_CATEGORY_OF_POSITION:
      return {
        ...data,
        categoryOfPOsitionList: action.payload,
      };
    case RETRIEVE_PLACE_OF_POST:
      return {
        ...data,
        placeOfPostList: action.payload,
      };
    case RETRIEVE_JOB_POSITION:
      return {
        ...data,
        jobPositionList: action.payload,
      };
    case RETRIEVE_TYPE_OF_FACILITY:
      return {
        ...data,
        typeFacilityList: action.payload,
      };
    case RETRIEVE_PLACE_OF_FACILITY:
      return {
        ...data,
        placeOfFacilityList: action.payload,
      };
    case RETRIEVE_SPECIALIST:
      return {
        ...data,
        SpecialistList: action.payload,
      };
    case RETRIEVE_RSERVATION_CATEGORY:
      return {
        ...data,
        reservationCategoryList: action.payload,
      };
    case RETRIEVE_RECRUITMENT_CONDUCTOR:
      return {
        ...data,
        recruitmentConductorList: action.payload,
      };
    case RETRIEVE_TYPE_OF_ASSOCIATION:
      return {
        ...data,
        typeofAssociationList: action.payload,
      };
    case RETRIEVE_TYPE_OF_COURSE:
      return {
        ...data,
        typeofCourseList: action.payload,
      };
    case RETRIEVE_COURSE:
      return {
        ...data,
        courseList: action.payload,
      };
    case RETRIEVE_GRADING:
      return {
        ...data,
        gradingList: action.payload,
      };
    case RETRIEVE_TYPE_OF_VACANCY_ADVERTISEMENT:
      return {
        ...data,
        typeofVacancyAdverstisementList: action.payload,
      };
    case RETRIEVE_EMPANELMENT_STATUS:
      return {
        ...data,
        empanelmentStatusList: action.payload,
      };
    case RETRIEVE_STATUS_OF_VACANCY_ADVERTISEMENT:
      return {
        ...data,
        statusofVacancyAdverstisementList: action.payload,
      };
    case RETRIEVE_POPULATION_NORMS:
      return {
        ...data,
        populationNormsList: action.payload,
      };
    case RETRIEVE_TYPE_OF_APPROVAL:
      return {
        ...data,
        typeofApprovalList: action.payload,
      };
    case RETRIEVE_POSITION:
      return {
        ...data,
        positionList: action.payload,
      };
    case RETRIEVE_FINANCIAL_YEAR:
      return {
        ...data,
        financialYearList: action.payload,
      };
    case ADD_H_R:
      console.log(data, "%%%%%%%%%%");
      return {
        ...data,
        hrList: action.payload,
      };
    case RETRIEVE_FINANCIAL_STATUS:
      return {
        ...data,
        financialStatusList: action.payload.sort((a,b) => a.sequence>b.sequence?b:a),
      };
    default:
      return data;
  }
}
export default dataReducer;
