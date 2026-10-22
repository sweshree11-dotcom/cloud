const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(express.static("."));

const client = new MongoClient("YOUR_MONGODB_ATLAS_URI");

async function start() {
    await client.connect();
    const db = client.db("StudentDB").collection("students");

    console.log("MongoDB Connected!");

    app.post("/add", async (req, res) => {
        await db.insertOne(req.body);
        res.send("Added Successfully");
    });

    app.get("/view", async (req, res) => {
        res.json(await db.find().toArray());
    });

    app.put("/update/:id", async (req, res) => {
        await db.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.send("Updated Successfully");
    });

    app.delete("/delete/:id", async (req, res) => {
        await db.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.send("Deleted Successfully");
    });

    app.listen(5000, () =>
        console.log("App running at http://localhost:5000")
    );
}

start().catch(console.error);



npm install express mongodb
node server.js