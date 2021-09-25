import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
}

const update = (id, updatedData) => {
  return axios.put(`${baseUrl}/${id}`, updatedData).then(response => response.data);
}

const create = (newData) => {
  return axios.post(baseUrl, newData).then(response => response.data);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const phonebookService = {getAll, update, create, deletePerson};
export default phonebookService;