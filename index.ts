import { handleAdd, handleList, handleComplete, handleDelete } from "./task.js";

type CommandHandler = (args: string[]) => void;

const handlers: Record<string, CommandHandler> = {
  add: handleAdd,
  list: handleList,
  complete: handleComplete,
  delete: handleDelete,
};

function printHelp(): void {
  console.log("Task Manager CLI");
  console.log("");
  console.log("Usage: npm start <command> [options]");
  console.log("");
  console.log("Commands:");
  console.log("  add <title>     Add a new task");
  console.log("  list            List all tasks");
  console.log("  complete <id>   Mark a task as done");
  console.log("  delete <id>     Delete a task");
  console.log("");
  console.log("Examples:");
  console.log('  npm start add "Buy groceries"');
  console.log("  npm start list");
  console.log("  npm start complete 1");
  console.log("  npm start delete 2");
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    return;
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  const handler = handlers[command];
  if (handler) {
    handler(commandArgs);
  } else {
    console.error(`Unknown command: "${command}"`);
    console.log("");
    printHelp();
    process.exit(1);
  }
}

main();
