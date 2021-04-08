import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7000" });

//we can only use this after the user is registered and the token has been assigned to to it in localstorage

// const user = JSON.parse(localStorage.getItem("profile"));
// console.log("profile in api", user);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createUser = (formData) => API.post("/create", formData);
export const getPost = () => API.get("/getPost");
export const LogIn = (formData) => API.post("/login", formData);
