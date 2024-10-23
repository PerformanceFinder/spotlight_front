import React from 'react';

export function Header() {

  return (
    <header className="flex items-center justify-between p-4 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/spotlight_logo.png"
              alt="Spotlight Logo"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-xl font-bold text-white tracking-tight">Spotlight</span>
          </div>
          <nav className="hidden md:block">
            {/* Navigation items can be added here */}
          </nav>
        </div>
      </header>
  );
}
