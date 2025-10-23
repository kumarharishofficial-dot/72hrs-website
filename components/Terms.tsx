import React from 'react';
import LegalLayout from './LegalLayout';
import { useLanguage } from '../hooks/useLanguage';

interface ContentItem {
    type: 'p' | 'h2' | 'ul';
    text?: string;
    items?: string[];
}

const RightArrowIcon = () => (
    <svg className="h-5 w-5 text-primary-violet flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const Terms: React.FC = () => {
    const { t } = useLanguage();
    const content = t('terms');

    const renderContent = (item: ContentItem, index: number) => {
        switch (item.type) {
            case 'h2':
                return <h2 key={index} className="text-2xl font-bold font-geist mt-8 mb-4 text-light-text dark:text-dark-text">{item.text}</h2>;
            case 'p':
                return <p key={index}>{item.text}</p>;
            case 'ul':
                 return (
                    <ul key={index} className="space-y-3">
                        {item.items?.map((li: string, i: number) => (
                            <li key={i} className="flex items-start">
                                <span className="mr-3 mt-1"><RightArrowIcon /></span>
                                <span>{li}</span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <LegalLayout title={content.title}>
             <p className="text-sm italic mb-6 text-gray-500 dark:text-gray-400">{content.lastUpdated.replace('{date}', new Date().toLocaleDateString('en-CA'))}</p>
            {content.content.map(renderContent)}
        </LegalLayout>
    );
};

export default Terms;