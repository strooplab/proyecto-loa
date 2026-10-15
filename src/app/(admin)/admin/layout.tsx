// @/app/(admin)/admin/layout.tsx
import React, { Suspense } from "react";
import { requireAdmin } from "@/lib/admin";

async function Gate({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>Cargando</p>}>
      <Gate>
        <main className="bg-cream">{children}</main>
      </Gate>
    </Suspense>
  );
}
