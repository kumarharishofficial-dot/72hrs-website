import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../hooks/useLanguage';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const CompetitorAnalysis: React.FC = () => {
    const { t } = useLanguage();
    const [loading, setLoading] = useState<boolean>(true);
    const [analysis, setAnalysis] = useState<string>('');
    const [sources, setSources] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = React.useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!process.env.API_KEY) {
                setError("API key is missing. Please set up the environment variables.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const prompt = "Find companies that offer to build and launch a website in 72 hours or 3 days for a price around $25 USD or 2000 INR. List their names, key features, pricing, and what makes them different. Format the response as simple markdown.";
                
                const response = await ai.models.generateContent({
                   model: "gemini-2.5-flash",
                   contents: prompt,
                   config: {
                     tools: [{googleSearch: {}}],
                   },
                });

                setAnalysis(response.text);
                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (groundingChunks) {
                    setSources(groundingChunks);
                }

            } catch (err) {
                console.error("Error fetching competitor analysis:", err);
                setError(err instanceof Error ? err.message : "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (isVisible) {
            fetchAnalysis();
        }
    }, [isVisible]);

    const renderAnalysis = () => {
        if (loading) {
            return (
                <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="mt-6 h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-500 text-center">{`Error fetching analysis: ${error}`}</p>;
        }

        return (
            <div className="prose prose-lg dark:prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary" style={{whiteSpace: 'pre-wrap'}}>
                {analysis || "No analysis available."}
            </div>
        );
    };

    return (
        <section id="comparison" ref={sectionRef} className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('comparison.title')}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
                        {t('comparison.subtitle')}
                    </p>
                </div>
                <div className="max-w-4xl mx-auto p-8 bg-light-card dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
                    {renderAnalysis()}
                    {sources.length > 0 && !loading && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-3">Information Sources from Google Search:</h4>
                            <ul className="space-y-2">
                                {sources.map((source, index) => (
                                    source.web && <li key={index}>
                                        <a 
                                            href={source.web.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-sm text-primary-violet hover:underline flex items-center"
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            <span className="truncate">{source.web.title || source.web.uri}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CompetitorAnalysis;
