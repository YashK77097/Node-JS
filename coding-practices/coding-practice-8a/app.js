/* First of all we have created a todo table in the todoApplication.db using CLI;*/
const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");
const app = express();
app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

const hasPriorityAndStatusProperties = (requestQuery) => {
  return (
    requestQuery.priority !== undefined && requestQuery.status !== undefined
  );
};

const hasPriorityProperty = (requestQuery) => {
  return requestQuery.priority !== undefined;
};

const hasStatusProperty = (requestQuery) => {
  return requestQuery.status !== undefined;
};
app.get("/todos/", async (request, response) => {
  let todosList = null;
  let getTodosListQuery = "";
  const { search_q = "", priority, status } = request.query;

  switch (true) {
    case hasPriorityAndStatusProperties(request.query):
      getTodosListQuery = `
        SELECT *
        FROM todo 
        WHERE todo LIKE '%${search_q}%' AND status = '${status}' AND priority = '${priority}';
      `;
      break;
    case hasPriorityProperty(request.query):
      getTodosListQuery = `
        select * from todo
        where todo LIKE '%${search_q}%' AND priority = '${priority}';
      `;
      break;
    case hasStatusProperty(request.query):
      getTodosListQuery = `
        SELECT * FROM todo 
        WHERE todo LIKE '%${search_q}%' AND status = '${status}';
      `;
      break;
    default:
      getTodosListQuery = `
        SELECT * FROM todo 
        WHERE todo LIKE '%${search_q}%';
      `;
  }
  todosList = await db.all(getTodosListQuery);
  response.send(todosList);
});

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;

  const getTodoByIdQuery = `
    SELECT * FROM todo
    WHERE id = ${todoId};
  `;
  const todo = await db.get(getTodoByIdQuery);
  response.send(todo);
});

app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status } = request.body;
  const postTodoQuery = `
    INSERT INTO
        todo (id, todo, priority, status)
    VALUES
        (${id}, '${todo}', '${priority}', '${status}');
  `;
  await db.run(postTodoQuery);
  response.send("Todo Successfully Added");
});

app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  let columnToBeUpdated = "";
  const requestBody = request.body;
  switch (true) {
    case requestBody.status !== undefined:
      columnToBeUpdated = "Status";
      break;
    case requestBody.priority !== undefined:
      columnToBeUpdated = "Priority";
      break;
    case requestBody.todo !== undefined:
      columnToBeUpdated = "Todo";
      break;
  }
  const previousTodoQuery = `
    SELECT * FROM todo
    WHERE id = ${todoId};
  `;
  const previousTodo = await db.get(previousTodoQuery);

  const {
    todo = previousTodo.todo,
    priority = previousTodo.priority,
    status = previousTodo.status,
  } = request.body;

  const updateTodoQuery = `
    UPDATE
      todo
    SET
      todo='${todo}',
      priority='${priority}',
      status='${status}'
    WHERE
      id = ${todoId};`;

  await db.run(updateTodoQuery);
  response.send(`${columnToBeUpdated} Updated`);
});

app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deleteTodoQuery = `
  DELETE FROM
    todo
  WHERE
    id = ${todoId};`;

  await db.run(deleteTodoQuery);
  response.send("Todo Deleted");
});

module.exports = app;
