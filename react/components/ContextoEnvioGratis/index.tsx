import React, { createContext, useState } from "react";
import { Registro } from "../../typings/definitions";

type Props = {
  children: React.ReactNode;
}

type ContextoEnviosGratis = {
  referencias: Registro[]
  setReferencias: React.Dispatch<React.SetStateAction<Registro[]>>
}

const Context = createContext<ContextoEnviosGratis | null>(null);

const ContextoEnvioGratis = ({children}:Props) => {

  //ESTADOS
  const [referencias, setReferencias] = useState<Registro[]>([]);

  //JSX
  return(
    <Context.Provider
      value={{
        referencias: referencias,
        setReferencias: setReferencias
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextoEnvioGratis, Context };
