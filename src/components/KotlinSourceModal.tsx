import React, { useState } from 'react';
import { Copy, Check, Download, Code2, ExternalLink } from 'lucide-react';
import { KOTLIN_ORIGINAL_CODE } from '../data/initialData';

interface KotlinSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KotlinSourceModal: React.FC<KotlinSourceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(KOTLIN_ORIGINAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([KOTLIN_ORIGINAL_CODE], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'MainActivity.kt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#12233D] border border-[#1e355b] w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0c1a30] border-b border-[#1e355b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D6B15C]/15 border border-[#D6B15C]/30 flex items-center justify-center text-[#D6B15C]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                MainActivity.kt
                <span className="text-[10px] font-mono text-[#43B581] bg-[#43B581]/15 px-2 py-0.5 rounded">
                  Android Jetpack Compose
                </span>
              </h3>
              <p className="text-xs text-[#9EACC1]">
                com.example.investmentapp · MH BD INVEST Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-[#D6B15C] hover:bg-[#1e355b] border border-[#D6B15C]/40 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#43B581]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1e355b] border border-[#1e355b] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .kt</span>
            </button>

            <button
              onClick={onClose}
              className="text-[#9EACC1] hover:text-white p-1.5 rounded-lg hover:bg-[#1e355b]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-auto p-4 bg-[#081426] font-mono text-xs leading-relaxed text-[#9EACC1] select-all">
          <pre className="text-white/90">
            <code>{KOTLIN_ORIGINAL_CODE}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#0c1a30] border-t border-[#1e355b] flex items-center justify-between text-xs text-[#9EACC1] shrink-0">
          <span>Target Platform: Android API 26+ · Material3 Theme</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1e355b] hover:bg-[#284675] rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
