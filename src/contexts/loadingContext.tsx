import React, { createContext, useContext, useState, ReactNode  } from 'react';
import Loader from "@/components/ui/loader/loader";

type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

// Создаем контекст
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {}
});

// Провайдер контекста
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {isLoading && <Loader/>}
      {children}
    </LoadingContext.Provider>
  )
};

// Хук для использования контекста
export const useLoading = () => {
  return useContext(LoadingContext);
};
