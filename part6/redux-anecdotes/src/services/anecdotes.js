import axios from "axios";
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getId = () => (100000 * Math.random()).toFixed(0)

const create = async (content) => {
  const response = await axios.post(
    baseUrl,
    {
      content,
      id: getId(),
      votes: 0
    }
  );

  return response.data;
}

const update = async (updated) => {
  const response = await axios.put(
    `${baseUrl}/${updated.id}`,
    updated
  )
  return response.data;
}

export default { getAll, create, update };