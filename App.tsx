import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modal from './components/Modal';
import OrderForm from './components/OrderForm';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Refund from './components/Refund';
import Disclaimer from './components/Disclaimer';
import Chatbot from './components/Chatbot';
import { useLanguage } from './hooks/useLanguage';
import { useRouter } from './hooks/useRouter';

const MainPage: React.FC<{ onOrderNowClick: () => void }> = ({ onOrderNowClick }) => (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Pricing onOrderNowClick={onOrderNowClick} />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA onOrderNowClick={onOrderNowClick} />
      </main>
      <Footer />
    </>
);

const SuccessMessage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage();
  return (
    <div className="text-center p-8">
      <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p className="text-lg text-light-text dark:text-dark-text">{t('orderForm.thankYou')}</p>
      <button 
        onClick={onClose}
        className="mt-6 px-6 py-2 text-sm font-medium text-white bg-primary-violet rounded-md hover:bg-opacity-90 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const { path } = useRouter();
  const [modalState, setModalState] = useState<'closed' | 'form' | 'success'>('closed');
  const { t } = useLanguage();

  const handleOpenOrderModal = () => setModalState('form');
  const handleCloseOrderModal = () => setModalState('closed');
  const handleSubmissionSuccess = () => setModalState('success');

  const getModalTitle = () => {
    if (modalState === 'form') return t('orderForm.title');
    if (modalState === 'success') return t('orderForm.successTitle');
    return '';
  };
  
  const renderPage = () => {
    switch (path) {
      case '/terms':
        return <Terms />;
      case '/privacy':
        return <Privacy />;
      case '/refund':
        return <Refund />;
      case '/disclaimer':
        return <Disclaimer />;
      case '/':
      default:
        return <MainPage onOrderNowClick={handleOpenOrderModal} />;
    }
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg font-sans text-light-text dark:text-dark-text transition-colors duration-300">
      {renderPage()}
      <Modal 
        isOpen={modalState !== 'closed'} 
        onClose={handleCloseOrderModal} 
        title={getModalTitle()}
      >
        {modalState === 'form' && <OrderForm onSuccess={handleSubmissionSuccess} />}
        {modalState === 'success' && <SuccessMessage onClose={handleCloseOrderModal} />}
      </Modal>
      <Chatbot />
    </div>
  );
};

export default App;