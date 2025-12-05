import { memo } from "react";
import { FLIP_DOWN, FLIP_UP, BLOCK } from "../constants";

interface CardProps {
  face: string;
  onClick: (index: number) => void;
  status: number;
  index: number;
}

const cardClassName = (status: number) => {
  const base = "p-3 lg:p-6 m-1 lg:m-3 h-[calc(100vh/4)] max-h-[100px] xl:max-h-[160px] w-[10%] min-w-[70px] rounded-[10px] border-[3px] border-[#222222] flex justify-center items-center";
  switch (status) {
    case FLIP_DOWN:
      return `${base} bg-[#434343] hover:bg-[#222222] hover:border-[#f3efe0]`;
    case FLIP_UP:
      return `${base} border-[#22a39f] bg-[#f3efe0]`;
    case BLOCK:
      return `${base} bg-gradient-to-br from-[#222222] to-[#22a39f] border-transparent`;
    default:
      return base;
  }
};

export const Card = memo(({ face, onClick, status, index }: CardProps) => {

  const classCard = cardClassName(status);

  return (
    <div className={classCard} onClick={() => onClick(index)}>
      {status > 1 && (
        <img
          src={face}
          alt={face}
          className={`
            ${status === BLOCK ? " invert transition duration-200" : ""}`}
        />
      )}
    </div>
  );
});