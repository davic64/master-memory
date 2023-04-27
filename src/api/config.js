import axios from "axios";

const instance = axios.create({
  baseURL: "https://fed-team.modyo.cloud/api/content/spaces",
});

export default instance;
