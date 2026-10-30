export interface SocialLink {
  name: string;
  icon: string;
  href: string;
  svg?: string;
}

export interface TopbarVariant {
  location: string;
  phone: string;
  email: string;
  social: SocialLink[];
  followUsLabel?: string;
  phoneAriaPrefix?: string;
  emailAriaPrefix?: string;
}

export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export interface HeaderVariant {
  logo: string;
  logoAlt?: string;
  homeAriaLabel?: string;
  contactButtonHref?: string;
  toggleNavAriaLabel?: string;
  links: NavLink[];
  button: string;
}

export interface HeroSlide {
  subtitlePart1: string;
  subtitlePart2: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface HeroVariant {
  slides: HeroSlide[];
}

export interface AboutFeature {
  icon: string;
  title: string;
}

export interface AboutVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description1: string;
  description2: string;
  features: AboutFeature[];
  bulletPoints?: string[];
  buttonText: string;
  buttonLink: string;
  image1: string;
  image2: string;
  image3: string;
  image1Alt?: string;
  image2Alt?: string;
  image3Alt?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface ServicesModalLabels {
  serviceBadge?: string;
  clickToView?: string;
  highlightsTitle?: string;
  portfolioSubtitle?: string;
  consultationPrompt?: string;
  closeButton?: string;
  bookButton?: string;
}

export interface ServicesVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  services: ServiceItem[];
  modalLabels?: ServicesModalLabels;
}

export interface ServiceDetailFeature {
  icon: string;
  title: string;
}

export interface ServiceDetailData {
  about?: {
    subtitle?: string;
    titleLine1?: string;
    titleLine2?: string;
    description1?: string;
    description2?: string;
    image?: string;
    features?: ServiceDetailFeature[];
  };
  whyChoose?: {
    subtitle?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    list?: string[];
  };
  ourWork?: {
    subtitle?: string;
    title?: string;
    images?: string[];
  };
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface StatsVariant {
  imageLeft: string;
  imageRight: string;
  imageLeftAlt?: string;
  imageRightAlt?: string;
  stats: StatItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface ProcessVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: string[];
  steps: ProcessStep[];
  backgroundImage: string;
  backgroundImageAlt?: string;
}

export interface TeamSocialLink {
  platform: string;
  url: string;
  svg?: string;
  ariaLabel?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  socials: TeamSocialLink[];
}

export interface TeamPagination {
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  pageAriaPrefix?: string;
  prevSvg?: string;
  nextSvg?: string;
}

export interface TeamVariant {
  subtitle: string;
  subtitleSvg?: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  itemsPerPage?: number;
  pagination?: TeamPagination;
  prevSvg?: string;
  nextSvg?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  pageAriaPrefix?: string;
  socialIcons?: Record<string, string>;
  members: TeamMember[];
  buttonText?: string;
  buttonLink?: string;
  buttonSvg?: string;
}

export interface CTAButton {
  text: string;
  link: string;
  style: 'solid' | 'outline';
}

export interface CTAVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  watermark: string;
  description: string;
  buttons: CTAButton[];
  image: string;
}

export interface BlogItem {
  image: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

export interface BlogsVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description?: string;
  categories?: string[];
  readArticleText?: string;
  closeButton?: string;
  writtenByLabel?: string;
  defaultAuthor?: string;
  blogs: BlogItem[];
  buttonText: string;
  buttonLink: string;
}

export interface BlogDetailSection {
  heading?: string;
  content?: string;
  number?: string;
  title?: string;
  text?: string;
}

export interface BlogDetailItem {
  title?: string;
  image?: string;
  description?: string;
  sections?: BlogDetailSection[];
  author?: string;
  sidebar?: {
    recentPosts?: Array<{
      title: string;
      date: string;
      image: string;
      link: string;
    }>;
    categories?: Array<{
      name: string;
      count: number;
      link: string;
    }>;
    cta?: {
      titleLine1: string;
      titleLine2: string;
      text: string;
      image: string;
      link: string;
    };
  };
}

export interface Testimonial {
  text: string;
  author: string;
  rating: number;
}

export interface TestimonialVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  testimonials: Testimonial[];
}

export interface FooterLink {
  name: string;
  href: string;
  target?: string;
}

export interface FooterContact {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface FooterVariant {
  logo: string;
  logoAlt?: string;
  scrollToTopAriaLabel?: string;
  description: string;
  linkMap?: Record<string, string>;
  social: SocialLink[];
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  services: {
    title: string;
    links: FooterLink[];
  };
  contact: {
    title: string;
    info: FooterContact;
  };
  bottomBar: {
    copyright: string;
    links: FooterLink[];
  };
}

export interface ContactField {
  label: string;
  placeholder: string;
}

export interface ContactVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  backgroundImage: string;
  contactItems: { label: string; value: string }[];
  followUsLabel: string;
  formSubtitle: string;
  formTitleLine1: string;
  formTitleLine2: string;
  formDescription: string;
  services: string[];
  fields: {
    name: ContactField;
    phone: ContactField;
    email: ContactField;
    service: ContactField;
    message: ContactField;
  };
  map?: {
    address: string;
    iframeSrc: string;
  };
  submitButton: string;
  successTitle: string;
  successMessage: string;
  successCloseButton?: string;
}

export interface GalleryVariant {
  subtitle?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  viewArtworkLabel?: string;
  itemsPerPage?: number;
  images: string[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  favicon?: string;
}

export interface ContentData {
  Tattoo: {
    siteMetadata?: SiteMetadata;
    templateComponents: {
      "template-1": {
        shared: {
          Topbar: string;
          Header: string;
          Footer: string;
          Contact: string;
        };
        pages: {
          home: {
            Hero: string;
            About: string;
            Services: string;
            Process: string;
            Team: string;
            Testimonials: string;
            Stats: string;
            CTA: string;
            Blogs: string;
          };
          gallery: {
            Gallery: string;
          };
        };
      };
    };
    sections: {
      Topbar: { variants: Record<string, TopbarVariant> };
      Header: { variants: Record<string, HeaderVariant> };
      Hero: { variants: Record<string, HeroVariant> };
      About: { variants: Record<string, AboutVariant> };
      Services: { variants: Record<string, ServicesVariant> };
      Process: { variants: Record<string, ProcessVariant> };
      Team: { variants: Record<string, TeamVariant> };
      Stats: { variants: Record<string, StatsVariant> };
      Testimonials: { variants: Record<string, TestimonialVariant> };
      CTA: { variants: Record<string, CTAVariant> };
      Blogs: { variants: Record<string, BlogsVariant> };
      Footer: { variants: Record<string, FooterVariant> };
      Gallery: { variants: Record<string, GalleryVariant> };
      Contact: { variants: Record<string, ContactVariant> };
      ServiceDetails: { variants: Record<string, Record<string, ServiceDetailData>> };
      BlogDetails: { variants: Record<string, Record<string, BlogDetailItem>> };
    };
  };
}
