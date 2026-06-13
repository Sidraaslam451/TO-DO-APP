// ──────────────────────────────────────────────
//  TaskFlow — script.js
// ──────────────────────────────────────────────

const STORAGE_KEY = "taskflow_tasks";

// ── State ──────────────────────────────────────
let tasks = loadTasks();   // [{ id, text, done, createdAt }]
let currentFilter = "all"; // "all" | "pending" | "done"

// ── DOM refs ────────────────────────────────────
const taskInput    = document.getElementById("task-input");
const addBtn       = document.getElementById("add-btn");
const taskList     = document.getElementById("task-list");
const emptyState   = document.getElementById("empty-state");
const pendingCount = document.getElementById("pending-count");
const clearDoneBtn = document.getElementById("clear-done-btn");
const filterBtns   = document.querySelectorAll(".filter-btn");

// ── Boot ────────────────────────────────────────
render();

// ── Event Listeners ─────────────────────────────
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

// ── Core Functions ──────────────────────────────

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    shake(taskInput);
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now(),
    text,
    done: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);   // newest at top
  saveTasks();
  taskInput.value = "";
  taskInput.focus();

  // Reset filter to "all" so the new task is visible
  if (currentFilter === "done") {
    currentFilter = "all";
    filterBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === "all");
    });
  }

  render();
}

function deleteTask(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (li) {
    li.classList.add("removing");
    li.addEventListener("animationend", () => {
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
    }, { once: true });
  }
}

function toggleDone(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function startEdit(id) {
  const task   = tasks.find((t) => t.id === id);
  const li     = document.querySelector(`[data-id="${id}"]`);
  const input  = li.querySelector(".task-text-input");
  const editBtn = li.querySelector(".btn-edit");

  if (input.disabled) {
    // Enter edit mode
    input.disabled  = false;
    input.focus();
    input.select();
    editBtn.textContent = "Save";
    editBtn.classList.add("saving");
    li.classList.add("editing");
  } else {
    // Save
    const newText = input.value.trim();
    if (!newText) {
      shake(input);
      input.focus();
      return;
    }
    task.text       = newText;
    input.disabled  = true;
    editBtn.textContent = "Edit";
    editBtn.classList.remove("saving");
    li.classList.remove("editing");
    saveTasks();
    render();
  }
}

// ── Render ───────────────────────────────────────

function render() {
  const filtered = getFiltered();

  // Update counter (always based on all tasks)
  const pending = tasks.filter((t) => !t.done).length;
  pendingCount.textContent = pending;

  // Show/hide empty state
  emptyState.hidden = filtered.length > 0;
  taskList.innerHTML = "";

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="btn-check" onclick="toggleDone(${task.id})" aria-label="${task.done ? 'Mark pending' : 'Mark done'}">
        <span class="check-icon">${task.done ? "✓" : ""}</span>
      </button>
      <input
        class="task-text-input"
        type="text"
        value="${escapeHtml(task.text)}"
        disabled
        aria-label="Task text"
      />
      <div class="task-actions">
        <button class="btn-edit" onclick="startEdit(${task.id})">Edit</button>
        <button class="btn-delete" onclick="deleteTask(${task.id})" aria-label="Delete task">✕</button>
      </div>
    `;

    taskList.appendChild(li);

    // Entrance animation
    requestAnimationFrame(() => li.classList.add("visible"));
  });
}

function getFiltered() {
  if (currentFilter === "pending") return tasks.filter((t) => !t.done);
  if (currentFilter === "done")    return tasks.filter((t) => t.done);
  return tasks;
}

// ── Persistence ──────────────────────────────────

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Could not save tasks:", e);
  }
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// ── Utilities ────────────────────────────────────

function shake(el) {
  el.classList.remove("shake");
  void el.offsetWidth; // reflow to restart animation
  el.classList.add("shake");
  el.addEventListener("animationend", () => el.classList.remove("shake"), { once: true });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}