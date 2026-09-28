import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#E0E3EB] flex items-center justify-between bg-[#F8F9FD]">
          <div className="flex items-center gap-2.5">
            <svg className="w-7 h-5 fill-[#131722]" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 11h-6v17h6V11z"></path>
            </svg>
            <span className="font-bold text-lg text-[#131722]">Welcome to TradingView</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-[#787B86] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center text-[#089981]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-[#089981]" />
              </div>
              <h3 className="text-lg font-bold text-[#131722]">Account Connected</h3>
              <p className="text-xs text-[#787B86] mt-1">
                You now have full access to real-time streams and Supercharts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#787B86]">
                Sign in to customize watchlists, sync alerts across desktop and mobile, and view high-speed market feeds.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#131722] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E3EB] text-sm outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-cta text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md transition active:scale-98 cursor-pointer"
              >
                Continue with Email
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E0E3EB]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-[#787B86]">or social log in</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(true);
                    setTimeout(() => {
                      setIsSuccess(false);
                      onClose();
                    }, 1500);
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-[#E0E3EB] rounded-xl text-xs font-semibold hover:bg-[#F8F9FD] transition cursor-pointer"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(true);
                    setTimeout(() => {
                      setIsSuccess(false);
                      onClose();
                    }, 1500);
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-[#E0E3EB] rounded-xl text-xs font-semibold hover:bg-[#F8F9FD] transition cursor-pointer"
                >
                  <span>Apple</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
