"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, Salad } from "lucide-react";
import { ModeToggle } from "./modetoggle";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UploadRecipe from "./uploadrecipe";

const links = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: Salad,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed left-1/2 mx-auto mt-4 flex w-full max-w-4xl -translate-x-1/2 flex-wrap items-center justify-between gap-4 rounded-full border bg-neutral-200/25 p-4 backdrop-blur dark:bg-neutral-800/25">
      <Button asChild variant="ghost" className="text-base font-bold">
        <Link href="/">Recipe</Link>
      </Button>

      <nav>
        <ul className="flex items-center justify-center gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <Button
                asChild
                variant={pathname === link.url ? "default" : "ghost"}
              >
                <Link href={link.url}>
                  <link.icon /> {link.title}
                </Link>
              </Button>
            </li>
          ))}
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <Plus /> New recipe
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-4">Upload New Recipe</DialogTitle>
                  <UploadRecipe />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </nav>

      <ModeToggle />
    </header>
  );
}
