const form = document.querySelector('form');
const input = document.querySelector('input');
const noteList = document.querySelector('ul');
let isEditedNow = false;


function renderTask(taskObject) {
    const taskItem = document.createElement('li');
    const taskItemContent = document.createElement('span');
    const taskItemBtnComplete = document.createElement('button');
    const taskItemBtnEdit = document.createElement('button');
    const taskItemBtnRemove = document.createElement('button');

    taskItem.classList.add('note-list__item');
    taskItemContent.classList.add('my_span');
    taskItemBtnComplete.classList.add('complete');
    taskItemBtnEdit.classList.add('edit');
    taskItemBtnRemove.classList.add('remove');

    taskItemBtnComplete.innerText = 'Complete';
    taskItemBtnEdit.innerText = 'Edit';
    taskItemBtnRemove.innerText = 'Remove';
    taskItemContent.innerText = taskObject.value;

    taskItem.appendChild(taskItemContent);
    taskItem.appendChild(taskItemBtnComplete);
    taskItem.appendChild(taskItemBtnEdit);
    taskItem.appendChild(taskItemBtnRemove);

    taskItem.setAttribute('data-id', taskObject.id);
    taskItemContent.setAttribute('id', taskObject.id);

    if (taskObject.completed) {
        taskItem.classList.add('note-list__item--completed');
    }

    return taskItem;
}

let taskList = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value.trim()) {
        const task = {
            value: input.value,
            completed: false,
            id: String(new Date()).slice('16', '24'),
        };

        taskList.unshift(task);
        noteList.prepend(renderTask(task));
    }

    input.value = '';
});

noteList.addEventListener('click', (e) => {

    const element = e.target;
    const targetClassName = element.className;
    let currentId;

    if (
        targetClassName === 'complete' ||
    targetClassName === 'remove' ||
    targetClassName === 'edit'
    ) {
        currentId = element.closest('li').getAttribute('data-id');


    }

    if (targetClassName === 'complete') {
        taskList.find((task) => task.id === currentId).completed = true;

        noteList.innerHTML = '';

        taskList.forEach((task) => {
            noteList.append(renderTask(task));
        });
    }

    if (!isEditedNow) {
        if (targetClassName === 'edit') {

            isEditedNow = true;
            const contentItem = document.getElementById(currentId);
            const currentItem = taskList.find((task) => task.id === currentId);

            const editOk = document.createElement('button');
            const editCancel = document.createElement('button');

            editOk.classList.add('edit-ok');
            editCancel.classList.add('edit-cancel');

            editOk.setAttribute('id', 'ok');
            editCancel.setAttribute('id','cancel');

            editOk.innerText = 'OK';
            editCancel.innerText = 'Cancel';

            noteList.appendChild(editOk);
            noteList.appendChild(editCancel);

            document.getElementById(currentId).contentEditable = true;
            contentItem.focus();

            const ok = document.getElementById('ok');
            const cancel = document.getElementById('cancel');

            ok.addEventListener('click', () => {
                noteList.removeChild(editOk);
                noteList.removeChild(editCancel);
                document.getElementById(currentId).contentEditable = false;
                contentItem.innerText = contentItem.textContent;
                currentItem.value = contentItem.innerText;
                isEditedNow = false;
            });


            cancel.addEventListener('click', () => {
                noteList.removeChild(editOk);
                noteList.removeChild(editCancel);
                document.getElementById(currentId).contentEditable = false;
                contentItem.innerText = currentItem.value;
                isEditedNow = false;
            });

        }else if (targetClassName === 'remove') {
            noteList.innerHTML = '';

            taskList = taskList.filter((task) => task.id !== currentId);

            taskList.forEach((task) => {
                noteList.append(renderTask(task));
            });
        }

    }
});
