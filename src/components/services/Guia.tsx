// @/components/services/Guia.tsx
"use client";

import { useState } from "react";
import GuiaDeTallasModal from "@/components/ui/GuiaDeTallas";

export default function GuiaModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="text-sm font-medium text-espresso/70 hover:text-espresso underline underline-offset-4 cursor-pointer bg-transparent border-none p-0"
      >
        Guía de tallas
      </button>

      <GuiaDeTallasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
