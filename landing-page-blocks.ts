import type { Editor } from "grapesjs";

// Import all 31 block register functions
import {
  // Event blocks (18)
  registerHeaderBlock,
  registerHeroBlock,
  registerFeaturesBlock,
  registerContentRightBlock,
  registerFooterBlock,
  registerEventHeroBlock,
  registerEventSpeakersBlock,
  registerEventAgendaBlock,
  registerEventPricingBlock,
  registerEventHeroCountdownBlock,
  registerEventSponsorsBlock,
  registerEventContactBlock,
  registerEventFaqBlock,
  registerEventBenefitsBlock,
  registerEventAudienceBlock,
  registerEventTopicsBlock,
  registerEventStatsBlock,
  registerEventGalleryBlock,
  // New landing blocks (13)
  registerTestimonialsBlock,
  registerContentLeftBlock,
  registerFaqBlock,
  registerTeamBlock,
  registerContactBlock,
  registerPartnersBlock,
  registerSpeakersBlock,
  registerSponsorsBlock,
  registerBenefitsBlock,
  registerAudienceBlock,
  registerTopicsBlock,
  registerStatsBlock,
  registerGalleryBlock,
} from './blocks/landing/index';

export const landingPagePlugin = (editor: Editor) => {
  const bm = editor.BlockManager;

  // Register all 18 event blocks
  registerHeaderBlock(bm);
  registerHeroBlock(bm);
  registerFeaturesBlock(bm);
  registerContentRightBlock(bm);
  registerFooterBlock(bm);
  registerEventHeroBlock(bm);
  registerEventSpeakersBlock(bm);
  registerEventAgendaBlock(bm);
  registerEventPricingBlock(bm);
  registerEventHeroCountdownBlock(bm);
  registerEventSponsorsBlock(bm);
  registerEventContactBlock(bm);
  registerEventFaqBlock(bm);
  registerEventBenefitsBlock(bm);
  registerEventAudienceBlock(bm);
  registerEventTopicsBlock(bm);
  registerEventStatsBlock(bm);
  registerEventGalleryBlock(bm);

  // Register all 13 new landing blocks
  registerTestimonialsBlock(bm);
  registerContentLeftBlock(bm);
  registerFaqBlock(bm);
  registerTeamBlock(bm);
  registerContactBlock(bm);
  registerPartnersBlock(bm);
  registerSpeakersBlock(bm);
  registerSponsorsBlock(bm);
  registerBenefitsBlock(bm);
  registerAudienceBlock(bm);
  registerTopicsBlock(bm);
  registerStatsBlock(bm);
  registerGalleryBlock(bm);
};
