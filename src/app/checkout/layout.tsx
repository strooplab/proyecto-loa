// @/src/app/checkout/layout.tsx
import { ContextProvider } from "@/components/context/PanelContext";

export default function Checkoutlayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="flex items-center py-4 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-heading-lg font-display font-bold text-espresso">LOA</span>
            <p className="text-body-lg font-sans text-espresso/60">|</p>
            <p className="text-body-lg font-sans text-espresso/60">Orden</p>
          </div>
        </header>
        <main className="grow">{children}</main>
      </div>
    </ContextProvider>
  );
}
