import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description: "Lorem",
    tags: ["web", "react"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTask] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  function handleAddEditTask(newTask, isAdd) {
    // console.log('Added' ,task);
    if (isAdd) {
      setTask([...tasks, newTask]);
    } else {
      setTask(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  }
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function onCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }
  function handleDeleteTask(taskId) {
    const taskAfterDelte = tasks.filter((task) => task.id !== taskId);
    setTask(taskAfterDelte);
  }
  function handleDeleteAllClick() {
    tasks.length = 0;
    setTask([...tasks]);
  }
  function handleFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTask(newTasks);
  }
  function handleSearch(searchTerm) {
    const filtered = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setTask([...filtered]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={onCloseClick}
        ></AddTaskModal>
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch}></SearchTask>
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          ></TaskActions>
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFav}
            ></TaskList>
          ) : (
            <NoTaskFound></NoTaskFound>
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
