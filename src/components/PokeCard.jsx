export default function PokeCard({ info }) {
  return (
    <div className="mx-auto mt-20 max-w-full w-[20.625rem] p-4  border-2 rounded-lg">
      <div className="flex justify-between w-full">
        <span className="font-bold capitalize">{info.name}</span>
        <span className="font-bold">
          {info.hp} <span className="text-xs">HP</span>
        </span>
      </div>
      <div className="h-[12.5rem] mt-4">
        <img key={info.id} className="h-full mx-auto" src={info.image} alt="" />
      </div>
      <div className="text-xs text-center px-4 font-bold capitalize h-[2rem]">
        #{info.id} {info.type} Pokemon. Height: {info.height}, Weight:{" "}
        {info.weight}
      </div>
      <p className="desc text-xs">
        <span className="font-bold text-sm capitalize">
          {info.ability_name}
        </span>{" "}
        {info.ability_desc}
      </p>
      <hr />
      <div className="flex items-center ">
        <p className="desc text-xs grow pr-4">
          <span className="font-bold text-sm capitalize">{info.move_name}</span>{" "}
          {info.move_desc}
        </p>
        <span className="font-bold">{info.move_power}</span>
      </div>
      <hr />
      <div className="flex text-center justify-between text-xs">
        <div>
          weakness{" "}
          <div>
            <span>{info.double_damage} x 2</span>
          </div>
        </div>
        <div>
          resistance{" "}
          <div>
            <span>{info.resistance}</span>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-xs text-center h-[3rem]">{info.species_desc}</p>
    </div>
  );
}
