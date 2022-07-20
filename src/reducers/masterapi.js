import {
  RETRIEVE_EDUCATION_QUALIFICATION,
  RETRIEVE_EDUCATION_CATEGORY,
  RETRIEVE_POST,
  PROGRAMME_TO_TYPE_POST,
  RETRIEVE_SUB_TYPE_POST,
  TYPE_TO_SUB,
  SUB_TO_FMR,
  FMR_TO_CAT,
  RETRIEVE_FMR,
  CAT_TO_POST,
  RETRIEVE_REPORTING
} from "../actions/type";

const initialState = {
  educationCategoryList: [],
  educationQualificationList: [],
  postList: [],
  optionTypeofPost: [],
  subTypeofPostList: [],
  typeToSub: [],
  fmrList: [],
  subToFmrOption: [],
  fmrToCatOption: [],
  catToPost:[],
  reportingPeriodList:[],
};

function masterReducer(data = initialState, action) {
  const { type, payload } = action;
  // console.log(payload,'data fromReducer')
  switch (type) {
    case RETRIEVE_EDUCATION_CATEGORY:
      return {
        ...data,
        educationCategoryList: action.payload,
      };
    case RETRIEVE_EDUCATION_QUALIFICATION:
      return {
        ...data,
        educationQualificationList: action.payload,
      };
    case RETRIEVE_POST:
      return {
        ...data,
        postList: action.payload,
      };
    case PROGRAMME_TO_TYPE_POST:
      return {
        ...data,
        optionTypeofPost: action.payload,
      };
    case RETRIEVE_SUB_TYPE_POST:
      return {
        ...data,
        subTypeofPostList: action.payload,
      };
    case TYPE_TO_SUB:
      return {
        ...data,
        typeToSub: action.payload,
      };
    case SUB_TO_FMR:
      return {
        ...data,
        subToFmrOption: action.payload,
      };
    case FMR_TO_CAT:
      return {
        ...data,
        fmrToCatOption: action.payload,
      };
    case CAT_TO_POST:
      return {
        ...data,
        catToPost: action.payload,
      };
      case RETRIEVE_REPORTING:
        return {
          ...data,
          reportingPeriodList:action.payload,
        };
    default:
      return data;
  }
}

export default masterReducer;
