import Axios from "axios";
import { API } from "./API";

export const techHuntAPI = Axios.create({
  baseURL: API,
});

export const setTechHuntHeader = (token) =>
  (techHuntAPI.defaults.headers.common["authorization"] = `Bearer ${token}`);


