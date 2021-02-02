import axios from "axios";

const list = () => axios.get("/tasks");

const create = payload => axios.post("/tasks", payload);

const show = id => axios.get(`/tasks/${id}`);

const update = ({ id, payload }) => axios.put(`/tasks/${id}`, payload);

const taskApi = {
  list,
  create,
  show,
  update,
};

export default taskApi;
