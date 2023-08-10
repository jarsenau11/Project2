import React from "react"
import {
    GridContainer,
    Grid,
    Form,
    Fieldset,
    Label,
    TextInput,
    Button,
    Link
} from "@trussworks/react-uswds"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../slices/UserSlice"
import { AppDispatch } from "../Store"
import {useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'

export default function Login() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const { loading, error } = useSelector((state: any) => state.user)

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLoginSubmit = (event: any): void => {
        event.preventDefault()

        // const userCredentials = {
        //     username, password
        // }

        // dispatching loginUser function, passing in the userCredentials
        dispatch(loginUser()).then((success) => {
            if(success) {
                setUsername("")
                setPassword("")
                setShowPassword(false)
                navigate("/")
            }
        })
    }

    const containerStyle = {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        marginTop: "45px"
    }

    return (
        <>
            <div style={containerStyle as React.CSSProperties}
            >
                <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}
                >
                    <GridContainer className="usa-section">
                        <Grid row={true} className="flex-justify-center">
                            <Grid col={12}>
                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <Form onSubmit={handleLoginSubmit}>
                                        <Fieldset legend="Access your account" legendStyle="large">
                                            <Label style={{ marginTop: "25px" }} htmlFor="login">Username</Label>
                                            <TextInput
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                required={true}
                                                value={username}
                                                onChange={handleUsernameChange}
                                            />

                                            <div style={{ marginBottom: "15px" }}></div>

                                            <Label htmlFor="login">Password</Label>
                                            <TextInput
                                                id="password-sign-in"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                required={true}
                                                value={password}
                                                onChange={handlePasswordChange}
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
                                        </Fieldset>
                                        <Button style={{ marginTop: "-15px" }} type="submit">{loading ? "loading" : "Sign In"}</Button>
                                        {error && 
                                            toast.error("Passwords must match")
                                        }
                                    </Form>
                                </div>

                                <p className="text-center">
                                    {"Don't have an account? "}
                                    <Link href="/signup">Create your account now</Link>
                                    .
                                </p>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </div>
        </>
    )
}
