import { describe, it, expect, beforeEach } from 'vitest';
import { landingPagePlugin } from '../landing-page-blocks';

describe('landingPagePlugin', () => {
  let mockEditor: any;
  let mockBlockManager: any;
  let registeredBlocks: Map<string, any>;

  beforeEach(() => {
    registeredBlocks = new Map();
    mockBlockManager = {
      add: (id: string, config: any) => {
        registeredBlocks.set(id, config);
      },
      get: (id: string) => registeredBlocks.get(id),
      getAll: () => Array.from(registeredBlocks.values()),
    };
    mockEditor = {
      BlockManager: mockBlockManager,
    };
  });

  it('should register all 31 blocks correctly', () => {
    landingPagePlugin(mockEditor);
    expect(registeredBlocks.size).toBe(31);

    const expectedBlocks = [
      'landing-header', 'landing-hero', 'landing-features', 'landing-content-right', 'landing-footer',
      'landing-event-hero', 'landing-event-speakers', 'landing-event-agenda', 'landing-event-pricing',
      'landing-event-hero-countdown', 'landing-event-sponsors', 'landing-event-contact', 'landing-event-faq',
      'landing-event-benefits', 'landing-event-audience', 'landing-event-topics', 'landing-event-stats',
      'landing-event-gallery',
      'landing-testimonials', 'landing-content-left', 'landing-faq', 'landing-team',
      'landing-contact', 'landing-partners', 'landing-speakers', 'landing-sponsors',
      'landing-benefits', 'landing-audience', 'landing-topics', 'landing-stats', 'landing-gallery'
    ];

    expectedBlocks.forEach(blockId => {
      expect(registeredBlocks.has(blockId)).toBe(true);
      const block = registeredBlocks.get(blockId);
      expect(block.label).toBeDefined();
      expect(block.content).toBeDefined();
      expect(block.content).toMatch(/<(section|header|div)/); // Can be section, header or div, header is header
    });
  });
});
