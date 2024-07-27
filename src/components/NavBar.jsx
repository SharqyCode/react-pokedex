import SearchBar from "./SearchBar";
import logo from "../../public/Pokemon.svg"

export default function NavBar({ handleSubmit, handleGoHome, pokeList }) {
  return (
    <nav className="bg-red-500 p-2 grid grid-cols-3">
      <img
        width={80}
        src={logo}
        alt=""
        className="cursor-pointer"
        onClick={handleGoHome}
      />
      <SearchBar pokeList={pokeList} handleSubmit={handleSubmit} />
    </nav>
  );
}
