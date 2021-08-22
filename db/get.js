const getDogsFromDB = async function (breedsCollection, dogsCollection) {
  const dogs = await dogsCollection.find().toArray()
  const breeds = await breedsCollection.find().toArray()
  return dogs.map((dog) => ({
    img: dog.img,
    title: dog.title,
    breed: breeds.find((el) => el._id.toString() == dog.breedId).title,
  }))
}

module.exports = getDogsFromDB
