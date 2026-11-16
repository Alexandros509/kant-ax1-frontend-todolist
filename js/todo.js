const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("ordered-to-do-list");
const todoCount = document.getElementById("todo-count");
const emptyMessage = document.getElementById("empty-message");

let todos = [];
let editingID = null;
let keyword = "";

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className =
    " to-do-list w-80 h-64 box-border rounded-lg flex flex-col p-4 m-6 border";
  li.dataset.id = todo.id;

  const heading = document.createElement("div");
  heading.className = "list-date-title box-border w-full mb-2";
  const dateText = todo.date ? todo.date : "날짜 없음";
  heading.textContent = `[${dateText}] ${todo.title}`;

  const contentWrap = document.createElement("div");
  contentWrap.className =
    "list-content-wrap flex flex-col flex-1 min-h-0 overflow-hidden";

  const content = document.createElement("div");
  content.className =
    "list-content box-border w-full flex-1 mb-2 overflow-y-auto break-words";
  content.textContent = todo.content;

  const buttons = document.createElement("div");
  buttons.className = "list-button box-border w-full flex gap-2 shrink-0";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.dataset.action = "edit";
  editBtn.className =
    "button-content-edit rounded-lg box-border h-8 flex flex-1 justify-center items-center cursor-pointer";
  editBtn.textContent = "수정";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  deleteBtn.className =
    "button-content-delete rounded-lg box-border h-8 flex flex-1 justify-center items-center cursor-pointer";
  deleteBtn.textContent = "삭제";

  buttons.append(editBtn, deleteBtn);
  contentWrap.append(content, buttons);
  li.append(heading, contentWrap);
  return li;
}

function getVisibleTodos() {
  const sortValue = document.getElementById("todo-sort").value;
  const matched = todos.filter((todo) => {
    return todo.title.includes(keyword) || todo.content.includes(keyword);
  });
  const sorted = [...matched].sort((a, b) => a.date.localeCompare(b.date));
  if (sortValue === "date-desc") {
    sorted.reverse();
  }
  return sorted;
}

function render() {
  const visible = getVisibleTodos();
  todoList.replaceChildren(...visible.map(createTodoElement));
  todoCount.textContent = `전체 ${todos.length}개 / 표시 ${visible.length}개`;
  if (todos.length === 0) {
    emptyMessage.textContent = "할 일이 없습니다";
  } else if (visible.length === 0) {
    emptyMessage.textContent = "검색 결과가 없습니다";
  } else {
    emptyMessage.textContent = "";
  }
}

render();

const formMessage = document.getElementById("form-message");
const cancelBtn = document.getElementById("cancel-btn");
const addBtn = document.getElementById("addBtn");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = todoForm.todoDate.value;
  const title = todoForm.todoTitle.value.trim();
  const content = todoForm.todoContent.value.trim();

  if (!title) {
    formMessage.textContent = "제목을 입력하세요.";
    return;
  }
  formMessage.textContent = "";

  if (editingID === null) {
    todos.push({
      id: crypto.randomUUID(),
      date,
      title,
      content,
      createdAt: Date.now(),
    });
  } else {
    todos = todos.map((todo) => {
      if (todo.id !== editingID) {
        return todo;
      }
      return { ...todo, date, title, content };
    });
    editingID = null;
    addBtn.textContent = "등록";
    cancelBtn.hidden = true;
  }

  todoForm.reset();
  render();
});

todoList.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-action]");
  if (!button) return;

  const id = button.closest("li").dataset.id;

  if (button.dataset.action === "delete") {
    todos = todos.filter((todo) => todo.id !== id);
    if (editingID === id) {
      editingID = null;
      addBtn.textContent = "등록";
      cancelBtn.hidden = true;
      formMessage.textContent = "";
      todoForm.reset();
    }
  }

  if (button.dataset.action === "edit") {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    todoForm.todoDate.value = todo.date;
    todoForm.todoTitle.value = todo.title;
    todoForm.todoContent.value = todo.content;
    editingID = id;
    addBtn.textContent = "수정 완료";
    cancelBtn.hidden = false;
    formMessage.textContent = "";
  }

  render();
});

cancelBtn.addEventListener("click", () => {
  editingID = null;
  addBtn.textContent = "등록";
  cancelBtn.hidden = true;
  formMessage.textContent = "";
  todoForm.reset();
  render();
});
