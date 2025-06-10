import React, { createContext, useContext, useState } from "react";

type Plano = '1' | '2' | null;

interface PlanoContextType {
    plano: Plano;
    setPlano: (plano: Plano) => void;
    isFreteGratis: boolean;
    temDesconto: boolean;
}

const PlanoContext = createContext<PlanoContextType | undefined>(undefined);

export const PlanoProvider = ({ children }: { children: React.ReactNode }) => {
    const [plano, setPlano] = useState<Plano>(null);

    const isFreteGratis = plano === '1' || plano === '2';
    const temDesconto = plano === '2';

    return (
        <PlanoContext.Provider value={{ plano, setPlano, isFreteGratis, temDesconto }}>
        {children}
        </PlanoContext.Provider>
    );
};

export const usePlano = () => {
    const context = useContext(PlanoContext);
    if (!context) throw new Error("usePlano deve estar dentro do PlanoProvider");
    return context;
};
