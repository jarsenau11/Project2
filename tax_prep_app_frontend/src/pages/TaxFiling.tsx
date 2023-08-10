import { useState } from "react"
import GeneralTaxInformation from "../components/taxFiling/GeneralTaxInformation"
import FormSelection from "../components/taxFiling/FormSelection"
import TaxSummary from "./TaxSummary"
import W2Form from "../components/w2/W2Form"
import Form1099 from "../components/1099/Form1099"
import { getUser } from "../slices/UserSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


export default function TaxFiling() {
  const URL = "http://54.221.143.25:8080/users/";

  const [user, setUser] = useState(getUser())
  const [taxFiling, setTaxFiling] = useState({
    married: false,
    dependents: 0,
    totalRefundAmount: 0,
    totalAmountDue: 0
  })
  const navigate = useNavigate()

  /**
   * page 1: general tax info
   * page 2: page with buttons to add w2 and/or 1099
   * page 3: tax summary
   * 
   * page 5: add w2
   * page 6: add 1099
   */
  const [currentPage, setCurrentPage] = useState(1)

  const handleMarriedChange = (married: boolean) => {
    setTaxFiling((prev) => ({ ...prev, married: married }))
  }

  const handleDependentsChange = (event: any) => {
    setTaxFiling((prev) => ({ ...prev, dependents: event.target.value }))

  }

  const handleNextButtonClick = () => {
    if (currentPage == 2) {
      setTaxFiling((prev) => ({ ...prev, totalRefundAmount: calculateRefundAmount() }))
      setTaxFiling((prev) => ({ ...prev, totalAmountDue: calculateTotalAmountDue() }))
    }
    setCurrentPage(currentPage + 1)
  }

  const handleBackButtonClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleAddW2lick = () => {
    setCurrentPage(5)
  }

  const handleAdd1099Click = () => {
    setCurrentPage(6)
  }

  const handleFormCancel = () => {
    setCurrentPage(2)
  }

  const handleTaxSummarySubmit = () => {
    setUser((prev) => ({ ...prev, taxFilings: taxFiling }))

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
        localStorage.setItem('user', JSON.stringify(user))
        toast.success("1099 Successfully Submitted!")
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // CALCULATIONS
  const calculateTaxRate = (): number => {
    let totalAmountDue = 0;

    if (user.form1099s) {
      if (taxFiling.married) {
        totalAmountDue = user.form1099s.reduce((acc, form1099) => {
          const income = form1099.totalCompensation;
  
          // Applies current US tax rate based on income for married couples (filing jointly)
          if (income <= 20550) {
            return acc + income * 0.10;
          } else if (income <= 83550) {
            return acc + 20550 * 0.10 + (income - 20550) * 0.12;
          } else if (income <= 178150) {
            return acc + 20550 * 0.10 + (83550 - 20550) * 0.12 + (income - 83550) * 0.22;
          } else if (income <= 340100) {
            return acc + 20550 * 0.10 + (83550 - 20550) * 0.12 + (178150 - 83550) * 0.22 + (income - 178150) * 0.24;
          } else if (income <= 431900) {
            return acc + 20550 * 0.10 + (83550 - 20550) * 0.12 + (178150 - 83550) * 0.22 + (340100 - 178150) * 0.24 + (income - 340100) * 0.32;
          } else if (income <= 647850) {
            return acc + 20550 * 0.10 + (83550 - 20550) * 0.12 + (178150 - 83550) * 0.22 + (340100 - 178150) * 0.24 + (431900 - 340100) * 0.32 + (income - 431900) * 0.35;
          } else {
            return acc + 20550 * 0.10 + (83550 - 20550) * 0.12 + (178150 - 83550) * 0.22 + (340100 - 178150) * 0.24 + (431900 - 340100) * 0.32 + (647850 - 431900) * 0.35 + (income - 647850) * 0.37;
          }
        }, 0);
      } else {
        totalAmountDue = user.form1099s.reduce((acc, form1099) => {
          const income = form1099.totalCompensation;
  
          // Applies current US tax rate based on income for unmarried or single 
          if (income <= 10275) {
            return acc + income * 0.10;
          } else if (income <= 41775) {
            return acc + 10275 * 0.10 + (income - 10275) * 0.12;
          } else if (income <= 89075) {
            return acc + 10275 * 0.10 + (41775 - 10275) * 0.12 + (income - 41775) * 0.22;
          } else if (income <= 170050) {
            return acc + 10275 * 0.10 + (41775 - 10275) * 0.12 + (89075 - 41775) * 0.22 + (income - 89075) * 0.24;
          } else if (income <= 215950) {
            return acc + 10275 * 0.10 + (41775 - 10275) * 0.12 + (89075 - 41775) * 0.22 + (170050 - 89075) * 0.24 + (income - 170050) * 0.32;
          } else if (income <= 539900) {
            return acc + 10275 * 0.10 + (41775 - 10275) * 0.12 + (89075 - 41775) * 0.22 + (170050 - 89075) * 0.24 + (215950 - 170050) * 0.32 + (income - 215950) * 0.35;
          } else {
            return acc + 10275 * 0.10 + (41775 - 10275) * 0.12 + (89075 - 41775) * 0.22 + (170050 - 89075) * 0.24 + (215950 - 170050) * 0.32 + (539900 - 215950) * 0.35 + (income - 539900) * 0.37;
          }
        }, 0);
      }
    }
    
    return totalAmountDue;
  }

  const calculateRefundAmount = () => {
    let totalRefundAmount = 0;
    let totalAmountDue = 0;

    // Check if user has a completed w2 form
    if (user.formW2s) {
      totalRefundAmount = user.formW2s.reduce((acc, w2) => acc + (w2.ssWithheld + w2.taxesWithheld + w2.medicareWithheld), 0);

      // Deduct for dependents. $1,250 is the standard deduction per dependent
      const dependentDeduction = 1250 * taxFiling.dependents;
      totalRefundAmount += dependentDeduction;
    }   
    
    totalAmountDue = calculateTaxRate();

    if (totalRefundAmount > totalAmountDue) {      
      return totalRefundAmount - totalAmountDue;
    } else {      
      return 0;
    }    

  };

  // CALCULATE TOTAL AMOUNT DUE
  const calculateTotalAmountDue = () => {
    let totalRefundAmount = 0;
    let totalAmountDue = 0;

    // Check if user has a completed w2 form
    if (user.formW2s) {
      totalRefundAmount = user.formW2s.reduce((acc, w2) => acc + (w2.ssWithheld + w2.taxesWithheld + w2.medicareWithheld), 0);

      // Deduct for dependents. $1,250 is the standard deduction per dependent
      const dependentDeduction = 1250 * taxFiling.dependents;
      totalRefundAmount += dependentDeduction;
    }       
    
    totalAmountDue = calculateTaxRate();

    if ( totalAmountDue > totalRefundAmount) {      
      return totalAmountDue - totalRefundAmount;
    } else {      
      return 0;
    } 
  }

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center"
  }

  // maybe add some kind of progress tracker at the top separately that will show lit up circles with checkmarks depending on what step the user is on
  return (
    <>
      {currentPage == 1 && (<GeneralTaxInformation taxFiling={taxFiling} handleDependentChange={handleDependentsChange} handleMarried={handleMarriedChange} onNextClick={handleNextButtonClick} />)}
      {currentPage == 2 && (<FormSelection onNextClick={handleNextButtonClick} onBackClick={handleBackButtonClick} on1099Click={handleAdd1099Click} onW2Click={handleAddW2lick} />)}
      {currentPage == 3 && (<TaxSummary isTaxFiling={true} taxFiling={taxFiling} handleBack={handleBackButtonClick} handleSubmit={handleTaxSummarySubmit} />)}

      {currentPage == 5 && (
        <main id="main-content" style={containerStyle as React.CSSProperties}>
          <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}>
            <W2Form isTaxFiling={true} isNewForm={true} handleCancel={handleFormCancel} />
          </div>
        </main>
      )}
      {currentPage == 6 && (
        <main id="main-content" style={containerStyle as React.CSSProperties}>
          <div className="bg-base-lightest" style={containerStyle as React.CSSProperties}>
            <Form1099 isTaxFiling={true} isNewForm={true} handleCancel={handleFormCancel} />
          </div>
        </main>
      )}

    </>
  )
}