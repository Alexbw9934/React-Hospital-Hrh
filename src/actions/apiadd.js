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
    PROGRAMME_TO_TYPE_POST,
  } from "./type";
  import DataService from "../services/api.service";
  export const retrieveData = () => async (dispatch) => {
    try {
      const res = await DataService.getAllCities();
      dispatch({
        type: RETRIEVE_CITY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveState = () => async (dispatch) => {
    try {
      const res = await DataService.getAllStates();
      dispatch({
        type: RETRIEVE_STATE,
        payload: res.data.sort(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveDistricts = () => async (dispatch) => {
    try {
      const res = await DataService.getAllDistricts();
      dispatch({
        type: RETRIEVE_DISTRICTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveDistrictCategory = () => async (dispatch) => {
    try {
      const res = await DataService.getAllDistrictCategory();
      dispatch({
        type: RETRIEVE_DISTRICTS_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveDivision = () => async (dispatch) => {
    try {
      const res = await DataService.getAllDivisions();
      dispatch({
        type: RETRIEVE_DIVISIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveStateCategory = () => async (dispatch) => {
    try {
      const res = await DataService.getAllStateCategory();
      dispatch({
        type: RETRIEVE_STATE_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveBlocks = () => async (dispatch) => {
    try {
      const res = await DataService.getAllBlock();
      dispatch({
        type: RETRIEVE_BLOCKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveBlockCategory = () => async (dispatch) => {
    try {
      const res = await DataService.getAllBlockCategory();
      dispatch({
        type: RETRIEVE_BLOCKS_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveUrbanArea = () => async (dispatch) => {
    try {
      const res = await DataService.getAllUrbanAreas();
      dispatch({
        type: RETRIEVE_URBANAREAS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveProgramType = () => async (dispatch) => {
    try {
      const res = await DataService.getAllProgramType();
      console.log(res,'program type');
      dispatch({
        type: RETRIEVE_PROGRAM_TYPE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfPositions = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeofPositions();
      dispatch({
        type: RETRIEVE_TYPE_OF_POSITION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveCategoryOfPosition = () => async (dispatch) => {
    try {
      const res = await DataService.getAllCatgoryofPositions();
      dispatch({
        type: RETRIEVE_CATEGORY_OF_POSITION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrievePlaceOfPost = () => async (dispatch) => {
    try {
      const res = await DataService.getAllPlaceOfPost();
      dispatch({
        type: RETRIEVE_PLACE_OF_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveJobPosition = () => async (dispatch) => {
    try {
      const res = await DataService.getAllJobPositions();
      dispatch({
        type: RETRIEVE_JOB_POSITION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfFacility = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeofFacilityOffices();
      dispatch({
        type: RETRIEVE_TYPE_OF_FACILITY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrievePlaceOfFacility = () => async (dispatch) => {
    try {
      const res = await DataService.getAllPlaceofFacilityOffices()
      dispatch({
        type: RETRIEVE_PLACE_OF_FACILITY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveSpecialist = () => async (dispatch) => {
    try {
      const res = await DataService.getAllSpecialist();
      dispatch({
        type: RETRIEVE_SPECIALIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveReservationCategory = () => async (dispatch) => {
    try {
      const res = await DataService.getAllReservationCategory();
      dispatch({
        type: RETRIEVE_RSERVATION_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveRecruitmentConuctor = () => async (dispatch) => {
    try {
      const res = await DataService.getAllRecruitmentConuctor();
      dispatch({
        type: RETRIEVE_RECRUITMENT_CONDUCTOR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfAssociation = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeOfAssociation();
      console.log(res.data,'datafrom action');
      dispatch({
        type: RETRIEVE_TYPE_OF_ASSOCIATION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfCourse = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeOfCourse();
      dispatch({
        type: RETRIEVE_TYPE_OF_COURSE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveCourse = () => async (dispatch) => {
    try {
      const res = await DataService.getAllCourse();
      dispatch({
        type: RETRIEVE_COURSE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveGrading = () => async (dispatch) => {
    try {
      const res = await DataService.getAllGrading();
      dispatch({
        type: RETRIEVE_GRADING,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfVacancyAdvertisement = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeOfVacancyAdvertisement();
      dispatch({
        type: RETRIEVE_TYPE_OF_VACANCY_ADVERTISEMENT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveEmpanelmentStatus = () => async (dispatch) => {
    try {
      const res = await DataService.getAllEmpanelmentStatus();
      dispatch({
        type: RETRIEVE_EMPANELMENT_STATUS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveStatusOfVacancyAdvertisement = () => async (dispatch) => {
    try {
      const res = await DataService.getAllStatusOfVacancyAdvertisement();
      dispatch({
        type: RETRIEVE_STATUS_OF_VACANCY_ADVERTISEMENT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrievePopulationNorms = () => async (dispatch) => {
    try {
      const res = await DataService.getAllPopulationNorms();
      dispatch({
        type: RETRIEVE_POPULATION_NORMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveTypeOfApproval = () => async (dispatch) => {
    try {
      const res = await DataService.getAllTypeOfApproval();
      dispatch({
        type: RETRIEVE_TYPE_OF_APPROVAL,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrievePosition = () => async (dispatch) => {
    try {
      const res = await DataService.getAllPositions();
      dispatch({
        type: RETRIEVE_POSITION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveFinancialYear = () => async (dispatch) => {
    try {
      const res = await DataService.getAllFinancialYear();
      dispatch({
        type: RETRIEVE_FINANCIAL_YEAR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const addHR =({data}) =>(dispatch)=> {
    console.log(data,'action from')
    dispatch({
      type: ADD_H_R,
      payload: data,
    });
};
export const retrieveFinancialStatus = () => async (dispatch) => {
  try {
    const res = await DataService.getFinancialStatus();
    dispatch({
      type: RETRIEVE_FINANCIAL_STATUS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
