import { memo } from "react";
import { FLIP_DOWN, FLIP_UP, BLOCK } from "../constants";

interface CardProps {
  face: string;
  onClick: () => void;
  status: number;
}

export const Card = memo(({ face, onClick, status }: CardProps) => {
  const cardClassName = () => {
    switch (status) {
      case FLIP_DOWN:
        return "card";
      case FLIP_UP:
        return "card-select";
      case BLOCK:
        return "card-block";
    }
  };

  const classCard = cardClassName();

  return (
    <div className={classCard} onClick={onClick}>
      {status > 1 && <img src={face} alt={face} />}
    </div>
  );
});
