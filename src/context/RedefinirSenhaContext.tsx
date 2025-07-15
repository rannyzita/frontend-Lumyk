import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RedefinirSenhaContextData {
    email: string;
    setEmail: (email: string) => void;
    codigoEnviado: boolean;
    setCodigoEnviado: (valor: boolean) => void;
}

const RedefinirSenhaContext = createContext<RedefinirSenhaContextData>({} as RedefinirSenhaContextData);

export const RedefinirSenhaProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState(false);

    return (
        <RedefinirSenhaContext.Provider value={{ email, setEmail, codigoEnviado, setCodigoEnviado }}>
            {children}
        </RedefinirSenhaContext.Provider>
    );
};

export const useRedefinirSenha = () => useContext(RedefinirSenhaContext);
