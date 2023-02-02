import { useEffect, useState } from "react";
import PokeData from "./PokeData";
import { getPokemonData } from "./pokemon_api";


// function pokemonsInLanguage(pokemons, language) {
//   return pokemons.filter((pokemon) => pokemon.local_language_id === language);
// }

export default function PokeForm(props) {
 
   const [AllPokemons, setAllPokemos] = useState("");
   const [inputPokemon, setPokemon] = useState("");
   const [language, setLanguage] = useState("");
   const [pokemonFound, setPokemonFound] = useState("");

  const DEFAULT_LANGUAGE = language;

  useEffect(() => {
   
    async function load() {     
      setAllPokemos(await getPokemonData());          
    }
    load();
  }, []);

  function submitForm(event){
    event.preventDefault();
         const pokemon =  AllPokemons.find((pokemon) => {
          return   inputPokemon === pokemon.name && pokemon.local_language_id === DEFAULT_LANGUAGE
      });
      setPokemonFound(pokemon);      
  }

  const id = parseInt(pokemonFound.pokemon_species_id);

  return (
    <div>
      <h2>PokeForm</h2>
      <form onSubmit={e => submitForm(e)}>
        <label>
          Nombre del pokèmon:
          <input
            type="text"
            name="name"
            list="pokemons"
            value={inputPokemon}
            onChange={(e) => {
              setPokemon(e.target.value);
            }}
          />
        </label>
        <datalist>
        {JSON.stringify(AllPokemons)}

        </datalist>
        <label>
          Lenguaje
          <select value={language} onChange={(e)=> setLanguage(e.target.value)}>
            <option value="7">Español</option>
            <option value="5">Francés</option>
            <option value="6">Alemán</option>
          </select>
        </label>
        <input type="submit" value="Search" />
       
      </form>
      
   
    </div>
    
  );
}

// Bulbasaur
//Ivysaur
//Venusaur