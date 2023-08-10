import { Button, Form, Grid, Label, TextInput } from "@trussworks/react-uswds";
import StatesDropdown from "../dropdown/StatesDropdown";
import "./W2FormStyle.css";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getUser } from "../../slices/UserSlice";
import toast from "react-hot-toast";

type FormW2Type = {
  ein: number
  employerCity: string
  employerName: string
  employerState: string
  employerStreet1: string
  employerStreet2: string
  employerZip: number
  medicareWithheld: number
  ssWithheld: number
  taxesWithheld: number
  wagesAndTips: number,
  dateSubmitted: string
}

interface W2FormProps {
  isTaxFiling: boolean
  isNewForm: boolean // true for new, false for update
  existingForm?: FormW2Type

  handleCancel?: (event: any) => void
  handleSubmit?: (event: any) => void
}

export default function W2Form(props: W2FormProps) {
  const [user, setUser] = useState(getUser())

  const [w2, setW2] = useState(props.isNewForm ? {
    ein: "", // convert this to number when writing to db
    employerCity: "",
    employerName: "",
    employerState: "",
    employerStreet1: "",
    employerStreet2: "",
    employerZip: "", // convert this and below to numbers when writing to db
    medicareWithheld: "",
    ssWithheld: "",
    taxesWithheld: "",
    wagesAndTips: "",
    dateSubmitted: ""
  } : {
    ein: "" + props?.existingForm?.ein, // convert this to number when writing to db
    employerCity: props.existingForm?.employerCity,
    employerName: props.existingForm?.employerName,
    employerState: props.existingForm?.employerState,
    employerStreet1: props.existingForm?.employerStreet1,
    employerStreet2: props.existingForm?.employerStreet2,
    employerZip: "" + props.existingForm?.employerZip, // convert this and below to numbers when writing to db
    medicareWithheld: "" + props.existingForm?.medicareWithheld,
    ssWithheld: "" + props.existingForm?.ssWithheld,
    taxesWithheld: "" + props.existingForm?.taxesWithheld,
    wagesAndTips: "" + props.existingForm?.wagesAndTips,
    dateSubmitted: props.existingForm?.dateSubmitted
  })

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])

  const handleEinChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, ein: event.target.value }))
    }
  }

  const handleEmployerNameChange = (event: any) => {
    setW2((prev) => ({ ...prev, employerName: event.target.value }))
  }

  const handleStreet1Change = (event: any) => {
    setW2((prev) => ({ ...prev, employerStreet1: event.target.value }))

  }

  const handleStreet2Change = (event: any) => {
    setW2((prev) => ({ ...prev, employerStreet2: event.target.value }))

  }

  const handleCityChange = (event: any) => {
    if (!/\d/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, employerCity: event.target.value }))
    }
  }

  const handleStateChange = (event: any) => {
    setW2((prev) => ({ ...prev, employerState: event.target.value }))

  }

  const handleZipChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, employerZip: event.target.value }))
    }
  }

  const handleMedicareWithheldChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, medicareWithheld: event.target.value }))
    }
  }

  const handleSsChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, ssWithheld: event.target.value }))
    }
  }

  const handleTaxesWithheldChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, taxesWithheld: event.target.value }))
    }
  }

  const handleWagesAndTipsChange = (event: any) => {
    if (event.target.value == "" || /^\d+$/.test(event.target.value)) {
      setW2((prev) => ({ ...prev, wagesAndTips: event.target.value }))
    }
  }

  const handleCreateW2Submit = (event: any): void => {
    console.log(user)
    // todo
    // convert number fields to numbers, then append to w2 array of user object, then write user to db
    // not sure but with the way things are set up, may need to use the username to query db and get the ID back, add it to the user object, and THEN do the put
    event.preventDefault()
    if (w2.ein.length != 9) { // change the 9 to whatever the standard ein length is
      toast.error("EIN must 9 digits")
    }
    else if (w2.employerZip.length != 5 && w2.employerZip.length != 9) {
      toast.error("Zip must be 5 or 9 digits")
    }
    // else {
    //   function getCurrentFormattedDate(): string {
    //     const now = new Date();
    //     const month = (now.getMonth() + 1).toString().padStart(2, '0');
    //     const day = now.getDate().toString().padStart(2, '0');
    //     const year = now.getFullYear().toString();
    
    //     return `${month}-${day}-${year}`;
    // }    
      // const w2Final = {
      //   ein: parseInt(w2.ein),
      //   employerCity: w2.employerCity,
      //   employerName: w2.employerName,
      //   employerState: w2.employerState,
      //   employerStreet1: w2.employerStreet1,
      //   employerStreet2: w2.employerStreet2,
      //   employerZip: parseInt(w2.employerZip),
      //   medicareWithheld: parseInt(w2.medicareWithheld),
      //   ssWithheld: parseInt(w2.ssWithheld),
      //   taxesWithheld: parseInt(w2.taxesWithheld),
      //   wagesAndTips: parseInt(w2.wagesAndTips),
      //   submittedDate: getCurrentFormattedDate()
      // }

      const URL = "http://54.221.143.25:8080/users/";
      // // this is not working, still get null
      // if(user.formW2s == null) {
      //   console.log("isnull")
      //   setUser((prev) => ({ ...prev, formW2s: [w2Final]}))
      //   console.log(user)
      // }
      // else {
      //   user.formW2s.push(w2Final)
      // }
      fetch(URL + user.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .then((data) => {
            setUser(data)
            setW2({
              ein: "",
              employerCity: "",
              employerName: "",
              employerState: "",
              employerStreet1: "",
              employerStreet2: "",
              employerZip: "",
              medicareWithheld: "",
              ssWithheld: "",
              taxesWithheld: "",
              wagesAndTips: "",
              dateSubmitted: ""
            })
            
            
            console.log(user)

            localStorage.setItem('user', JSON.stringify(user))
            toast.success("W2 Successfully Submitted!")
        })
        .catch((err) => {
            console.log(err.message);
        });

    }

  

  const handleUpdateW2Submit = (): void => {
    // todo
    // convert number fields to numbers, then append to w2 array of user object, then write user to db
    // not sure but with the way things are set up, may need to use the username to query db and get the ID back, add it to the user object, and THEN do the put


  }

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    marginTop: "20px"
  }

  return (
    <>
        <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}>
          <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
            <div id="w2-submit-form">
              <Form onSubmit={props.isNewForm ? handleCreateW2Submit : handleUpdateW2Submit}>

                <h1>{t('w2Form.taxStatement')}</h1>

                {/* EMPLOYER INFORMATION */}
                <Label htmlFor="name" style={{ fontWeight: 'bold' }}>{t('w2Form.employerInformationLabel')}</Label>

                <Grid row style={{ display: "flex", justifyContent: "space-between" }}>

                  <Grid col={12}>
                    <Label htmlFor="employer-name-input">{t('w2Form.employerName')}</Label>
                    <TextInput id="employer-name-input" name="employerName" type="text" value={w2.employerName} onChange={handleEmployerNameChange} required={true} />
                  </Grid>

                  <Grid col={12}>
                    <Label htmlFor="employer-address-input">{t('w2Form.streetAddress')}</Label>
                    <TextInput id="employer-address-input" name="employerAddress" type="text" value={w2.employerStreet1} onChange={handleStreet1Change} />
                  </Grid>

                  <Grid col={12}>
                    <Label htmlFor="street-address2-input">{t('w2Form.apt')}</Label>
                    <TextInput id="street-address2-input" name="streetAddress2" type="text" value={w2.employerStreet2} onChange={handleStreet2Change} required={true} />
                  </Grid>

                  <Grid col={6} style={{ width: "48%" }}>
                    <Label htmlFor="employer-city-input">{t('w2Form.employerCity')}</Label>
                    <TextInput id="employer-city-input" name="employerCity" type="text" value={w2.employerCity} onChange={handleCityChange} required={true} />
                  </Grid>

                  <Grid col={6} style={{ width: "48%" }}>
                    <Label htmlFor="employer-state-input">{t('w2Form.employerState')}</Label>
                    <StatesDropdown value={w2.employerState} onChange={handleStateChange} required={true} />
                  </Grid>

                  <Grid col={6} style={{ width: "48%" }}>
                    <Label htmlFor="employer-zipCode-input">{t('w2Form.employerZip')}</Label>
                    <TextInput id="employer-zipCode-input" name="employerZipCode" type="text" value={w2.employerZip} onChange={handleZipChange} required={true} />

                  </Grid>

                  <Grid col={12}>
                    <Label htmlFor="employer-ein-input">{t('w2Form.employerEin')}</Label>
                    <TextInput id="employer-ein-input" name="employerEin" type="text" value={w2.ein} onChange={handleEinChange} required={true} />
                  </Grid>

                </Grid>

                {/* TAX WITHHELD INFORMATION */}
                <Label htmlFor="federal-income-tax--input">{t('w2Form.federalIncomeTaxWithheld')}</Label>
                <TextInput id="federal-income-tax-withheld-input" name="federalIncomeTaxWithheld" type="text" value={w2.taxesWithheld} onChange={handleTaxesWithheldChange} required={true} />

                <Label htmlFor="social-security-tax-withheld-input">{t('w2Form.socialSecurityTaxWithheld')}</Label>
                <TextInput id="social-security-tax-withheld-input" name="socialSecurityTaxWithheld" type="text" value={w2.ssWithheld} onChange={handleSsChange} required={true} />

                <Label htmlFor="medicare-tax-withheld">{t('w2Form.medicareTaxWithheld')}</Label>
                <TextInput id="medicare-tax-withheld" name="medicareTaxWithheld" type="text" value={w2.medicareWithheld} onChange={handleMedicareWithheldChange} required={true} />

                {/* WAGES AND COMPENSATION */}
                <Label htmlFor="wages-input">{t('w2Form.wagesTipsOtherCompensation')}</Label>
                <TextInput id="wages-input" name="wages" type="text" value={w2.wagesAndTips} onChange={handleWagesAndTipsChange} required={true} />

                {props.isTaxFiling && (<Button type="button" onClick={props.handleCancel}>Cancel</Button>)}
                {props.isNewForm && (<Button type="submit" data-close-modal='true'>{t('w2Form.submit')}</Button>)}
                {(!props.isTaxFiling && !props.isNewForm) && (<Button type="submit" data-close-modal='true'>Update</Button>)}
              </Form>
            </div>
          </div>
        </div>

    </>
  )
}

