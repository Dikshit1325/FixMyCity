import GovernmentPortalWireframe from './components/GovernmentPortalWireframe';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <GovernmentPortalWireframe />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          },
        }}
      />
    </div>
  );
}