import axios from "axios";
const GOAL_URL = "/api/goals/";

const setGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios.post(GOAL_URL, goal, config);

  return response.data;
};

const getGoal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios.get(GOAL_URL, config);

  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios.delete(GOAL_URL + id, config);

  return response.data;
};

const goalService = {
  setGoal,
  getGoal,
  deleteGoal,
};

export default goalService;
