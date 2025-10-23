import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// ==========================================================================================
// SCRIPT URL UPDATED AS PER YOUR REQUEST.
// The submission method below has also been changed to prevent CORS errors.
// ==========================================================================================
const SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycby4iIQMbJLVS5huozLDXZS-_7IoEJ6flg0UEOdgALvJdmWt1uNLBgxw9rvvRCSfJx46Ng/exec';
// ==========================================================================================


interface OrderFormProps {
    onSuccess: () => void;
}

// Helper components for form structure
const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <fieldset className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <legend className="px-2 text-lg font-semibold font-geist text-primary-violet">{title}</legend>
        <div className="space-y-4 pt-2">{children}</div>
    </fieldset>
);

const FormInput: React.FC<{ label: string, name: string, type?: string, placeholder?: string, required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">{label}</label>
        <input type={type} name={name} id={name} placeholder={placeholder} required={required} className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary-violet focus:border-primary-violet" />
    </div>
);

const FormTextarea: React.FC<{ label: string, name: string, rows?: number, placeholder?: string }> = ({ label, name, rows = 3, placeholder }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">{label}</label>
        <textarea name={name} id={name} rows={rows} placeholder={placeholder} className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary-violet focus:border-primary-violet"></textarea>
    </div>
);

const FormRadioGroup: React.FC<{ legend: string, name: string, options: { label: string, value: string }[] }> = ({ legend, name, options }) => (
    <fieldset>
        <legend className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">{legend}</legend>
        <div className="flex flex-wrap gap-4">
            {options.map(option => (
                <div key={option.value} className="flex items-center">
                    <input id={`${name}-${option.value}`} name={name} type="radio" value={option.value} className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 dark:border-gray-600" />
                    <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-light-text dark:text-dark-text">{option.label}</label>
                </div>
            ))}
        </div>
    </fieldset>
);

const FormCheckboxGroup: React.FC<{ legend: string, name: string, options: string[] }> = ({ legend, name, options }) => (
    <fieldset>
        <legend className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">{legend}</legend>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {options.map((option, i) => (
                <div key={i} className="flex items-center">
                    <input id={`${name}-${i}`} name={name} type="checkbox" value={option} className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 dark:border-gray-600 rounded" />
                    <label htmlFor={`${name}-${i}`} className="ml-2 block text-sm text-light-text dark:text-dark-text">{option}</label>
                </div>
            ))}
        </div>
    </fieldset>
);


const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const getCheckboxValues = (name: string) => 
            Array.from(form.querySelectorAll(`input[name="${name}"]:checked`))
                 .map(el => (el as HTMLInputElement).value)
                 .join(', ');

        const data = {
            Timestamp: new Date().toISOString(),
            BusinessName: formData.get('businessName'),
            FullName: formData.get('fullName'),
            Email: formData.get('email'),
            Phone: formData.get('phone'),
            CommunicationLanguage: formData.get('communicationLanguage'),
            BusinessType: formData.get('businessType'),
            BusinessDescription: formData.get('businessDescription'),
            TargetAudience: formData.get('targetAudience'),
            WebsiteGoal: getCheckboxValues('websiteGoal'),
            WebsiteType: formData.get('websiteType'),
            ExistingDomain: formData.get('existingDomain'),
            HasLogo: formData.get('hasLogo'),
            ColorPreferences: formData.get('colorPreferences'),
            PreferredStyle: formData.get('preferredStyle'),
            PagesNeeded: getCheckboxValues('pagesNeeded'),
            ContentReady: formData.get('contentReady'),
            FileUploadLink: formData.get('fileUploadLink'),
            FunctionalityNeeded: getCheckboxValues('functionalityNeeded'),
            SEO_Preference: formData.get('seoPreference'),
            MetaTitle: formData.get('metaTitle'),
            MetaDescription: formData.get('metaDescription'),
            Keywords: formData.get('keywords'),
            ImageAltText: formData.get('imageAltText'),
            TermsPolicy: formData.get('termsPolicy'),
            PrivacyPolicy: formData.get('privacyPolicy'),
            RefundPolicy: formData.get('refundPolicy'),
            DisclaimerPolicy: formData.get('disclaimerPolicy'),
            OptionalAddons: getCheckboxValues('optionalAddons'),
            Signature: formData.get('signature'),
        };

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    // Using text/plain helps avoid CORS preflight issues with Google Apps Script
                    'Content-Type': 'text/plain;charset=UTF-8',
                },
                body: JSON.stringify(data),
            });

            // Handle non-OK responses that still return a body (like script errors)
            if (!response.ok) {
                 const errorText = await response.text();
                 throw new Error(`Network response was not ok: ${response.statusText}. Response from server: ${errorText}`);
            }

            // A successful post to GAS often redirects, so a simple text response is expected.
            const textResponse = await response.text();
            
            try {
                // The script should return JSON, so we try to parse it.
                const result = JSON.parse(textResponse);
                if (result.status === 'success') {
                    onSuccess();
                } else {
                    throw new Error(result.message || 'An unknown error occurred from the script.');
                }
            } catch (parseError) {
                // This catches cases where the response is not valid JSON (e.g., an HTML error page from Google)
                console.error("Failed to parse server response as JSON:", textResponse);
                throw new Error("Received an invalid response from the server. This often indicates a script error or that the form data was not processed correctly.");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            let errorMessage = `There was an error submitting your form. Please try again.`;

            // Check for the specific "Failed to fetch" error, as it's almost always a CORS problem.
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                errorMessage = `Error: Could not connect to the server.\n\nThis is a CORS error. It means your Google Apps Script is not configured to accept requests from this website.\n\n**To fix this, you must re-deploy your script:**\n1. In the Apps Script editor, click "Deploy" > "New deployment".\n2. For "Who has access", you MUST select "Anyone".\n3. Copy the NEW Web app URL and paste it into the OrderForm.tsx file.`;
            } else {
                errorMessage += `\n\nDetails: ${error instanceof Error ? error.message : String(error)}`;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">{t('orderForm.intro')}</p>
            
            <FormSection title={t('orderForm.section1.title')}>
                <FormInput label={t('orderForm.section1.businessName')} name="businessName" required/>
                <FormInput label={t('orderForm.section1.fullName')} name="fullName" required/>
                <FormInput label={t('orderForm.section1.email')} name="email" type="email" required/>
                <FormInput label={t('orderForm.section1.phone')} name="phone" type="tel" required/>
                <FormInput label={t('orderForm.section1.language')} name="communicationLanguage"/>
            </FormSection>
            
            <FormSection title={t('orderForm.section2.title')}>
                <FormInput label={t('orderForm.section2.businessType')} name="businessType" />
                <FormTextarea label={t('orderForm.section2.description')} name="businessDescription" placeholder={t('orderForm.section2.descriptionPlaceholder')} />
                <FormInput label={t('orderForm.section2.audience')} name="targetAudience" placeholder={t('orderForm.section2.audiencePlaceholder')} />
                <FormCheckboxGroup name="websiteGoal" legend={t('orderForm.section2.goal')} options={t('orderForm.section2.goalOptions')} />
            </FormSection>

            <FormSection title={t('orderForm.section3.title')}>
                <FormInput label={t('orderForm.section3.websiteType')} name="websiteType" />
                <FormInput label={t('orderForm.section3.domain')} name="existingDomain" placeholder={t('orderForm.section3.domainPlaceholder')} />
                <FormRadioGroup legend={t('orderForm.section3.logo')} name="hasLogo" options={[{label: t('orderForm.section3.logoYes'), value: 'Yes'}, {label: t('orderForm.section3.logoNo'), value: 'No'}]} />
                <FormInput label={t('orderForm.section3.colors')} name="colorPreferences" />
                <FormInput label={t('orderForm.section3.style')} name="preferredStyle" />
            </FormSection>

            <FormSection title={t('orderForm.section4.title')}>
                <FormCheckboxGroup name="pagesNeeded" legend={t('orderForm.section4.pages')} options={t('orderForm.section4.pageOptions')} />
                <FormRadioGroup legend={t('orderForm.section4.contentReady')} name="contentReady" options={[{label: t('orderForm.section4.contentYes'), value: 'Yes, I will provide a link'}, {label: t('orderForm.section4.contentNo'), value: 'No, I need content creation'}]} />
                <FormInput label={t('orderForm.section4.uploadLink')} name="fileUploadLink" placeholder={t('orderForm.section4.uploadLinkPlaceholder')} />
                 <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{t('orderForm.section4.uploadHint')}</p>
            </FormSection>
            
            <FormSection title={t('orderForm.section5.title')}>
                <FormCheckboxGroup name="functionalityNeeded" legend={t('orderForm.section5.features')} options={t('orderForm.section5.featureOptions')} />
                <FormRadioGroup legend={t('orderForm.section5.seo')} name="seoPreference" options={[{label: t('orderForm.section5.seoOptions.yes'), value: 'Yes'}, {label: t('orderForm.section5.seoOptions.no'), value: 'No'}, {label: t('orderForm.section5.seoOptions.later'), value: 'Later'}]} />
            </FormSection>

            <FormSection title={t('orderForm.section6.title')}>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary -mt-2 mb-4">{t('orderForm.section6.intro')}</p>
                <FormInput label={t('orderForm.section6.metaTitle')} name="metaTitle" placeholder={t('orderForm.section6.metaTitlePlaceholder')} />
                <FormTextarea label={t('orderForm.section6.metaDescription')} name="metaDescription" placeholder={t('orderForm.section6.metaDescriptionPlaceholder')} />
                <FormInput label={t('orderForm.section6.keywords')} name="keywords" placeholder={t('orderForm.section6.keywordsPlaceholder')} />
                <FormTextarea label={t('orderForm.section6.imageAltText')} name="imageAltText" placeholder={t('orderForm.section6.imageAltTextPlaceholder')} />
            </FormSection>

            <FormSection title={t('orderForm.section7.title')}>
                <FormRadioGroup legend={t('orderForm.section7.terms')} name="termsPolicy" options={[{label: t('orderForm.section7.termsOptions.standard'), value: 'Standard'}, {label: t('orderForm.section7.termsOptions.custom'), value: 'Custom'}]} />
                <FormRadioGroup legend={t('orderForm.section7.privacy')} name="privacyPolicy" options={[{label: t('orderForm.section7.privacyOptions.standard'), value: 'Standard'}, {label: t('orderForm.section7.privacyOptions.custom'), value: 'Custom'}]} />
                <FormRadioGroup legend={t('orderForm.section7.refund')} name="refundPolicy" options={[{label: t('orderForm.section7.refundOptions.standard'), value: 'Standard'}, {label: t('orderForm.section7.refundOptions.custom'), value: 'Custom'}]} />
                <FormRadioGroup legend={t('orderForm.section7.disclaimer')} name="disclaimerPolicy" options={[{label: t('orderForm.section7.disclaimerOptions.include'), value: 'Include'}, {label: t('orderForm.section7.disclaimerOptions.none'), value: 'Not Required'}]} />
            </FormSection>

            <FormSection title={t('orderForm.section8.title')}>
                 <FormCheckboxGroup name="optionalAddons" legend={t('orderForm.section8.legend')} options={t('orderForm.section8.options')} />
            </FormSection>

            <FormSection title={t('orderForm.section9.title')}>
                <div className="space-y-2">
                    {[t('orderForm.section9.confirm1'), t('orderForm.section9.confirm2'), t('orderForm.section9.confirm3')].map((text, i) => (
                        <div key={i} className="flex items-start">
                            <input id={`confirm-${i}`} name={`confirm-${i}`} type="checkbox" required className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 dark:border-gray-600 rounded mt-1" />
                            <label htmlFor={`confirm-${i}`} className="ml-2 block text-sm text-light-text dark:text-dark-text">{text}</label>
                        </div>
                    ))}
                </div>
                 <div className="mt-4">
                    <FormInput label={t('orderForm.section9.signature')} name="signature" required />
                </div>
            </FormSection>
            
            <div className="flex justify-end pt-4">
                <button 
                    type="submit" 
                    className="px-8 py-3 text-base font-semibold text-white bg-primary-violet rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('orderForm.submitting') : t('orderForm.submitButton')}
                </button>
            </div>
        </form>
    );
};

export default OrderForm;