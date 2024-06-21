import React, { Component } from "react";
import PostServices from "../Api Service/Post Api Service/PostServices";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Link } from '@mui/material';
import './Registration.css';
import CustomDialogue from "../Custom Dialogue/CustomDialogue";
import { format } from 'date-fns';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: { name: "", email: "", password: "", mobileNumber: "", dateOfBirth: "", gender: "" },
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
        this.setState((prevState) => {
            const formValues = {
                ...prevState.formValues,
                [name]: value,
            };

            // Validate the form values
            const formErrors = this.validate(formValues);

            // Validate the password separately if the name is 'password'
            if (name === 'password') {
                const passwordErrors = this.validatePassword(value);
                if (passwordErrors.length > 0) {
                    formErrors.password = passwordErrors.map((error, index) => `${index + 1}. ${error}`).join('\n');
                } else {
                    delete formErrors.password;
                }
            }

            return { formValues, formErrors };
        });
    };

    handleLoginClick = () => {
        window.location.href = "/";
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.formValues);
        this.setState({ formErrors: errors, isSubmit: true });
        const formattedDate = this.state.formValues.dateOfBirth
            ? format(new Date(this.state.formValues.dateOfBirth), 'dd-MM-yyyy')
            : '';

        // Correct way to log the formatted date along with other form values
        console.log({
            ...this.state.formValues,
            dateOfBirth: formattedDate,
        });

        // To add the formatted date back into the form values
        this.setState((prevState) => ({
            formValues: {
                ...prevState.formValues,
                dateOfBirth: formattedDate,
            },
        }));
        if (Object.keys(errors).length === 0) {
            console.log(this.state.formValues);
            try {
                const response = await PostServices.registration(this.state.formValues);
                console.log(response);
                if (response.code === 200) {
                    this.setState({
                        dialogOpen: true,
                        dialogTitle: "Success",
                        dialogMessage: response.message,
                        shouldRedirect: true,
                    });
                }
            } catch (error) {
                console.log(error);
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
                window.location.href = "/";
            }
        });
    };

    validatePassword = (password) => {
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push("Password must be at least 8 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push("At least one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            passwordErrors.push("At least one lowercase letter");
        }
        if (!/\d/.test(password)) {
            passwordErrors.push("At least one number");
        }
        if (!/[@$!%*?&]/.test(password)) {
            passwordErrors.push("At least one special character (@$!%*?&)");
        }
        return passwordErrors;
    };

    validate = (values) => {
        const errors = {};
        const passwordErrors = []
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        if (!values.mobileNumber) {
            errors.mobileNumber = "Mobile number is required";
        }
        if (!values.dateOfBirth) {
            errors.dateOfBirth = "Date of birth is required";
        }
        if (!values.gender) {
            errors.gender = "Gender is required";
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
            <div className="registration-container">
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" align="center" className="registration-header">
                        Tanisa International LTD
                    </Typography>
                    <form className="registration-form" onSubmit={this.handleSubmit}>
                        <Typography className="registration-form-header" component="h1" variant="h5">
                            Registration
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="name"
                            value={formValues.name}
                            onChange={this.handleChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
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
                            helperText={formErrors.password ? formErrors.password.split('\n').map((item, key) => {
                                return <span key={key}>{item}<br /></span>
                            }) : ''}
                        />
                        <TextField
                            label="Mobile"
                            type="number"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="mobileNumber"
                            value={formValues.mobileNumber}
                            onChange={this.handleChange}
                            error={!!formErrors.mobileNumber}
                            helperText={formErrors.mobileNumber}
                        />
                        <TextField
                            label="Date Of Birth"
                            type="date"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="dateOfBirth"
                            value={formValues.dateOfBirth}
                            onChange={this.handleChange}
                            error={!!formErrors.dateOfBirth}
                            helperText={formErrors.dateOfBirth}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select-label">Select gender</InputLabel>
                            <Select
                                labelId="select-label"
                                name="gender"
                                value={formValues.gender}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="MALE">Male</MenuItem>
                                <MenuItem value="FEMALE">Female</MenuItem>
                            </Select>
                            {formErrors.gender && <Typography color="error" variant="caption">{formErrors.gender}</Typography>}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="registration-submit-button"
                        >
                            Sign Up
                        </Button>
                        <Typography align="center" className="registration-login-link">
                            Already have an account? <Link href="/" onClick={this.handleLoginClick}>Click here to Login</Link>
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

export default Registration;