import React, { Component } from "react";
import PostServices from "../Api Service/Post Api Service/PostServices";
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import './Login.css';
import CustomDialogue from "../Custom Dialogue/CustomDialogue";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: { email: "", password: "" },
            formErrors: {},
            isSubmit: false,
            setShowAnimation: false,
            dialogOpen: false,
            dialogTitle: "",
            dialogMessage: "",
            shouldRedirect: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formValues: {
                ...prevState.formValues,
                [name]: value,
            },
            formErrors: {
                ...prevState.formErrors,
                [name]: undefined,
            },
        }));
    };

    handleRegistrationClick = () => {
        window.location.href = "/registration";
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.formValues);
        this.setState({ formErrors: errors, isSubmit: true });

        if (Object.keys(errors).length === 0) {
            try {
                const response = await PostServices.login(this.state.formValues);
                console.log(response);
                if (response.code === 200) {
                    localStorage.setItem('userName', response.name);
                    localStorage.setItem('userEmail', response.email);
                    const formattedMessage = `Login Success<br>Name: ${response.name}<br>Login Time: ${response.loginTime}`;
                    this.setState({
                        dialogOpen: true,
                        dialogTitle: "Success",
                        dialogMessage: formattedMessage,
                        shouldRedirect: true,
                    });
                }
            } catch (error) {
                this.setState({
                    dialogOpen: true,
                    dialogTitle: "Failed",
                    dialogMessage: error.message,
                    shouldRedirect: false,
                });
            }
        }
    };

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false }, () => {
            if (this.state.shouldRedirect) {
                window.location.href = "/welcome";
            }
        });
    };

    validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.formErrors !== this.state.formErrors && Object.keys(this.state.formErrors).length === 0 && this.state.isSubmit) {
            this.setState({ showAnimation: true });

            setTimeout(() => {
                this.setState({ showAnimation: false });
            }, 3000);
        }
    }

    render() {
        const { formValues, formErrors, dialogOpen, dialogTitle, dialogMessage } = this.state;
        return (
            <div className="login-container">
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" align="center" className="login-header">
                        Tanisa International LTD
                    </Typography>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="email"
                            value={formValues.email}
                            onChange={this.handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            value={formValues.password}
                            onChange={this.handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="login-submit-button"
                        >
                            Sign In
                        </Button>
                        <Typography align="center" className="login-registration-link">
                            Not registered? <Link href="/registration" onClick={this.handleRegistrationClick}>Click here to register</Link>
                        </Typography>
                    </form>
                </Container>
                <CustomDialogue
                    open={dialogOpen}
                    onClose={this.handleCloseDialog}
                    title={dialogTitle}
                    message={dialogMessage}
                />
            </div>
        );
    }
}

export default Login;