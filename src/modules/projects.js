// Project's object constructor
function Project(name, id) {
  return {
    tasks: [],
    name,
    id,
    dueDate: {},
  };
}

// Get project index on array based on it's ID
export function getProjectIndex(givenId) {
  //Count index
  let count = 0;

  for (let project of projects) {
    if (project.id == givenId) {
      return count;
    }
    count++;
  }
}

// Remove all child nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const projects = [];

export function loadProjects() {
  const addProjectButton = document.querySelector("#addProjectButton");
  const addProjectInput = document.querySelector("#addProjectInput");
  const addProjectForm = document.querySelector("#addProjectForm");
  const addProjectInputButton = document.querySelector(
    "#addProjectInputButton"
  );
  const cancelProjectInputButton = document.querySelector(
    "#cancelProjectInputButton"
  );
  const projectsPreview = document.querySelector("#projectsPreview");
  const projectTitle = document.querySelector("#projectTitle");
  const projectTasks = document.querySelector("#projectTasks");
  const addTaskButton = document.querySelector("#addTaskButton");
  const addTaskForm = document.querySelector("#addTaskForm");
  const content = document.querySelector("#content");
  const allTasksOption = document.querySelector("#allTasksContainer");
  let idCount = 0;

  // Cancel project
  cancelProjectInputButton.addEventListener("click", () => {
    addProjectForm.style.display = "none";
    addProjectButton.style.display = "flex";
  });

  // Add project
  addProjectButton.addEventListener("click", () => {
    addProjectButton.style.display = "none";
    addProjectForm.style.display = "flex";

    addProjectInput.value = "";
  });

  // Add project submit
  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from auto submitting

    // Validation if input is empty
    if (addProjectInput.value === "") {
      alert("Project name can't be empty");
      return;
    }

    // Fix visibility
    addProjectForm.style.display = "none";
    addProjectButton.style.display = "flex";
    projectsPreview.style.display = "flex";

    // Get project name
    const newProjectName = addProjectInput.value;

    // Push project to array
    const newProject = new Project(newProjectName, idCount);
    projects.push(newProject);

    const newProjectPreview = document.createElement("div");
    const newProjectContainer = document.createElement("div");

    // Add arrow icon
    const arrowIcon = document.createElement("i");
    arrowIcon.className = "fa-solid fa-arrow-right";
    newProjectContainer.appendChild(arrowIcon);

    // Add project to sidebar
    newProjectPreview.className = idCount;

    // ++
    idCount++;
    console.log("++Count");

    newProjectPreview.id = "projectName";
    newProjectPreview.textContent = newProjectName;
    newProjectContainer.id = "newProjectContainer";

    projectsPreview.appendChild(newProjectContainer);
    newProjectContainer.appendChild(newProjectPreview);

    // Add closing icon
    const projectClosingIcon = document.createElement("i");
    projectClosingIcon.className = "fa-solid fa-xmark";
    projectClosingIcon.id = "projectClosingIcon";
    newProjectContainer.appendChild(projectClosingIcon);

    // Closing icon event listener
    projectClosingIcon.addEventListener("click", () => {
      console.log(
        "Removing project at index: " +
          getProjectIndex(newProjectPreview.className)
      );

      projects.splice(getProjectIndex(newProjectPreview.className), 1);
      newProjectContainer.remove();

      // Hide project/tasks name when removed
      content.style.display = "none";

      // Hide  projectPreview if empty (prevent gap appearing to nothing)
      if (!projectsPreview.firstChild) {
        projectsPreview.style.display = "none";
      }
      console.log(
        "Projects array after deleting project: " + JSON.stringify(projects)
      );
    });

    // Add event listener to display project on screen
    newProjectPreview.addEventListener("click", () => {
      console.log("ProjID: " + newProjectPreview.className);
      console.log("FunctID: " + getProjectIndex(newProjectPreview.className));

      // Hide form to add tasks if open
      addTaskForm.style.display = "none";

      // Show project/tasks name on screen
      content.style.display = "flex";

      // Iterate over project array if there's any task there
      if (
        projects[getProjectIndex(newProjectPreview.className)].tasks.length > 0
      ) {
        // Clear all previous added tasks
        removeAllChildNodes(projectTasks);

        // project
        console.log(
          projects[getProjectIndex(newProjectPreview.className)].tasks
        );

        for (let task of projects[getProjectIndex(newProjectPreview.className)]
          .tasks) {
          console.log("task: " + task);

          // Get task name
          const taskName = task;

          // Create task
          const newTask = document.createElement("div");
          newTask.id = "newTask";
          projectTasks.appendChild(newTask);

          // Add task name div to task
          const newTaskName = document.createElement("div");
          newTaskName.id = "newTaskName";
          newTaskName.textContent = taskName;
          newTask.appendChild(newTaskName);

          // Add task to project's array
          const projectIndex = getProjectIndex(projectTitle.className);

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
            // Check if this task already has a date declared and if so replace it
            if (projects[projectTitle.className].dueDate[taskIndex]) {
              console.log("already declared!!!!!!!!!!!!!!");
              return;
            }

            projects[projectTitle.className].dueDate[taskIndex] =
              taskDueDate.value;

            console.log(
              "DueDate assigned: " + projects[projectTitle.className].dueDate
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
            // Remove task from array
            projects[projectIndex].tasks.splice(taskIndex, 1);
            console.log(projects);

            // Remove task from screen and div
            newTask.remove();
          });
        }
      } else {
        // Clear all previous added tasks
        removeAllChildNodes(projectTasks);
      }

      // Show project title
      projectTitle.textContent = newProjectName;

      // Set proj.title class as the index of the project on the array
      projectTitle.className = newProjectPreview.className;

      // Show button to add tasks
      addTaskButton.style.display = "flex";
    });

    // All tasks event listener
    allTasksOption.addEventListener("click", () => {
      // Clear all previous added tasks
      removeAllChildNodes(projectTasks);

      // Hide project title
      projectTitle.style.display = "none";

      addTaskButton.style.display = "none";

      for (let project of projects) {
        for (let task of project.tasks) {
          console.log(task);

          // Get task name
          const taskName = task;

          // Create task
          const newTask = document.createElement("div");
          newTask.id = "newTask";
          projectTasks.appendChild(newTask);

          // Add task name div to task
          const newTaskName = document.createElement("div");
          newTaskName.id = "newTaskName";
          newTaskName.textContent = taskName;
          newTask.appendChild(newTaskName);
        }
      }
    });

    console.log(projects);
  });
}
