export function loadHomepage() {
  const container = document.querySelector("#container");

  const header = document.createElement("div");
  header.id = "header";
  container.appendChild(header);

  const main = document.createElement("div");
  main.id = "main";
  container.appendChild(main);

  const footer = document.createElement("div");
  footer.id = "footer";
  container.appendChild(footer);

  const sidebar = document.createElement("div");
  sidebar.id = "sidebar";
  main.appendChild(sidebar);

  const sidebarTitle = document.createElement("div");
  sidebarTitle.id = "sidebarTitle";
  sidebarTitle.textContent = "Projects";
  sidebar.appendChild(sidebarTitle);

  const projectsPreview = document.createElement("div");
  projectsPreview.id = "projectsPreview";
  sidebar.appendChild(projectsPreview);

  const addProjectButton = document.createElement("button");
  addProjectButton.id = "addProjectButton";
  addProjectButton.textContent = "+ Add Project";
  sidebar.appendChild(addProjectButton);

  const addProjectForm = document.createElement("form");
  addProjectForm.id = "addProjectForm";
  sidebar.appendChild(addProjectForm);

  const addProjectInput = document.createElement("input");
  addProjectInput.id = "addProjectInput";
  addProjectForm.appendChild(addProjectInput);

  const projectButtons = document.createElement("div");
  projectButtons.id = "projectButtons";
  addProjectForm.appendChild(projectButtons);

  const addProjectInputButton = document.createElement("button");
  addProjectInputButton.id = "addProjectInputButton";
  addProjectInputButton.textContent = "Add";
  projectButtons.appendChild(addProjectInputButton);

  const cancelProjectInputButton = document.createElement("button");
  cancelProjectInputButton.id = "cancelProjectInputButton";
  cancelProjectInputButton.textContent = "Cancel";
  cancelProjectInputButton.type = "button";
  projectButtons.appendChild(cancelProjectInputButton);

  const content = document.createElement("div");
  content.id = "content";
  main.appendChild(content);

  const projectDisplay = document.createElement("div");
  projectDisplay.id = "projectDisplay";
  content.appendChild(projectDisplay);

  const projectTitle = document.createElement("div");
  projectTitle.id = "projectTitle";
  projectDisplay.appendChild(projectTitle);

  const projectTasks = document.createElement("div");
  projectTasks.id = "projectTasks";
  projectDisplay.appendChild(projectTasks);

  const addTaskButton = document.createElement("button");
  addTaskButton.id = "addTaskButton";
  addTaskButton.textContent = "+ Add Task";
  projectDisplay.appendChild(addTaskButton);

  const addTaskForm = document.createElement("form");
  addTaskForm.id = "addTaskForm";
  projectDisplay.appendChild(addTaskForm);

  const addTaskInput = document.createElement("input");
  addTaskInput.id = "addTaskInput";
  addTaskForm.appendChild(addTaskInput);

  const addTaskInputButton = document.createElement("button");
  addTaskInputButton.id = "addTaskInputButton";
  addTaskInputButton.textContent = "+ Add Task";
  addTaskForm.appendChild(addTaskInputButton);
}
