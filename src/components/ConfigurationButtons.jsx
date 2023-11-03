export function ConfigurationsButtons({value,onNextAplication,onCancel}) {

    return (
    <div>
        <button className={value == 0? "invalid-button" : "aplicate-button"} onClick={onNextAplication}>Aplicar</button>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
    </div>
    )
}