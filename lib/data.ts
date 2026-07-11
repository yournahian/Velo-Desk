/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gig, Conversation, ProjectBrief } from "./frontend-types";

export const RECOMMENDED_GIGS: Gig[] = [
  {
    id: "g1",
    title: "I will build you a ready to sell dropshipping shopify store",
    category: "Programming & Tech",
    rating: 4.9,
    reviewsCount: "1k+",
    price: 130,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Divishha G.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 1240,
      responseTextTime: "1 hour",
      memberSince: "Dec 2021",
      badgeType: "Top Rated"
    },
    description: "Welcome to high converting, beautiful Shopify store design services. I will build you a fully automated, responsive, premium Shopify Dropshipping Store designed to actually make profit. Our team does comprehensive research on trending niche categories and imports only highest rated winning products with lightning fast shipping routes.",
    packages: {
      basic: {
        title: "Starter Launch",
        description: "1 product responsive Shopify store with high-converting landing page, conversion apps & basic setup.",
        deliveryTime: 3,
        revisions: 5,
        price: 130,
        features: ["1 Winning Product", "Premium Theme Setup", "Payment Gateway Setup", "5 Standard Standard Pages", "Essential Apps Setup"]
      },
      standard: {
        title: "Pro Automated Store",
        description: "Fully loaded Shopify store with 10 hot winning products, social icons, complete SEO structure, logo, & copywriting.",
        deliveryTime: 5,
        revisions: "Unlimited",
        price: 245,
        features: ["10 Niche Products", "Complete Logo & Brand Identity", "Full Responsive Custom Layout", "Auto Order Fulfillment App", "Top Converters Suite", "Advanced On-Page SEO"]
      },
      premium: {
        title: "7-Figure Brand Empire",
        description: "Ultimate custom setup, 20 high-margin hot products, private supplier hookup, 30-day VIP marketing consultation, & video ads.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 495,
        features: ["20 Curated High Margin Products", "Fast Supplier Shipping Integrations", "Optimized Custom Theme Architecture", "Custom Brand Logo & Icons Suite", "3 Custom HD Video Ads for Socials", "30 Days Personalized Marketing Strategy Support"]
      }
    }
  },
  {
    id: "g2",
    title: "I will build an automated shopify dropshipping store or shopify website",
    category: "Programming & Tech",
    rating: 4.9,
    reviewsCount: "1k+",
    price: 155,
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Sonarish",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 1420,
      responseTextTime: "2 hours",
      memberSince: "Mar 2020",
      badgeType: "Top Rated"
    },
    description: "Are you struggling to capture automated recurring revenue? Shopify stores designed by professionals enjoy 3.4x higher average conversion rates! Let us architect a fully custom-built and optimized e-commerce, dropshipping, or custom inventory brand store on Shopify from scratch.",
    packages: {
      basic: {
        title: "Quickstart Shopify",
        description: "Fully functioning shopify website with custom banner, premium theme template & 5 products imported.",
        deliveryTime: 4,
        revisions: 4,
        price: 155,
        features: ["5 imported products", "Basic Page Layout (About, Contact)", "Footer Policies Setup", "Mobile Responsive Optimizations"]
      },
      standard: {
        title: "Automated Shopify Elite",
        description: "A complete professional dropshipping machine with 15 researched products, customized product descriptions, and reviews imported.",
        deliveryTime: 6,
        revisions: 8,
        price: 275,
        features: ["15 High-Profit Products", "Stunning Custom-Coded Sections", "Copywritten SEO Descriptions", "Sales Boost Scarcity Badges", "Suppliers Auto-Fulfillment Hookup"]
      },
      premium: {
        title: "Vanguard Ecommerce",
        description: "Complete Shopify store design, 1-on-1 zoom consulting, newsletter marketing integration, dynamic loyalty system, and custom coded layouts.",
        deliveryTime: 10,
        revisions: "Unlimited",
        price: 520,
        features: ["30 Elite-Tier Products", "Custom Coding & Theme Sections", "Klaviyo Email Flow Automation Integrations", "Referral and Loyalty VIP systems", "Speed Optimization (90+ score guarantee)", "1 Hour Live Marketing Consulting Session"]
      }
    }
  },
  {
    id: "g3",
    title: "I will build your professional dropshipping shopify store",
    category: "Graphics & Design",
    rating: 5.0,
    reviewsCount: "1k+",
    price: 295,
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: true,
    seller: {
      name: "Nick",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 5.0,
      reviewCountValue: 1870,
      responseTextTime: "45 minutes",
      memberSince: "Jun 2019",
      badgeType: "Vetted Pro"
    },
    description: "Certified Vetted Pro Web Specialist has arrived. Our services guarantee enterprise-level standard of code, high aesthetic layouts, premium brand alignment, and custom graphics widgets. I build state-of-the-art storefronts for leading international brands.",
    packages: {
      basic: {
        title: "Apex Minimal Store",
        description: "Exceptional UI design for 1 hero product, customized CSS, and complete modern color alignment.",
        deliveryTime: 5,
        revisions: 6,
        price: 295,
        features: ["1 Outstanding Hero Product", "High-End UX/UI Architecture", "Interactive Web Components", "Custom Vector Trust Badges", "Google Analytics & Pixel Tracking Setup"]
      },
      standard: {
        title: "Apex Full Store",
        description: "A gorgeous website ready to compete globally, customizable admin panels, custom-typed layouts, and 12 curated products.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 480,
        features: ["12 Verified Top-Selling Products", "Custom Built Dynamic CSS/JS Sections", "High Conversion Checkout Funnel Tuning", "Advanced Multi-Language Support Setup", "Full Theme Speed & Image Compression Setup"]
      },
      premium: {
        title: "Enterprise Custom Store",
        description: "The absolute premium experience. Custom Headless React Shopify or Shopify Liquid architecture, bespoke custom logo suite, unlimited setup.",
        deliveryTime: 12,
        revisions: "Unlimited",
        price: 890,
        features: ["Bespoke Unique Custom UI Design", "Headless React/Liquid API Development", "Unlimited High-Converting Product Listings", "Custom Crafted High Definition Illustration Suite", "Exclusive High Conversion Copywriting Suite Included ($400 value)", "2 Months Comprehensive Performance Strategy Followup Support"]
      }
    }
  },
  {
    id: "g4",
    title: "I will build a profitable one product shopify dropshipping store",
    category: "Programming & Tech",
    rating: 4.9,
    reviewsCount: "1k+",
    price: 100,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: true,
    seller: {
      name: "Lucas Sobrinho",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: false,
      isPro: true,
      ratingValue: 4.9,
      reviewCountValue: 1050,
      responseTextTime: "3 hours",
      memberSince: "Nov 2022",
      badgeType: "Vetted Pro"
    },
    description: "One Product stores represent the single highest success route in modern ecommerce dropshipping. Why? Because focusing on 1 ultra-marketable product lets you optimize your entire funnel, copy, and layout to do exactly ONE thing: sell. We select a winning product and build a custom high conversion, high credibility single product machine.",
    packages: {
      basic: {
        title: "Bespoke Single Launch",
        description: "Bespoke custom single product shopify layout, clean theme integration, automated orders system setup, and trust badges.",
        deliveryTime: 3,
        revisions: 3,
        price: 100,
        features: ["1 Curated Winning Product", "Custom High Conversion Copywriting", "Fully Functional Automated Cart Integration", "Standard Trust Graphics Setup"]
      },
      standard: {
        title: "Bespoke Single Growth",
        description: "The complete single product funnel, customized animations, high definition graphics assets, custom product video edit.",
        deliveryTime: 5,
        revisions: 6,
        price: 195,
        features: ["1 Curated Winning Product", "Custom Graphic Assets Suite", "Dynamic Video Ad Copy included", "Custom CSS interactive animations", "Fully Structured SEO Setup"]
      },
      premium: {
        title: "Bespoke Single Enterprise",
        description: "Ultra premium design with custom-coded responsive React/Liquid front-end, high performance supplier contract access, custom ads, and 1-on-1 marketing setups.",
        deliveryTime: 8,
        revisions: "Unlimited",
        price: 380,
        features: ["Bespoke Custom Theme Code", "Highly Optimized Supplier Deals", "Klaviyo Flow & Segment setup", "Premium custom-designed review section", "Facebook, TikTok & Google Pixel Complete setups", "1 Month Support Call Checklist Access"]
      }
    }
  },
  {
    id: "g5",
    title: "I will do advanced technical SEO audit and fix for your website",
    category: "Digital Marketing",
    rating: 4.8,
    reviewsCount: "850+",
    price: 175,
    thumbnail: "https://images.unsplash.com/photo-1432889821006-3149402abb8a?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1432889821006-3149402abb8a?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Marcus W.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.8,
      reviewCountValue: 858,
      responseTextTime: "30 minutes",
      memberSince: "Mar 2022",
      badgeType: "Top Rated"
    },
    description: "Is your website invisible on Google? I will perform a deep technical SEO audit covering Core Web Vitals, crawlability, indexation, structured data, XML sitemaps, robots.txt, and site architecture. You will receive a prioritized action plan plus hands-on fixes to skyrocket your organic rankings and traffic.",
    packages: {
      basic: {
        title: "SEO Health Scan",
        description: "Automated technical audit with a clear report highlighting critical issues and quick wins for your website visibility.",
        deliveryTime: 2,
        revisions: 2,
        price: 175,
        features: ["Full Site Crawl Analysis", "Core Web Vitals Score Report", "Indexation Status Check", "Top 5 Critical Issues Fix", "PDF Report Delivery"]
      },
      standard: {
        title: "Growth SEO Tune-Up",
        description: "In-depth manual audit plus implementation of fixes for all critical and high-priority technical issues found.",
        deliveryTime: 4,
        revisions: 5,
        price: 320,
        features: ["Manual Expert Audit", "All Critical + High Priority Fixes", "Schema Markup Implementation", "Page Speed Optimization", "XML Sitemap & Robots.txt Optimization", "30-Day Rank Tracking Setup"]
      },
      premium: {
        title: "SEO Domination Overhaul",
        description: "Complete technical SEO transformation with continuous monitoring, monthly reporting, and ongoing optimization for 3 months.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 640,
        features: ["Full Technical SEO Architecture Redesign", "Advanced Schema & Structured Data", "Core Web Vitals Pass Guarantee", "Content SEO Optimization for 10 Pages", "Monthly Performance Reports", "3 Months Priority Support & Monitoring"]
      }
    }
  },
  {
    id: "g6",
    title: "I will create an engaging 2D animated explainer video for your business",
    category: "Video & Animation",
    rating: 4.9,
    reviewsCount: "720+",
    price: 210,
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1574717024453-354056afaff9?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: true,
    seller: {
      name: "Yuki T.",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 4.9,
      reviewCountValue: 724,
      responseTextTime: "1 hour",
      memberSince: "Jan 2020",
      badgeType: "Vetted Pro"
    },
    description: "Bring your brand story to life with a custom 2D animated explainer video. I combine professional voiceover, custom character design, smooth motion graphics, and a compelling script to deliver a video that converts viewers into customers. Perfect for SaaS products, startups, landing pages, and crowdfunding campaigns.",
    packages: {
      basic: {
        title: "Quick Explain Clip",
        description: "Short 30-second 2D animated explainer video with basic character animation and professional voiceover.",
        deliveryTime: 5,
        revisions: 3,
        price: 210,
        features: ["30-Second Runtime", "Custom Characters x2", "Professional Voiceover (English)", "Background Music & SFX", "HD Export 1080p"]
      },
      standard: {
        title: "Professional Story Video",
        description: "Full 60-second animated explainer with custom storyboard, premium characters, and scriptwriting included.",
        deliveryTime: 8,
        revisions: 6,
        price: 420,
        features: ["60-Second Runtime", "Custom Storyboard & Script", "Premium Character Design x4", "Professional Voiceover (Any Accent)", "Custom Motion Graphics", "HD + Social Media Formats"]
      },
      premium: {
        title: "Brand Epic Animation",
        description: "High-end 90-second cinematic animation with multi-scene environments, custom illustrations, and full marketing suite.",
        deliveryTime: 14,
        revisions: "Unlimited",
        price: 890,
        features: ["90-Second Cinematic Animation", "Multi-Scene Environment Design", "Custom Illustrated Characters x6", "Licensed Premium Soundtrack", "Marketing Video Cuts (5 versions)", "Source Files + Full Rights Transfer"]
      }
    }
  },
  {
    id: "g7",
    title: "I will write SEO-optimized blog posts and website copy that converts",
    category: "Writing & Translation",
    rating: 4.8,
    reviewsCount: "1.2k+",
    price: 85,
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: false,
    isVideo: false,
    seller: {
      name: "Sophia L.",
      avatar: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: false,
      isPro: false,
      ratingValue: 4.8,
      reviewCountValue: 1250,
      responseTextTime: "2 hours",
      memberSince: "Aug 2019",
      badgeType: "Top Rated"
    },
    description: "Words that sell. I craft researched, SEO-optimized blog articles, website copy, landing pages, and email sequences designed to engage your audience and drive conversions. Every piece is tailored to your brand voice, keyword-strategic, and written to rank high on Google. Let your content work 24/7 for your business.",
    packages: {
      basic: {
        title: "Single Blog Post",
        description: "One well-researched, SEO-optimized blog post of up to 800 words with keyword integration and meta description.",
        deliveryTime: 3,
        revisions: 2,
        price: 85,
        features: ["800 Words", "Keyword Research & Integration", "Meta Title & Description", "1 Round of Revisions", "Grammarly & Copyscape Checked"]
      },
      standard: {
        title: "Website Copy Suite",
        description: "5 pages of conversion-focused website copy including Home, About, Services, Blog, and Contact pages.",
        deliveryTime: 6,
        revisions: 4,
        price: 250,
        features: ["5 Web Pages (up to 500 words each)", "Brand Voice Guidelines Applied", "SEO Keyword Mapping Per Page", "Engaging CTAs & Headlines", "2 Rounds of Revisions"]
      },
      premium: {
        title: "Content Marketing Engine",
        description: "Monthly retainer of 4 premium blog posts plus email sequence copy, social snippets, and content strategy.",
        deliveryTime: 10,
        revisions: 8,
        price: 580,
        features: ["4 Blog Posts (1200 words each)", "5-Email Welcome Sequence", "10 Social Media Captions", "Content Calendar Strategy", "Full Rights Transfer", "2 Months Priority Support"]
      }
    }
  },
  {
    id: "g8",
    title: "I will professionally edit your podcast or audio content",
    category: "Music & Audio",
    rating: 5.0,
    reviewsCount: "460+",
    price: 65,
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: false,
    isVideo: false,
    seller: {
      name: "David R.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 5.0,
      reviewCountValue: 468,
      responseTextTime: "45 minutes",
      memberSince: "Nov 2020",
      badgeType: "Top Rated"
    },
    description: "Make your podcast sound professional and polished. I remove filler words, awkward pauses, background noise, and mouth clicks. I level audio, add intro/outro music, and deliver broadcast-ready episodes. Whether you are a solo podcaster or a network, I will make your audio stand out and keep listeners engaged.",
    packages: {
      basic: {
        title: "Quick Episode Clean",
        description: "Basic editing of a single podcast episode up to 30 minutes — noise removal, leveling, and filler word cleanup.",
        deliveryTime: 2,
        revisions: 2,
        price: 65,
        features: ["Up to 30 Min Raw Audio", "Noise Reduction & Leveling", "Filler Word Removal", "Intro/Outro Stitching", "MP3 + WAV Export"]
      },
      standard: {
        title: "Pro Podcast Polish",
        description: "Full editing for episodes up to 60 minutes with custom EQ, compression, show notes, and chapter markers.",
        deliveryTime: 3,
        revisions: 4,
        price: 145,
        features: ["Up to 60 Min Raw Audio", "Advanced EQ & Compression", "Custom Intro/Outro Design", "Show Notes + Timestamps", "Chapter Markers Included", "Social Media Audiogram"]
      },
      premium: {
        title: "Podcast Network Package",
        description: "Monthly batch of 4 fully produced episodes with artwork, hosting setup guidance, and distribution metadata.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 420,
        features: ["4 Episodes (up to 60 min each)", "Full Post-Production Suite", "Custom Podcast Artwork", "RSS Feed Metadata Setup", "Distribution Prep (Spotify/Apple)", "1 Month Priority Support"]
      }
    }
  },
  {
    id: "g9",
    title: "I will be your dedicated virtual assistant for business operations",
    category: "Business",
    rating: 4.9,
    reviewsCount: "380+",
    price: 240,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Priya K.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 4.9,
      reviewCountValue: 386,
      responseTextTime: "15 minutes",
      memberSince: "Feb 2021",
      badgeType: "Vetted Pro"
    },
    description: "Stop drowning in administrative tasks. I provide top-tier virtual assistant services — email management, calendar organization, data entry, CRM updates, research, travel booking, and document preparation. I work in your time zone, use your tools, and integrate seamlessly into your workflow so you can focus on scaling your business.",
    packages: {
      basic: {
        title: "Starter VA",
        description: "Essential administrative support — 10 hours of email management, calendar scheduling, and data entry tasks.",
        deliveryTime: 3,
        revisions: 3,
        price: 240,
        features: ["10 Hours of Support", "Email Inbox Management", "Calendar & Appointment Scheduling", "Basic Data Entry", "Daily Status Report"]
      },
      standard: {
        title: "Growth VA Pro",
        description: "25 hours of comprehensive support including CRM management, research, travel booking, and document prep.",
        deliveryTime: 5,
        revisions: 6,
        price: 480,
        features: ["25 Hours of Support", "CRM Data Management (HubSpot/Salesforce)", "Market Research Reports", "Travel & Expense Booking", "Document & Presentation Creation", "Weekly Strategy Sync Call"]
      },
      premium: {
        title: "Executive Operations VA",
        description: "Full-time 40-hour weekly dedicated virtual assistant with project management, team coordination, and executive reporting.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 1200,
        features: ["40 Hours/Week Dedicated Support", "Full Project Management (Asana/ClickUp)", "Team Communication Coordination", "Executive Dashboard Reporting", "Social Media Content Scheduling", "Ongoing Priority Support"]
      }
    }
  },
  {
    id: "g10",
    title: "I will integrate ChatGPT API and build AI-powered automation tools",
    category: "AI Services",
    rating: 4.9,
    reviewsCount: "290+",
    price: 450,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Rajan P.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 294,
      responseTextTime: "1 hour",
      memberSince: "Apr 2023",
      badgeType: "Top Rated"
    },
    description: "Supercharge your business with custom AI automation. I build tailored solutions using OpenAI GPT-4 API, LangChain, and vector databases — from intelligent chatbots and content generators to automated data extractors and decision engines. You will get a fully deployed, production-ready AI tool with documentation and handover training.",
    packages: {
      basic: {
        title: "AI Chatbot Starter",
        description: "Custom ChatGPT-powered chatbot trained on your data, embedded into your website with a clean UI widget.",
        deliveryTime: 5,
        revisions: 4,
        price: 450,
        features: ["Custom GPT-4 Chatbot", "Trained on Your Documents/Data", "Website Embed Widget", "API Integration", "Basic Admin Dashboard"]
      },
      standard: {
        title: "AI Content Automator",
        description: "End-to-end AI content pipeline — auto-generates blog posts, social media captions, email sequences, and product descriptions.",
        deliveryTime: 10,
        revisions: 6,
        price: 850,
        features: ["Multi-Platform Content Engine", "Brand Voice Customization", "Bulk Generation (50+ pieces)", "Schedule & Auto-Post Integration", "Analytics Dashboard", "1 Month Post-Deployment Support"]
      },
      premium: {
        title: "Enterprise AI Workflow",
        description: "Custom multi-agent AI system connecting your business tools, databases, and APIs for intelligent process automation.",
        deliveryTime: 18,
        revisions: "Unlimited",
        price: 2400,
        features: ["Custom Multi-Agent Architecture", "LangChain + Vector DB Pipeline", "CRM/ERP Tool Integrations", "Real-Time Decision Engine", "Admin Dashboard & Logging", "3 Months Priority Infrastructure Support"]
      }
    }
  },
  {
    id: "g11",
    title: "I will design a unique minimalist logo with brand identity suite",
    category: "Graphics & Design",
    rating: 4.9,
    reviewsCount: "2.3k+",
    price: 110,
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Aisha M.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: false,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 2350,
      responseTextTime: "3 hours",
      memberSince: "Jun 2018",
      badgeType: "Top Rated"
    },
    description: "Your brand deserves a memorable identity. I craft minimalist, modern logos with a complete brand suite including color palette, typography guidelines, and brand stationery. Every design is vector-based, fully scalable, and delivered with source files. Whether you are launching a startup or rebranding, I will give you a look that stands out.",
    packages: {
      basic: {
        title: "Essential Logo Pack",
        description: "Clean, minimalist logo design with 3 unique concepts, color variations, and vector source files.",
        deliveryTime: 3,
        revisions: 3,
        price: 110,
        features: ["3 Logo Concepts", "Minimalist Modern Style", "Color Variations", "Vector Files (AI, EPS, PDF)", "PNG + JPG Exports"]
      },
      standard: {
        title: "Brand Identity Suite",
        description: "Complete brand package with logo, color palette, typography guide, and matching business card design.",
        deliveryTime: 5,
        revisions: 6,
        price: 220,
        features: ["5 Logo Concepts", "Full Color Palette Definition", "Typography Guidelines", "Business Card Design", "Social Media Profile Kit", "All Source Files & Rights"]
      },
      premium: {
        title: "Ultimate Brand Ecosystem",
        description: "Full brand identity with logo, comprehensive brand guidelines PDF, full stationery suite, and iconography set.",
        deliveryTime: 8,
        revisions: "Unlimited",
        price: 460,
        features: ["8 Premium Logo Concepts", "Comprehensive Brand Guidelines PDF", "Full Stationery Suite (Letterhead, Envelope, Card)", "Custom Icon Set (20 Icons)", "Brand Mockups & Presentation Deck", "Unlimited Revisions Until Perfect"]
      }
    }
  },
  {
    id: "g12",
    title: "I will build a cross-platform mobile app with React Native",
    category: "Programming & Tech",
    rating: 4.9,
    reviewsCount: "310+",
    price: 650,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1520262454473-a1a82276a17f?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Erik N.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 4.9,
      reviewCountValue: 318,
      responseTextTime: "20 minutes",
      memberSince: "Sep 2019",
      badgeType: "Vetted Pro"
    },
    description: "One codebase, both platforms. I build high-performance React Native apps for iOS and Android with native feel, smooth animations, and robust backend integration. From MVP to full-scale production apps, I handle everything from UI implementation to API integration and App Store deployment. Let's turn your app idea into reality.",
    packages: {
      basic: {
        title: "MVP Launch",
        description: "Single-screen React Native app with core functionality, basic navigation, and API integration ready.",
        deliveryTime: 7,
        revisions: 4,
        price: 650,
        features: ["1 Main Screen with Core Feature", "React Navigation Setup", "REST API Integration", "Cross-Platform (iOS + Android)", "Source Code with Documentation"]
      },
      standard: {
        title: "Full Feature App",
        description: "Multi-screen app with authentication, state management, push notifications, and custom UI components.",
        deliveryTime: 14,
        revisions: 8,
        price: 1450,
        features: ["Up to 5 Screens", "User Auth (Email/Social)", "Redux/Zustand State Management", "Push Notifications Setup", "Custom Animated UI Components", "App Store Submission Ready"]
      },
      premium: {
        title: "Enterprise App Suite",
        description: "Full-scale production app with real-time data, media handling, payment integration, and admin dashboard.",
        deliveryTime: 21,
        revisions: "Unlimited",
        price: 3200,
        features: ["Unlimited Screens Architecture", "Real-Time Data (Firebase/WebSocket)", "Media Upload & Streaming", "In-App Purchases & Payment Gateway", "Admin Dashboard Web App", "3 Months Post-Launch Support"]
      }
    }
  },
  {
    id: "g13",
    title: "I will manage your social media accounts and grow your audience",
    category: "Digital Marketing",
    rating: 4.7,
    reviewsCount: "560+",
    price: 190,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Maya J.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.7,
      reviewCountValue: 568,
      responseTextTime: "2 hours",
      memberSince: "Oct 2021",
      badgeType: "Level 2"
    },
    description: "Grow your brand on Instagram, TikTok, LinkedIn, and Facebook with a tailored social media management strategy. I create engaging content calendars, design scroll-stopping graphics and reels, schedule posts, engage with your audience, and provide monthly analytics reports. Organic growth that actually converts into customers.",
    packages: {
      basic: {
        title: "Social Starter",
        description: "Manage 1 platform with 12 curated posts per month, captions, and hashtag research included.",
        deliveryTime: 3,
        revisions: 3,
        price: 190,
        features: ["1 Social Platform", "12 Posts/Month", "Custom Captions & Hashtags", "Content Calendar", "Monthly Analytics Report"]
      },
      standard: {
        title: "Growth Accelerator",
        description: "Full management of 2 platforms with 20 posts, original graphics, reels, and daily community engagement.",
        deliveryTime: 5,
        revisions: 5,
        price: 380,
        features: ["2 Social Platforms", "20 Posts + 4 Reels/Month", "Original Graphic Design", "Daily Community Engagement", "Bi-Weekly Strategy Calls", "Competitor Analysis Report"]
      },
      premium: {
        title: "Viral Brand Takeover",
        description: "All-inclusive 3-platform management with daily posting, influencer outreach, paid ad management, and conversion tracking.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 780,
        features: ["3 Social Platforms", "30 Posts + 8 Reels/Month", "Influencer Outreach Coordination", "Paid Social Ad Management ($200 budget)", "Full Funnel Conversion Tracking", "1 Month Retention Bonus Support"]
      }
    }
  },
  {
    id: "g14",
    title: "I will edit your YouTube videos with engaging cuts and effects",
    category: "Video & Animation",
    rating: 4.9,
    reviewsCount: "940+",
    price: 145,
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1574717024453-354056afaff9?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: false,
    isVideo: true,
    seller: {
      name: "Chris B.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 948,
      responseTextTime: "1 hour",
      memberSince: "Mar 2021",
      badgeType: "Top Rated"
    },
    description: "Transform your raw footage into engaging YouTube content that retains viewers. I specialize in fast-paced editing with jump cuts, motion graphics, sound design, color grading, and custom thumbnail design. Whether you are a vlogger, educator, or gamer, I will make your videos look professionally produced and keep your audience watching till the end.",
    packages: {
      basic: {
        title: "Essential Cuts",
        description: "Basic editing for videos up to 10 minutes — trimming, cuts, background music, and simple transitions.",
        deliveryTime: 3,
        revisions: 3,
        price: 145,
        features: ["Up to 10 Min Raw Footage", "Jump Cut Editing", "Background Music & SFX", "Basic Color Correction", "HD Export 1080p"]
      },
      standard: {
        title: "Pro YouTuber Edit",
        description: "Full editing for videos up to 20 minutes with motion graphics, text overlays, sound design, and custom thumbnail.",
        deliveryTime: 5,
        revisions: 6,
        price: 310,
        features: ["Up to 20 Min Raw Footage", "Motion Graphics & Text Overlays", "Advanced Sound Design", "Custom YouTube Thumbnail", "End Screen & Cards Integration", "SEO Title & Description"]
      },
      premium: {
        title: "Cinematic Creator Package",
        description: "Premium editing for videos up to 40 minutes with color grading, animations, multi-layer effects, and channel branding.",
        deliveryTime: 8,
        revisions: "Unlimited",
        price: 640,
        features: ["Up to 40 Min Raw Footage", "Professional Color Grading (LUTs)", "Custom Animated Intros & Outros", "Multi-Layer VFX & Compositing", "Full Channel Branding Package", "Source Files + Premiere Pro Project"]
      }
    }
  },
];

export const VERIFIED_PRO_WEBSITE_GIGS: Gig[] = [
  {
    id: "p1",
    title: "I will code a custom high-performance React Nextjs website or SaaS app",
    category: "Programming & Tech",
    rating: 5.0,
    reviewsCount: "250+",
    price: 850,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Jonathan C.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 5.0,
      reviewCountValue: 254,
      responseTextTime: "20 minutes",
      memberSince: "Jan 2018",
      badgeType: "Vetted Pro"
    },
    description: "Welcome! I am Jonathan, a Silicon Valley seasoned Senior Software Engineer specializing in fast, clean, and secure custom React applications, Next.js setups, Tailwind CSS animations, and modular node codebases. I build bespoke software platforms tailored to your business.",
    packages: {
      basic: {
        title: "Interactive Landing Page",
        description: "1 beautiful, responsive page built on React and Tailwind, featuring silky dynamic animations.",
        deliveryTime: 4,
        revisions: 5,
        price: 850,
        features: ["1 Page layout", "Tailwind CSS styling", "Smooth motion graphics", "Contact Form setup", "SEO metadata package"]
      },
      standard: {
        title: "Multi-Page Custom Web app",
        description: "Up to 5 highly structured modern pages, interactive state managers, custom dashboard dashboard.",
        deliveryTime: 8,
        revisions: 8,
        price: 1550,
        features: ["5 Complete Pages", "Interactive dynamic components", "Auth integrations if requested", "Fully responsive design", "Source code and deployment setup"]
      },
      premium: {
        title: "Fullstack Enterprise Solution",
        description: "Full-scale custom SaaS software, complete responsive user dashboard, cloud database databases, automated transactional mailers, support chat setup.",
        deliveryTime: 14,
        revisions: "Unlimited",
        price: 2890,
        features: ["Bespoke Design & Fullstack node integration", "Durable PostgreSQL/Firestore architecture", "Complete responsive customer dashboard", "Animated custom sliders & charts", "Payment Gateway (Stripe/PayPal) integrations", "3 Months technical maintenance support"]
      }
    }
  },
  {
    id: "p2",
    title: "I will design a highly professional Figma website ready for Webflow",
    category: "Graphics & Design",
    rating: 4.9,
    reviewsCount: "680+",
    price: 320,
    thumbnail: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: true,
    isVideo: false,
    seller: {
      name: "Elena R.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: true,
      isPro: true,
      ratingValue: 4.9,
      reviewCountValue: 686,
      responseTextTime: "1 hour",
      memberSince: "May 2021",
      badgeType: "Vetted Pro"
    },
    description: "Looking for top-tier visual branding on the web? Award-winning agency design architect Elena will paint your digital identity. Clean UI grids, high contrast details, balanced negative space, and custom UI components optimized to import beautifully into Webflow or custom React code.",
    packages: {
      basic: {
        title: "Bespoke Figma Wireframe",
        description: "Detailed wireframes and aesthetic moodboards for 3 key pages of your platform.",
        deliveryTime: 4,
        revisions: 4,
        price: 320,
        features: ["3 Pages Wireframe", "Components UI Style guide", "Moodboard inspiration mapping", "Source Figma files included"]
      },
      standard: {
        title: "Golden UI Web Layout",
        description: "Complete elite desktop and mobile responsive UI layout for up to 6 custom Webflow/custom pages in Figma.",
        deliveryTime: 7,
        revisions: "Unlimited",
        price: 580,
        features: ["6 Desktop pages designed", "Responsive Mobile layouts included", "Full component libraries & tokens", "Access to premium vector icon sets", "Commercial high resolution image setups"]
      },
      premium: {
        title: "Ultimate Brand Kit & Web",
        description: "Elite visual identity setup. Complete custom logos, bespoke brand typography, full 10-page premium UI designs, and social media template pack.",
        deliveryTime: 12,
        revisions: "Unlimited",
        price: 990,
        features: ["10 Pages UI Design", "Full custom brand logo designs and typography rules", "Social Media story/post Figma templates", "3 Fully customized icon collection specs", "Ready-to-export assets with developer handoff guidelines"]
      }
    }
  },
  {
    id: "p3",
    title: "I will secure and optimize your WordPress speed to under 1 second",
    category: "Programming & Tech",
    rating: 4.9,
    reviewsCount: "2k+",
    price: 180,
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=82",
    images: [
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=82",
      "https://images.unsplash.com/photo-1542744095-291853a069fc?auto=format&fit=crop&w=800&q=82"
    ],
    offersConsultation: false,
    isVideo: false,
    seller: {
      name: "Alexander M.",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isOnline: false,
      isPro: false,
      ratingValue: 4.9,
      reviewCountValue: 2432,
      responseTextTime: "2 hours",
      memberSince: "Nov 2017",
      badgeType: "Top Rated"
    },
    description: "Google Core Web Vitals directly determines search ranking and conversion rates. Even a 500ms delay drops your sales conversion rate by 11%! I will optimize your existing WordPress or Web hosting setup, compress media assets, structure database tables, clear heavy CSS paths, and guarantee safe, speed-capped delivery.",
    packages: {
      basic: {
        title: "Core Speed Boost",
        description: "Basic WordPress speed tuning, setup cache networks, and image compressions.",
        deliveryTime: 2,
        revisions: 2,
        price: 180,
        features: ["Core Web Vitals Check", "Gzip Compression config", "Active Image compression routing", "Cache system install"]
      },
      standard: {
        title: "Advanced Velocity Engine",
        description: "Full JS and CSS minification mapping, CDN cloudflare account configure, database queries cleanups, and responsive critical CSS styling.",
        deliveryTime: 4,
        revisions: 5,
        price: 320,
        features: ["Minify scripts & core styles", "Cloudflare CDN integration setup", "Database query optimizer script", "LCP (Largest Contentful Paint) optimization", "Desktop speed score of 95+ guarantee"]
      },
      premium: {
        title: "Ultimate Enterprise Acceleration",
        description: "The absolute premium speed setup. Complete theme asset code audit, local hosting for custom fonts, image lazy loadings, server level configurations, and dual security firewall installations.",
        deliveryTime: 6,
        revisions: "Unlimited",
        price: 540,
        features: ["Complete Asset and theme style code cleanups", "Server configuration adjustments (Nginx/htaccess)", "100% Google lighthouse mobile optimization", "Cloudflare Super bot-protection setting", "Enterprise premium security firewall layout", "60 Days post-launch speed security audit support"]
      }
    }
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    sellerName: "Divishha G.",
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Hi Hasibul, I've checked your requirements. I can starting today!",
    timestamp: "10:15 AM",
    unread: true,
    messages: [
      { id: "m1", sender: "user", text: "Hello! I am seeking a Shopify dropshipping store for high-end fitness products.", timestamp: "10:10 AM" },
      { id: "m2", sender: "seller", text: "Hi Hasibul, I've checked your requirements. I can starting today! We can run research on 5 hot winning products in fitness. Do you have a logo ready?", timestamp: "10:15 AM" }
    ]
  },
  {
    id: "c2",
    sellerName: "Nick",
    sellerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Shall we set up a 10 minute video consultation to align?",
    timestamp: "Yesterday",
    unread: false,
    messages: [
      { id: "m3", sender: "user", text: "Hi Nick, I saw your Vetted Pro store and loved it. What is your standard timeline?", timestamp: "Yesterday" },
      { id: "m4", sender: "seller", text: "Hey! Usually we take around 5 to 7 days to fully custom code and optimization the layout. Shall we set up a 10 minute video consultation to align on Zoom?", timestamp: "Yesterday" }
    ]
  },
  {
    id: "c3",
    sellerName: "Sonarish",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Awesome, please let me know if you need automated emails too.",
    timestamp: "3 days ago",
    unread: false,
    messages: [
      { id: "m5", sender: "seller", text: "Your store design is completely live now!", timestamp: "3 days ago" },
      { id: "m6", sender: "user", text: "Thank you so much, it looks very slick & fast!", timestamp: "3 days ago" },
      { id: "m7", sender: "seller", text: "Awesome, please let me know if you need automated emails too.", timestamp: "3 days ago" }
    ]
  }
];

export const INITIAL_BRIEFS: ProjectBrief[] = [
  {
    id: "b1",
    title: "Clean modern portfolio website design in React",
    category: "Programming & Tech",
    description: "Looking for a seasoned React & Tailwind developer to build an interactive, speed-optimized personal portfolio design. Need neat slider interfaces and a creative timeline.",
    budget: 150,
    deliveryDays: 5,
    status: "Active",
    createdAt: "2026-06-15",
    bids: [
      {
        id: "bid1",
        sellerName: "Jonathan C.",
        sellerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        sellerBadge: "Vetted Pro",
        price: 150,
        proposal: "Hi Hasibul, I am a Vetted Pro. I will deliver a super polished personal React portfolio page built strictly to professional standards. Let us build this custom-crafted masterpiece.",
        deliveryDays: 4,
        rating: 5.0
      },
      {
        id: "bid2",
        sellerName: "Divishha G.",
        sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        sellerBadge: "Top Rated",
        price: 135,
        proposal: "Hello! I can build this portfolio website for you with stunning dynamic motion animations and responsive modules. Let's make it fully responsive down to mobile devices.",
        deliveryDays: 3,
        rating: 4.9
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  "Trending 🔥",
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Finance",
  "AI Services"
];

function clampPrice(price: number): number {
  if (price >= 2 && price <= 9) return price;
  const val = (price % 8) + 2;
  return val;
}

RECOMMENDED_GIGS.forEach(gig => {
  gig.price = clampPrice(gig.price);
  if (gig.packages) {
    if (gig.packages.basic) gig.packages.basic.price = clampPrice(gig.packages.basic.price);
    if (gig.packages.standard) gig.packages.standard.price = clampPrice(gig.packages.standard.price);
    if (gig.packages.premium) gig.packages.premium.price = clampPrice(gig.packages.premium.price);
  }
});

VERIFIED_PRO_WEBSITE_GIGS.forEach(gig => {
  gig.price = clampPrice(gig.price);
  if (gig.packages) {
    if (gig.packages.basic) gig.packages.basic.price = clampPrice(gig.packages.basic.price);
    if (gig.packages.standard) gig.packages.standard.price = clampPrice(gig.packages.standard.price);
    if (gig.packages.premium) gig.packages.premium.price = clampPrice(gig.packages.premium.price);
  }
});

INITIAL_BRIEFS.forEach(brief => {
  brief.budget = clampPrice(brief.budget);
  if (brief.bids) {
    brief.bids.forEach(bid => {
      bid.price = clampPrice(bid.price);
    });
  }
});

