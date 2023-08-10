import React from 'react'
import {
    Grid,
    Form,
    Fieldset,
    Label,
    TextInput,
    Button,
    Link,
    DatePicker
} from '@trussworks/react-uswds'

import StatesDropdown from '../dropdown/StatesDropdown'
import CountriesDropdown from '../dropdown/CountriesDropdown'
import toast, { Toaster } from 'react-hot-toast'
import { User } from '../../slices/UserSlice'
import { useNavigate } from 'react-router-dom'

interface CreateEditUserAccountProps {
    accountExists: boolean,
    existingUser?: User,
    hidden: boolean,
    handleUpdateTransition: () => void

}

export default function CreateEditUserAccount(props: CreateEditUserAccountProps) {
    const URL = ""

    const userToCreateOrEdit = props.existingUser ? {
        id: props.existingUser.id,
        username: props.existingUser.username,
        password: props.existingUser.password,
        enabled: true,
        userDetail: {
            ssn: "" + props.existingUser.userDetail.ssn,
            firstName: props.existingUser.userDetail.firstName,
            middleName: props.existingUser.userDetail.middleName,
            lastName: props.existingUser.userDetail.lastName,
            email: props.existingUser.userDetail.email,
            dob: "" + props.existingUser.userDetail.dob,
            street1: props.existingUser.userDetail.street1,
            street2: props.existingUser.userDetail.street2,
            city: props.existingUser.userDetail.city,
            state: props.existingUser.userDetail.state,
            zip: "" + props.existingUser.userDetail.zip,
            country: props.existingUser.userDetail.country,
        }
    } : {
        username: "",
        password: "",
        enabled: true,
        userDetail: {
            ssn: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            dob: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        }
    }

    const [user, setUser] = React.useState(userToCreateOrEdit)

    const [showPassword, setShowPassword] = React.useState(false)
    const [retypedPassword, setRetypedPassword] = React.useState<string>(user.password)

    const navigate = useNavigate()

    const now = new Date();

    const handleUsernameChange = (event: any) => {
        setUser((prev) => ({ ...prev, username: event.target.value }))
    }

    const handlePasswordChange = (event: any) => {
        setUser((prev) => ({ ...prev, password: event.target.value }))

    }

    const handleRetypedPasswordChange = (event: any) => {
        setRetypedPassword(event.target.value)
    }

    const handleFirstNameChange = (event: any) => {
        if (!/\d/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, firstName: event.target.value } }))
        }
    }

    const handleMiddleNameChange = (event: any) => {
        if (!/\d/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, middleName: event.target.value } }))
        }
    }


    const handleLastNameChange = (event: any) => {
        if (!/\d/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, lastName: event.target.value } }))

        }
    }

    const handleSsnChange = (event: any) => {
        if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, ssn: event.target.value } }))
        }
    }

    const handleDobChange = (selectedDate?: string | undefined) => {
        setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, dob: selectedDate === undefined ? "" : selectedDate } }))
    }

    const handleZipChange = (event: any) => {
        if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, zip: event.target.value } }))
        }
    }

    const handleEmailChange = (event: any) => {
        setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, email: event.target.value } }))
    }

    const handleStreet1Change = (event: any) => {
        setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, street1: event.target.value } }))

    }

    const handleStreet2Change = (event: any) => {
        setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, street2: event.target.value } }))

    }

    const handleCityChange = (event: any) => {
        if (!/\d/.test(event.target.value)) {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, city: event.target.value } }))

        }
    }

    const handleStateChange = (event: any) => {
        if (user.userDetail.country == "United States") {
            setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, state: event.target.value } }))
        }

    }

    const handleCountryChange = (event: any) => {
        if (event.target.value != "United States") { setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, state: "" } })) }
        setUser((prev) => ({ ...prev, userDetail: { ...prev.userDetail, country: event.target.value } }))
    }

    const handleCreateAccountSubmit = (event: any): void => {
        event.preventDefault()

        if (false) { // first check should be to see if username already exists
            toast.error("This username already exists")
        }
        else if (user.password !== retypedPassword) {
            // passwords must match
            toast.error("Passwords must match")
        }
        else if (user.userDetail.ssn.length != 0 && user.userDetail.ssn.length != 9) {
            // ssn must either be blank or 9 digits
            toast.error("SSN must be blank or 9 digits")
        }
        else if (user.userDetail.zip.length != 0 && user.userDetail.zip.length != 5 && user.userDetail.zip.length != 9 && user.userDetail.zip.length != 10) {
            // zip must be blank, 5, 9, or 10 digits
            toast.error("Zip must be blank or 5, 9, or 10 digits")
        }
        else {
            // POST & redirect

            // cast ssn and zip strings to number, convert dob string to date, set all empty fields to null
            // create user -> new user return value here --- setUserDetails((prev) => ({...prev, user: data})) -> create final user details as new object and save that

            const userFinal = {
                username: user.username,
                password: user.password,
                enabled: user.enabled,
                userDetail: {
                    ssn: user.userDetail.ssn.length == 0 ? null : parseInt(user.userDetail.ssn),
                    dob: new Date(user.userDetail.dob),
                    firstName: user.userDetail.firstName,
                    middleName: user.userDetail.middleName.length == 0 ? null : user.userDetail.middleName,
                    lastName: user.userDetail.lastName,
                    email: user.userDetail.email,
                    street1: user.userDetail.street1,
                    street2: user.userDetail.street2.length == 0 ? null : user.userDetail.street2,
                    city: user.userDetail.city.length == 0 ? null : user.userDetail.city,
                    state: user.userDetail.state.length == 0 ? null : user.userDetail.state,
                    country: user.userDetail.country,
                    zip: user.userDetail.zip.length == 0 ? null : parseInt(user.userDetail.zip)
                }
            }

            fetch('http://localhost:8080/users/newUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFinal)
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem('user', JSON.stringify(data))
                    toast.success("Account Successfully Created!")
                    navigate('/home')
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }

    const handleUpdateAccountSubmit = (event: any): void => {
        event.preventDefault()

        if (false) { // first check should be to see if username already exists
            toast.error("This username already exists")
        }
        else if (user.password !== retypedPassword) {
            // passwords must match
            toast.error("Passwords must match")
        }
        else if (user.userDetail.zip.length != 0 && user.userDetail.zip.length != 5 && user.userDetail.zip.length != 9 && user.userDetail.zip.length != 10) {
            // zip must be blank, 5, 9, or 10 digits
            toast.error("Zip must be blank or 5, 9, or 10 digits")
        }
        else {
            // POST & redirect

            // cast ssn and zip strings to number, convert dob string to date, set all empty fields to null
            // create user -> new user return value here --- setUserDetails((prev) => ({...prev, user: data})) -> create final user details as new object and save that

            // need to add the existing userId to the user object so that we're updating and not creating
            const userFinal = {
                username: user.username,
                password: user.password,
                enabled: user.enabled,
                userDetail: {
                    ssn: user.userDetail.ssn.length == 0 ? null : parseInt(user.userDetail.ssn),
                    dob: new Date(user.userDetail.dob),
                    firstName: user.userDetail.firstName,
                    middleName: user.userDetail.middleName.length == 0 ? null : user.userDetail.middleName,
                    lastName: user.userDetail.lastName,
                    email: user.userDetail.email,
                    street1: user.userDetail.street1,
                    street2: (user.userDetail.street2 == null || user.userDetail.street2.length == 0) ? null : user.userDetail.street2,
                    city: user.userDetail.city.length == 0 ? null : user.userDetail.city,
                    state: (user.userDetail.state == null || user.userDetail.state.length == 0) ? null : user.userDetail.state,
                    country: user.userDetail.country,
                    zip: user.userDetail.zip.length == 0 ? null : parseInt(user.userDetail.zip)
                }
            }

            setUser((prev) => ({ ...prev, user: userFinal }))
console.log(user)
            fetch('http://localhost:8080/users/' + user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFinal)
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data)
                    localStorage.setItem('user', JSON.stringify(user))
                    toast.success("Account Successfully Updated!")
                    props.handleUpdateTransition()
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }

    const containerStyle = {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex"
    }

    return (
        <>
            <div><Toaster /></div>
            {!props.hidden && (<div style={containerStyle as React.CSSProperties}>
                <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}>
                    <Grid row>
                        <Grid col={12}>
                            <div className="bg-white padding-y-3 padding-x-15 border border-base-lighter">
                                <h1 className="margin-bottom-0" style={{ fontSize: "3.2em", lineHeight: "1.1" }}>{props.accountExists ? "Update Account" : "Create account"}</h1>
                                <div>
                                    <Form onSubmit={props.accountExists ? handleUpdateAccountSubmit : handleCreateAccountSubmit} large>
                                        <Fieldset legend={props.accountExists ? "" : "Get started with an account."}>
                                            <Grid>
                                                <Label htmlFor="username">
                                                    Username{' '}
                                                </Label>
                                                <TextInput
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    autoCapitalize="off"
                                                    autoCorrect="off"
                                                    required={props.accountExists ? false : true}
                                                    readOnly={props.accountExists ? true : false}
                                                    style={props.accountExists ? { backgroundColor: "grey" } : {}}
                                                    value={user.username}
                                                    onChange={handleUsernameChange}
                                                />

                                                <Label htmlFor="password-create-account">
                                                    Password{' '}
                                                </Label>
                                                <TextInput
                                                    id="password-create-account"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoCapitalize="off"
                                                    autoCorrect="off"
                                                    required={props.accountExists ? false : true}
                                                    readOnly={props.accountExists ? true : false}
                                                    style={props.accountExists ? { backgroundColor: "grey" } : {}}
                                                    value={user.password}
                                                    onChange={handlePasswordChange}
                                                />

                                                <Label htmlFor="password-create-account-confirm">
                                                    Re-type Password{' '}
                                                </Label>
                                                <TextInput
                                                    id="password-create-account-confirm"
                                                    name="password-confirm"
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoCapitalize="off"
                                                    autoCorrect="off"
                                                    required={props.accountExists ? false : true}
                                                    readOnly={props.accountExists ? true : false}
                                                    style={props.accountExists ? { backgroundColor: "grey" } : {}}
                                                    value={retypedPassword}
                                                    onChange={handleRetypedPasswordChange}
                                                />

                                                <p className="usa-form__note">
                                                    <a
                                                        title="Show password"
                                                        className="usa-show-password"
                                                        aria-controls="password-create-account password-create-account-confirm"
                                                        onClick={(): void =>
                                                            setShowPassword((showPassword) => !showPassword)
                                                        }>
                                                        {showPassword ? 'Hide password' : 'Show password'}
                                                    </a>
                                                </p>

                                                <hr className="solid" style={{ marginBottom: "5px", marginTop: "55px" }}></hr>
                                                <Grid row style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Grid col={6} style={{ width: "48%" }}>
                                                        <Label htmlFor="first-name">
                                                            First Name{' '}
                                                        </Label>
                                                        <TextInput
                                                            id="firstName"
                                                            name="firstName"
                                                            type="text"
                                                            autoCapitalize="off"
                                                            autoCorrect="off"
                                                            required={true}
                                                            value={user.userDetail.firstName}
                                                            onChange={handleFirstNameChange}
                                                        />

                                                        <Label htmlFor="last-name">
                                                            Last Name{' '}
                                                        </Label>
                                                        <TextInput
                                                            id="lastName"
                                                            name="lastName"
                                                            type="text"
                                                            autoCapitalize="off"
                                                            autoCorrect="off"
                                                            required={true}
                                                            value={user.userDetail.lastName}
                                                            onChange={handleLastNameChange}
                                                        />
                                                    </Grid>

                                                    <Grid col={6} style={{ width: "48%" }}>

                                                        <Label htmlFor="middle-name">
                                                            Middle Name{' '}
                                                        </Label>
                                                        <TextInput
                                                            id="middleName"
                                                            name="middleName"
                                                            type="text"
                                                            autoCapitalize="off"
                                                            autoCorrect="off"
                                                            required={false}
                                                            value={user.userDetail.middleName}
                                                            onChange={handleMiddleNameChange}
                                                        />

                                                        <Label htmlFor="email">
                                                            Email address{' '}
                                                        </Label>
                                                        <TextInput
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            autoCapitalize="off"
                                                            autoCorrect="off"
                                                            required={true}
                                                            value={user.userDetail.email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid row style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Grid style={{ width: "41%" }}>
                                                    <Label htmlFor="ssn">
                                                        Social Security Number{' '}
                                                    </Label>
                                                    <TextInput
                                                        id="ssn"
                                                        name="ssn"
                                                        type="password"
                                                        autoCapitalize="off"
                                                        autoCorrect="off"
                                                        required={props.accountExists ? false : true}
                                                        readOnly={props.accountExists ? true : false}
                                                        style={props.accountExists ? { backgroundColor: "grey" } : {}}
                                                        value={user.userDetail.ssn}
                                                        onChange={handleSsnChange}
                                                    />
                                                </Grid>
                                                <Grid style={{ width: "55%" }}>
                                                    <Label htmlFor="date-of-birth">
                                                        Date of Birth{' '}
                                                    </Label>
                                                    <DatePicker
                                                        id="dobId" name="dob" defaultValue={user.userDetail.dob} maxDate={"" + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()} required={true} onChange={handleDobChange}>
                                                    </DatePicker>
                                                </Grid>
                                            </Grid>

                                            <hr className="solid" style={{ marginBottom: "5px", marginTop: "35px" }}></hr>

                                            <Grid row style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Grid col={6} style={{ width: "48%" }}>
                                                    <Label htmlFor="street1">
                                                        Address Line 1{' '}
                                                    </Label>
                                                    <TextInput
                                                        id="street1"
                                                        name="street1"
                                                        type="text"
                                                        autoCapitalize="off"
                                                        autoCorrect="off"
                                                        required={true}
                                                        value={user.userDetail.street1}
                                                        onChange={handleStreet1Change}
                                                    />

                                                    <Label htmlFor="city">
                                                        City{' '}
                                                    </Label>
                                                    <TextInput
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        autoCapitalize="off"
                                                        autoCorrect="off"
                                                        required={true}
                                                        value={user.userDetail.city}
                                                        onChange={handleCityChange}
                                                    />

                                                    <Label htmlFor="zip">
                                                        Zip{' '}
                                                    </Label>
                                                    <TextInput
                                                        id="zip"
                                                        name="zip"
                                                        type="text"
                                                        required={false}
                                                        value={user.userDetail.zip}
                                                        onChange={handleZipChange}
                                                    />
                                                </Grid>

                                                <Grid col={6} style={{ width: "48%" }}>

                                                    <Label htmlFor="street2">
                                                        Address Line 2{' '}
                                                    </Label>
                                                    <TextInput
                                                        id="street2"
                                                        name="street2"
                                                        type="text"
                                                        autoCapitalize="off"
                                                        autoCorrect="off"
                                                        required={false}
                                                        value={user.userDetail.street2}
                                                        onChange={handleStreet2Change}
                                                    />

                                                    <Label htmlFor="state">
                                                        State{' '}
                                                    </Label>
                                                    <StatesDropdown value={user.userDetail.state == null ? "" : user.userDetail.state} disabled={user.userDetail.country != "United States"} onChange={handleStateChange} />

                                                    <Label htmlFor="country">
                                                        Country{' '}
                                                    </Label>
                                                    <CountriesDropdown value={user.userDetail.country} required={true} onChange={handleCountryChange} />
                                                </Grid>
                                            </Grid>

                                            {props.accountExists && (<Button secondary type="button" style={{ marginTop: "40px" }} onClick={props.handleUpdateTransition}>Cancel</Button>)}
                                            <Button type="submit" style={{ marginTop: "40px" }}>{props.accountExists ? "Update information" : "Create account"}</Button>
                                        </Fieldset>
                                    </Form>
                                </div>
                            </div>
                            <p className="text-center" hidden={props.accountExists ? true : false}>
                                Already have an account?{' '}
                                <Link href="/">Sign in</Link>.
                            </p>
                        </Grid>
                    </Grid>
                </div>
            </div>)}
        </>
    )
}