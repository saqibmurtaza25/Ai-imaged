
import React from 'react';
import { GenerationOptions, Style, AspectRatio, Resolution } from '../types';
import { STYLE_OPTIONS, ASPECT_RATIO_OPTIONS, RESOLUTION_OPTIONS } from '../constants';
import Button from './ui/Button';
import RadioGroup from './ui/RadioGroup';
import ImageUploader from './ui/ImageUploader';

interface ImageGeneratorFormProps {
  options: GenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenerationOptions>>;
  onSubmit: () => void;
  isLoading: boolean;
  onImageChange: (file: File | null, base64: string | null) => void;
  hasImage: boolean;
}

const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({ options, setOptions, onSubmit, isLoading, onImageChange, hasImage }) => {
  
  const handleOptionChange = <K extends keyof GenerationOptions,>(key: K, value: GenerationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          {hasImage ? 'Editing Instructions' : 'Image Prompt'}
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          className="block w-full rounded-lg border-slate-700 bg-slate-800 text-slate-200 placeholder-slate-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={hasImage ? "e.g., Change the color of the car to cherry red." : "e.g., A pest control technician spraying around a modern suburban home, captured in soft morning light."}
          value={options.prompt}
          onChange={(e) => handleOptionChange('prompt', e.target.value)}
        />
      </div>

      <ImageUploader onImageChange={onImageChange} />

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-slate-300 mb-2">
          Style
        </label>
        <select
          id="style"
          name="style"
          className="block w-full rounded-lg border-slate-700 bg-slate-800 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={options.style}
          onChange={(e) => handleOptionChange('style', e.target.value as Style)}
        >
          {STYLE_OPTIONS.map(style => <option key={style}>{style}</option>)}
        </select>
      </div>

      <RadioGroup
        label="Aspect Ratio"
        name="aspectRatio"
        options={ASPECT_RATIO_OPTIONS}
        selectedValue={options.aspectRatio}
        onChange={(value) => handleOptionChange('aspectRatio', value as AspectRatio)}
        disabled={hasImage}
      />
      
      <RadioGroup
        label="Resolution"
        name="resolution"
        options={RESOLUTION_OPTIONS}
        selectedValue={options.resolution}
        onChange={(value) => handleOptionChange('resolution', value as Resolution)}
        disabled={hasImage}
      />
      <p className="text-xs text-slate-500 -mt-3">Note: The AI always generates high-resolution images. This setting adds a quality hint to the prompt.</p>


      <div className="pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !options.prompt.trim()}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7.5a1.5 1.5 0 01-1.5 1.5H6.5A1.5 1.5 0 015 12.5V5z" />
              <path d="M15 11a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          }
        >
          {hasImage ? 'Edit Image' : 'Generate Image'}
        </Button>
      </div>
    </form>
  );
};

export default ImageGeneratorForm;
