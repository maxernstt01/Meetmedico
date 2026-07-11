import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders the trigger children', () => {
    render(
      <Tooltip title="Title">
        <button type="button">Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('renders title and description inside the tooltip', () => {
    render(
      <Tooltip title="Title" description="A Tooltip Description">
        <button type="button">Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('A Tooltip Description')).toBeInTheDocument();
  });

  it('applies the requested placement class', () => {
    render(
      <Tooltip title="Title" placement="bottomRight">
        <button type="button">Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip').className).toMatch(/bottomRight/);
  });

  it('renders only the trigger when disabled', () => {
    render(
      <Tooltip title="Title" disabled>
        <button type="button">Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders only the trigger when there is no title or description', () => {
    render(
      <Tooltip>
        <button type="button">Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
