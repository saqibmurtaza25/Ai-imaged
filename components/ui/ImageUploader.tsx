
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageChange: (file: File | null, base64: string | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      const base64 = await fileToBase64(file);
      onImageChange(file, base64);
    }
  }, [onImageChange]);
  
  const handleRemoveImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageChange(null, null);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, [previewUrl, onImageChange]);

  if (previewUrl) {
    return (
      <div className="relative group">
        <img src={previewUrl} alt="Image preview" className="w-full h-auto rounded-lg max-h-48 object-contain bg-slate-900" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <button
            type="button"
            onClick={handleRemoveImage}
            className="bg-red-600 text-white rounded-full p-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="image-upload" className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h2l2 2h4a2 2 0 012 2v2m-6 6l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <p className="mb-2 text-sm">
            <span className="font-semibold">Attach an image</span> (optional)
          </p>
          <p className="text-xs">PNG, JPG, WEBP</p>
        </div>
        <input id="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
      </label>
      <p className="text-xs text-slate-500 mt-2">
        Attaching an image switches to edit mode. Aspect ratio & resolution settings will be disabled.
      </p>
    </div>
  );
};

export default ImageUploader;
