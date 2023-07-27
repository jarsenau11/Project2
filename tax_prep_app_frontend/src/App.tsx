import '@trussworks/react-uswds/lib/index.css'
import { Header, PrimaryNav } from '@trussworks/react-uswds'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TaxSummary from './pages/TaxSummary';
import W2Page from './pages/W2Page';
import Page1099 from './pages/Page1099';
import PersonalInformation from './pages/PersonalInformation';
import TaxFiling from './pages/TaxFiling';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

    const navItems = [

        // creating a list of react-router-dom Links to pass to our navbar
        <Link to='/'>{t('link.home')}</Link>,
        <Link to='/tax-summary'>{t('link.taxSummary')}</Link>,
        <Link to='/tax-filing'>{t('link.generalTaxInformation')}</Link>,
        <Link to='/add-w2'>{t('link.addW2')}</Link>,
        <Link to='/add-1099'>{t('link.add1099')}</Link>,
        <Link to='/personal-info'>{t('link.personalInformation')}</Link>,
        <Link to='/login'>{t('link.logOut')}</Link>,
        // <div>Browser Language: {lng}</div>
    ];

    return (
        <>
            <BrowserRouter basename='/'>
                <Header id="nav-bar-container">
                    <PrimaryNav className='bg-primary-lighter' items={navItems}>
                        </PrimaryNav>
                </Header>

                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/tax-summary' element={<TaxSummary />}/>
                    <Route path='/tax-filing' element={<TaxFiling />}/>
                    <Route path='/add-w2' element={<W2Page />}/> 
                    <Route path='/add-1099' element={<Page1099/>}/> 
                    <Route path='/personal-info' element={<PersonalInformation />}/>            
                    <Route path='/login' element={<Login />}/>
                    <Route path='/signup' element={<SignUp />}/>                
                </Routes>

            </BrowserRouter>         
        
        </>
    )
}

export default App