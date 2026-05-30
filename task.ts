import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const TASKS_FILE = resolve("tasks.json");

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
}

export interface TasksData {
  tasks: Task[];
}

export function loadTasks(): TasksData {
  try {
    const data = readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { tasks: [] };
  }
}

export function saveTasks(data: TasksData): void {
  writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2));
}

export function handleAdd(args: string[]): void {
  if (args.length === 0) {
    console.error("Usage: add <title>");
    process.exit(1);
  }

  const title = args.join(" ");
  const data = loadTasks();

  const nextId = data.tasks.length > 0
    ? (Math.max(...data.tasks.map(t => parseInt(t.id, 10))) + 1).toString()
    : "1";

  const newTask: Task = {
    id: nextId,
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };

  data.tasks.push(newTask);
  saveTasks(data);

  console.log(`✓ Task added: "${title}" (id: ${nextId})`);
}

export function handleList(): void {
  const data = loadTasks();

  if (data.tasks.length === 0) {
    console.log("No tasks yet. Use add to create one.");
    return;
  }

  const rows = data.tasks.map(task => ({
    id: task.id,
    title: task.title,
    status: task.done ? "done" : "pending",
  }));

  const idWidth = Math.max(2, Math.max(...rows.map(r => r.id.length)));
  const titleWidth = Math.max(5, Math.max(...rows.map(r => r.title.length)));
  const statusWidth = 7;

  const pad = (str: string, width: number, align: "left" | "right" = "left") => {
    if (align === "left") {
      return str.padEnd(width);
    }
    return str.padStart(width);
  };

  console.log(
    pad("ID", idWidth) +
    "  " +
    pad("Title", titleWidth) +
    "  " +
    pad("Status", statusWidth)
  );
  console.log(
    "─".repeat(idWidth) +
    "  " +
    "─".repeat(titleWidth) +
    "  " +
    "─".repeat(statusWidth)
  );

  rows.forEach(row => {
    console.log(
      pad(row.id, idWidth) +
      "  " +
      pad(row.title, titleWidth) +
      "  " +
      pad(row.status, statusWidth)
    );
  });
}

export function handleComplete(args: string[]): void {
  if (args.length === 0) {
    console.error("Usage: complete <id>");
    process.exit(1);
  }

  const taskId = args[0];
  const data = loadTasks();

  const task = data.tasks.find(t => t.id === taskId);
  if (!task) {
    console.error(`Error: Task with ID "${taskId}" not found`);
    console.error("Use 'npm start list' to see available tasks");
    process.exit(1);
  }

  task.done = true;
  saveTasks(data);

  console.log(`✓ Task completed: "${task.title}"`);
}

export function handleDelete(args: string[]): void {
  if (args.length === 0) {
    console.error("Usage: delete <id>");
    process.exit(1);
  }

  const taskId = args[0];
  const data = loadTasks();

  const taskIndex = data.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    console.error(`Error: Task with ID "${taskId}" not found`);
    console.error("Use 'npm start list' to see available tasks");
    process.exit(1);
  }

  const deletedTask = data.tasks.splice(taskIndex, 1)[0];
  saveTasks(data);

  console.log(`✓ Task deleted: "${deletedTask.title}"`);
}

