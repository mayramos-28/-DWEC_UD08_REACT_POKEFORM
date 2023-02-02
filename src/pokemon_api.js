function CSVtoObjects(pokemonCSV) {
  const [fieldsLine, ...data] = pokemonCSV.split(/\r?\n/)
  const fields = fieldsLine.split(',')
  const wii =  data.map (item => {
    const result = {}
    const values = item.split(',')
    values.forEach((element, index) => {
      result[fields[index]] = element
    })
    
    return result
  })
  console.log(wii);
  return wii;
}

async function getPokemonData() {
  const ENDPOINT = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv'

  try {
    const response = await fetch(ENDPOINT)
    if(response.status !== 200) throw new Error(`'Error ${response.status}`)
    const data = await response.text()
    return CSVtoObjects(data)
  }catch(error) {
    return []
  }
}

async function getSpeciesSprite(species_id) {
  const ENDPOINT = `https://pokeapi.co/api/v2/pokemon-species/${species_id}/`

  async function getSprite(url) {
    const response = await fetch(url)
    if(response.status !== 200) throw new Error(`'Error ${response.status}`)
    const data = await response.json()
    return data.sprites.front_default
  }
  try {
    const response = await fetch(ENDPOINT)
    if(response.status !== 200) throw new Error(`'Error ${response.status}`)
    const data = await response.json()
    const pokemon = data.varieties.find(variety => variety.is_default).pokemon
    return getSprite(pokemon.url)
  }catch(error) {
    return ''
  }
}

export {
  getPokemonData,
  getSpeciesSprite
}

