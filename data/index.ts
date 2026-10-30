import contentData from './content.json';
import {
  ContentData,
  HeaderVariant,
  FooterVariant,
  TopbarVariant,
  HeroVariant,
  AboutVariant,
  ServicesVariant,
  StatsVariant,
  ProcessVariant,
  GalleryVariant,
  TeamVariant,
  TestimonialVariant,
  CTAVariant,
  BlogsVariant,
  ContactVariant,
  ServiceDetailData,
  BlogDetailItem,
  SiteMetadata,
} from '@/types';

export const content = contentData as unknown as ContentData;
export default content;

const t1 = content.Tattoo.templateComponents['template-1'];

export const siteMetadata: SiteMetadata = content.Tattoo.siteMetadata || {
  title: 'InkVibe — Premium Tattoo & Piercing Studio',
  description: 'Bespoke tattoo art, precision piercing, and sterile craftsmanship by award-winning tattoo artists.',
  favicon: '/favicon.ico',
};

export const sharedData = {
  Header: content.Tattoo.sections.Header.variants[t1.shared.Header] as HeaderVariant,
  Footer: content.Tattoo.sections.Footer.variants[t1.shared.Footer] as FooterVariant,
  Topbar: content.Tattoo.sections.Topbar.variants[t1.shared.Topbar] as TopbarVariant,
};

export const galleryData: GalleryVariant =
  content.Tattoo.sections.Gallery?.variants?.[t1.pages.gallery?.Gallery || 'TattooGallery1'] || { images: [] };

export const contactData: ContactVariant =
  content.Tattoo.sections.Contact.variants[t1.shared.Contact];

export const homePageData = {
  Hero: content.Tattoo.sections.Hero.variants[t1.pages.home.Hero] as HeroVariant,
  About: content.Tattoo.sections.About.variants[t1.pages.home.About] as AboutVariant,
  Services: content.Tattoo.sections.Services.variants[t1.pages.home.Services] as ServicesVariant,
  Stats: content.Tattoo.sections.Stats.variants[t1.pages.home.Stats] as StatsVariant,
  Process: content.Tattoo.sections.Process.variants[t1.pages.home.Process] as ProcessVariant,
  Gallery: galleryData,
  Team: content.Tattoo.sections.Team.variants[t1.pages.home.Team] as TeamVariant,
  Testimonials: content.Tattoo.sections.Testimonials.variants[t1.pages.home.Testimonials] as TestimonialVariant,
  CTA: content.Tattoo.sections.CTA.variants[t1.pages.home.CTA] as CTAVariant,
  Blogs: content.Tattoo.sections.Blogs.variants[t1.pages.home.Blogs] as BlogsVariant,
  Contact: contactData,
};

export const serviceDetailsMap: Record<string, ServiceDetailData> =
  content.Tattoo.sections.ServiceDetails?.variants?.TattooServiceDetails1 || {};

export const blogDetailsMap: Record<string, BlogDetailItem> =
  content.Tattoo.sections.BlogDetails?.variants?.TattooBlogDetails1 || {};
