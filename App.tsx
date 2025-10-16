
import React, { useState, useEffect } from 'react';
import ImageGeneratorForm from './components/ImageGeneratorForm';
import ImageDisplay from './components/ImageDisplay';
import { generateImage } from './services/geminiService';
import { GenerationOptions, Style, AspectRatio, Resolution } from './types';

interface AttachedImage {
  file: File;
  base64: string;
}

const App: React.FC = () => {
  const [options, setOptions] = useState<GenerationOptions>({
    prompt: '',
    style: Style.REALISTIC,
    aspectRatio: AspectRatio.SQUARE,
    resolution: Resolution.UHD,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<AttachedImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (attachedImage) {
      const url = URL.createObjectURL(attachedImage.file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [attachedImage]);


  const handleImageChange = (file: File | null, base64: string | null) => {
    if (file && base64) {
      setAttachedImage({ file, base64 });
    } else {
      setAttachedImage(null);
    }
  };

  const handleGenerateImage = async () => {
    if (!options.prompt.trim()) {
      setError("Please enter a prompt to generate or edit the image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const imageOptions = attachedImage ? { base64: attachedImage.base64, mimeType: attachedImage.file.type } : undefined;
      const url = await generateImage(options, imageOptions);
      setImageUrl(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            PhotoReal AI Generator
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Create or edit stunning, watermark-free images with camera-grade realism.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-1 lg:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-slate-100">Customize Your Vision</h2>
            <ImageGeneratorForm
              options={options}
              setOptions={setOptions}
              onSubmit={handleGenerateImage}
              isLoading={isLoading}
              onImageChange={handleImageChange}
              hasImage={!!attachedImage}
            />
             <div className="mt-6 text-xs text-slate-500 text-center">
              <p>Your privacy is respected. Images are not stored and metadata is not tracked.</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-3">
             <ImageDisplay
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
              prompt={options.prompt}
              inputImageUrl={previewUrl}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
