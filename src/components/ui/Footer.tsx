// @/components/ui/Footer.tsx
import Link from "next/link";
import { getNavigation } from "@/data/navigation";

export default async function Footer() {
  // Obtenemos la navegación dinámica (incluyendo las categorías desde la BD)
  const navigation = await getNavigation();

  // Buscamos el bloque de "Categorías" dentro de la navegación híbrida
  const categoriaNavItem = navigation.find((item) => item.name === "Categorías");
  const categoriasItems = categoriaNavItem?.children || [];

  const footerStaticList = [
    {
      label: "Local",
      items: [
        { label: "Nosotros", href: "/nosotros" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
    {
      label: "Social",
      items: [
        { label: "X", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Instagram", href: "#" },
      ],
    },
  ];

  return (
    <footer className="flex w-full bg-espresso py-12 md:pt-16">
      <div className="mx-auto max-w-container px-4 md:px-8 w-full">
        <nav>
          <div className="flex flex-col items-start justify-between pb-10">
            <Link
              href="/"
              className="flex flex-col items-start tracking-tight uppercase text-cream"
            >
              <span className="font-display font-bold text-3xl">LUCERO ORTEGA</span>
              <span className="text-xs font-sans tracking-widest px-2.5 py-1 rounded-full bg-cream/40 font-semibold text-espresso">
                Atelier 1994
              </span>
            </Link>
          </div>

          {/* Grid adaptativo para las columnas del footer */}
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {/* Columna Dinámica de Categorías */}
            {categoriasItems.length > 0 && (
              <li>
                <h4 className="text-sm font-semibold text-cream">Categorías</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {categoriasItems.map((cat) => (
                    <li key={cat.href} className="flex">
                      <Link
                        href={cat.href}
                        className="text-cream/80 hover:text-cream text-body-sm transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {/* Columnas Estáticas (Local y Social) */}
            {footerStaticList.map((section) => (
              <li key={section.label}>
                <h4 className="text-sm font-semibold text-cream">{section.label}</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item.label} className="flex">
                      <Link
                        href={item.href}
                        className="text-cream/80 hover:text-cream text-body-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Información de Contacto */}
          <div className="flex flex-col items-start mt-10 gap-2 border-t border-cream/10 pt-8">
            <div className="flex gap-2 items-center justify-center">
              <span className="material-symbols-outlined text-xl p-2 text-cream leading-none">
                alternate_email
              </span>
              <a
                href="mailto:luceroortegam45@gmail.com"
                className="font-sans text-body-sm text-cream/90 hover:text-cream"
              >
                luceroortegam45@gmail.com
              </a>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <span className="material-symbols-outlined text-xl p-2 text-cream leading-none">
                smartphone
              </span>
              <a
                href="https://wa.me/+573152180631"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-body-sm text-cream/90 hover:text-cream"
              >
                3152180631
              </a>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <span className="material-symbols-outlined text-xl p-2 text-cream leading-none">
                location_on
              </span>
              <a
                href="https://maps.app.goo.gl/zp6qmv1XKMGxmF8Q7"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-body-sm text-cream/90 hover:text-cream"
              >
                Calle 42 #43-47 Palmira, Valle del Cauca
              </a>
            </div>
          </div>
        </nav>

        {/* Fila inferior de Copyright */}
        <div className="mt-8 flex flex-col justify-between border-t border-cream/20 pt-8 md:mt-12 md:flex-row md:items-center">
          <span className="h-auto w-min" />
          <p className="text-sm text-cream/75">
            © 1994-2026 Lucero Ortega Atelier. Todos los derechos reservados. · Hecho por{" "}
            <a
              href="https://stroopdev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blush underline hover:text-cream transition-colors"
            >
              Juan D. García
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
