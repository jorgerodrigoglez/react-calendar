import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

let loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

let registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    // hooks
    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange } = useForm(registerFormFields);

    // useAuthStore
    useEffect(() => {
        if(errorMessage !== undefined){
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])
    
    const onLoginSubmit = (event) => {
        event.preventDefault();
        //console.log({loginEmail,loginPassword});
        startLogin({ email:loginEmail, password:loginPassword });
    }

    const onRegisterSubmit = (event) => {
        event.preventDefault();
        if(registerPassword !== registerPassword2){
            Swal.fire('Error al registrar usuarios','las contraseñas no son iguales','error');
            return;
        }
        //console.log({registerName, registerEmail, registerPassword, registerPassword2 });
        startRegister({name:registerName, email:registerEmail, password:registerPassword});
        
        // limpiar formulario
        /*registerFormFields = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            registerPassword2: '',
        }*/
    }

  return (
      <div className="container login-container">
        <div className="row">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={onLoginSubmit}>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="loginEmail"
                            value={loginEmail}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="loginPassword"
                            value={loginPassword}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
            </div>

            <div className="col-md-6 login-form-2">
                <h3>Registro</h3>
                <form onSubmit={onRegisterSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="registerName"
                            value={registerName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="registerEmail"
                            value={registerEmail}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="registerPassword"
                            value={registerPassword}
                            onChange={onInputChange}

                        />
                    </div>

                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña" 
                            name="registerPassword2"
                            value={registerPassword2}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Crear cuenta" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
