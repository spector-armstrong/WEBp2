const root = document.querySelector('body');
root.style.margin = '0'

const background = document.createElement('div');
background.setAttribute('class', 'background');
background.style.height = "100vh";
background.style.backgroundColor = "#1a2a4f";
background.style.display = "flex";
root.appendChild(background);

const insideBlock = document.createElement('div');
insideBlock.setAttribute('class', 'inside-block');
insideBlock.style.backgroundColor = "#F7A5A5";
insideBlock.style.width = "100vw";
insideBlock.style.margin = "3% 3%";
insideBlock.style.borderRadius = "25px";
insideBlock.style.display = "flex";
insideBlock.style.flexDirection = "column";
insideBlock.style.justifyContent = "flex-start";
insideBlock.style.alignItems = "center";
background.appendChild(insideBlock);

const header = document.createElement('h1');
header.setAttribute('class', 'header');
header.textContent = "My ToDo List";
header.style.fontFamily = "Barrio";
header.style.fontSize = "50px";
header.style.color = "#101b32";
header.style.margin = "10px 0"
insideBlock.appendChild(header);

const inputDiv = document.createElement("div");
inputDiv.classList.add("input-container");
inputDiv.style.width = "50%";
inputDiv.style.height = "5%";
inputDiv.style.display = "flex";
inputDiv.style.justifyContent = "center";
insideBlock.appendChild(inputDiv);

const inputForm = document.createElement('input');
inputForm.setAttribute('type', 'text');
inputForm.setAttribute('class', 'input-form');
inputForm.setAttribute('id', 'input');
inputForm.setAttribute('placeholder', 'Add a task');
inputForm.style.fontSize = "20px";
inputDiv.appendChild(inputForm);

const inputButton = document.createElement('button');
inputButton.setAttribute('type', 'submit');
inputButton.setAttribute('class', 'btn');
inputButton.setAttribute('id', 'btn');
inputButton.style.fontSize = "20px";
inputButton.textContent = "Add"
inputDiv.appendChild(inputButton);

const noteArea = document.createElement("ul");
noteArea.classList.add("note-area")
noteArea.style.width = "90%";
noteArea.style.height = "80%";
noteArea.style.display = "grid";
noteArea.style.gridTemplate = "repeat(6, 1fr) / repeat(3, 1fr)"
noteArea.style.gap = "5px";
noteArea.style.margin = "10px 0";
noteArea.style.padding = "0";
insideBlock.appendChild(noteArea);


let tasks = [];

function displayTasks() {
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += "<li>" + tasks[i] + " <button onclick='editTask(" + i + ")'>Edit</button>" + " <button onclick='removeTask(" + i + ")'>x</button></li>";
  }
  document.querySelector(".note-area").innerHTML = html;
};

function addTask() {
  let taskInput = document.querySelector(".input-form");
  let text = taskInput.value;
  if (text === "") {
    return;
  }
  tasks.push(text);
  taskInput.value = "";
  saveTasks();
  displayTasks();
};

