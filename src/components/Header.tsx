import { Bell, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-1">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gradient">Aura Health</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Welcome back</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="glass w-10 h-10 flex items-center justify-center glass-hover">
          <Bell className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="glass w-10 h-10 flex items-center justify-center glass-hover">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
