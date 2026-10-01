"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ActiveDrawer = null | "Menu" | "Carrito" | "Buscar";

type MenuContextType = {
  activeDrawer: ActiveDrawer;
  openDrawer: (drawer: "Menu" | "Carrito" | "Buscar") => void;
  closeDrawer: () => void;
};

const PanelContext = createContext<MenuContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);

  return (
    <PanelContext.Provider
      value={{
        activeDrawer,
        openDrawer: (drawer) => setActiveDrawer(drawer),
        closeDrawer: () => setActiveDrawer(null),
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("No context provided");
  return ctx;
}
