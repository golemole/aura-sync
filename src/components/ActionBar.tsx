import { Watch, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActionBar = () => {
  return (
    <div className="glass p-4 md:p-5">
      <Button 
        className="w-full h-14 md:h-16 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground font-semibold text-base md:text-lg rounded-2xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] group"
      >
        <Watch className="w-5 h-5 md:w-6 md:h-6 mr-3 group-hover:animate-pulse" />
        <span>Sync Wearable</span>
        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default ActionBar;
