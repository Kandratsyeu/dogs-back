const getDogsFromDB = async function (breedsCollection, dogsCollection) {
  const dogs = await dogsCollection.find().toArray()
  const breeds = await breedsCollection.find().toArray()
  return dogs.map((dog) => ({
    img: dog.img,
    title: dog.title,
    breed: breeds.find((el) => el._id.toString() == dog.breedId).title,
  }))
}

const getDogsFromDBForBreed = async function (
  breed,
  breedsCollection,
  dogsCollection
) {
  const breedId = await breedsCollection
    .findOne({ title: breed })
    .then((res) => {
      return res
    })
  if (breedId) {
    return dogsCollection.find({ breedId: breedId._id.toString() }).toArray()
  }
}

module.exports = {
  getDogsFromDB: getDogsFromDB,
  getDogsFromDBForBreed: getDogsFromDBForBreed,
}
