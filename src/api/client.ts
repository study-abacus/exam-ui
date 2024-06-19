import axios from 'axios'


export const client = axios.create({
  baseURL: "https://examination-api.studyabacus.com"
})

