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
inputButton.setAttribute('onclick', 'addTask()')
inputButton.style.fontSize = "20px";
inputButton.textContent = "Add"
inputDiv.appendChild(inputButton);

const noteArea = document.createElement("ul");
noteArea.classList.add("note-area");
noteArea.style.listStyleType = "none";
noteArea.style.width = "90%";
noteArea.style.height = "80%";
noteArea.style.display = "grid";
noteArea.style.gridTemplate = "repeat(6, 1fr) / repeat(3, 1fr)"
noteArea.style.gap = "5px";
noteArea.style.margin = "10px 0";
noteArea.style.padding = "0";
insideBlock.appendChild(noteArea);


let tasks = [];
let draggedElement = null;

function displayTasks() {
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
    html += `<li id=${i} class="task task-${i}" draggable="true" data-task="${tasks[i]}">` + tasks[i] + ` <button class='edit-btn-${i}' onclick='editTask(` + i + `)'>Edit</button>` + ` <button class='del-btn-${i}' onclick='removeTask(` + i + `)'>x</button></li>`;
    }
    document.querySelector(".note-area").innerHTML = html;
    
    for (let i = 0; i < tasks.length; i++) {
        let currElement = document.querySelector(`.task-${i}`);
        currElement.style.border = "solid 2px #1a2a4f";
        currElement.style.backgroundColor = "#ca85859e";
        currElement.style.borderRadius = "5px";
        currElement.style.fontFamily = "Barrio";
        currElement.style.fontSize = "1em";
        currElement.style.color = "#1a2a4f";
        currElement.style.display = "grid";
        currElement.style.gridTemplate = "1fr / 5fr 1fr 1fr"
        currElement.style.alignItems = "center"

        currElement.addEventListener(`dragstart`, (event) => {
            draggedElement = event.target;
            event.target.classList.add(`selected`);
            })

        currElement.addEventListener(`dragend`, (event) => {
            event.target.classList.remove(`selected`);
            draggedElement = null;
            tasks = Array.from(document.querySelectorAll('.task')).map(li => li.dataset.task);
            saveTasks();
        });

        currElement.addEventListener(`dragover`, (event) => {
            event.preventDefault();


            const currentElement = event.target.closest('.task');
            if (!currentElement) return;

            const activeElement = draggedElement;

            const isMoveable = activeElement !== currentElement &&
                currentElement.classList.contains(`task`);

            if (!isMoveable) {
                return;
            }

            const nextElement = getNextElement(event.clientY, currentElement);

            if (
                nextElement &&
                activeElement === nextElement.previousElementSibling ||
                activeElement === nextElement
            ) {
                return;
            }

            currElement.parentNode.insertBefore(activeElement, nextElement);
            });


        let currEditBtn = document.querySelector(`.edit-btn-${i}`);
        let currDelBtn = document.querySelector(`.del-btn-${i}`);
        currEditBtn.style.background = "none";
        currDelBtn.style.background = "none";
        currDelBtn.style.fontFamily = "Barrio";
        currEditBtn.style.fontFamily = "Barrio";
        currEditBtn.style.color = "#1a2a4f";
        currDelBtn.style.color = "#1a2a4f";
        currElement.style.cursor = "move";



        currElement.addEventListener("click", function() {
            currElement.innerHTML = tasks[i] + ` <button class='del-btn-${i}' onclick='removeTask(` + i + `)'>x</button>`;
            currElement.style.backgroundColor = "#6944449e";
            currElement.style.textDecoration = "line-through";
            currDelBtn.style.background = "none";
            currDelBtn.style.textDecoration = "none";
        })
    }
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

function removeTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    displayTasks();
};

function editTask(i) {
    document.getElementById(i).innerHTML = `<input class="edit-${i}" type="text" placeholder="Edit task">
    <button class="save-edit-${i}">Save</button>`
    document.querySelector(`.save-edit-${i}`).addEventListener("click", function () {
        if (document.querySelector(`.edit-${i}`).value === "") {
        return;
        }
        tasks[i] = document.querySelector(`.edit-${i}`).value;
        saveTasks();
        displayTasks();
    })
};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
};

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

  return nextElement;
};

loadTasks();
displayTasks();
