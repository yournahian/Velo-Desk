import { Service } from "@/lib/types";

export const mockService: Service = {
  id: "svc-001",
  title: "I will build a modern responsive React Next.js website or web app",
  category: "Programming & Tech",
  subcategory: "Web Development",
  description:
    "I will build a pixel-perfect, high-performance React or Next.js application with modern UI/UX, responsive design, and clean code architecture.",
  longDescription: `I specialize in building modern web applications using React, Next.js, and TypeScript with a focus on performance, accessibility, and beautiful design.

With over 5 years of experience in full-stack development, I've delivered 200+ projects ranging from landing pages to complex SaaS platforms. Every project I deliver includes:

- Clean, maintainable code with TypeScript
- Responsive design that works on all devices
- SEO-optimized structure
- Performance-first approach with Core Web Vitals
- Modern UI with Tailwind CSS and animations

I communicate clearly, deliver on time, and provide post-delivery support. Let's build something great together.`,
  images: [
    { id: "img-1", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=80", alt: "Web development dashboard", type: "image" },
    { id: "img-2", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80", alt: "Code editor", type: "image" },
    { id: "img-3", src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=800&q=80", alt: "Design mockup", type: "image" },
    { id: "img-4", src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&h=800&q=80", alt: "Responsive design", type: "image" },
  ],
  packages: [
    {
      name: "Basic",
      price: 3,
      originalPrice: 5,
      description: "Perfect for simple landing pages or small projects",
      deliveryDays: 5,
      revisions: 2,
      features: [
        "1 Page / Section",
        "Responsive Design",
        "Basic Animations",
        "SEO Meta Tags",
        "3 Days Support",
      ],
    },
    {
      name: "Standard",
      price: 5,
      originalPrice: 8,
      description: "Ideal for multi-page business websites or web apps",
      deliveryDays: 7,
      revisions: 5,
      isPopular: true,
      features: [
        "5 Pages / Sections",
        "Responsive Design",
        "Advanced Animations",
        "SEO Optimization",
        "API Integration",
        "Database Setup",
        "7 Days Support",
        "Admin Dashboard",
      ],
    },
    {
      name: "Premium",
      price: 9,
      originalPrice: 15,
      description: "Full-featured enterprise-grade application",
      deliveryDays: 14,
      revisions: 10,
      features: [
        "Unlimited Pages",
        "Responsive Design",
        "Custom Animations",
        "Full SEO Strategy",
        "Complex API Integration",
        "Database Architecture",
        "Authentication System",
        "Payment Integration",
        "30 Days Support",
        "Deployment Assistance",
      ],
    },
  ],
  seller: {
    id: "seller-1",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Full-Stack Developer & UI/UX Designer",
    rating: 4.9,
    reviewCount: 847,
    totalSales: 1250,
    memberSince: "2021",
    description:
      "Senior full-stack developer with expertise in React, Next.js, Node.js, and modern web technologies. I deliver high-quality, performant, and visually stunning web applications.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "GraphQL",
      "AWS",
    ],
    languages: [
      { language: "English", level: "Native" },
      { language: "Spanish", level: "Fluent" },
      { language: "French", level: "Intermediate" },
    ],
    responseTime: "1 hour",
    responseRate: 99,
    lastDelivery: "1 day ago",
    isPro: true,
    isVerified: true,
  },
  reviews: [
    {
      id: "rev-1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        country: "United States",
      },
      rating: 5,
      title: "Exceptional work, exceeded expectations!",
      text: "Alex built our entire SaaS platform from scratch. The code quality is outstanding, communication was seamless, and delivery was ahead of schedule. Highly recommended for any complex web development project.",
      package: "Premium",
      date: "2 weeks ago",
      helpful: 24,
      sellerResponse:
        "Thank you Sarah! It was a pleasure working on your platform. Your clear requirements made the process smooth. Looking forward to future collaborations!",
    },
    {
      id: "rev-2",
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        country: "Canada",
      },
      rating: 5,
      title: "Very professional and talented developer",
      text: "Alex delivered a stunning website for our startup. His attention to detail and modern design approach really made a difference. Will definitely work with him again.",
      package: "Standard",
      date: "1 month ago",
      helpful: 18,
    },
    {
      id: "rev-3",
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        country: "United Kingdom",
      },
      rating: 5,
      title: "Outstanding Next.js expertise",
      text: "Alex helped us migrate our legacy app to Next.js 15 with App Router. The performance improvements were incredible. His knowledge of the latest React patterns is impressive.",
      package: "Premium",
      date: "3 weeks ago",
      helpful: 15,
      sellerResponse:
        "Thanks Emily! The migration was a great challenge and I'm thrilled with the results. Your team was fantastic to work with!",
    },
    {
      id: "rev-4",
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
      },
      rating: 4,
      title: "Great work, minor revisions needed",
      text: "Overall very satisfied with the delivered product. Alex is skilled and responsive. Had a couple of minor issues that were fixed quickly. Would recommend.",
      package: "Basic",
      date: "2 months ago",
      helpful: 9,
    },
    {
      id: "rev-5",
      user: {
        name: "Lisa Thompson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        country: "Australia",
      },
      rating: 5,
      title: "Best developer on this platform",
      text: "This is my third project with Alex and he never disappoints. Fast, reliable, and produces clean, well-documented code. A true professional.",
      package: "Standard",
      date: "1 month ago",
      helpful: 32,
    },
  ],
  rating: 4.9,
  reviewCount: 847,
  totalOrders: 1250,
  faqs: [
    {
      question: "What information do you need to start the project?",
      answer: "I need a detailed project brief including your requirements, design preferences (references if any), target audience, and any specific functionality you need. The more details, the better the outcome.",
    },
    {
      question: "Do you provide revisions after delivery?",
      answer: "Yes, each package includes a set number of revisions. I work with you to refine the delivery until it meets your expectations within the revision scope.",
    },
    {
      question: "Can you work with existing code or design files?",
      answer: "Absolutely! I can work with existing codebases, Figma designs, Adobe XD files, or any other format. Just share what you have and I'll take it from there.",
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround depends on the package complexity. Basic packages are typically delivered within 5 days, Standard within 7 days, and Premium within 14 days. Complex projects may require additional time.",
    },
    {
      question: "Do you provide ongoing maintenance after completion?",
      answer: "Yes, all packages include post-delivery support. For ongoing maintenance or feature additions, we can discuss a separate arrangement or retainer.",
    },
  ],
  tags: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Web Development",
    "Frontend",
    "Full Stack",
    "SaaS",
  ],
};
