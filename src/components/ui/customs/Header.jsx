import React from "react";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo */}
      <img
        src="/logo.svg"
        alt="Logo"
        className="h-10 w-auto bg-white dark:bg-card rounded-lg shadow-md border border-border p-1 "
      />

      {/* Sign In Button */}
      <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors">
        Sign In
      </Button>
    </header>
  );
}

export default Header;

