import http from "../http-common";

class DataService {
  getAllCities() {
    return http.get("/Cities");
  }

  getCities(id) {
    return http.get(`/Cities/${id}`);
  }

  getAllStates(data) {
    return http.get("/States", data);
  }
  getAllStateCategory(data) {
    return http.get("/StateCategories", data);
  }
  getAllDistricts(data) {
    return http.get("/Districts", data);
  }
  getAllDistrictCategory(data) {
    return http.get("/DistrictCategories", data);
  }
  getAllBlock(data) {
    return http.get("/Blocks", data);
  }
  getAllBlockCategory(data) {
    return http.get("/BlocksCategories", data);
  }
  getAllDivisions(data) {
    return http.get("/Divisions", data);
  }
  getAllUrbanAreas(data) {
    return http.get("/UrbanAreas", data);
  }
  getAllProgramType(data) {
    return http.get("/ProgramTypes", data);
  }
  getAllTypeofPositions(data) {
    return http.get("/TypeofPositions", data);
  }
  getAllCatgoryofPositions(data) {
    return http.get("/CatgoryofPositions", data);
  }
  getAllPlaceOfPost() {
    return http.get("/PlaceofPosts");
  }
  getAllJobPositions(data) {
    return http.get("/JobPositions", data);
  }
  getAllTypeofFacilityOffices(data) {
    return http.get("/TypeofFacilityOffices", data);
  }
  getAllPlaceofFacilityOffices(data) {
    return http.get("/PlaceofFacilities", data);
  }
  getAllSpecialist(data) {
    return http.get("/Specialities", data);
  }
  getAllReservationCategory(data) {
    return http.get("/ReservationCategories", data);
  }
  getAllRecruitmentConuctor(data) {
    return http.get("/RecruitmentConductors", data);
  }
  getAllTypeOfAssociation(data) {
    return http.get("/TypeofAssociations", data);
  }
  getAllTypeOfApproval(data) {
    return http.get("/TypeofApprovals", data);
  }
  getAllTypeOfCourse(data) {
    return http.get("/TypesofCourses", data);
  }
  getAllCourse(data) {
    return http.get("/Courses", data);
  }
  getAllGrading(data) {
    return http.get("/Gradings", data);
  }
  getAllTypeOfVacancyAdvertisement(data) {
    return http.get("/TypeofVacancyAdvertisements", data);
  }
  getAllEmpanelmentStatus(data) {
    return http.get("/EmpanelmentStatus", data);
  }
  getAllStatusOfVacancyAdvertisement(data) {
    return http.get("/StatusofVacancyAdvertisements", data);
  }
  getAllPopulationNorms(data) {
    return http.get("/PopulationNorms", data);
  }
  getAllEducationCategory(data) {
    return http.get("/EducationCategories", data);
  }
  getAllEducationQualification(data) {
    return http.get("/EducationQualifications", data);
  }
  getAllPositions(data) {
    return http.get("/Positions", data);
  }
  getAllPosts() {
    return http.get("/TypeofPosts");
  }
  getAllFinancialYear(data) {
    return http.get("/FinancialYears", data);
  }
  getFinancialStatus() {
    return http.get("/FinancialStatusParameters");
  }
  getProgramTypeofPost(id) {
    return http.get(`/TypeofPosts/ProgramTypeList?id=${id}`);
  }
  getSubTypeOfPost() {
    return http.get(`/SubTyoeofPosts`);
  }
  getTypeToSub(id) {
    return http.get(`/SubTyoeofPosts/TypeofPostIdList?id=${id}`);
  }
  getFMR() {
    return http.get(`/FMRs`);
  }
  getSubToFmr(id) {
    return http.get(`/FMRs/FmrIdList?id=${id}`);
  }
  getFmrToCat(id) {
    return http.get(`/CatgoryofPositions/CatgoryofPositionIdList?id=${id}`);
  }
  getCatToPost(id) {
    return http.get(`/Posts/PostIdList?id=${id}`);
  }
  getReportingPertiod() {
    return http.get(`/ReportingPeriods`);
  }
}

export default new DataService();