import { createConnection, Connection } from "typeorm";

const connection = createConnection({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "password",
  database: "app_db",
})
  .then((e) => console.log(e))
  .catch((e) => console.log(e));
