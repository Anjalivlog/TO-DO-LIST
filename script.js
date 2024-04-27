// Function to add an item to the todo list
function addItem() {
    var itemName = document.getElementById('itemName').value;
    var itemDate = document.getElementById('itemDate').value;
    var priority = document.getElementById('priority').value;
    
    if (itemName === '' || itemDate === '') {
        alert('Please fill in all fields');
        return;
    }
    
    var newItem = {
        name: itemName,
        date: itemDate,
        priority: priority,
        completed: false
    };
    
    // Get existing items from local storage
    var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    
    // Add the new item to the todo list
    todoList.push(newItem);
    
    // Update local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // Refresh the task lists
    refreshTaskLists();
}

// Function to delete an item from the todo list
function deleteItem(index) {
    var todoList = JSON.parse(localStorage.getItem('todoList'));
    
    // Remove the item at the given index
    todoList.splice(index, 1);
    
    // Update local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
    
    // Refresh the task lists
    refreshTaskLists();
}

// Function to mark an item as completed or not completed
function toggleCompleted(index) {
    var todoList = JSON.parse(localStorage.getItem('todoList'));
    
    // Toggle the completed status of the item at the given index
    todoList[index].completed = !todoList[index].completed;
    
    // Update local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
    
    // Refresh the task lists
    refreshTaskLists();
}

// Function to refresh the task lists
function refreshTaskLists() {
    var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    var todayTasks = document.getElementById('todayTasks');
    var futureTasks = document.getElementById('futureTasks');
    var completedTasks = document.getElementById('completedTasks');
    
    // Clear the task lists
    todayTasks.innerHTML = '';
    futureTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    
    // Loop through the todo list and populate the task lists
    todoList.forEach(function(item, index) {
        var task = document.createElement('div');
        task.classList.add('task');
        if (item.completed) {
            task.classList.add('completed');
        }
        task.innerHTML = `
            <span>${index + 1}. ${item.name}</span>
            <span>${item.date}</span>
            <span>$Priority:${item.priority}</span>
            <div>
                <button onclick="deleteItem(${index})">&#10006;</button>
                <button onclick="toggleCompleted(${index})">&#10003;</button>
            </div>
        `;
        if (item.date === getCurrentDate()) {
            todayTasks.appendChild(task);
        } else if (new Date(item.date) < new Date() && !item.completed) {
            task.style.border = '2px solid red';
            // task.classList.add('task1');
            futureTasks.appendChild(task);
        } else if (item.completed) {
            completedTasks.appendChild(task);
        } else {
            futureTasks.appendChild(task);
        }
    });
}

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

// Initialize the todo list
refreshTaskLists();
