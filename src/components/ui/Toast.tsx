import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  title: string;
  description: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const toastStore = {
  toasts: [] as ToastProps[],
  listeners: new Set<() => void>(),
  
  addToast(toast: ToastProps) {
    this.toasts.push(toast);
    this.notify();
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        this.removeToast(toast);
      }, toast.duration || 5000);
    }
  },
  
  removeToast(toast: ToastProps) {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
      this.notify();
    }
  },
  
  notify() {
    this.listeners.forEach(listener => listener());
  }
};

export const toast = (props: ToastProps) => {
  toastStore.addToast(props);
};

export function Toast() {
  const [toasts, setToasts] = useState(toastStore.toasts);
  
  useEffect(() => {
    const listener = () => setToasts([...toastStore.toasts]);
    toastStore.listeners.add(listener);
    return () => {
      toastStore.listeners.delete(listener);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={cn(
              'min-w-[300px] rounded-lg p-4 shadow-lg',
              toast.type === 'success' && 'bg-success-50 dark:bg-success-900/30',
              toast.type === 'error' && 'bg-error-50 dark:bg-error-900/30',
              toast.type === 'warning' && 'bg-warning-50 dark:bg-warning-900/30',
              toast.type === 'info' && 'bg-info-50 dark:bg-info-900/30'
            )}
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' && (
                <CheckCircle className="h-5 w-5 text-success-500" />
              )}
              {toast.type === 'error' && (
                <XCircle className="h-5 w-5 text-error-500" />
              )}
              {toast.type === 'warning' && (
                <AlertCircle className="h-5 w-5 text-warning-500" />
              )}
              {toast.type === 'info' && (
                <AlertCircle className="h-5 w-5 text-info-500" />
              )}
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {toast.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {toast.description}
                </p>
              </div>
              
              <button
                onClick={() => toastStore.removeToast(toast)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 