import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4445/v1/",
  headers: {
    "Content-type": "application/json",
    "x-dostow-group-access-key":
      process.env.REACT_APP_API_KEY || "8ed593f5-65ff-4ce5-b244-bdeea9a14249"
  }
});
