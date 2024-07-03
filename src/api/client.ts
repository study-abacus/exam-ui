import axios from 'axios'


// export const client = axios.create({
//   baseURL: "https://examination-api.studyabacus.com"
// })
export const client = axios.create({
  baseURL: "http://localhost:8001"
})

client.interceptors.request.use((request) => {
  const authData = localStorage.getItem("auth");
  const token = authData && JSON.parse(authData).token;
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
