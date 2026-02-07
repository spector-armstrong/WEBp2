const root = document.querySelector('body');

const background = document.createElement('div');
background.setAttribute('class', 'background');
background.style.height = "100vh";
background.style.backgroundColor = "#1a2a4f";
root.appendChild(background);

const insideBlock = document.createElement('div');
insideBlock.setAttribute('class', 'inside-block');
insideBlock.style.backgroundColor = "#F7A5A5";
insideBlock.style.width = "100vw";
insideBlock.style.margin = "3% 3%";
insideBlock.style.borderRadius = "25px"
background.appendChild(insideBlock);

const header = document.createElement('h1');
header.setAttribute('class', 'header');
header.textContent = "My ToDo List";
header.style.fontFamily = "Barrio";
header.style.fontSize = "120px";
header.style.color = "#101b32";
insideBlock.appendChild(header);

const inputForm = document.createElement('input');
inputForm.setAttribute('type', 'text');
inputForm.setAttribute('class', 'input-form');
inputForm.setAttribute('id', 'input');
inputForm.setAttribute('placeholder', 'Add a task');
inputForm.style.width = "40%";
inputForm.style.height = "10%";
inputForm.style.fontSize = "36px";
insideBlock.appendChild(inputForm);

const inputButton = document.createElement('input');
inputButton.setAttribute('type', 'submit');
inputButton.setAttribute('class', 'btn');
inputButton.setAttribute('id', 'btn');

inputForm.innerHTML = `<span onclick="func" class="btn">Add</span>`
