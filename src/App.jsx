import PokeCard from "./components/PokeCard";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [info, setInfo] = useState({});
  const [pokeList, setPokeList] = useState([]);
  const [idIndex, setIdIndex] = useState({});
  const [nameIndex, setNameIndex] = useState({});
  const [error, setError] = useState(false);
  const MAX_NUM = pokeList.length;

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

  function handleGoHome() {
    setCurrentIndex(0);
    setError(false);

    getData(1);
  }

  useEffect(() => {
    getList();
    getData(1); // Can we make this more dynamic?
  }, []);

  function handleClick(direction) {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "next") {
        newIndex = (prevIndex + 1) % MAX_NUM;
      } else if (direction === "prev") {
        newIndex = (prevIndex - 1 + MAX_NUM) % MAX_NUM;
      }
      if (newIndex !== prevIndex) {
        getData(pokeList[newIndex]);
      }
      return newIndex;
    });
  }

  function handleSubmit(text) {
    const newIndex = isNaN(text) ? nameIndex[text] : idIndex[text];
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      getData(text);
    }
  }

  async function getData(query) {
    try {
      let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

      let pokemonJSON = await pokemon.json();

      const [ability, move, species, type] = await Promise.all([
        fetch(pokemonJSON.abilities[0].ability.url).then((res) => res.json()),
        fetch(pokemonJSON.moves[0].move.url).then((res) => res.json()),
        fetch(pokemonJSON.species.url).then((res) => res.json()),
        fetch(pokemonJSON.types[0].type.url).then((res) => res.json()),
      ]);

      let myAbility = ability["effect_entries"].find(
        (entry) => entry.language.name === "en"
      );
      myAbility = myAbility === undefined ? "N/A" : myAbility;

      let myMove = move["effect_entries"].find(
        (entry) => entry.language.name === "en"
      );
      myMove = myMove === undefined ? "N/A" : myMove;

      let mySpecies = species["flavor_text_entries"].find(
        (entry) => entry.language.name === "en"
      );
      mySpecies = mySpecies === undefined ? "N/A" : mySpecies;

      let species_desc = mySpecies.flavor_text.replace(/\f/g, " ");
      species_desc = species_desc === undefined ? "N/A" : species_desc;

      let color = species.color.name;
      color = color === undefined ? "N/A" : color;
      let double_damage = type.damage_relations.double_damage_from[0];
      double_damage = double_damage === undefined ? "N/A" : double_damage.name;

      let resistance = type.damage_relations.half_damage_from[0];
      resistance = resistance === undefined ? "N/A" : resistance.name;

      setInfo({
        id: pokemonJSON.id,
        name: pokemonJSON.name,
        hp: pokemonJSON.stats[0].base_stat,
        image: pokemonJSON.sprites.front_default,
        type: pokemonJSON.types[0].type.name,
        height: pokemonJSON.height,
        weight: pokemonJSON.weight,
        ability_name: pokemonJSON.abilities[0].ability.name,
        ability_desc: myAbility.effect,
        move_name: pokemonJSON.moves[pokemonJSON.moves.length - 1].move.name,
        move_desc: myMove.effect,
        move_power: move.power,
        species_desc: species_desc,
        color: color,
        double_damage: double_damage,
        resistance: resistance,
      });
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
  }

  return (
    <>
      <NavBar
        handleSubmit={handleSubmit}
        handleGoHome={handleGoHome}
        pokeList={pokeList}
      ></NavBar>
      {!error ? (
        <Pagination handleClick={handleClick}>
          <PokeCard info={info} />
        </Pagination>
      ) : (
        <h1 className="font-bold text-4xl text-center mt-64">Try Again :( </h1>
      )}
    </>
  );
}

export default App;
