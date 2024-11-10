import axios from "axios";
import { LOGIN_USER, CLEAR_USER } from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/login", dataTosubmit)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: false,
  };
}