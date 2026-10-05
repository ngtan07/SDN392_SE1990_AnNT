const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Create a single new document
        // await createDoc(client, "se1900_db", "products", {
        //     "ProductID": 1, "Name": "Laptop", "Price": 25000
        // });

        // insert documents
        // await createDocs(client, "se1900_db", "products", [
        //     { 'ProductID': 2, 'Name': 'TV', 'price': 40000 },
        //     { 'ProductID': 3, 'Name': 'Router', 'price': 2000 },
        //     { 'ProductID': 4, 'Name': 'Scanner', 'price': 5000 },
        //     { 'ProductID': 5, 'Name': 'Printer', 'price': 9000 }
        // ]);

        // get all
        await listAll(client, "se1900_db", "products");

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

async function createDoc(client, dbName, colName, doc) {
    const dbObj = await client.db(dbName);
    const col = dbObj.collection(colName);
    const result = await col.insertOne(doc);
    console.log(`New document created with the following id: ${result.insertedId}`);
}

async function createDocs(client, dbName, colName, docs) {
    const db = await client.db(dbName);
    const col = db.collection(colName);
    const result = await col.insertMany(docs);
    console.log(`${result.insertedCount} new document(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function listAll(client, dbName, colName) {
    const result = await client.db(dbName).collection(colName).find({}).toArray();
    console.log(JSON.stringify(result));
}

