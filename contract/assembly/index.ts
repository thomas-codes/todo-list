//export function helloWorld ():String  {
// return "Helloworld!";
//}
import { Context } from "near-sdk-as";
//import { allowedNodeEnvironmentFlags } from "process";
import { TaskInfo } from "./Models/TaskInfo";
import { TaskManager } from "./Models/TaskManager";
import { MYTASKS } from "./utils/database";
 
@nearBindgen 
export class Contract {
  newTask(title:String):void{
    const signer = Context.sender;
    if(MYTASKS.contains(signer)){
const taskManager = MYTASKS.getSome(signer);
const createdTask = taskManager.addTask(title);
MYTASKS.set(signer ,taskManager);
return createdTask;
    }
    const taskManager =new TaskManager();
    const createdTask = taskManager.addTask(title);
    MYTASKS.set(signer ,taskManager);
    return createdTask;
  }
  showTask(taskId: i32): TaskInfo | null{
    const signer =Context.sender;
    if (MYTASKS.contains(signer)){
      const taskManager=MYTASKS.getSome(signer);
      return taskManager.getTask(taskId);
    }
    return null;
  }
  showAllTask(): TaskInfo | null{
    const signer =Context.sender;
    if (MYTASKS.contains(signer)){
      const taskManager=MYTASKS.getSome(signer);
      return taskManager.getAllTask();
    }
    return null;
  }
  startTask(taskId: i32): TaskInfo | bool{
    const signer =Context.sender;
    if (MYTASKS.contains(signer)){
      const taskManager=MYTASKS.getSome(signer);
      const isStarted=taskManager.getTask(taskId);
      MYTASKS.set(signer,taskManager);
      return isStarted;
    }
    return false;
  } 
  completeTask(taskId: i32): TaskInfo | null{
    const signer =Context.sender;
    if (MYTASKS.contains(signer)){
      const taskManager=MYTASKS.getSome(signer);
      const isCompleted=taskManager.completeTask(taskId);
      MYTASKS.set(signer,taskManager);
      return isCompleted;
    }
    return null;
}
removeTask(taskId: i32): TaskInfo | null {
  const signer =Context.sender;
  if (MYTASKS.contains(signer)){
    const taskManager=MYTASKS.getSome(signer);
    const task=taskManager.removeTask(taskId);
    MYTASKS.set(signer,taskManager);
    return task ;
  }
  return null;
}
}