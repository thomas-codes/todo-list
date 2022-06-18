import { TaskStatus } from "../utils/enums";
import { Task } from "./Task";
import { TaskInfo } from "./TaskInfo";

@nearBindgen
export class TaskManager{
 task  : Task[] =[];

addTask(title: String): TaskInfo{
    const task =new Task(title);
   const id= this.task.push(task);
   return new TaskInfo(task,id);
 }

showTask(taskId : i32): TaskInfo  | null{
    if (taskId >= this.task.length) return null;
    const task = this.task [taskId];
    return new TaskInfo(task,taskId);
}
showAllTask()  : Task[] {
    return this.task;
}
startTask(taskId : i32): bool {
    if (taskId >= this.task.length) return false;
    this.task[taskId].status=TaskStatus.ACTIVE;
    return true;
}

completeTask(taskId : i32): bool {
    if (taskId >= this.task.length) return false;
    this.task[taskId].status=TaskStatus.COMPLETED;
    return true;
}

removeTask(taskId : i32) : TaskInfo | null {
    if (taskId >= this.task.length) return null;
    const tmpTasks: Task[]=[];
    let removedTask: Task | null =null;
    for(let i=0;i<this.task.length;i++){
        if (taskId !==i){
            tmpTasks.push(task);
        }
    }
    this.task =tmpTasks;
    return removedTask;
}
}