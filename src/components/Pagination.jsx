export default function Pagination({ children, handleClick }) {
  return (
    <div className="flex mx-auto justify-center gap-8 mt-8">
      <button
        onClick={() => {
          handleClick("prev");
        }}
        className="border-4 border-black rounded-lg px-4 py-1"
      >
        Prev
      </button>
      <button
        onClick={() => {
          handleClick("next");
        }}
        className="border-4 border-black rounded-lg px-4 py-1"
      >
        Next
      </button>
    </div>
  );
}
