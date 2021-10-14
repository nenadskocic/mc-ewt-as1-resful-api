"StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

// GET the entire COLLECTION
app.get("/api", async function(req, res)
{
  // Get the data to be sent back 
  const data = await db.all("SELECT rowid as id, * FROM Movies");
  // Send back table data as JSON data
  res.send(data);
});

// REMOVES previous collection and INSERTS new items into the COLLECTION
app.put("/api", async function(req, res) {
  await db.all("DELETE FROM Movies");
  const title = req.body.title;
  const release_year = req.body.release_year;
  const stmt = await db.prepare("INSERT INTO Movies VALUES (?,?, DateTime('now'))");
  stmt.run(title, release_year);
  stmt.finalize();
  res.send(stmt);
  console.log('REPLACE COLLECTION SUCCESSFUL');
  
});

//INSERTS new items into the COLLECTION
app.post("/api", async function(req, res) {
  const title = req.body.title;
  const release_year = req.body.release_year;
  const stmt = await db.prepare("INSERT INTO Movies VALUES (?,?, DateTime('now'))");
  stmt.run(title, release_year);
  stmt.finalize();
  res.send(stmt);
  console.log('CREATE ENTRY SUCCESSFUL');

});

//DELETES the entire COLLECTION
app.delete("/api", async function(req, res) {
  const data = await db.all("DELETE FROM Movies");
  res.send(data);
  console.log("DELETE COLLECTION SUCCESSFUL");
});

//RETURNS an item in the COLLECTION based on requested ID
app.get("/api/:id", async function(req, res)
{
  const rowid = req.params.id;
  const stmt = "SELECT * FROM Movies WHERE rowid=?";
  const data = await db.all(stmt, [rowid]);
  res.send(data);
  console.log('RETRIEVED ITEM');
});

//UPDATES an item in the COLLECTION based on requested ID
app.put("/api/:id", async function(req, res)
{
  const rowid = req.params.id;
  const title = req.body.title;
  const release_year = req.body.release_year;
  const stmt = await db.prepare("UPDATE Movies SET title=?, release_year=? WHERE rowid=?");
  stmt.run(title, release_year, rowid);
  stmt.finalize();
  res.send(stmt);
  console.log('UPDATE ITEM SUCCESSFUL');
});

//DELETES an item in the COLLECTION based on requested ID
app.delete("/api/:id", async function(req, res)
{
  const rowid = req.params.id;
  const stmt = await db.prepare("DELETE FROM Movies WHERE rowid=?");
  stmt.run(rowid);
  stmt.finalize();
  res.send(stmt);  
  console.log("DELETE ITEM SUCCESSFUL");
});

// Creates the database and table of data to be managed, then starts the server
async function startup()
{
  // Create the database connection
  db = await sqlite.open({
    filename: 'api.db',
    driver: sqlite3.Database
  });

  // Create 
  await db.run("DROP TABLE IF EXISTS Movies");
  await db.run("CREATE TABLE Movies (title TEXT, release_year INTEGER, timestamp REAL)");

  // Start the server
  const server = app.listen(3000, function(){
    console.log("RESTful API listening on port 3000!")
  });
}

// Calls DB creation function first
startup();
