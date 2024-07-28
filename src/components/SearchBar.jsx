import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ handleSubmit, pokeList }) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  // let className =
  return (
    <form className="relative flex justify-center items-center">
      {!focused && (
        <label htmlFor="search" className="text-white font-bold mr-2">
          PokeSearch:{" "}
        </label>
      )}
      <input
        className="px-2 py-1 rounded-md grow focus:outline-0"
        id="search"
        placeholder="Enter Pokemon Name..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value !== "") {
            setFocused(true);
          } else {
            setFocused(false);
          }
        }}
      ></input>
      <button
        className="absolute left-full"
        onClick={(e) => {
          e.preventDefault();
          if (text !== "") {
            handleSubmit(text);
          }
        }}
        type="submit"
      >
        <Search color="#ffffff" strokeWidth={2.5} className="ml-2" />
      </button>
      {focused && (
        <ul className="absolute left-0 top-[calc(100%-8px)] pt-2 bg-white w-full max-h-80 overflow-y-scroll">
          {pokeList.map((pokemon) => {
            if (pokemon.includes(text))
              return (
                <li
                  key={pokemon}
                  onClick={() => {
                    handleSubmit(pokemon);
                    setText(pokemon);
                    setFocused(false);
                  }}
                  className="cursor-pointer px-2 hover:bg-gray-300"
                >
                  {pokemon}
                </li>
              );
          })}
        </ul>
      )}
    </form>
  );
}
