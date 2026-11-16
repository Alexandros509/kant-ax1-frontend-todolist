


// window.addEventListener("DOMContentLoaded", function () {
//     const todoForm = document.getElementById("todo-form");
//     const todoList = document.getElementById("ordered-to-do-list");

//     todoForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const dateValue = todoForm.todoDate.value;
//         const titleValue = todoForm.todoTitle.value;
//         const contentValue = todoForm.todoContent.value;

//         if (titleValue === "") {
//             return;
//         }

//         const htmlTemplate = `
//             <div class="to-do-list w-80 h-64 box-border rounded-lg flex-col flex p-4 m-6 border" data-date="${dateValue}" data-title="${titleValue}" data-content="${contentValue}">
//                 <div class="list-date-title box-border w-full mb-2">[${dateValue}] ${titleValue}</div>
//                 <div class="list-content-wrap flex flex-col flex-1 min-h-0 overflow-hidden">
//                     <div class="list-content box-border w-full flex-1 mb-2 overflow-y-auto wrap-break-word">
//                         ${contentValue}
//                     </div>
//                     <div class="list-buttons box-border w-full flex gap-2 shrink-0">
//                             <button
//                                 type="button" class="button-content-edit edit-btn rounded-lg box-border h-8 flex flex-1 justify-center items-center cursor-pointer">수정</button>
//                             <button
//                                 type="button" class="button-content-delete delete-btn rounded-lg box-border h-8 flex flex-1 justify-center items-center cursor-pointer"
//                                 id="removeBtn">삭제</button>
//                     </div>
//                 </div>
//             </div>
//         `;

//         todoList.insertAdjacentHTML("beforeend", htmlTemplate);

//         const newlyAddedItem = todoList.lastElementChild;
        
//         const editBtn = newlyAddedItem.querySelector(".edit-btn");
//         const deleteBtn = newlyAddedItem.querySelector(".delete-btn");

//         editBtn.addEventListener("click", function () {
//             todoForm.todoDate.value = newlyAddedItem.getAttribute("data-date");
//             todoForm.todoTitle.value = newlyAddedItem.getAttribute("data-title");
//             todoForm.todoContent.value = newlyAddedItem.getAttribute("data-content");
//             newlyAddedItem.remove(); // 기존 요소 지우고 폼으로 데이터 넘김
//         });

//         deleteBtn.addEventListener("click", function () {
//             newlyAddedItem.remove();
//         });

//         todoForm.todoTitle.value = "";
//         todoForm.todoContent.value = "";
//     });
// });