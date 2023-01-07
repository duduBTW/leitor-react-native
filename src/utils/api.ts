import axios from "axios";

const api = axios.create({
  baseURL: "https://leitor.vercel.app/",
});

export default api;
