import React from 'react';
import { Mail, AlertTriangle, Send, X } from 'lucide-react';
import { GmailSendParams } from '../../services/gmailAuth';

interface SendEmailConfirmationModalProps {
  isOpen: boolean;
  params: GmailSendParams | null;
  senderEmail?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSending?: boolean;
}

export const SendEmailConfirmationModal: React.FC<SendEmailConfirmationModalProps> = ({
  isOpen,
  params,
  senderEmail,
  onConfirm,
  onCancel,
  isSending = false,
}) => {
  if (!isOpen || !params) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative text-white space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e355b]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D6B15C]/20 border border-[#D6B15C]/40 flex items-center justify-center text-[#D6B15C]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Confirm Gmail Dispatch</h3>
              <p className="text-[11px] text-[#9EACC1]">You are about to send an email using Gmail</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isSending}
            className="text-[#9EACC1] hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Warning Notice */}
        <div className="p-3 rounded-xl bg-[#081426] border border-[#1e355b] text-xs space-y-2">
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span>From (Authenticated Gmail):</span>
            <span className="font-mono text-white font-bold">{senderEmail || 'Your Google Account'}</span>
          </div>
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span>Recipient (To):</span>
            <span className="font-mono text-[#D6B15C] font-bold">{params.to}</span>
          </div>
          <div className="flex items-center justify-between text-[#9EACC1]">
            <span>Subject:</span>
            <span className="text-white font-medium truncate max-w-[280px]">{params.subject}</span>
          </div>
        </div>

        {/* Message preview snippet */}
        <div>
          <label className="text-[11px] text-[#9EACC1] uppercase font-semibold block mb-1">
            Email Body Preview:
          </label>
          <div className="p-3 bg-[#081426] border border-[#1e355b] rounded-xl text-xs text-[#9EACC1] font-mono max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {params.body}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSending}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1e355b] hover:bg-[#284675] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSending}
            className="px-5 py-2 text-xs font-bold text-[#081426] bg-[#D6B15C] hover:bg-[#e2c172] rounded-xl transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? 'Sending via Gmail API...' : 'Confirm & Send Email'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
