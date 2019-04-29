import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import InputAdornment from '@material-ui/core/InputAdornment'; 
import { 
    withStyles, 
    Button, Icon,
    Card, CardContent, 
    Checkbox, Divider,  
    FormControl, FormControlLabel, 
    TextField, Typography 
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as authActions from 'app/auth/store/actions';
import { FuseAnimate } from '@fuse';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup'

const styles = theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    }
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                username: 'leo@gogo.com',
                password: '123456',
            },
            remember: true,
            showPassword: false,
        }
    }
    render() {
        const { classes, login } = this.props;
        const { values } = this.state;
        const { remember } = this.state;
        
        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className="w-full max-w-384">

                            <CardContent className="flex flex-col items-center justify-center p-32">

                                <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

                                <Typography variant="h6" className="mt-16 mb-32">INICIO DE SESION </Typography>
                                <Formik
                                    initialValues={values}
                                    onSubmit={(values, actions) => this.props.submitLogin(values)}
                                    validationSchema={Yup.object().shape({
                                        username: Yup.string().email("Email incorrecto.").required("Usuario es obligatorio."),
                                        password: Yup.string().required("Contraseña es obligatorio.")
                                    })}
                                    render={({
                                        values,
                                        handleSubmit,
                                        handleBlur,
                                        handleChange,
                                        handleReset,
                                        setFieldValue,
                                        isSubmitting,
                                        errors,
                                        touched
                                    }) => (
                                            <form name="loginForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
                                                <TextField
                                                     error={errors.username && true}
                                                    className="mb-16"
                                                    label="Correo electronico"
                                                    autoFocus
                                                    type="email"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange('username')}
                                                    onBlur={handleBlur}
                                                    variant="outlined"
                                                    helperText={errors.username && errors.username}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                                    }}
                                                    required
                                                    fullWidth
                                                />
                                                <TextField
                                                    error={errors.password && true}
                                                    id="outlined-adornment-password"
                                                    className={classNames(classes.margin, classes.textField)}
                                                    variant="outlined"
                                                    type="password"
                                                    label="Contraseña"
                                                    value={values.password}
                                                    onChange={handleChange('password')}
                                                    onBlur={handleBlur}
                                                    helperText={errors.password && errors.password}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                                    }}
                                                />
                                                <div className="flex items-center justify-between">
                                                    <FormControl>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name="remember"
                                                                    checked={remember}
                                                                    onChange={this.handleChange} />
                                                            }
                                                            label="Remember Me"
                                                        />
                                                    </FormControl>

                                                    <Link className="font-medium" to="/pages/auth/forgot-password">
                                                        ¿Se te olvidó tu contraseña?
                                                </Link>
                                                </div>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className="w-224 mx-auto mt-16"
                                                    aria-label="LOG IN"
                                                    type="submit"
                                                >
                                                    Inicia sesion
                                                </Button>

                                            </form>
                                        )}
                                />
                                <div className="my-24 flex items-center justify-center">
                                    <Divider className="w-32" />
                                    <span className="mx-8 font-bold">OR</span>
                                    <Divider className="w-32" />
                                </div>

                                <Button variant="contained" color="secondary" size="small"
                                    className="normal-case w-192 mb-8">
                                    Inicia con Google
                                </Button>

                                <Button variant="contained" color="primary" size="small"
                                    className="normal-case w-192">
                                    Inicia con Facebook
                                </Button>

                                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                    <span className="font-medium">¿No tienes una cuenta?</span>
                                    <Link className="font-medium" to="/pages/auth/register">Crear una cuenta</Link>
                                </div>

                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLoginWithFireBase: authActions.submitLoginWithFireBase,
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}
export default withStyles(styles, { withTheme: true })(withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage)
));
