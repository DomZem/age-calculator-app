/* eslint-disable react/display-name */
import React, { type InputHTMLAttributes } from 'react';
import { type FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
  labelText: string;
  id: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, labelText, error, ...props }, ref) => {
    return (
      <div
        className={`flex max-w-[160px] flex-shrink flex-col gap-y-1 lg:gap-y-2 ${
          error && 'text-primaryRed'
        }`}
      >
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase not-italic tracking-[3px] lg:text-[14px] lg:tracking-[3.5px]"
        >
          {labelText}
        </label>
        <input
          ref={ref}
          {...props}
          className={`w-full rounded-lg border-2 border-solid border-primaryLine px-4 py-3 text-xl not-italic text-primaryBlack outline-primaryPurple placeholder:uppercase lg:px-6 ${
            error && 'border-primaryRed'
          }`}
          id={id}
        />
        {error && <p>{error.message}</p>}
      </div>
    );
  }
);

export default Input;
