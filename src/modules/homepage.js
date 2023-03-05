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

  const sidebarOptions = document.createElement("div");
  sidebarOptions.id = "sidebarOptions";
  sidebar.appendChild(sidebarOptions);

  const allTasksContainer = document.createElement("div");
  allTasksContainer.id = "allTasksContainer";
  sidebarOptions.appendChild(allTasksContainer);

  const allTasksIcon = document.createElement("i");
  allTasksIcon.id = "allTasksIcon";
  allTasksIcon.className = "fa-solid fa-house";
  allTasksContainer.appendChild(allTasksIcon);

  const allTasksName = document.createElement("div");
  allTasksName.textContent = "All Tasks";
  allTasksContainer.appendChild(allTasksName);

  const todayTasksContainer = document.createElement("div");
  todayTasksContainer.id = "todayTasksContainer";
  sidebarOptions.appendChild(todayTasksContainer);

  const todayTasksIcon = document.createElement("i");
  todayTasksIcon.id = "todayTasksIcon";
  todayTasksIcon.className = "fa-solid fa-calendar-day";
  todayTasksContainer.appendChild(todayTasksIcon);

  const todayTasksName = document.createElement("div");
  todayTasksName.textContent = "Today";
  todayTasksContainer.appendChild(todayTasksName);

  const weekTasksContainer = document.createElement("div");
  weekTasksContainer.id = "weekTasksContainer";
  sidebarOptions.appendChild(weekTasksContainer);

  const weekTasksIcon = document.createElement("i");
  weekTasksIcon.id = "weekTasksIcon";
  weekTasksIcon.className = "fa-solid fa-calendar-week";
  weekTasksContainer.appendChild(weekTasksIcon);

  const weekTasksName = document.createElement("div");
  weekTasksName.textContent = "Week";
  weekTasksContainer.appendChild(weekTasksName);

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

  const addTaskButtons = document.createElement("div");
  addTaskButtons.id = "addTaskButtons";
  addTaskForm.appendChild(addTaskButtons);

  const addTaskInputButton = document.createElement("button");
  addTaskInputButton.id = "addTaskInputButton";
  addTaskInputButton.textContent = "Add";
  addTaskButtons.appendChild(addTaskInputButton);

  const cancelTaskInputButton = document.createElement("button");
  cancelTaskInputButton.type = "button";
  cancelTaskInputButton.id = "cancelTaskInputButton";
  cancelTaskInputButton.textContent = "Cancel";
  addTaskButtons.appendChild(cancelTaskInputButton);
}
