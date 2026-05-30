import { test } from "node:test";
import * as assert from "node:assert";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { loadTasks, saveTasks, handleAdd, handleComplete, handleDelete } from "./task.js";

const TASKS_FILE = resolve("tasks.json");

function cleanupTasks(): void {
  try {
    unlinkSync(TASKS_FILE);
  } catch {
    // File doesn't exist, that's fine
  }
}

function getTasks() {
  const data = loadTasks();
  return data.tasks;
}

test("add command creates a new task", () => {
  cleanupTasks();

  handleAdd(["Buy groceries"]);

  const tasks = getTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, "Buy groceries");
  assert.strictEqual(tasks[0].done, false);
  assert.strictEqual(tasks[0].id, "1");
  assert.ok(tasks[0].createdAt);

  cleanupTasks();
});

test("add command with multiple word title", () => {
  cleanupTasks();

  handleAdd(["Complete", "the", "project", "report"]);

  const tasks = getTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, "Complete the project report");

  cleanupTasks();
});

test("add command auto-increments IDs", () => {
  cleanupTasks();

  handleAdd(["Task 1"]);
  handleAdd(["Task 2"]);
  handleAdd(["Task 3"]);

  const tasks = getTasks();
  assert.strictEqual(tasks.length, 3);
  assert.strictEqual(tasks[0].id, "1");
  assert.strictEqual(tasks[1].id, "2");
  assert.strictEqual(tasks[2].id, "3");

  cleanupTasks();
});

test("complete command sets done to true", () => {
  cleanupTasks();

  handleAdd(["Task to complete"]);
  handleComplete(["1"]);

  const tasks = getTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].done, true);

  cleanupTasks();
});

test("delete command removes a task", () => {
  cleanupTasks();

  handleAdd(["Task 1"]);
  handleAdd(["Task 2"]);
  handleAdd(["Task 3"]);

  assert.strictEqual(getTasks().length, 3);

  handleDelete(["2"]);

  const tasks = getTasks();
  assert.strictEqual(tasks.length, 2);
  assert.strictEqual(tasks[0].id, "1");
  assert.strictEqual(tasks[1].id, "3");

  cleanupTasks();
});

test("complete command errors on invalid ID", () => {
  cleanupTasks();

  handleAdd(["Task 1"]);

  assert.throws(
    () => {
      handleComplete(["999"]);
    },
    { code: 1 }
  );

  cleanupTasks();
});

test("delete command errors on invalid ID", () => {
  cleanupTasks();

  handleAdd(["Task 1"]);

  assert.throws(
    () => {
      handleDelete(["999"]);
    },
    { code: 1 }
  );

  cleanupTasks();
});
