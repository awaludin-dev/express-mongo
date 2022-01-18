const router = require('express').Router();
const { MongoClient, ObjectId } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Eduwork';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Database telah terkoneksi! (MongoDB)');
  const db = client.db(dbName);
  const collection = db.collection('products');

  router.get('/', async (req, res) => {
      try {
          const product = await collection.find().toArray();
          res.json(product)
          console.log('GET');
      } catch(err) {
          res.status(500).json({ message: err.message })
      }
    })

    router.get('/:id', async (req, res) => {
        try{
            const product = await collection.findOne({_id: ObjectId(req.params.id)})
            res.json(product)
            console.log('GET');
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    })

    router.post('/', async (req, res) => {
        try {
            const newProduct = await collection.insertOne(req.body);
            res.status(200).json({
                status: newProduct,
                data: req.body
            });
            console.log('POST');
        } catch(err) {
            res.status(400).json({ message: err.message })
        }
    })

    router.delete('/:id', async (req, res) => {
        try {
            await collection.findOneAndDelete({ _id: ObjectId(req.params.id) });
            res.json({ message: 'Product has been deleted!'});
            console.log('DELETE');
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    })

    router.patch('/:id', async (req, res) => {
        try {
            const updateProduct = await collection.findOneAndReplace({ _id: ObjectId(req.params.id)}, req.body);
            res.json({
                status: updateProduct,
                data: req.body
            });
            console.log('UPDATE');
        } catch(err) {
            res.status(400).json({ message: err.message })
        }
    })
}

main();

module.exports = router;