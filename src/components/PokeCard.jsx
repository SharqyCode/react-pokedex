export default function PokeCard({ info }) {
  function getIconSrc(name) {
    return "./src/assets/types/" + name + ".png";
  }
  return (
    <div className="mx-auto max-w-full w-[20.625rem] p-4 border-2 rounded-lg">
      <div className="flex justify-between w-full">
        <span className="font-bold capitalize flex items-center text-2xl">
          {" "}
          <img
            className="w-5 h-5 mr-2"
            src={getIconSrc(info.type)}
            alt={"type icon: " + info.type}
          />
          {info.name}
        </span>
        <span className="font-bold text-2xl">
          {info.hp} <span className="text-xs">HP</span>
        </span>
      </div>
      <div className="h-[12.5rem] mt-4 rounded-lg border">
        <img key={info.id} className="h-full mx-auto" src={info.image} alt="" />
      </div>
      <div className="text-xs flex justify-center items-center text-center px-4 font-bold capitalize h-[2rem] mt-1">
        #{info.id} {info.type} Pokemon. Height: {info.height}, Weight:{" "}
        {info.weight}
      </div>
      <p className="desc text-xs">
        <span className="font-bold text-sm capitalize">
          {info.ability_name}
        </span>{" "}
        {info.ability_desc}
      </p>
      <hr className="mt-1" />
      <div className="flex items-center ">
        <p className="desc text-xs grow pr-4">
          <span className="font-bold text-sm capitalize">{info.move_name}</span>{" "}
          {info.move_desc}
        </p>
        <span className="font-bold">{info.move_power}</span>
      </div>
      <hr className="mt-1" />
      <div className="flex text-center justify-between text-xs py-2">
        <div>
          weakness{" "}
          <span className="flex items-center justify-center mt-1">
            <img
              className="w-4 h-4 mr-1"
              src={getIconSrc(info.double_damage)}
              alt=""
            />
            {"  "}x 2
          </span>
        </div>
        <div>
          resistance{" "}
          <span className="flex items-center justify-center mt-1">
            <img
              className="w-4 h-4 mr-1"
              src={getIconSrc(info.resistance)}
              alt=""
            />
          </span>
        </div>
      </div>
      <hr />
      <p className="text-xs text-center h-[3rem] flex justify-center items-center">
        {info.species_desc}
      </p>
    </div>
  );
}
