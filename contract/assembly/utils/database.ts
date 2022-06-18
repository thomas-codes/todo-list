import { PersistentMap } from "near-sdk-as";

export const MYTASKS = new PersistentMap<String.TaskManager>("t"); 