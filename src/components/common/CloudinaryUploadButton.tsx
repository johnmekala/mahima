import React, { useRef, useState } from 'react';
import { UploadCloud, Loader2, Check } from 'lucide-react';
import { uploadToCloudinary } from '../../services/cloudinary';

interface CloudinaryUploadButtonProps {
  onUploadSuccess: (url: string, publicId: string) => void;
  buttonText?: string;
  className?: string;
  accept?: string;
  folder?: string;
  resourceType?: 'image' | 'video' | 'auto';
}

export const CloudinaryUploadButton: React.FC<CloudinaryUploadButtonProps> = ({
  onUploadSuccess,
  buttonText = 'Upload to Cloudinary',
  className = '',
  accept = 'image/*',
  folder = 'wedding_sunitha_prasad',
  resourceType = 'auto',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setIsSuccess(false);

    try {
      const result = await uploadToCloudinary(file, { folder, resourceType });
      setIsSuccess(true);
      onUploadSuccess(result.secure_url, result.public_id);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      alert(`Cloudinary Upload Error: ${err.message || 'Failed to upload'}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="inline-block">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-serif tracking-wider transition-all shadow-xs disabled:opacity-50 active:scale-95 ${
          isSuccess
            ? 'bg-[#597B6B] text-white'
            : 'bg-[#FDFAF7] border border-[#D8D0C9] text-[#66564D] hover:border-[#8EAFA0] hover:text-[#395246] hover:bg-[#EBF2EE]'
        } ${className}`}
        title="Upload image directly to Cloudinary (cloud: hl15ad6n)"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#8EAFA0]" />
            <span>Uploading to Cloud...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="h-3.5 w-3.5 text-white" />
            <span>Uploaded!</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-3.5 w-3.5 text-[#8EAFA0]" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </div>
  );
};
