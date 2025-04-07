import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let pool;

export async function connect() {
  try {
    let cString =
      "mysql://" +
      process.env.MYSQL_USER +
      ":" +
      process.env.MYSQL_PASSWORD +
      "@" +
      process.env.MYSQL_HOST +
      ":" +
      process.env.MYSQL_PORT +
      "/" +
      process.env.MYSQL_DATABASE;

    console.log("Connecting to the database...");
    pool = mysql
      .createPool(
        cString // DigitalOcean SQL server connection string
        // Uncomment the following if the connection string doesn't work:
        // {
        //   host: process.env.MYSQL_HOST,
        //   user: process.env.MYSQL_USER,
        //   password: process.env.MYSQL_PASSWORD,
        //   database: process.env.MYSQL_DATABASE,
        // }
      )
      .promise();
    console.log("Database connection established successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

export async function getAllProjects() {
  try {
    if (!pool) {
      throw new Error("Database connection pool is not initialized. Call connect() first.");
    }
    console.log("Fetching all projects from the database...");
    const [rows] = await pool.query(`SELECT * FROM projects;`);
    console.log("Projects fetched successfully:", rows);
    return rows;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err;
  }
}
