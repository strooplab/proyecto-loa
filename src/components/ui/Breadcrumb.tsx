"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null; // No se usa en el landing page

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { name: "Inicio", href: "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      // "blusa-cuadros" -> "Blusa Cuadros"
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return { name, href };
    }),
  ];

  if (breadcrumbs.length <= 1) return null;

  const isNoBannerPage = segments.length > 2 && !pathname.startsWith("/categorias");
  const textBg = isNoBannerPage ? "text-espresso/80" : "text-cream/80";
  const iconBg = isNoBannerPage ? "text-espresso" : "text-cream";
  const linkHover = isNoBannerPage ? "hover:text-espresso" : "hover:text-cream";

  return (
    <nav aria-label="Breadcrumb" className="px-2 py-6">
      <ul className={`flex items-center gap-2 text-sm ${textBg}`}>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {!isLast ? (
                <Link href={item.href} className={`${linkHover} transition-colors`}>
                  {item.name}
                </Link>
              ) : (
                <span className={`${iconBg} font-medium`} aria-current="page">
                  {item.name}
                </span>
              )}

              {/* Separador */}
              {!isLast && (
                <span
                  className="material-symbols-outlined fill-cream/60"
                  style={{
                    fontSize: "14px",
                    fontVariationSettings: "'opsz' 48",
                  }}
                >
                  arrow_forward_ios
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
