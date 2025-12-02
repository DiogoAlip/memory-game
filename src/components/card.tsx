import { memo } from "react";
import { FLIP_DOWN, FLIP_UP, BLOCK } from "../constants";

interface CardProps {
  face: string;
  onClick: () => void;
  status: number;
}

export const Card = memo(({ face, onClick, status }: CardProps) => {
  const cardClassName = () => {
    const base = "p-6 m-3 h-[24vh] w-[10%] min-w-[100px] rounded-[10px] border-[3px] border-[#222222] flex justify-center items-center";
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

  const classCard = cardClassName();

  return (
    <div className={classCard} onClick={onClick}>
      {status > 1 && (
        <img
          src={face}
          alt={face}
          className={`
            ${status === FLIP_UP ? "mt-[15px]" : ""}
            ${status === BLOCK ? "mt-[15px] invert transition duration-200" : ""}
            max-[1090px]:w-[50px]
            max-[1010px]:w-[50px] max-[1010px]:mt-[10px]
            max-[700px]:ml-[-7px]
            max-[610px]:w-[40px]
            max-[480px]:w-[40px] max-[480px]:mt-[-5px] max-[480px]:ml-[-10px]
          `}
        />
      )}
    </div>
  );
});
