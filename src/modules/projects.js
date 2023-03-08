// Project's object constructor
function Project(name, id) {
  return {
    tasks: {},
    name,
    id,
    dueDate: {},
    checked: {},
    priority: {},
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
  const todayOption = document.querySelector("#todayTasksContainer");
  const weekOption = document.querySelector("#weekTasksContainer");
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

  if (localStorage.getItem("projects")) {
  }

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
      projects.splice(getProjectIndex(newProjectPreview.className), 1);
      newProjectContainer.remove();

      // Hide project/tasks name when removed
      content.style.display = "none";

      // Hide  projectPreview if empty (prevent gap appearing to nothing)
      if (!projectsPreview.firstChild) {
        projectsPreview.style.display = "none";
      }
    });

    // Add event listener to display project on screen
    newProjectPreview.addEventListener("click", () => {
      addTaskForm.style.display = "none";
      content.style.display = "flex";
      projectTitle.style.display = "flex";
      projectTitle.textContent = newProjectName;
      projectTitle.className = newProjectPreview.className;
      addTaskButton.style.display = "flex";

      // Iterate over project array if there's any task there
      if (
        Object.keys(
          projects[getProjectIndex(newProjectPreview.className)].tasks
        ).length > 0
      ) {
        // Clear all previous added tasks
        removeAllChildNodes(projectTasks);

        // Number used to create unique ids for each checkbox to be referenced by the label
        let cbCount = 0;

        for (let task of Object.values(
          projects[getProjectIndex(newProjectPreview.className)].tasks
        )) {
          // Get task name
          const taskName = task;

          // Create task
          const newTask = document.createElement("div");
          newTask.id = "newTask";
          newTask.className = cbCount;
          projectTasks.appendChild(newTask);

          // Checkbox container
          const newTaskCheckboxContainer = document.createElement("div");
          newTaskCheckboxContainer.id = "newTaskCheckboxContainer";
          newTask.appendChild(newTaskCheckboxContainer);

          const newTaskCheckbox = document.createElement("input");
          newTaskCheckbox.type = "checkbox";
          newTaskCheckbox.id = "cb" + cbCount;
          newTaskCheckboxContainer.appendChild(newTaskCheckbox);

          // Task event listener
          newTaskCheckbox.addEventListener("click", () => {
            // If it's the first time being clicked, add yes (checked)
            if (
              projects[getProjectIndex(projectTitle.className)].checked[
                taskName
              ] == null
            ) {
              projects[getProjectIndex(projectTitle.className)].checked[
                taskName
              ] = "yes";
            } else {
              projects[getProjectIndex(projectTitle.className)].checked[
                taskName
              ] == "yes"
                ? (projects[getProjectIndex(projectTitle.className)].checked[
                    taskName
                  ] = "no")
                : (projects[getProjectIndex(projectTitle.className)].checked[
                    taskName
                  ] = "yes");
            }
          });

          // Check if current checkbox being displayed was checked before, if so display it checked
          if (
            projects[getProjectIndex(projectTitle.className)].checked[
              taskName
            ] == "yes"
          ) {
            newTaskCheckbox.checked = true;
          }

          // Add task name div to task
          const newTaskName = document.createElement("label");
          newTaskName.id = "newTaskName";
          newTaskName.htmlFor = "cb" + cbCount;
          newTaskName.textContent = taskName;
          newTaskCheckboxContainer.appendChild(newTaskName);

          cbCount++;

          // Add task priority
          const taskPriority = document.createElement("div");
          taskPriority.id = "taskPriority";
          newTask.appendChild(taskPriority);

          const selectTag = document.createElement("select");
          taskPriority.appendChild(selectTag);

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

          // Event listener to detect priority selected
          selectTag.addEventListener("input", (e) => {
            // Add border
            e.target.value === "0"
              ? (newTask.style.borderLeft = "0.6vw solid transparent")
              : e.target.value === "1"
              ? (newTask.style.borderLeft = "0.6vw solid #f2ee00")
              : e.target.value === "2"
              ? (newTask.style.borderLeft = "0.6vw solid orange")
              : (newTask.style.borderLeft = "0.6vw solid #F05E16");

            // Set task priority on 'projects' priority object
            projects[getProjectIndex(projectTitle.className)].priority[
              taskName
            ] = e.target.value;
          });

          // Add task's priority if it was previously selected
          if (
            projects[getProjectIndex(projectTitle.className)].priority[taskName]
          ) {
            projects[getProjectIndex(projectTitle.className)].priority[
              taskName
            ] === "0"
              ? ((newTask.style.borderLeft = "0.6vw solid transparent"),
                (selectTag.value = 0))
              : projects[getProjectIndex(projectTitle.className)].priority[
                  taskName
                ] === "1"
              ? ((newTask.style.borderLeft = "0.6vw solid #f2ee00"),
                (selectTag.value = 1))
              : projects[getProjectIndex(projectTitle.className)].priority[
                  taskName
                ] === "2"
              ? ((newTask.style.borderLeft = "0.6vw solid orange"),
                (selectTag.value = 2))
              : ((newTask.style.borderLeft = "0.6vw solid #F05E16"),
                (selectTag.value = 3));
          }

          // Add due date to task
          const taskDueDate = document.createElement("input");
          taskDueDate.id = "taskDueDate";
          taskDueDate.type = "date";
          newTask.appendChild(taskDueDate);

          taskDueDate.addEventListener("input", () => {
            projects[getProjectIndex(projectTitle.className)].dueDate[
              taskName
            ] = taskDueDate.value;
          });

          // Check if task already has a due date set
          if (
            projects[getProjectIndex(projectTitle.className)].dueDate[taskName]
          ) {
            taskDueDate.value =
              projects[getProjectIndex(projectTitle.className)].dueDate[
                taskName
              ];
          }

          // Add task closing icon
          const taskClosingIcon = document.createElement("i");
          taskClosingIcon.className = "fa-solid fa-xmark";
          taskClosingIcon.id = "taskClosingIcon";
          newTask.appendChild(taskClosingIcon);

          // Task closing event listener
          taskClosingIcon.addEventListener("click", () => {
            // Remove task from array
            delete projects[getProjectIndex(projectTitle.className)].tasks[
              taskName
            ];

            // Reset task priority
            projects[getProjectIndex(projectTitle.className)].priority[
              taskName
            ] = "0";

            // Reset task due date
            projects[getProjectIndex(projectTitle.className)].dueDate[
              taskName
            ] = "";

            // Reset task checked state
            projects[getProjectIndex(projectTitle.className)].checked[
              taskName
            ] = "";

            // Remove task from screen and div
            newTask.remove();
          });
        }
      } else {
        // Clear all previous added tasks
        removeAllChildNodes(projectTasks);
      }
    });

    // All tasks event listener
    allTasksOption.addEventListener("click", () => {
      // Clear all previous added tasks
      removeAllChildNodes(projectTasks);
      // Change project title
      projectTitle.textContent = "All Tasks";

      // Hide button to add tasks
      addTaskButton.style.display = "none";

      // Number to be added to checkboxes id to make them unique to be referenced by the label
      let cbCount = 0;

      for (let projectI in projects) {
        for (let name of Object.values(projects[projectI].tasks)) {
          // Create task
          const newTask = document.createElement("div");
          newTask.id = "newTask";
          projectTasks.appendChild(newTask);

          // Get task name
          const taskName = name;

          // Checkbox container
          const newTaskCheckboxContainer = document.createElement("div");
          newTaskCheckboxContainer.id = "newTaskCheckboxContainer";
          newTask.appendChild(newTaskCheckboxContainer);

          const newTaskCheckbox = document.createElement("input");
          newTaskCheckbox.type = "checkbox";
          newTaskCheckbox.id = "cb" + cbCount;
          newTaskCheckboxContainer.appendChild(newTaskCheckbox);

          // Add task name div to task
          const newTaskName = document.createElement("label");
          newTaskName.id = "newTaskName";
          newTaskName.htmlFor = "cb" + cbCount;
          newTaskName.textContent = taskName;
          newTaskCheckboxContainer.appendChild(newTaskName);

          // Update 'projects' checked object
          newTaskCheckbox.addEventListener("click", () => {
            // Check if current checkbox being displayed was checked before, if so display it checked
            projects[projectI].checked[taskName] == "yes"
              ? (projects[projectI].checked[taskName] = "no")
              : (projects[projectI].checked[taskName] = "yes");
          });

          // Update checkbox 'checked' state if it's checked
          if (projects[projectI].checked[taskName] == "yes") {
            newTaskCheckbox.checked = true;
          }

          // Add task priority
          const taskPriority = document.createElement("div");
          taskPriority.id = "taskPriority";
          newTask.appendChild(taskPriority);

          const selectTag = document.createElement("select");
          taskPriority.appendChild(selectTag);

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

          // Event listener to detect priority selected
          selectTag.addEventListener("input", (e) => {
            // Add border
            e.target.value === "0"
              ? (newTask.style.borderLeft = "0.6vw solid transparent")
              : e.target.value === "1"
              ? (newTask.style.borderLeft = "0.6vw solid #f2ee00")
              : e.target.value === "2"
              ? (newTask.style.borderLeft = "0.6vw solid orange")
              : (newTask.style.borderLeft = "0.6vw solid #F05E16");

            // Set task priority on 'projects' priority object
            projects[projectI].priority[taskName] = e.target.value;
          });

          // Add task's priority if it was previously selected
          if (projects[projectI].priority[taskName]) {
            projects[projectI].priority[taskName] === "0"
              ? ((newTask.style.borderLeft = "0.6vw solid transparent"),
                (selectTag.value = 0))
              : projects[projectI].priority[taskName] === "1"
              ? ((newTask.style.borderLeft = "0.6vw solid #f2ee00"),
                (selectTag.value = 1))
              : projects[projectI].priority[taskName] === "2"
              ? ((newTask.style.borderLeft = "0.6vw solid orange"),
                (selectTag.value = 2))
              : ((newTask.style.borderLeft = "0.6vw solid #F05E16"),
                (selectTag.value = 3));
          }

          // Add task closing icon
          const taskClosingIcon = document.createElement("i");
          taskClosingIcon.className = "fa-solid fa-xmark";
          taskClosingIcon.id = "taskClosingIcon";
          newTask.appendChild(taskClosingIcon);

          // Task closing event listener
          taskClosingIcon.addEventListener("click", () => {
            // Remove task from array
            delete projects[getProjectIndex(projectTitle.className)].tasks[
              taskName
            ];

            // Reset task priority
            projects[getProjectIndex(projectTitle.className)].priority[
              taskName
            ] = "0";

            // Reset task due date
            projects[getProjectIndex(projectTitle.className)].dueDate[
              taskName
            ] = "";

            // Reset task checked state
            projects[getProjectIndex(projectTitle.className)].checked[
              taskName
            ] = "";

            // Remove task from screen and div
            newTask.remove();
          });
          cbCount++;
        }
      }
    });

    // Today date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    let cbCount = 0;

    todayOption.addEventListener("click", () => {
      // Clear all previous added tasks
      removeAllChildNodes(projectTasks);
      // Change project title
      projectTitle.textContent = "Today ";

      // Hide button to add tasks
      addTaskButton.style.display = "none";

      // Number to be added to checkboxes id to make them unique to be referenced by the label
      let cbCount = 0;

      for (let projectI in projects) {
        for (let name of Object.values(projects[projectI].tasks)) {
          if (projects[projectI].dueDate[name] == today) {
            // Create task
            const newTask = document.createElement("div");
            newTask.id = "newTask";
            projectTasks.appendChild(newTask);

            // Get task name
            const taskName = name;

            // Checkbox container
            const newTaskCheckboxContainer = document.createElement("div");
            newTaskCheckboxContainer.id = "newTaskCheckboxContainer";
            newTask.appendChild(newTaskCheckboxContainer);

            const newTaskCheckbox = document.createElement("input");
            newTaskCheckbox.type = "checkbox";
            newTaskCheckbox.id = "cb" + cbCount;
            newTaskCheckboxContainer.appendChild(newTaskCheckbox);

            // Add task name div to task
            const newTaskName = document.createElement("label");
            newTaskName.id = "newTaskName";
            newTaskName.htmlFor = "cb" + cbCount;
            newTaskName.textContent = taskName;
            newTaskCheckboxContainer.appendChild(newTaskName);

            // Update 'projects' checked object
            newTaskCheckbox.addEventListener("click", () => {
              // Check if current checkbox being displayed was checked before, if so display it checked
              projects[projectI].checked[taskName] == "yes"
                ? (projects[projectI].checked[taskName] = "no")
                : (projects[projectI].checked[taskName] = "yes");
            });

            // Update checkbox 'checked' state if it's checked
            if (projects[projectI].checked[taskName] == "yes") {
              newTaskCheckbox.checked = true;
            }

            // Add task priority
            const taskPriority = document.createElement("div");
            taskPriority.id = "taskPriority";
            newTask.appendChild(taskPriority);

            const selectTag = document.createElement("select");
            taskPriority.appendChild(selectTag);

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

            // Event listener to detect priority selected
            selectTag.addEventListener("input", (e) => {
              // Add border
              e.target.value === "0"
                ? (newTask.style.borderLeft = "0.6vw solid transparent")
                : e.target.value === "1"
                ? (newTask.style.borderLeft = "0.6vw solid #f2ee00")
                : e.target.value === "2"
                ? (newTask.style.borderLeft = "0.6vw solid orange")
                : (newTask.style.borderLeft = "0.6vw solid #F05E16");

              // Set task priority on 'projects' priority object
              projects[projectI].priority[taskName] = e.target.value;
            });

            // Add task's priority if it was previously selected
            if (projects[projectI].priority[taskName]) {
              projects[projectI].priority[taskName] === "0"
                ? ((newTask.style.borderLeft = "0.6vw solid transparent"),
                  (selectTag.value = 0))
                : projects[projectI].priority[taskName] === "1"
                ? ((newTask.style.borderLeft = "0.6vw solid #f2ee00"),
                  (selectTag.value = 1))
                : projects[projectI].priority[taskName] === "2"
                ? ((newTask.style.borderLeft = "0.6vw solid orange"),
                  (selectTag.value = 2))
                : ((newTask.style.borderLeft = "0.6vw solid #F05E16"),
                  (selectTag.value = 3));
            }

            // Add task closing icon
            const taskClosingIcon = document.createElement("i");
            taskClosingIcon.className = "fa-solid fa-xmark";
            taskClosingIcon.id = "taskClosingIcon";
            newTask.appendChild(taskClosingIcon);

            // Task closing event listener
            taskClosingIcon.addEventListener("click", () => {
              // Remove task from array
              delete projects[getProjectIndex(projectTitle.className)].tasks[
                taskName
              ];

              // Reset task priority
              projects[getProjectIndex(projectTitle.className)].priority[
                taskName
              ] = "0";

              // Reset task due date
              projects[getProjectIndex(projectTitle.className)].dueDate[
                taskName
              ] = "";

              // Reset task checked state
              projects[getProjectIndex(projectTitle.className)].checked[
                taskName
              ] = "";

              // Remove task from screen and div
              newTask.remove();
            });

            cbCount++;
          }
        }
      }
    });

    // Number to be added to checkboxes id to make them unique to be referenced by the label
    cbCount = 0;

    weekOption.addEventListener("click", () => {
      // Clear all previous added tasks
      removeAllChildNodes(projectTasks);

      // Change project title
      projectTitle.textContent = "Week";

      // Hide button to add tasks
      addTaskButton.style.display = "none";

      // Number to be added to checkboxes id to make them unique to be referenced by the label
      let cbCount = 0;

      for (let projectI in projects) {
        for (let name of Object.values(projects[projectI].tasks)) {
          let dueDateYear = projects[projectI].dueDate[name].split("-")[0];
          let dueDateMonth = projects[projectI].dueDate[name].split("-")[1];
          let dueDateDay = projects[projectI].dueDate[name].split("-")[2];

          // If year and month are the same
          if (dueDateYear == yyyy && dueDateMonth == mm) {
            // Check if day is equal or >= today + 7 days
            if (dueDateDay >= dd && dueDateDay <= +dd + 7) {
              // Create task
              const newTask = document.createElement("div");
              newTask.id = "newTask";
              projectTasks.appendChild(newTask);

              // Get task name
              const taskName = name;

              // Checkbox container
              const newTaskCheckboxContainer = document.createElement("div");
              newTaskCheckboxContainer.id = "newTaskCheckboxContainer";
              newTask.appendChild(newTaskCheckboxContainer);

              const newTaskCheckbox = document.createElement("input");
              newTaskCheckbox.type = "checkbox";
              newTaskCheckbox.id = "cb" + cbCount;
              newTaskCheckboxContainer.appendChild(newTaskCheckbox);

              // Add task name div to task
              const newTaskName = document.createElement("label");
              newTaskName.id = "newTaskName";
              newTaskName.htmlFor = "cb" + cbCount;
              newTaskName.textContent = taskName;
              newTaskCheckboxContainer.appendChild(newTaskName);

              // Update 'projects' checked object
              newTaskCheckbox.addEventListener("click", () => {
                // Check if current checkbox being displayed was checked before, if so display it checked
                projects[projectI].checked[taskName] == "yes"
                  ? (projects[projectI].checked[taskName] = "no")
                  : (projects[projectI].checked[taskName] = "yes");
              });

              // Update checkbox 'checked' state if it's checked
              if (projects[projectI].checked[taskName] == "yes") {
                newTaskCheckbox.checked = true;
              }

              // Add task priority
              const taskPriority = document.createElement("div");
              taskPriority.id = "taskPriority";
              newTask.appendChild(taskPriority);

              const selectTag = document.createElement("select");
              taskPriority.appendChild(selectTag);

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

              // Event listener to detect priority selected
              selectTag.addEventListener("input", (e) => {
                // Add border
                e.target.value === "0"
                  ? (newTask.style.borderLeft = "0.6vw solid transparent")
                  : e.target.value === "1"
                  ? (newTask.style.borderLeft = "0.6vw solid #f2ee00")
                  : e.target.value === "2"
                  ? (newTask.style.borderLeft = "0.6vw solid orange")
                  : (newTask.style.borderLeft = "0.6vw solid #F05E16");

                // Set task priority on 'projects' priority object
                projects[projectI].priority[taskName] = e.target.value;
              });

              // Add task's priority if it was previously selected
              if (projects[projectI].priority[taskName]) {
                projects[projectI].priority[taskName] === "0"
                  ? ((newTask.style.borderLeft = "0.6vw solid transparent"),
                    (selectTag.value = 0))
                  : projects[projectI].priority[taskName] === "1"
                  ? ((newTask.style.borderLeft = "0.6vw solid #f2ee00"),
                    (selectTag.value = 1))
                  : projects[projectI].priority[taskName] === "2"
                  ? ((newTask.style.borderLeft = "0.6vw solid orange"),
                    (selectTag.value = 2))
                  : ((newTask.style.borderLeft = "0.6vw solid #F05E16"),
                    (selectTag.value = 3));
              }

              // Add task closing icon
              const taskClosingIcon = document.createElement("i");
              taskClosingIcon.className = "fa-solid fa-xmark";
              taskClosingIcon.id = "taskClosingIcon";
              newTask.appendChild(taskClosingIcon);

              // Task closing event listener
              taskClosingIcon.addEventListener("click", () => {
                // Remove task from array
                delete projects[getProjectIndex(projectTitle.className)].tasks[
                  taskName
                ];

                // Reset task priority
                projects[getProjectIndex(projectTitle.className)].priority[
                  taskName
                ] = "0";

                // Reset task due date
                projects[getProjectIndex(projectTitle.className)].dueDate[
                  taskName
                ] = "";

                // Reset task checked state
                projects[getProjectIndex(projectTitle.className)].checked[
                  taskName
                ] = "";

                // Remove task from screen and div
                newTask.remove();
              });

              cbCount++;
            }
          }
        }
      }
    });
  });
}
