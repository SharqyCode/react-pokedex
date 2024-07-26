import PokeCard from "./components/PokeCard";
import Pagination from "./components/Pagination";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [info, setInfo] = useState({});
  const [pokeList, setPokeList] = useState([]);
  const [idIndex, setIdIndex] = useState({});
  const [nameIndex, setNameIndex] = useState({});
  const MAX_NUM = pokeList.length;

  // console.log(pokeList);
  // console.log(MAX_NUM);
  // console.log(nameIndex);
  // console.log(idIndex);
  // console.log(offsetRef);

  async function getList() {
    let res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0`
    );
    let resJSON = await res.json();
    // console.log(resJSON);
    setPokeList(
      resJSON.results.slice().map((item) => {
        return item.name;
      })
    );

    let nameIndexDict = {};
    let IdIndexDict = {};
    resJSON.results.map((item, index) => {
      nameIndexDict[item.name] = index;
      let id = item.url.split("/")[6];
      IdIndexDict[id] = index;
    });

    setNameIndex(nameIndexDict);
    setIdIndex(IdIndexDict);
  }

  useEffect(() => {
    // getData(offsetRef.current, true);
    getList();
    // getData(0, true);
  }, []);

  function handleClick(direction) {
    if (direction == "next" && offsetRef.current < MAX_NUM) {
      // offsetRef.current = offsetRef.current + 1;
      // getData(offsetRef.current, true);
    } else if (direction == "prev" && offsetRef.current > 0) {
      // offsetRef.current = offsetRef.current - 1;
      // getData(offsetRef.current, true);
    }
  }

  function handleSubmit(text) {
    // TODO: Fetch data using pokemon name
    // getData(text, false);
  }

  // async function getData(query, offsetBool) {
  //   try {
  //     let pokemon;
  //     if (offsetBool) {
  //       let response = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${query}`
  //       );

  //       let json = await response.json();
  //       pokemon = await fetch(json.results[0].url);
  //     } else {
  //       pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  //     }
  //     let pokemonJSON = await pokemon.json();
  //     // console.log(pokemonJSON);

  //     let ability = await fetch(pokemonJSON.abilities[0].ability.url);
  //     let abilityJSON = await ability.json();
  //     // console.log(abilityJSON);

  //     let myAbility = abilityJSON["effect_entries"].filter(
  //       (entry) => entry.language.name === "en"
  //     )[0];

  //     let move = await fetch(pokemonJSON.moves[0].move.url);
  //     let moveJSON = await move.json();
  //     // console.log(moveJSON);

  //     let myMove = moveJSON["effect_entries"].filter(
  //       (entry) => entry.language.name === "en"
  //     )[0];

  //     let species = await fetch(pokemonJSON.species.url);
  //     let speciesJSON = await species.json();
  //     // console.log(speciesJSON);

  //     let mySpecies = speciesJSON["flavor_text_entries"].filter(
  //       (entry) => entry.language.name === "en"
  //     )[0];

  //     let species_desc = mySpecies.flavor_text.replace(/\f/g, " ");

  //     let color = speciesJSON.color.name;

  //     let type = await fetch(pokemonJSON.types[0].type.url);
  //     let typeJSON = await type.json();
  //     // console.log(typeJSON);
  //     let double_damage = typeJSON.damage_relations.double_damage_from[0];
  //     double_damage = double_damage === undefined ? "" : double_damage.name;

  //     let resistance = typeJSON.damage_relations.half_damage_from[0];
  //     resistance = resistance === undefined ? "" : resistance.name;

  //     setInfo({
  //       id: pokemonJSON.id,
  //       name: pokemonJSON.name,
  //       hp: pokemonJSON.stats[0].base_stat,
  //       image: pokemonJSON.sprites.front_default,
  //       type: pokemonJSON.types[0].type.name,
  //       height: pokemonJSON.height,
  //       weight: pokemonJSON.weight,
  //       ability_name: pokemonJSON.abilities[0].ability.name,
  //       ability_desc: myAbility.effect,
  //       move_name: pokemonJSON.moves[0].move.name,
  //       move_desc: myMove.effect,
  //       move_power: moveJSON.power,
  //       species_desc: species_desc,
  //       color: color,
  //       double_damage: double_damage,
  //       resistance: resistance,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <Pagination handleClick={handleClick}>
        <PokeCard info={info} />
      </Pagination>
    </>
  );
}

export default App;
