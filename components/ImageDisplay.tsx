
import React from 'react';
import Button from './ui/Button';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  inputImageUrl?: string | null;
}

const Placeholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="text-lg font-semibold text-slate-300">Your masterpiece awaits</h3>
    <p className="mt-1">Enter a prompt and settings to create or upload an image to edit.</p>
  </div>
);

const LoadingSpinner: React.FC<{ hasInputImage: boolean }> = ({ hasInputImage }) => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-8">
     <svg className="animate-spin h-12 w-12 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    <h3 className="text-lg font-semibold text-slate-300">{hasInputImage ? 'Applying your edits...' : 'Generating your vision...'}</h3>
    <p className="mt-1">This can take a moment. High-quality art needs a little patience.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-8 bg-red-900/20 rounded-lg">
     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    <h3 className="text-lg font-semibold text-red-300">An Error Occurred</h3>
    <p className="mt-1 text-sm">{message}</p>
  </div>
);

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, prompt, inputImageUrl }) => {
  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const sanitizedPrompt = prompt.slice(0, 50).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `photoreal_ai_${sanitizedPrompt}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-slate-950/50 rounded-xl w-full h-full flex items-center justify-center aspect-square md:aspect-auto">
      <div className="w-full h-full p-4">
        <div className="relative border-2 border-dashed border-slate-700 rounded-lg w-full h-full flex flex-col justify-center items-center">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              {inputImageUrl ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img src={inputImageUrl} alt="Editing..." className="w-full h-full object-contain rounded-lg p-2 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner hasInputImage={true} />
                  </div>
                </div>
              ) : (
                <LoadingSpinner hasInputImage={false} />
              )}
            </div>
          ) : error ? (
            <ErrorDisplay message={error} />
          ) : imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={prompt || 'Generated AI image'} 
                className="w-full h-full object-contain rounded-lg p-2"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <Button
                  variant="secondary"
                  onClick={downloadImage}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Download Image
                </Button>
              </div>
            </>
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
