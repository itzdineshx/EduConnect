import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AIChatbot } from '../features/AIChatbot';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}