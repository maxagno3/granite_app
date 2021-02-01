import React, { useState } from "react";
import Logger from "js-logger";
import Container from "components/Container";
import TaskForm from "components/Tasks/Form/TaskForm";
import taskApi from "apis/tasks";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await taskApi.create({ task: { title } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateTask;
