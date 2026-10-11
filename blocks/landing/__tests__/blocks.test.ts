import { describe, it, expect, beforeEach } from 'vitest';
import { registerHeaderBlock } from '../header';
import { registerTestimonialsBlock } from '../testimonials';
import { registerFaqBlock } from '../faq';
import { registerTeamBlock } from '../team';

describe('Landing Blocks Registration', () => {
  let mockBm: any;
  let addedBlocks: Map<string, any>;

  beforeEach(() => {
    addedBlocks = new Map();
    mockBm = {
      add: (id: string, config: any) => {
        addedBlocks.set(id, config);
      }
    };
  });

  it('registers header block with correct properties', () => {
    registerHeaderBlock(mockBm);
    expect(addedBlocks.has('landing-header')).toBe(true);
    const header = addedBlocks.get('landing-header');
    expect(header.label).toBe('Header (Sticky)');
    expect(header.content).toContain('<header');
    expect(header.category).toBe('Landing Page');
    expect(header.media).toContain('<svg');
  });

  it('registers testimonials with grid layout', () => {
    registerTestimonialsBlock(mockBm);
    const block = addedBlocks.get('landing-testimonials');
    expect(block).toBeDefined();
    expect(block.content).toContain('testimonials-grid');
    expect(block.content).toContain('@media');
  });

  it('registers faq with proper HTML structure', () => {
    registerFaqBlock(mockBm);
    const block = addedBlocks.get('landing-faq');
    expect(block.content).toContain('Câu hỏi thường gặp');
  });

  it('all blocks have media icons', () => {
    [registerHeaderBlock, registerTestimonialsBlock, registerFaqBlock, registerTeamBlock].forEach(fn => {
      fn(mockBm);
    });
    
    addedBlocks.forEach((block) => {
      expect(block.media).toBeDefined();
      expect(block.media).toContain('<svg');
    });
  });

  it('all blocks have responsive styles', () => {
    [registerHeaderBlock, registerTeamBlock].forEach(fn => fn(mockBm));
    
    addedBlocks.forEach((block) => {
      expect(block.content).toContain('@media');
    });
  });
});
