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
  const cancelTaskInputButton = document.querySelector(
    "#cancelTaskInputButton"
  );

  addTaskButton.addEventListener("click", () => {
    addTaskButton.style.display = "none";
    addTaskForm.style.display = "flex";
  });

  cancelTaskInputButton.addEventListener("click", () => {
    addTaskForm.style.display = "none";
    addTaskButton.style.display = "flex";

    // Reset input text
    addTaskInput.value = "";
  });

  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from auto submitting

    // Check for empty task name
    if (addTaskInput.value == "") {
      alert("Task name can't be empty");
      return;
    }

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

    // Add task to project's array
    const projectIndex = getProjectIndex(projectTitle.className);
    projects[projectIndex].tasks.push(taskName);

    // Add task priority
    const taskPriority = document.createElement("div");
    taskPriority.id = "taskPriority";
    newTask.appendChild(taskPriority);

    const selectTag = document.createElement("select");
    taskPriority.appendChild(selectTag);

    // Event listener to detect priority selected
    selectTag.addEventListener("input", (e) => {
      e.target.value === "0"
        ? (newTask.style.borderLeft = "0.6vw solid transparent")
        : e.target.value === "1"
        ? (newTask.style.borderLeft = "0.6vw solid #f2ee00")
        : e.target.value === "2"
        ? (newTask.style.borderLeft = "0.6vw solid orange")
        : (newTask.style.borderLeft = "0.6vw solid #F05E16");
    });

    const priorityOption = document.createElement("option");
    priorityOption.value = "0";
    priorityOption.textContent = "Priority";
    selectTag.appendChild(priorityOption);

    const lowOption = document.createElement("option");
    lowOption.value = "1";
    lowOption.textContent = "Low";
    selectTag.appendChild(lowOption);

    const mediumOption = document.createElement("option");
    mediumOption.value = "2";
    mediumOption.textContent = "Medium";
    selectTag.appendChild(mediumOption);

    const highOption = document.createElement("option");
    highOption.value = "3";
    highOption.textContent = "High";
    selectTag.appendChild(highOption);

    // Add due date to task
    const taskDueDate = document.createElement("input");
    taskDueDate.id = "taskDueDate";
    taskDueDate.type = "date";
    newTask.appendChild(taskDueDate);

    // Get current task index
    let child = newTask;
    let parent = child.parentNode;
    let taskIndex = Array.prototype.indexOf.call(parent.children, child);

    taskDueDate.addEventListener("input", () => {
      projects[projectTitle.className].dueDate[taskIndex] = taskDueDate.value;

      console.log(
        "DueDate assigned: " +
          JSON.stringify(projects[projectTitle.className].dueDate)
      );
      console.log("At proj index: " + projectTitle.className);
      console.log("At TASK index: " + taskIndex);
    });

    // Add task closing icon
    const taskClosingIcon = document.createElement("i");
    taskClosingIcon.className = "fa-solid fa-xmark";
    taskClosingIcon.id = "taskClosingIcon";
    newTask.appendChild(taskClosingIcon);

    // Task closing event listener
    taskClosingIcon.addEventListener("click", () => {
      let child = newTask;
      let parent = child.parentNode;

      // Get task index
      var taskIndex = Array.prototype.indexOf.call(parent.children, child);

      // Remove task from array
      projects[projectIndex].tasks.splice(taskIndex, 1);
      console.log(projects);

      // Remove task from screen and div
      newTask.remove();
    });
  });
}
