import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


router.get("/", async (req, res) => {
  let collection = await db.collection("events");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


router.get("/:id", async (req, res) => {
  let collection = await db.collection("events");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay
    };
    let collection = await db.collection("events");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding event");
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
      },
    };

    let collection = await db.collection("events");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating event");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("events");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting event");
  }
});

export default router;