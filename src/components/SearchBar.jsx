import { useState } from "react";

export default function SearchBar({ handleSubmit }) {
  const [text, setText] = useState("");
  return (
    <form className="flex justify-center">
      <label htmlFor="search">Pokemon Search: </label>
      <input
        id="search"
        placeholder="Enter Pokemon Name..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(text);
        }}
        type="submit"
      >
        🔍
      </button>
    </form>
  );
}
