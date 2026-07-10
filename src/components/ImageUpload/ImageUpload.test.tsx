import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from './ImageUpload';

describe('ImageUpload', () => {
  it('renders the placeholder and Upload button', () => {
    render(<ImageUpload label="Label" required />);
    expect(screen.getByText('Select Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
  });

  it('clicking Upload opens the hidden file picker', async () => {
    render(<ImageUpload label="Label" />);
    const fileInput = screen.getByLabelText(/label/i) as HTMLInputElement;
    const clickSpy = vi.spyOn(fileInput, 'click');
    await userEvent.click(screen.getByRole('button', { name: 'Upload' }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('shows the selected file name and calls onFileSelect', async () => {
    const onFileSelect = vi.fn();
    render(<ImageUpload label="Label" onFileSelect={onFileSelect} />);
    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/label/i) as HTMLInputElement;
    await userEvent.upload(fileInput, file);
    expect(screen.getByText('photo.png')).toBeInTheDocument();
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });
});
