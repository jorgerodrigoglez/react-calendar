import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = ({ setFormatText, setColorDisabled }) => {

    //* Hooks
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
        });
        // cambia los estilos al abrir el modal
        setFormatText(false);
        setColorDisabled(false);
        // abre el modal
        openDateModal();

    }

    return (
        <button 
            className="btn btn-primary btn__style"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>

        </button>
    )
}
