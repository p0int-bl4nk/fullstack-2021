import axios from "axios";

const baseUrl = 'https://young-reaches-34491.herokuapp.com/api';

const getAll = () => {
  return axios.get(`${baseUrl}/persons`).then(response => response.data);
}

const update = (id, updatedData) => {
  return axios.put(`${baseUrl}/persons/${id}`, updatedData).then(response => response.data);
}

const create = (newData) => {
  return axios.post(`${baseUrl}/persons`, newData).then(response => response.data);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/persons/${id}`);
}

const phonebookService = {getAll, update, create, deletePerson};
export default phonebookService;