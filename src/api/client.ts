import axios from 'axios'


export const client = axios.create({
  baseURL: "https://examination-api.studyabacus.com"
})

client.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem("auth")).token;
  if (token) request.headers['Authorization'] = `Bearer ${token}`;
  return request;
});
client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem("auth");
    }
    throw error;
  },
);
