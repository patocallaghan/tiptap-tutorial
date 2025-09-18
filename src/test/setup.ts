import { vi } from 'vitest';
import '@testing-library/jest-dom'

// Mock DOM APIs that are missing in jsdom but required by ProseMirror/TipTap
// These APIs are used by ProseMirror for cursor positioning, selection handling, and layout calculations

Range.prototype.getBoundingClientRect = () => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: vi.fn(),
});

Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: vi.fn(),
});

Document.prototype.elementFromPoint = vi.fn();