document.getElementById("Add").addEventListener("click", AddTask);

function AddTask (){
    let input = document.getElementById("input").value;
    let container = document.querySelector(".container");

    let createTask = document.createElement("div");
    createTask.className = "task"

    let para = document.createElement("p");
    para.textContent = input;
    createTask.appendChild(para);

    let createEditBtn = document.createElement("button");
    createEditBtn.textContent = "Edit";
    createTask.appendChild(createEditBtn);

    createEditBtn.addEventListener("click", ()=> {
        let text = window.prompt("enter edit message.");
        para.textContent = text;
    });

    let createDeleteBtn = document.createElement("button");
    createDeleteBtn.textContent = "Delete";
    createTask.appendChild(createDeleteBtn);
    
    createDeleteBtn.addEventListener("click", ()=> {
        container.removeChild(createTask);
    });

    container.appendChild(createTask);
    document.getElementById("input").value = "";
}