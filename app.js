const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();

app.use(express.json());

// API to fetch items from database
app.get("/items", (req, res) => {
  pool.query("SELECT * FROM items", (error, results) => {
    if (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

//Convenience API to populate the database with initial data for the assignment
app.get("/populatedb", (req, res) => {
  const createTableQuery = `
  CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2)
  );
`;

  const insertDataQuery = `
  INSERT INTO items (name, price)
  VALUES
    ('Item 1', 3.99),
    ('Item 2', 4.99),
    ('Item 3', 5.99),
    ('Item 4', 1.99),
    ('Item 5', 2.99),
    ('Item 6', 7.99),
    ('Item 7', 8.99),
    ('Item 8', 9.99),
    ('Item 9', 1.99),
    ('Item 10', 6.99)
`;
  pool.query(`${createTableQuery} ${insertDataQuery}`, (err, _) => {
    if (err) {
      res.status(500).json({ error: err.toString() });
    } else {
      res.status(200).json({ message: "Database populated successfully!" });
    }
  });
});

app.listen(80);
