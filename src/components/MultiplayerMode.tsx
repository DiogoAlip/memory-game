import { useRef, useState } from "react";
import { quitAllPlayers, setPlayersByName } from "../store/players/players.thunks";
import { ConfigurationsButtons } from "./ConfigurationButtons";
interface MultiplayerModeProps {
  nextOptionsView: () => void;
}

export const MultiplayerMode = ({
  nextOptionsView,
}: MultiplayerModeProps) => {
  const firstPlayer = useRef<HTMLInputElement>(null);
  const secondPlayer = useRef<HTMLInputElement>(null);
  const [inputValidator, setInputValidator] = useState(false);

  const handleOnApply = () => {
    if (!firstPlayer.current?.value || !secondPlayer.current?.value) {
      setInputValidator(true);
      return
    };
    if (firstPlayer.current?.value.length < 3 && secondPlayer.current?.value.length < 3) {
      setInputValidator(true);
      return
    };
    setPlayersByName([firstPlayer.current?.value, secondPlayer.current?.value])
    setInputValidator(false);
    nextOptionsView(); 
  }

  const handleOnCancel = () => {
    quitAllPlayers();
    firstPlayer.current!.value = "";
    secondPlayer.current!.value = "";
  }

  return (
    <div>
      <h4>Multijugador Local</h4>
      {inputValidator && <p className="text-red-500">Las cajas de texto deben estar llenas y los nombres deben tener al menos 3 caracteres</p>}
      <form className="mb-4 gap-2 flex flex-col py-4 items-center" name="players">
          <input
            className="border-1 outline-none rounded-[5px] bg-[#222222] text-[14px] text-[#f3efe0]  w-[80%] px-2 py-2 border-[#222222] focus:border-[#f3efe0]"
            placeholder="Jugador 1"
            type="text"
            ref={firstPlayer}
            key="0Jugador"
            maxLength={20}
          />
          <input
            className="border-1 outline-none rounded-[5px] bg-[#222222] text-[14px] text-[#f3efe0]  w-[80%] px-2 py-2 border-[#222222] focus:border-[#f3efe0]"
            placeholder="Jugador 2"
            type="text"
            ref={secondPlayer}
            key="1Jugador"
            maxLength={20}
          />
      </form>
      <ConfigurationsButtons
        values={1}
        onNextAplication={handleOnApply}
        onCancel={handleOnCancel}
      />
    </div>
  );
};
