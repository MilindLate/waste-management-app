import { useState } from 'react';
import { Plus, Calendar, MapPin, FileText, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface QuickActionButtonProps {
  role: 'citizen' | 'dealer' | 'admin';
  onSchedulePickup?: () => void;
}

export default function QuickActionButton({ role, onSchedulePickup }: QuickActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = {
    citizen: [
      { icon: Calendar, label: 'Schedule Pickup', color: 'bg-blue-600', onClick: onSchedulePickup },
      { icon: MapPin, label: 'Track Request', color: 'bg-emerald-600' },
      { icon: FileText, label: 'View History', color: 'bg-purple-600' }
    ],
    dealer: [
      { icon: MapPin, label: 'View Route', color: 'bg-orange-600' },
      { icon: Calendar, label: 'Today\'s Collections', color: 'bg-blue-600' },
      { icon: FileText, label: 'Reports', color: 'bg-purple-600' }
    ],
    admin: [
      { icon: FileText, label: 'Generate Report', color: 'bg-purple-600' },
      { icon: MapPin, label: 'Zone Management', color: 'bg-blue-600' },
      { icon: Calendar, label: 'Schedule', color: 'bg-orange-600' }
    ]
  };

  const currentActions = actions[role];

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3"
          >
            {currentActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  className={`${action.color} text-white shadow-lg gap-2 whitespace-nowrap`}
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </Button>
    </div>
  );
}
