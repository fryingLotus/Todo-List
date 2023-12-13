
import { format } from 'date-fns';
import { saveProject } from './DOM';
const currentDate = new Date();

const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

export default class Task {
    constructor(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
     
    }
}
    
export class TaskProject {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getHighPriorityTasks() {
        return this.tasks.filter(task => task.priority === 'High');
        
    }

    getTodayDate() {
        return this.tasks.filter(task => task.dueDate === formattedCurrentDate);
    }

    toPlainObject() {
        return {
            name: this.name,
            tasks: this.tasks
        };
    }

   // Creates a new TaskProject from a plain object

static fromPlainObject(obj) {
    const project = new TaskProject(obj.name);
    project.tasks = obj.tasks.map(taskObj => new Task(taskObj.title, taskObj.dueDate, taskObj.priority));
    return project;
}
}

export class AddTaskItem
{
   constructor(project)
   {
    this.taskList = project;
    
   }
   addTask(title, dueDate, priority) {
    let taskItem = new Task(title, dueDate, priority);
    this.taskList.tasks.push(taskItem);
  }
}

export class RemoveTaskItem
{
    constructor(project)
    {
     this.taskList = project;
    }

    RemoveTask(index)
    {
        this.taskList.tasks.splice(index, 1);
    }
}




// if (filterType == "priority")
// {
//       taskToDisplay = currentProject.getHighPriorityTasks();
// } else if (filterType == "today")
// {
//     taskToDisplay = currentProject.getTodayDate();
// } else if (filterType == "none")
// {
//   taskToDisplay = currentProject.tasks;
// }