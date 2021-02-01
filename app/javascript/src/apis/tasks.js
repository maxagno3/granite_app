import axios from "axios";

const list = () => axios.get("/tasks");

const create = payload => axios.post("/tasks", payload);

const show = id => axios.get(`/tasks/${id}`);

const taskApi = {
  list,
  create,
  show,
};

export default taskApi;
