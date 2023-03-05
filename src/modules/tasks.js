import { projects } from "./projects.js";
import { getProjectIndex } from "./projects.js";

export function loadTasks() {
  const addProjectButton = document.querySelector("#addProjectButton");
  const addProjectInput = document.querySelector("#addProjectInput");
  const addProjectForm = document.querySelector("#addProjectForm");
  const addProjectInputButton = document.querySelector(
    "#addProjectInputButton"
  );
  const projectsPreview = document.querySelector("#projectsPreview");
  const projectTitle = document.querySelector("#projectTitle");
  const projectTasks = document.querySelector("#projectTasks");
  const addTaskButton = document.querySelector("#addTaskButton");
  const addTaskForm = document.querySelector("#addTaskForm");
  const addTaskInput = document.querySelector("#addTaskInput");
  let idCount = 0;

  addTaskButton.addEventListener("click", () => {
    addTaskButton.style.display = "none";
    addTaskForm.style.display = "flex";
  });

  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from auto submitting

    // Fix visibility
    addTaskForm.style.display = "none";
    addTaskButton.style.display = "flex";
    projectTasks.style.display = "flex";

    // Get task name
    const taskName = addTaskInput.value;

    // Reset input text
    addTaskInput.value = "";

    // Add task to screen
    const newTask = document.createElement("button");
    newTask.id = "newTask";
    projectTasks.appendChild(newTask);

    // Add task name div to task
    const newTaskName = document.createElement("div");
    newTaskName.id = "newTaskName";
    newTaskName.textContent = taskName;
    newTask.appendChild(newTaskName);

    // Add due date to task
    const taskDueDate = document.createElement("input");
    taskDueDate.id = "taskDueDate";
    taskDueDate.type = "date";
    newTask.appendChild(taskDueDate);

    // Add task to project's array
    const projectIndex = getProjectIndex(projectTitle.className);
    projects[projectIndex].tasks.push(taskName);
  });
}
