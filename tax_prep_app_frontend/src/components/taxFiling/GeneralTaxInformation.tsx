import React from "react";
import {
    GridContainer,
    Grid,
    Form,
    Fieldset,
    Label,
    TextInput,
    Button,
    Radio,
    ButtonGroup
} from "@trussworks/react-uswds"


// interface taxFiling {
//     married: boolean,
//     dependents: number
// }

interface GeneralTaxInformationProps {
    taxFiling: any,
    onNextClick: (event: any) => void
    handleMarried: (event: any) => void
    handleDependentChange: (event: any) => void

}

export default function GeneralTaxInformation(props: GeneralTaxInformationProps) {

    const handleMaritalStatusChangeToSingle = () => {
        props.taxFiling.married = false
        props.handleMarried(false)
    }

    const handleMaritalStatusChangeToMarried = () => {
        props.taxFiling.married = true
        props.handleMarried(true)
    }

    const handleDependentsChange = (event: any) => {
        if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
            props.handleDependentChange(event)
        }
    }

    const handleSubmit = (event: any): void => {
        event.preventDefault()
    }

    const containerStyle = {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        marginTop: "35px"
    }

    return (
        <>
            <div style={containerStyle as React.CSSProperties}>
                <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}>
                    <GridContainer className="usa-section">
                        <Grid row={true} className="flex-justify-center">
                            <Grid col={12}>
                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <Form onSubmit={handleSubmit}>
                                        <Fieldset legend="Step 1: General Tax Information" legendStyle="large">
                                            <Label style={{ marginTop: "35px", marginBottom: "-5px" }} htmlFor="marital-status">Marital Status</Label>
                                            <ButtonGroup style={{ marginLeft: "70px" }}>
                                                <Radio
                                                    id="single"
                                                    name="single"
                                                    label="Single"
                                                    value="single"
                                                    checked={!props.taxFiling.married}
                                                    onChange={handleMaritalStatusChangeToSingle}
                                                /><Radio
                                                    id="married"
                                                    name="married"
                                                    label="Married"
                                                    value="married"
                                                    checked={props.taxFiling.married}
                                                    onChange={handleMaritalStatusChangeToMarried}
                                                />
                                            </ButtonGroup>

                                            <div style={{ marginBottom: "40px" }}></div>

                                            <Label htmlFor="dependents">Number of Dependents</Label>
                                            <TextInput
                                                id="dependents"
                                                name="dependents"
                                                type="number"
                                                required={true}
                                                value={props.taxFiling.dependents}
                                                onChange={handleDependentsChange}
                                            />

                                            <div style={{ marginBottom: "25px" }}></div>

                                        </Fieldset>
                                        <Button type="button" onClick={props.onNextClick}>Next</Button>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </div>
        </>
    )
}