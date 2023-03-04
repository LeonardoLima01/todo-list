// Project's object constructor
function Project(name, id) {
  return {
    tasks: [],
    name,
    id,
  };
}

export function loadProjects() {
  const addProjectButton = document.querySelector("#addProjectButton");
  const addProjectInput = document.querySelector("#addProjectInput");
  const addProjectForm = document.querySelector("#addProjectForm");
  const addProjectInputButton = document.querySelector(
    "#addProjectInputButton"
  );
  const projectsPreview = document.querySelector("#projectsPreview");
  const projects = [];
  const projectTitle = document.querySelector("#projectTitle");
  const projectTasks = document.querySelector("#projectTasks");
  let idCount = 0;

  addProjectButton.addEventListener("click", () => {
    addProjectButton.style.display = "none";
    addProjectInput.style.display = "flex";
    addProjectInputButton.style.display = "flex";

    addProjectInput.value = "";
  });

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from auto submitting

    // Fix visibility
    addProjectInput.style.display = "none";
    addProjectInputButton.style.display = "none";
    addProjectButton.style.display = "flex";

    // Add project to sidebar
    const newProjectName = addProjectInput.value;
    const newProjectPreview = document.createElement("div");
    newProjectPreview.textContent = newProjectName;
    projectsPreview.appendChild(newProjectPreview);

    // Push project to array
    const newProject = new Project(newProjectName, idCount);
    projects.push(newProject);

    // Add event listener to display project on screen
    newProjectPreview.addEventListener("click", () => {
      // Iterate over project array if there's any task there
      if (newProjectPreview[idCount]?.tasks !== undefined) {
        for (task of newProjectPreview[idCount].tasks) {
          console.log("task: " + tasks);
          const newTask = document.createElement("div");
          newTask.textContent = task;
          projectTasks.appendChild(newTask);
        }
      }

      // Show title
      projectTitle.textContent = newProjectName;
    });

    // ++
    idCount++;

    console.log(projects);
  });
}
