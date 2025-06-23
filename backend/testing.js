const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("testDB");
        const result = await db.collection("testCol").insertOne({ name: "Alice" });
        console.log("Inserted:", result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
