import { Table } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { getUser } from "../../slices/UserSlice";

export default function Table1099 () {
  const user = getUser();


  const { t, i18n } = useTranslation();

  useEffect(() => {
      const lng = navigator.language;
      i18n.changeLanguage(lng);
  }, [])  

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

  return (
    <>
      <Table striped fullWidth className="bg-primary-lighter" >
          <thead>
              <tr>
                  <th>{t('table1099.payer')}</th>
                  <th>{t('table1099.totalCompensation')}</th>
                  <th>{t('table1099.federalIncomeTaxWithheld')}</th>
                  {/* <th>{t('table1099.dateSubmitted')}</th> */}
              </tr>
          </thead>
          <tbody>
              {user.form1099s.map((form1099, f) =>

                
                  <tr key={f}>
                      <td>{form1099.payerName}</td>
                      <td>{formatCurrency(form1099.totalCompensation)}</td>
                      <td>{formatCurrency(form1099.taxesWithheld2)}</td>
                      {/* <td>{form1099.dateSubmitted}</td> */}
                  </tr>
                
              )
              }
          </tbody>
        </Table>
    
    </>
  )
}