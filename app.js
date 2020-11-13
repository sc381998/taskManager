let noOfServer = 1;
let taskId = 1;
let task = [];
let server = [1];
let barArray = [];
let timerId = null;
function startTimer(id) {
  var elem = document.getElementById(`myBar${id}`);

  var width = 0;
  timerId = setInterval(frame, 1000);
  function frame() {
    if (width >= 100) {
      clearInterval(timerId);
      removeTask(null, Number(id));
      elem.setAttribute("style", "width: 0");
    } else {
      width = width + 5;
      elem.setAttribute("style", `width: ${width}% `);
    }
  }
}

function addServer() {
  if (noOfServer === 10)
    alert("You reached the limit. Maximum 10 server you can add.");
  server.push(++noOfServer);

  handleTaskBar();
  handleServer();
}

function removeServer() {
  if (server.length < 2) {
    alert("You reached the minimum limit.");
    return;
  }
  let tempTask = 0;
  for (let i = 0; i < task.length; i++) {
    if (!task[i].isWaiting) tempTask++;
  }
  if (noOfServer > tempTask) server.splice(server.length - 1, 1);

  handleServer();
}

function addTask() {
  let noOfTask = document.getElementById("inputTask").value;
  noOfTask = Number(noOfTask);
  if (noOfTask < 1) return;
  for (let i = taskId; i < noOfTask + taskId; i++) {
    let taskObj = {};
    taskObj.id = i;
    taskObj.isWaiting = true;
    task.push(taskObj);
  }

  for (let i = 0; i < server.length; i++) {
    task[i].isWaiting = false;
  }

  handleTaskBar();
  taskId += noOfTask;
}

function handleTaskBar() {
  let taskExecuter = document.getElementById("taskExecuter");

  taskExecuter.innerHTML = "";
  for (let i = 0; i < task.length; i++) {
    // for (let i = taskId; i < noOfTask + taskId; i++) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("d-flex");
    wrapper.id = task[i].id;

    let myProgress = document.createElement("div");
    myProgress.id = "myProgress";
    let myBar = document.createElement("div");
    !task[i].isWaiting
      ? (myBar.id = `myBar${task[i].id}`)
      : (myBar.innerHTML = "waiting...");
    myBar.classList.add("myBar");
    if (myBar.hasAttribute("id")) barArray.push(task[i].id);
    myBar.setAttribute("style", "width: 0");
    myProgress.appendChild(myBar);
    wrapper.appendChild(myProgress);
    let delButton = document.createElement("button");
    let delIcon = document.createElement("i");
    delIcon.classList.add("fa", "fa-trash-o", "delIcon");
    delButton.classList.add("delButton");
    delButton.appendChild(delIcon);
    delButton.id = `del${task[i].id}`;
    delButton.setAttribute("onclick", "removeTask(this, null)");
    wrapper.appendChild(delButton);
    taskExecuter.appendChild(wrapper);
  }
  for (let i = 0; i < barArray.length; i++) {
    startTimer(barArray[i]);
  }
  barArray = [];
}
function removeTask(event = null, argId = null) {
  // console.log(event);
  let id = null;
  if (!argId) id = Number(event.id.replace(/[^0-9]/g, ""));
  else {
    id = argId;
  }
  // console.log(id);
  let i = null;
  for (i = 0; i < task.length; i++) {
    if (task[i].id === id) {
      break;
    }
  }
  task.splice(i, 1);
  handleTaskBar();
}

function handleServer() {
  let serverContainer = document.getElementById("serverContainer");
  serverContainer.innerHTML = "";

  for (let i = 0; i < server.length; i++) {
    let serverList = document.createElement("li");
    serverList.innerHTML = `Server ${server[i]}`;
    serverList.classList.add("displayLi");
    serverContainer.appendChild(serverList);
  }
}
