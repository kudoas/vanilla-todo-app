import { createConnection } from "typeorm";

export const connectDatabase = async () => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "password",
      database: "app_db",
    });
    connection.connect();
  } catch (err) {
    console.log(err);
  }
};
