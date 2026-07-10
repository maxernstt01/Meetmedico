export interface ImageUploadProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  accept?: string;
  uploadLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onFileSelect?: (file: File | null) => void;
}
