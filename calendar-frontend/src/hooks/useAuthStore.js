import { useDispatch, useSelector } from "react-redux";
//import Swal from 'sweetalert2';
import { calendarApi } from "../api";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // Login - backend
    const startLogin = async({ email, password }) => {

        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth', { email, password } );
            //console.log({data});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({ name: data.name, uid: data.uid }))
            
        } catch (error) {
            console.log({error});
            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);
        }
    }
    // register - backend
    const startRegister = async({ name, email, password }) => {

        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth/new', { name, email, password } );
            //console.log({data});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({ name: data.name, uid: data.uid }));

            // hay que generar el token en el backend al realizar el registro, como no encontre la manera lo he echo de esta forma, si el usuario registrado esta repetido con sql no salta el error
            //dispatch( onRegister() );

            // se muestra mensaje de exito en el registro
            //Swal.fire('El usuario ha sido registrado','Ya puedes hace el login','success');
            
        } catch (error) {
            console.log({error});
            dispatch( onLogout( error.response.data?.msg || 'Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);
        }
    }

    // mantener autenticación - backend
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    // hacer logout
    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return{
        // propiedades
        status,
        user,
        errorMessage,
        // metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}