"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePanel } from "@/components/context/PanelContext";
import { NavItem } from "@/data/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Menubar({ navigation }: { navigation: NavItem[] }) {
  const { activeDrawer, closeDrawer } = usePanel();
  const isOpen = activeDrawer === "Menu";
  const pathname = usePathname();
  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
      {/* Overlay */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out
        data-closed:opacity-0"
      />

      {/* Panel */}
      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative flex h-full w-full max-w-xs flex-col bg-cream 
          shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 ease-in-out
          data-closed:-translate-x-full"
        >
          <div className="flex items-center justify-between p-4 pb-4">
            <div className="flex flex-col items-start justify-between">
              <Link href="/" className="flex flex-col items-start tracking-tight uppercase gap-1">
                <span className="font-display font-bold text-heading-xl text-espresso">
                  LUCERO ORTEGA
                </span>
                <span className="text-xs font-sans tracking-widest px-2.5 py-1 rounded-full bg-gold-dark/60 text-cream font-semibold">
                  Atelier 1994
                </span>
              </Link>
            </div>
            <Button
              as="button"
              onClick={closeDrawer}
              aria-label="Cerrar menu"
              aria-expanded={activeDrawer === "Menu"}
              className="relative -m-2 p-2 text-espresso/80 hover:text-espresso"
            >
              <span className="absolute -inset-0.5" />
              <span className="material-symbols-outlined text-2xl leading-none">close</span>
            </Button>
          </div>
          <nav className="flex flex-col divide-y divide-espresso/10">
            {navigation.map((item) =>
              item.children ? (
                <Disclosure key={item.name} as="div">
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        className="flex w-full items-center justify-between px-6 py-3 font-sans 
                      text-body-lg text-espresso/80 hover:bg-espresso/5 rounded-md transition-all ease-in-out duration-200"
                      >
                        {item.name}
                        <span
                          className={classNames(
                            "material-symbols-outlined text-xl transition-all ease-in-out duration-200",
                            open ? "rotate-180" : "",
                          )}
                        >
                          expand_more
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="flex flex-col">
                        {item.children?.map((child) => {
                          const isCurrent = pathname === child.href;
                          return (
                            <Button
                              as="a"
                              key={child.name}
                              href={child.href}
                              onClick={closeDrawer}
                              aria-current={isCurrent ? "page" : undefined}
                              className={classNames(
                                isCurrent
                                  ? "font-bold bg-gold-dark/60 text-cream"
                                  : "text-espresso/80 hover:bg-gold-dark/5",
                                "inset-0 px-6 py-3 font-sans text-body-lg transition-all ease-in-out duration-200",
                              )}
                            >
                              {child.name}
                            </Button>
                          );
                        })}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ) : (
                <Button
                  as="a"
                  key={item.name}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={classNames(
                    pathname === item.href
                      ? "font-bold bg-gold-dark/60 text-cream"
                      : "text-espresso/80 hover:bg-gold-dark/5",
                    "inset-0 px-6 py-3 font-sans text-body-lg transition-all ease-in-out duration-200",
                  )}
                >
                  {item.name}
                </Button>
              ),
            )}
          </nav>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
