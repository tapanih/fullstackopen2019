import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios.get(baseUrl).then(res => res.data)
)

const create = (newObject) => (
  axios.post(baseUrl, newObject).then(res => res.data)
)

const update = (id, person) => (
  axios.put(`${baseUrl}/${id}`, person).then(res => res.data)
)

const deleteById = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deleteById}