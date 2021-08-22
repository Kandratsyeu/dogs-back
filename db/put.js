const putDogsIntoDB = async function (dogs, breedsCollection, dogsCollection) {
  const breeds = [...new Set(dogs.map((dog) => ({ title: dog.breed })))]

  await breedsCollection.insertMany(breeds)
  console.log('Breeds written to DB')

  dogs.forEach((dog) => {
    dog.breedId = breeds.find((breed) => dog.breed === breed.title)._id
    delete dog.breed
  })

  await dogsCollection.insertMany(dogs)
  console.log('Dogs written to DB')
}

module.exports = putDogsIntoDB
