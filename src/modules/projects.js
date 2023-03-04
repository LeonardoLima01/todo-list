// Project's object constructor
function Project(name, id) {
  return {
    tasks: [],
    name,
    id,
  };
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
  let idCount = 0;

  cancelProjectInputButton.addEventListener("click", () => {
    addProjectForm.style.display = "none";
    addProjectButton.style.display = "flex";
  });

  addProjectButton.addEventListener("click", () => {
    addProjectButton.style.display = "none";
    addProjectForm.style.display = "flex";

    addProjectInput.value = "";
  });

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

    const newProjectPreview = document.createElement("div");
    const newProjectContainer = document.createElement("div");

    // Add arrow icon
    const arrowIcon = document.createElement("i");
    arrowIcon.className = "fa-solid fa-arrow-right";
    newProjectContainer.appendChild(arrowIcon);

    // Add project to sidebar
    newProjectPreview.className = idCount;
    newProjectPreview.id = "projectName";
    newProjectPreview.textContent = newProjectName;
    newProjectContainer.id = "newProjectContainer";

    projectsPreview.appendChild(newProjectContainer);
    newProjectContainer.appendChild(newProjectPreview);

    // Add closing icon
    const closingIcon = document.createElement("i");
    closingIcon.className = "fa-solid fa-xmark";
    newProjectContainer.appendChild(closingIcon);

    // Closing icon event listener
    closingIcon.addEventListener("click", () => {
      projects.splice(projects[newProjectPreview.className].id, 1);
      newProjectContainer.remove();
    });

    // Push project to array
    const newProject = new Project(newProjectName, idCount);
    projects.push(newProject);

    // Add event listener to display project on screen
    newProjectPreview.addEventListener("click", () => {
      console.log("ProjID: " + newProjectPreview.className);
      // Iterate over project array if there's any task there
      if (projects[newProjectPreview.className].tasks.length > 0) {
        // Clear all previous added tasks
        removeAllChildNodes(projectTasks);

        for (let task of projects[newProjectPreview.className].tasks) {
          console.log("task: " + task);
          const newTask = document.createElement("div");
          newTask.textContent = task;
          projectTasks.appendChild(newTask);
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

    // ++
    idCount++;

    console.log(projects);
  });
}
