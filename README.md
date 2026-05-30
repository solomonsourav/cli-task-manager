# CLI Task Manager

A command-line task manager built with Node.js and TypeScript. Tasks are stored locally in a `tasks.json` file.

## Features

- Add tasks with auto-incremented IDs
- List all tasks in a formatted table
- Mark tasks as complete
- Delete tasks
- Input validation with helpful error messages

## Prerequisites

- [Node.js](https://nodejs.org) v18 or higher

## Installation

```bash
npm install
```

## Usage

```bash
# Add a task
npm run dev -- add "Buy groceries"

# List all tasks
npm run dev -- list

# Mark a task as complete
npm run dev -- complete 1

# Delete a task
npm run dev -- delete 2
```

## Example Output

```
ID  Title          Status
──  ─────────────  ───────
1   Buy groceries  done
2   Fix bug        pending
```

## Running Tests

```bash
npm test
```

## Project Structure

```
├── index.ts       # CLI entry point and command routing
├── task.ts        # Command handlers and task storage logic
├── test.ts        # Tests using Node's built-in test runner
├── tasks.json     # Local task storage (auto-created)
├── tsconfig.json  # TypeScript configuration
└── package.json   # Project metadata and scripts
```

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Storage:** JSON file
- **Testing:** Node.js built-in test runner (`node:test`)

## About

Built as a portfolio project to practice TypeScript, CLI design, and file-based storage.

## Author

[Sourav Solomon](https://github.com/solomonsourav)
