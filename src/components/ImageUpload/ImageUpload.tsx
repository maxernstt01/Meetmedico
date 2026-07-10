import { useId, useRef, useState, type ChangeEvent } from 'react';
import CameraIcon from '@/assets/icons/Primary Button/Camera01Icon.svg?react';
import { Button } from '../Button';
import styles from './ImageUpload.module.css';
import type { ImageUploadProps } from './ImageUpload.types';

export function ImageUpload({
  label,
  required,
  helperText,
  error,
  accept = 'image/*',
  uploadLabel = 'Upload',
  placeholder = 'Select Image',
  disabled,
  id,
  name,
  onFileSelect,
}: ImageUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onFileSelect?.(file);
  };

  const fieldClasses = [styles.field, error && styles.error, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <div className={fieldClasses}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}
        <CameraIcon className={styles.icon} aria-hidden="true" />
        <span className={styles.fileName} data-empty={!fileName}>
          {fileName ?? placeholder}
        </span>
        <Button
          type="button"
          variant="tertiary"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploadLabel}
        </Button>
        <input
          ref={fileInputRef}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          disabled={disabled}
          className={styles.hiddenInput}
          onChange={handleChange}
        />
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}
