export function ConfigurationsButtons({ values, onNextAplication, onCancel }) {
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
