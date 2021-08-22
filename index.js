const express = require('express')
const MongoClient = require('mongodb').MongoClient
const getDogsFromApi = require('./db/dog-api')
const bodyParser = require('body-parser')
const putDogsIntoDB = require('./db/put')
const getDogsFromDB = require('./db/get')

const app = express()

const PORT = process.env.PORT || 3200
const DOGS_NUMBER = 100

app.use(bodyParser.urlencoded({ extended: true }))

const urlDB =
  'mongodb+srv://admin:admin@cluster0.azcya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(urlDB, async (err, database) => {
  if (err) return console.log('DB connection error')
  console.log('DB connected')

  const dbCollections = database.db('Cluster0')

  const breedsCollection = dbCollections.collection('breeds')
  if ((await breedsCollection.find().toArray()).length > 0) {
    breedsCollection.drop()
    console.log('Breeds collection was cleared')
  }

  const dogsCollection = dbCollections.collection('dogs')
  if ((await dogsCollection.find().toArray()).length > 0) {
    dogsCollection.drop()
    console.log('Dogs collection was cleared')
  }

  const dogs = await getDogsFromApi(DOGS_NUMBER)
  await putDogsIntoDB(dogs, breedsCollection, dogsCollection)

  app.get('/', async (req, res) => {
    const data = await getDogsFromDB(breedsCollection, dogsCollection)
    res.send(JSON.stringify(data))
  })

  app.listen(PORT, () => {
    console.log('Server has been started. Port: ' + PORT)
  })
})
