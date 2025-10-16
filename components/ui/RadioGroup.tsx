
import React from 'react';

interface RadioGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selectedValue: T;
  onChange: (value: T) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroup = <T extends string>({ label, options, selectedValue, onChange, name, disabled = false }: RadioGroupProps<T>) => {
  return (
    <div className={disabled ? 'opacity-50' : ''}>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={() => onChange(option)}
              className="sr-only"
              disabled={disabled}
            />
            <label
              htmlFor={`${name}-${option}`}
              className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-3 text-sm font-medium transition-all ${
                selectedValue === option
                  ? 'border-indigo-500 bg-indigo-900/50 text-white'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              } ${
                disabled ? 'cursor-not-allowed' : 'hover:bg-slate-700'
              }`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
