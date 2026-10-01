// @/components/sections/CategoryFilters.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FilterItem } from "@/utils/filters";
import Link from "next/link";

interface CategoryFiltersProps {
  filters: FilterItem[];
}

export default function CategoryFilters({ filters = [] }: CategoryFiltersProps) {
  const searchParams = useSearchParams();

  // Default: Destacados
  const currentSort = searchParams.get("sort") || "destacados";
  const currentColor = searchParams.get("color");

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    // Actualizar contenido con filtro
    return params.toString();
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-b border-espresso/10 mb-8">
      <p className="text-xs font-sans uppercase tracking-widest text-espresso/60">
        Filtrar y ordenar
      </p>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {filters.map((option, index) => {
          if (option.children) {
            const isAnyChildSelected = option.children.some(
              (child) => child.slug && currentColor === child.slug,
            );

            const activeColorLabel = option.children.find((c) => c.slug === currentColor)?.nombre;

            return (
              <Menu
                as="div"
                key={index}
                className="relative inline-flex text-left focus:border-transparent"
              >
                <MenuButton
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-label focus:border-transparent font-sans uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isAnyChildSelected
                      ? "bg-espresso/20 text-espresso font-semibold border border-espresso/30"
                      : "bg-transparent text-espresso/70 hover:bg-espresso/5 border border-espresso"
                  }`}
                >
                  {activeColorLabel || option.label}
                  <span className="material-symbols-outlined text-sm fill-espresso transition-all ease-in-out duration-200 group-hover:rotate-180">
                    expand_more
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom start"
                  className="w-48 origin-top-left rounded-md bg-cream p-1 text-label text-espresso border-espresso  shadow-lg ring-1 ring-black/5 transition duration-100 ease-out [--anchor-gap:--spacing(1)] data-closed:scale-95 data-closed:opacity-0"
                >
                  {option.children.map((child) => {
                    const isSelected =
                      currentColor === child.slug || (!currentColor && child.slug === "");
                    return (
                      <MenuItem key={child.slug || "all"}>
                        <Link
                          href={`?${createQueryString("color", child.slug)}`}
                          scroll={false}
                          className={`flex px-4 py-2 text-label font-sans uppercase tracking-wider rounded-md tansition-colors ${
                            isSelected
                              ? "bg-espresso/20 text-espresso font-semibold"
                              : "text-espresso/70 hover:bg-espresso/5"
                          }`}
                        >
                          {child.nombre}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </MenuItems>
              </Menu>
            );
          }
          const isSelected = currentSort === option.value;
          return (
            <Link
              key={option.value}
              href={`?${createQueryString("sort", option.value)}`}
              scroll={false}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                isSelected
                  ? "bg-espresso/20 text-espresso font-semibold border border-espresso/30"
                  : "bg-transparent text-espresso/70 hover:bg-espresso/5 border border-transparent"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
