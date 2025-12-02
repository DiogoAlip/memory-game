interface ConfigurationsButtonsProps {
  values: number;
  onNextAplication: () => void;
  onCancel: () => void;
}

export function ConfigurationsButtons({ values, onNextAplication, onCancel }: ConfigurationsButtonsProps) {
  return (
    <div>
      <button
        className={values <= 0 ? "rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-none text-[#434343]" : "rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]"}
        onClick={onNextAplication}
      >
        Aplicar
      </button>
      <button className="rounded-lg border border-[#222222] px-2 py-2.5 text-base font-medium bg-[#222222] text-[#f3efe0] cursor-pointer transition duration-200 mx-3 pointer-events-auto hover:bg-[#f3efe0] hover:text-[#22a39f] hover:border-[#22a39f]" onClick={onCancel}>
        Borrar
      </button>
    </div>
  );
}
