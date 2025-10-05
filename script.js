let input01 = document.getElementById("input-1");
let input02 = document.getElementById("input-2");
let input03 = document.getElementById("lists");

input01.addEventListener("click", () => {
  if (input02.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  input03.innerHTML += `
    <li>
      <input type="text" value="${input02.value}" disabled />
      <button onclick="deleteFun(this)">DELETE</button>
      <button onclick="editFun(this)">EDIT</button>
    </li>`;
  
  input02.value = "";
});

function deleteFun(a) {
  a.parentNode.remove();
}

function editFun(b) {
  let todoInput = b.parentNode.querySelector("input[type='text']");
  if (todoInput.disabled) {
    todoInput.disabled = false;
    todoInput.focus();
    b.textContent = "SAVE";
  } else {
    todoInput.disabled = true;
    b.textContent = "EDIT";
  }
}