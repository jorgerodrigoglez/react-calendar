import { useSelector } from "react-redux";
import { useCalendarStore } from "../../hooks"

export const FabDelete = ({ colorDisabled }) => {
 
    // redux
    const { isDateModalOpen } = useSelector( state => state.ui);
    //console.log( isDateModalOpen );
    //* Hooks
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    //console.log(hasEventSelected);

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button 
            className="btn btn__danger"
            onClick={ handleDelete }
            style={{ 
                display: ( hasEventSelected && !isDateModalOpen ) ? '' : 'none',
                opacity: (colorDisabled) ? '0.5' : '1'
            }}
            disabled={colorDisabled}
        >
            <i className="fas fa-trash-alt"></i>

        </button>
    )
}
