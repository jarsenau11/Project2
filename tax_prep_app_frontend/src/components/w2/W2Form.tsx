import { Button, Form, Grid, Label, TextInput } from "@trussworks/react-uswds";
import StatesDropdown from "../dropdown/StatesDropdown";
import "./W2FormStyle.css";



export default function W2Form () {
  
  const handleW2Submit = (): void => {
    // todo
  }

  return (
    <>
      <main>
        <div className="bg-base-lightest">          

          <div id="w2-submit-form">
            <Form onSubmit={handleW2Submit}>
              
              
              <h1>Form W-2 Wage and Tax Statement</h1>
                  {/* EMPLOYEE INFORMATION */}
              {/* <Label htmlFor="name" style={{ fontWeight: 'bold' }}>Employee Personal Information</Label>
              <Grid row style={{ display: "flex", justifyContent: "space-between" }}>

                <Grid col={4}>
                    <Label htmlFor="first-name-input">First Name</Label>
                    <TextInput id="first-name-input" name="firstName" type="text" required/>
                </Grid>
                <Grid col={4}>
                  <Label htmlFor="middle-name-input">Middle</Label>
                  <TextInput id="middle-name-input" name="middleName" type="text"/>
                </Grid>                

                <Grid col={4}>
                  <Label htmlFor="last-name-input">Last Name</Label>
                  <TextInput id="last-name-input" name="lastName" type="text" required/>
                </Grid>
                         
              </Grid> */}
                          
              <Grid row style={{ display: "flex", justifyContent: "space-between" }}>
              
                {/* <Grid col={6} style={{ width: "48%" }}>

                  <Label htmlFor="street-address-input">Street Address</Label>
                  <TextInput id="street-address-input" name="streetAddress" type="text" required/>

                  <Label htmlFor="city-input">City</Label>
                  <TextInput id="city-input" name="city" type="text" required/>

                  <Label htmlFor="zip-input">Zip Code</Label>
                  <TextInput id="zip-input" name="zipCode" type="number" required/>

                </Grid> */}

                <Grid col={6} style={{ width: "48%" }}>                
                  <Label htmlFor="street-address2-input">Apt., Unit, Ste</Label>
                  <TextInput id="street-address2-input" name="streetAddress2" type="text"/>

                  <Label htmlFor="state-input">State</Label>
                  <StatesDropdown/> 
                </Grid>

                {/* <Grid col={12}>
                  <Label htmlFor="employee-ssn-input">Social Security Number</Label>
                  <TextInput id="employee-ssn-input" name="employeeSsn" type="number"/>
                </Grid> */}

              </Grid>
                {/* EMPLOYER INFORMATION */}
                <Label htmlFor="name" style={{ fontWeight: 'bold' }}>Employer Information</Label>

              <Grid row style={{ display: "flex", justifyContent: "space-between" }}>


                <Grid col ={12}>
                  <Label htmlFor="employer-name-input">Employer's Name</Label>
                  <TextInput id="employer-name-input" name="employerName" type="text"/>
                </Grid>

                <Grid col={12}>
                  <Label htmlFor="employer-address-input"> Street Address</Label>
                  <TextInput id="employer-address-input" name="employerAddress" type="text"/>
                </Grid>

                <Grid col={6} style={{ width: "48%" }}>
                  <Label htmlFor="employer-city-input">Employer's City</Label>
                  <TextInput id="employer-city-input" name="employerCity" type="text"/>
                </Grid>

                <Grid col={6} style={{ width: "48%" }}>
                  <Label htmlFor="employer-state-input">State</Label>
                  <StatesDropdown/>
                </Grid>

                <Grid col={6} style={{ width: "48%" }}>
                  <Label htmlFor="employer-zipCode-input">Employer's Zip Code</Label>
                  <TextInput id="employer-zipCode-input" name="employerZipCode" type="number"/>
                </Grid>

                <Grid col={12}>
                  <Label htmlFor="employer-ein-input">Employer EIN</Label>
                  <TextInput id="employer-ein-input" name="employerEin" type="number"/>
                </Grid>
              
              </Grid>

                {/* TAX WITHHELD INFORMATION */}
                <Label htmlFor="federal-income-tax--input">Federal Income Tax Withheld</Label>
                <TextInput id="federal-income-tax-withheld-input" name="federalIncomeTaxWithheld" type="number"/>

                <Label htmlFor="social-security-tax-withheld-input">Social Security Tax Withheld</Label>
                <TextInput id="social-security-tax-withheld-input" name="socialSecurityTaxWithheld" type="number"/>

                <Label htmlFor="medicare-tax-withheld">Medicare Tax Withheld</Label>
                <TextInput id="medicare-tax-withheld" name="medicareTaxWithheld" type="number"/>

                {/* WAGES AND COMPENSATION */}
                <Label htmlFor="wages-input">Wages, tips, other compensation</Label>
                <TextInput id="wages-input" name="wages" type="number"/>

                <Button type="submit" data-close-modal='true'>Submit</Button>
            </Form>

          </div>
        </div>
      </main>
          
    </>
  )
}

