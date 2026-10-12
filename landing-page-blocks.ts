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

// Shared responsive hardening for all landing/event blocks. Individual block styles
// remain intact; these scoped rules only prevent overflow and adapt layouts on small screens.
const LANDING_RESPONSIVE_STYLES = `
<style>
  .landing-header, .landing-hero, .landing-features, .landing-content-left,
  .landing-content-right, .landing-footer, .landing-testimonials, .landing-faq,
  .landing-team, .landing-contact, .landing-partners, .landing-speakers,
  .landing-sponsors, .landing-benefits, .landing-audience, .landing-topics,
  .landing-stats, .landing-gallery, .event-hero, .event-agenda, .event-pricing,
  .event-speakers, .event-sponsors, .event-contact, .event-faq, .event-benefits,
  .event-audience, .event-topics, .event-stats, .event-gallery {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
  .landing-header *, .landing-hero *, .landing-features *, .landing-content-left *,
  .landing-content-right *, .landing-footer *, .landing-testimonials *, .landing-faq *,
  .landing-team *, .landing-contact *, .landing-partners *, .landing-speakers *,
  .landing-sponsors *, .landing-benefits *, .landing-audience *, .landing-topics *,
  .landing-stats *, .landing-gallery *, .event-hero *, .event-agenda *, .event-pricing *,
  .event-speakers *, .event-sponsors *, .event-contact *, .event-faq *, .event-benefits *,
  .event-audience *, .event-topics *, .event-stats *, .event-gallery * {
    box-sizing: border-box;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .landing-header img, .landing-hero img, .landing-features img,
  .landing-content-left img, .landing-content-right img, .landing-footer img,
  .landing-testimonials img, .landing-faq img, .landing-team img,
  .landing-contact img, .landing-partners img, .landing-speakers img,
  .landing-sponsors img, .landing-benefits img, .landing-audience img,
  .landing-topics img, .landing-stats img, .landing-gallery img,
  .event-hero img, .event-agenda img, .event-pricing img, .event-speakers img,
  .event-sponsors img, .event-contact img, .event-faq img, .event-benefits img,
  .event-audience img, .event-topics img, .event-stats img, .event-gallery img {
    max-width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    .landing-header, .landing-hero, .landing-features, .landing-content-left,
    .landing-content-right, .landing-footer, .landing-testimonials, .landing-faq,
    .landing-team, .landing-contact, .landing-partners, .landing-speakers,
    .landing-sponsors, .landing-benefits, .landing-audience, .landing-topics,
    .landing-stats, .landing-gallery, .event-hero, .event-agenda, .event-pricing,
    .event-speakers, .event-sponsors, .event-contact, .event-faq, .event-benefits,
    .event-audience, .event-topics, .event-stats, .event-gallery {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    .landing-header [style*="grid-template-columns"],
    .landing-hero [style*="grid-template-columns"],
    .landing-features [style*="grid-template-columns"],
    .landing-content-left [style*="grid-template-columns"],
    .landing-content-right [style*="grid-template-columns"],
    .landing-footer [style*="grid-template-columns"],
    .landing-testimonials [style*="grid-template-columns"],
    .landing-faq [style*="grid-template-columns"],
    .landing-team [style*="grid-template-columns"],
    .landing-contact [style*="grid-template-columns"],
    .landing-partners [style*="grid-template-columns"],
    .landing-speakers [style*="grid-template-columns"],
    .landing-sponsors [style*="grid-template-columns"],
    .landing-benefits [style*="grid-template-columns"],
    .landing-audience [style*="grid-template-columns"],
    .landing-topics [style*="grid-template-columns"],
    .landing-stats [style*="grid-template-columns"],
    .landing-gallery [style*="grid-template-columns"],
    .event-hero [style*="grid-template-columns"],
    .event-agenda [style*="grid-template-columns"],
    .event-pricing [style*="grid-template-columns"],
    .event-speakers [style*="grid-template-columns"],
    .event-sponsors [style*="grid-template-columns"],
    .event-contact [style*="grid-template-columns"],
    .event-faq [style*="grid-template-columns"],
    .event-benefits [style*="grid-template-columns"],
    .event-audience [style*="grid-template-columns"],
    .event-topics [style*="grid-template-columns"],
    .event-stats [style*="grid-template-columns"],
    .event-gallery [style*="grid-template-columns"] {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)) !important;
    }
    .landing-header [style*="display: flex"],
    .landing-hero [style*="display: flex"],
    .landing-features [style*="display: flex"],
    .landing-content-left [style*="display: flex"],
    .landing-content-right [style*="display: flex"],
    .landing-footer [style*="display: flex"],
    .landing-testimonials [style*="display: flex"],
    .landing-faq [style*="display: flex"],
    .landing-team [style*="display: flex"],
    .landing-contact [style*="display: flex"],
    .landing-partners [style*="display: flex"],
    .landing-speakers [style*="display: flex"],
    .landing-sponsors [style*="display: flex"],
    .landing-benefits [style*="display: flex"],
    .landing-audience [style*="display: flex"],
    .landing-topics [style*="display: flex"],
    .landing-stats [style*="display: flex"],
    .landing-gallery [style*="display: flex"],
    .event-hero [style*="display: flex"],
    .event-agenda [style*="display: flex"],
    .event-pricing [style*="display: flex"],
    .event-speakers [style*="display: flex"],
    .event-sponsors [style*="display: flex"],
    .event-contact [style*="display: flex"],
    .event-faq [style*="display: flex"],
    .event-benefits [style*="display: flex"],
    .event-audience [style*="display: flex"],
    .event-topics [style*="display: flex"],
    .event-stats [style*="display: flex"],
    .event-gallery [style*="display: flex"] {
      flex-wrap: wrap !important;
    }
    .event-agenda .event-agenda-row {
      gap: 8px !important;
    }
    .event-agenda .event-agenda-time {
      width: 100% !important;
      flex: 0 0 100% !important;
    }
    .landing-hero h1, .event-hero h1 { font-size: clamp(28px, 6vw, 40px) !important; line-height: 1.15 !important; }
    .landing-hero h2, .event-hero h2, .landing-features h2, .event-pricing h2,
    .event-agenda h2, .event-speakers h2, .event-gallery h2 {
      font-size: clamp(24px, 5vw, 32px) !important;
      line-height: 1.2 !important;
    }
    .landing-hero, .event-hero { min-height: 0 !important; padding-top: 64px !important; padding-bottom: 64px !important; }
    .landing-header .landing-nav { display: flex !important; flex-wrap: wrap !important; gap: 8px !important; justify-content: flex-end; }
    .landing-header .landing-nav a { font-size: 12px !important; padding: 6px 8px !important; }
  }
  @media (max-width: 480px) {
    .landing-header, .landing-hero, .landing-features, .landing-content-left,
    .landing-content-right, .landing-footer, .landing-testimonials, .landing-faq,
    .landing-team, .landing-contact, .landing-partners, .landing-speakers,
    .landing-sponsors, .landing-benefits, .landing-audience, .landing-topics,
    .landing-stats, .landing-gallery, .event-hero, .event-agenda, .event-pricing,
    .event-speakers, .event-sponsors, .event-contact, .event-faq, .event-benefits,
    .event-audience, .event-topics, .event-stats, .event-gallery {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }
    .landing-hero h1, .event-hero h1 { font-size: clamp(25px, 8vw, 32px) !important; }
    .landing-header { align-items: flex-start !important; gap: 10px !important; flex-wrap: wrap !important; }
    .landing-header .landing-nav { justify-content: flex-start !important; width: 100%; }
    .event-pricing [style*="transform:translateY"] { transform: none !important; }
  }
</style>`;

export const landingPagePlugin = (editor: Editor) => {
  const originalBlockManager = editor.BlockManager;
  const bm = {
    add: (id: string, config: any) =>
      originalBlockManager.add(id, {
        ...config,
        content: `${config.content || ""}${LANDING_RESPONSIVE_STYLES}`,
      }),
  } as typeof editor.BlockManager;

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
