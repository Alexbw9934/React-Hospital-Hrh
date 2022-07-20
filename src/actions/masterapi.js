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
    RETRIEVE_REPORTING,
  } from "../actions/type";
  import DataService from "../services/api.service";
  export const retrieveEducationCategory = () => async (dispatch) => {
    try {
      const res = await DataService.getAllEducationCategory();
      dispatch({
        type: RETRIEVE_EDUCATION_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveEducationQualification = () => async (dispatch) => {
    try {
      const res = await DataService.getAllEducationQualification();
      dispatch({
        type: RETRIEVE_EDUCATION_QUALIFICATION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrievePost = () => async (dispatch) => {
    try {
      const res = await DataService.getAllPosts();
      dispatch({
        type: RETRIEVE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const prorammToTypeofPost = (id) => async (dispatch) => {
    try {
      const res = await DataService.getProgramTypeofPost(id);
      dispatch({
        type: PROGRAMME_TO_TYPE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveSubTypeofPost = () => async (dispatch) => {
    try {
      const res = await DataService.getSubTypeOfPost();
      dispatch({
        type: RETRIEVE_SUB_TYPE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const typeToSubType = (id) => async (dispatch) => {
    try {
      const res = await DataService.getTypeToSub(id);
      dispatch({
        type: TYPE_TO_SUB,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const subToFmr = (id) => async (dispatch) => {
    try {
      const res = await DataService.getSubToFmr(id);
      dispatch({
        type: SUB_TO_FMR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const fmrToCat = (id) => async (dispatch) => {
    try {
      const res = await DataService.getFmrToCat(id);
      dispatch({
        type: FMR_TO_CAT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveFmr = () => async (dispatch) => {
    try {
      const res = await DataService.getFMR();
      dispatch({
        type: RETRIEVE_FMR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const catToNamePost = () => async (dispatch) => {
    try {
      const res = await DataService.getCatToPost();
      dispatch({
        type: CAT_TO_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveReprtingPeriod = () => async (dispatch) => {
    try {
      const res = await DataService.getReportingPertiod();
      dispatch({
        type: RETRIEVE_REPORTING,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };