import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (href: string) => void;
}

export const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  const handlePopState = useCallback(() => {
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  const navigate = useCallback((href: string) => {
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};