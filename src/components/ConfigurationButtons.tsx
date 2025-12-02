interface ConfigurationsButtonsProps {
  values: number;
  onNextAplication: () => void;
  onCancel: () => void;
}

export function ConfigurationsButtons({ values, onNextAplication, onCancel }: ConfigurationsButtonsProps) {
  return (
    <div>
      <button
        className={values <= 0 ? "invalid-button" : "aplicate-button"}
        onClick={onNextAplication}
      >
        Aplicar
      </button>
      <button className="cancel-button" onClick={onCancel}>
        Borrar
      </button>
    </div>
  );
}
