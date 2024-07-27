import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Pagination({ children, handleClick }) {
  let goPrev = useRef(null);
  let goNext = useRef(null);

  function keyDown(e) {
    if (e.key === "ArrowLeft") {
      goPrev.current.click();
    } else if (e.key === "ArrowRight") {
      goNext.current.click();
    }
  }

  return (
    <div onKeyDown={keyDown} className="flex justify-center gap-8">
      <button
        className="hover:text-yellow-500 duration-300 focus:outline-0"
        ref={goPrev}
        onClick={() => {
          handleClick("prev");
        }}
      >
        <CircleChevronLeft />
      </button>
      {children}
      <button
        className="hover:text-yellow-500 duration-300 focus:outline-0"
        ref={goNext}
        onClick={() => {
          handleClick("next");
        }}
      >
        <CircleChevronRight />
      </button>
    </div>
  );
}
