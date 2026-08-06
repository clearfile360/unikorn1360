import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle2, RefreshCw, AlertCircle, Trash2 } from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogo: string | null;
  onLogoUpdated: (newLogo: string | null) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  currentLogo,
  onLogoUpdated
}) => {
  const [previewLogo, setPreviewLogo] = useState<string | null>(currentLogo);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setError(null);
    setSuccess(null);

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WEBP, or GIF).');
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewLogo(result);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    try {
      if (previewLogo) {
        localStorage.setItem('unikorn_brand_logo', previewLogo);
        onLogoUpdated(previewLogo);
        window.dispatchEvent(new CustomEvent('unikorn_logo_updated', { detail: previewLogo }));
      } else {
        localStorage.removeItem('unikorn_brand_logo');
        onLogoUpdated(null);
        window.dispatchEvent(new CustomEvent('unikorn_logo_updated', { detail: null }));
      }
      setSuccess('Brand logo updated successfully across UNIKORN360!');
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1200);
    } catch (err: any) {
      setError('Could not save logo: ' + (err.message || 'Storage limit exceeded. Try a smaller image.'));
    }
  };

  const handleResetDefault = () => {
    setPreviewLogo(null);
    localStorage.removeItem('unikorn_brand_logo');
    onLogoUpdated(null);
    window.dispatchEvent(new CustomEvent('unikorn_logo_updated', { detail: null }));
    setSuccess('Reset to default UNIKORN360 emblem.');
    setTimeout(() => {
      onClose();
      setSuccess(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white border-2 border-[#D4AF37] rounded-xl shadow-2xl p-6 sm:p-8 text-[#1A1A1A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#001F3F] rounded-full hover:bg-gray-100 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 rounded-full bg-[#001F3F] text-[#D4AF37] shadow">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#001F3F] uppercase tracking-wider">
              Upload Company Logo
            </h3>
            <p className="text-xs text-gray-500">
              Customize UNIKORN360 with your corporate brand identity
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-3 rounded-lg text-xs flex items-center space-x-2 font-semibold bg-green-50 border border-green-200 text-green-700">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-xs flex items-center space-x-2 font-semibold bg-red-50 border border-red-200 text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Logo Preview Section */}
        <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Active Preview
            </span>
            <span className="text-xs text-gray-600">
              {previewLogo ? 'Custom brand logo selected' : 'Default UNIKORN360 emblem (U3)'}
            </span>
          </div>

          <div className="w-16 h-16 rounded-lg bg-[#001F3F] border-2 border-[#D4AF37] flex items-center justify-center p-1.5 shadow-md shrink-0">
            {previewLogo ? (
              <img
                src={previewLogo}
                alt="Brand Logo Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center font-bold text-xl text-[#D4AF37]">
                U3
              </div>
            )}
          </div>
        </div>

        {/* Drag and Drop File Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragActive
              ? 'border-[#001F3F] bg-blue-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-[#D4AF37] bg-gray-50/50 hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="inline-flex p-3 rounded-full bg-white text-[#001F3F] border border-gray-200 shadow-sm mb-3">
            <Upload className="w-6 h-6 text-[#001F3F]" />
          </div>
          <h4 className="text-xs font-bold text-[#001F3F] uppercase tracking-wider mb-1">
            Click to upload or drag & drop logo
          </h4>
          <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
            Supports PNG, JPG, WEBP, SVG, or GIF (Transparent background recommended, max 5MB)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#001F3F] text-white border border-[#D4AF37] font-bold py-2.5 px-4 rounded-lg shadow hover:bg-[#002B5B] transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Apply Brand Logo</span>
          </button>

          {previewLogo && (
            <button
              onClick={handleResetDefault}
              className="bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 font-semibold py-2.5 px-4 rounded-lg border border-gray-300 hover:border-red-200 transition-all text-xs flex items-center justify-center space-x-1.5"
              title="Reset to default emblem"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset to Default</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
