const request = require('request-promise')

const getDogsFromApi = async function (dogsNumber) {
  let dogs = []

  const getDog = async function () {
    await request.get(
      'https://dog.ceo/api/breeds/image/random',
      async function (err, response, body) {
        if (!err && response.statusCode == 200) {
          const data = JSON.parse(body).message
          dogs.push({
            img: data,
            title: data.split('/').pop().split('.')[0],
            breed: data.split('/')[data.split('/').length - 2],
          })
        } else {
          console.log('Dog-api error')
        }
      }
    )
    if (dogs.length < dogsNumber) {
      return getDog()
    } else {
      console.log('Dogs loaded from api')
      return dogs
    }
  }

  return await getDog()
}

module.exports = getDogsFromApi
