import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, X, Sparkles, AlertCircle } from 'lucide-react';
import { useWeddingCms } from '../../context/CmsContext';
import { ChristianCross } from '../common/FloralDecor';

interface CmsLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CmsLoginModal: React.FC<CmsLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useWeddingCms();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoUnlock = () => {
    login('grace2026');
    setError(false);
    onSuccess();
  };

  const handleClose = () => {
    if (window.location.pathname.toLowerCase().replace(/\/+$/, '') === '/admin') {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#43362F]/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-md rounded-3xl bg-[#FDFAF7] border border-[#DCE8E2] card-shadow p-7 sm:p-9 text-center"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#A8978A] hover:bg-[#EDE4DC]/60 hover:text-[#43362F] transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF2EE] border border-[#8EAFA0] text-[#597B6B] mb-4 shadow-xs">
          <Lock className="h-6 w-6" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          <ChristianCross size={16} className="text-[#8EAFA0]" />
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#A8978A]">
            Administrative Portal
          </p>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-normal mb-2">
          Wedding CMS Access
        </h3>

        <p className="font-serif italic text-xs text-[#66564D] max-w-xs mx-auto mb-6">
          Enter your secure Admin PIN to manage every section, photo, event, and RSVP of the wedding website.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative text-left">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
            <input
              type="password"
              required
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter Admin PIN"
              className={`w-full rounded-xl border bg-[#F8F3EE] pl-10 pr-4 py-3 text-sm text-[#43362F] tracking-widest focus:outline-none focus:ring-1 ${
                error
                  ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                  : 'border-[#D8D0C9] focus:border-[#8EAFA0] focus:ring-[#8EAFA0]'
              }`}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-medium">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Incorrect PIN. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#8EAFA0] py-3 text-sm font-serif tracking-wider uppercase text-white shadow-md hover:bg-[#597B6B] transition-all hover:shadow-lg active:scale-95"
          >
            <span>Unlock CMS Dashboard</span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#A8978A]/20">
          <button
            type="button"
            onClick={handleQuickDemoUnlock}
            className="inline-flex items-center gap-1.5 text-xs font-serif tracking-wide text-[#8EAFA0] hover:text-[#597B6B] hover:underline transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick Demo Unlock (PIN: grace2026)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

