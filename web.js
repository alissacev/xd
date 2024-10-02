class TaskListSingleton {
  constructor() {
    if (!TaskListSingleton.instance) {
      this.tasks = [];
      TaskListSingleton.instance = this;
    }
    return TaskListSingleton.instance;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter(task => task.name !== taskName);
  }

  completeTask(taskName) {
    const task = this.tasks.find(task => task.name === taskName);
    if (task) {
      task.complete();
    }
  }

  showTasks() {
    return this.tasks;
  }
}

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }

  showDetails() {
    return `${this.name} [${this.priority}] - ${this.completed ? 'Completed' : 'Pending'}`;
  }
}

class TaskFactory {
  static createTask(name, priority) {
    switch (priority) {
      case 'low':
        return new Task(name, 'Low Priority');
      case 'medium':
        return new Task(name, 'Medium Priority');
      case 'high':
        return new Task(name, 'High Priority');
      default:
        throw new Error('Unknown priority');
    }
  }
}

const taskList = new TaskListSingleton();

function addTask() {
  const taskName = document.getElementById('taskName').value;
  const taskPriority = document.getElementById('taskPriority').value;

  if (taskName) {
    const newTask = TaskFactory.createTask(taskName, taskPriority);
    taskList.addTask(newTask);
    displayTasks();
    document.getElementById('taskName').value = '';
  } else {
    alert('Please enter a task name');
  }
}

function displayTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  taskList.tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    
    if (task.priority === 'Low Priority') {
      taskCard.classList.add('low');
    } else if (task.priority === 'Medium Priority') {
      taskCard.classList.add('medium');
    } else if (task.priority === 'High Priority') {
      taskCard.classList.add('high');
    }

    const taskText = document.createElement('p');
    taskText.textContent = task.showDetails();
    taskCard.appendChild(taskText);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => {
      taskList.completeTask(task.name);
      displayTasks();
    };
    taskCard.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      taskList.removeTask(task.name);
      displayTasks();
    };
    taskCard.appendChild(deleteButton);

    taskContainer.appendChild(taskCard);
  });
}
