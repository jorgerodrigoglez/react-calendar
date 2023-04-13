import { useState, useMemo, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
// hook
import { useCalendarStore, useUiStore } from '../../hooks';
import { onClearEventActive } from '../../store';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // redux
    const dispatch = useDispatch();

    //* Hook
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    // const [openModal, setOpenModal] = useState(true);
    // manejo de inputs del formulario
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 )
    });
    // Controlar el submit del formulario
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const titleClass = useMemo(() => {
        // si se efectua el submit - formSubmitted = true, retorna un string vacio
        if( !formSubmitted ) return '';
        // si el titulo esta vacio
        return ( formValues.title.length > 1 ) ? '' : 'is-invalid';
    } , [formValues.title, formSubmitted]);

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    };

    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        //console.log('cerrando modal');
        //setOpenModal(false);
        closeDateModal();
        //limpiar la nota activa
        dispatch( onClearEventActive() );
    }

    // para mostrar el evento del calendario seleccionado en el formulario
    useEffect(() => {
        if( activeEvent !== null ){
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])
    

    const onSubmit = async(e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end, formValues.start );
        //console.log({ difference });
        if( isNaN( difference ) || difference <= 0 ){
            //console.log('Hay un error en las fechas');
            Swal.fire('Hay un error en las fechas','Revise la fechas seleccionadas','Error');
            return;
        }

        if( formValues.title.length <= 0 ) return;
        //console.log({formValues});
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
       
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    {/*<input className="form-control" placeholder="Fecha inicio" />*/}
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged( event, 'start') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                     {/*<input className="form-control" placeholder="Fecha inicio" />*/}
                    <DatePicker 
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged( event, 'end') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ titleClass }` }
                        placeholder="Título del evento"
                        name="title"
                        value={ formValues.title }
                        onChange={ onInputChange }
                        autoComplete="off"

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
