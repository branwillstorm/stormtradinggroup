/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  ExternalLink, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  Target,
  Tv,
  X
} from 'lucide-react';

import { GoogleGenAI } from "@google/genai";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// --- Custom Hooks ---
const useDraggableScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleDown = (pageX: number) => {
      isDown = true;
      startX = pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
      
      const inner = el.querySelector('[class*="animate-marquee"]');
      if (inner) (inner as HTMLElement).style.animationPlayState = 'paused';
    };

    const handleLeave = () => {
      isDown = false;
      el.style.cursor = 'grab';
      const inner = el.querySelector('[class*="animate-marquee"]');
      if (inner) (inner as HTMLElement).style.animationPlayState = 'running';
    };

    const handleUp = () => {
      isDown = false;
      el.style.cursor = 'grab';
      const inner = el.querySelector('[class*="animate-marquee"]');
      if (inner) (inner as HTMLElement).style.animationPlayState = 'running';
    };

    const handleMove = (pageX: number) => {
      if (!isDown) return;
      const x = pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseDown = (e: MouseEvent) => handleDown(e.pageX);
    const onMouseMove = (e: MouseEvent) => {
      if (isDown) e.preventDefault();
      handleMove(e.pageX);
    };

    const onTouchStart = (e: TouchEvent) => handleDown(e.touches[0].pageX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].pageX);
    const onTouchEnd = () => handleUp();

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mouseup', handleUp);
    el.addEventListener('mousemove', onMouseMove);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mouseup', handleUp);
      el.removeEventListener('mousemove', onMouseMove);

      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref]);
};

// --- Custom Icons ---
const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.527.257l.215-3.048 5.548-5.013c.242-.214-.054-.332-.376-.117l-6.86 4.319-2.956-.924c-.642-.201-.654-.642.133-.949l11.55-4.45c.535-.196.998.125.867.892z" />
  </svg>
);

const KickIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.414 2.586A2 2 0 0 0 18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-.586-1.414zM16 17h-2.5l-2.5-3.5V17H8.5V7h2.5v3.5L13.5 7H16l-3 5 3 5z" />
  </svg>
);

// --- Types ---
interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    tier: string;
    price: string;
    period: string;
  }[];
  link: string;
  icon: React.ReactNode;
  buttonText?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  result: string;
  avatar: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 'public-community',
    name: 'Public Community Chat',
    description: 'Join our free community of traders to discuss market trends and share insights.',
    icon: <MessageSquare className="w-6 h-6" />,
    features: ['Market Updates', 'Community Discussions', 'Basic Analysis', 'Available on Telegram/Discord'],
    pricing: [
      { tier: 'Access', price: 'Free', period: 'Forever' }
    ],
    link: 'https://whop.com/branwillstorm'
  },
  {
    id: 'full-course',
    name: 'Full Online Trading Course',
    description: 'Master the markets with our comprehensive rules-based trading system.',
    icon: <BookOpen className="w-6 h-6" />,
    features: ['Price Action Mastery', 'Top-Down Analysis', 'Confluence Checklist', 'Lifetime Access'],
    pricing: [
      { tier: 'Enrollment', price: 'One-time Purchase', period: 'Split Payment Available' }
    ],
    link: 'https://whop.com/branwillstorm'
  },
  {
    id: 'vip-chat',
    name: 'VIP Community Chat',
    description: 'Exclusive access to real-time trades, deep analysis, and live market sessions.',
    icon: <Zap className="w-6 h-6" />,
    features: ['Daily Trade Ideas', 'Live Trading Sessions', 'Direct Support', 'Advanced Strategies'],
    pricing: [
      { tier: 'Membership', price: 'Monthly Subscription', period: 'Recurring' }
    ],
    link: 'https://whop.com/branwillstorm'
  },
  {
    id: 'mentorship',
    name: '1-on-1 Private Mentorship',
    description: 'Personalized coaching to accelerate your journey to becoming a funded trader.',
    icon: <Users className="w-6 h-6" />,
    features: ['Personalized Roadmap', 'Weekly 1-on-1 Calls', 'Portfolio Review', 'Capital Raising Guidance'],
    pricing: [
      { tier: 'Coaching', price: 'One-time Fee', period: 'Split Payment Available' }
    ],
    link: 'https://calendly.com/branwillstorm/45min',
    buttonText: 'Schedule Personalized Call'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Funded Trader",
    content: "The mentorship program completely changed my perspective on risk management. I'm now managing $200k in capital.",
    result: "$200k Funded",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Swing Trader",
    content: "Storm's top-down analysis approach is the most logical way to read price action I've ever seen.",
    result: "Consistent 5% Monthly",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Full-time Trader",
    content: "Joined the VIP chat 6 months ago. The confluence checklist is now my bible for every trade.",
    result: "Quit 9-5 Job",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    id: 4,
    name: "Elena Petrova",
    role: "Crypto Trader",
    content: "The VIP community is incredible. Real-time updates and deep analysis that actually makes sense.",
    result: "300% Portfolio Growth",
    avatar: "https://picsum.photos/seed/elena/100/100"
  },
  {
    id: 5,
    name: "David Okafor",
    role: "Forex Trader",
    content: "Storm's mentorship is worth every penny. He doesn't just give fish, he teaches you how to fish.",
    result: "$100k Funded",
    avatar: "https://picsum.photos/seed/david/100/100"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Commodities Trader",
    content: "The rules-based system removed all the emotion from my trading. Best decision I've made.",
    result: "Consistent Profits",
    avatar: "https://picsum.photos/seed/james/100/100"
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "Day Trader",
    content: "I've tried many courses, but Storm's top-down analysis is the only one that actually works for me.",
    result: "Funded in 3 Months",
    avatar: "https://picsum.photos/seed/sophia/100/100"
  },
  {
    id: 8,
    name: "Kevin Zhang",
    role: "Swing Trader",
    content: "The confluence checklist is a game changer. My win rate has improved significantly.",
    result: "70% Win Rate",
    avatar: "https://picsum.photos/seed/kevin/100/100"
  }
];

const TRUSTPILOT_REVIEWS = [
  { id: 1, name: "Liam G.", content: "Storm Trading Group is the real deal. No fluff, just pure price action.", stars: 5, date: "2 days ago" },
  { id: 2, name: "Emma S.", content: "The mentorship is top-notch. Storm is very patient and explains everything clearly.", stars: 5, date: "1 week ago" },
  { id: 3, name: "Noah J.", content: "Best community I've ever been part of. The trade ideas are high probability.", stars: 5, date: "3 days ago" },
  { id: 4, name: "Olivia W.", content: "Finally found a system that works. Highly recommend the full course.", stars: 5, date: "2 weeks ago" },
  { id: 5, name: "Ethan B.", content: "The top-down analysis is a game changer. My win rate has doubled.", stars: 5, date: "1 day ago" },
  { id: 6, name: "Sophia L.", content: "Great support and very active community. I've learned so much in just a month.", stars: 5, date: "4 days ago" },
  { id: 7, name: "Mason K.", content: "The confluence checklist is essential. It's helped me stay disciplined.", stars: 5, date: "5 days ago" },
  { id: 8, name: "Isabella M.", content: "Storm's approach is logical and easy to follow. Highly recommended for all traders.", stars: 5, date: "6 days ago" },
  { id: 9, name: "Lucas H.", content: "I've been trading for years, but this is the first time I've felt truly consistent.", stars: 5, date: "1 week ago" },
  { id: 10, name: "Aria R.", content: "The live sessions are invaluable. Seeing the analysis in real-time is amazing.", stars: 5, date: "1 week ago" }
];

const CERTIFICATES = [
  { id: 1, firm: 'Funding Pips', imageUrl: '/Certd-11.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 2, firm: 'FundedNext', imageUrl: '/Certd-9.webp', color: 'from-[#00251A] to-[#004D40]', accent: '#00FFC2' },
  { id: 3, firm: 'My Funded Futures', imageUrl: '/1753873087488-certificate.png', color: 'from-[#0A0510] to-[#1A0A25]', accent: '#A855F7' },
  { id: 4, firm: 'FunderPro', imageUrl: '/congratulationsCert.053bd46ae9e05478ba6d.png', color: 'from-[#250A0A] to-[#4D1B1B]', accent: '#FF4444' },
  { id: 5, firm: 'Alpha Capital', imageUrl: '/passed-verification.jpeg', color: 'from-[#000000] to-[#1C1C1C]', accent: '#C0C0C0' },
  { id: 6, firm: 'FXIFY', imageUrl: '/1.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 7, firm: 'The 5ers', imageUrl: '/1 (1).webp', color: 'from-[#0A0510] to-[#1A0A25]', accent: '#FACC15' },
  { id: 8, firm: 'FTMO', imageUrl: '/1689668538823.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#D4AF37' },
  { id: 9, firm: 'TopTier Trader', imageUrl: '/1689668538823 (1).jpg', color: 'from-[#0A2463] to-[#1E3A8A]', accent: '#3B82F6' },
  { id: 10, firm: 'Prop Firm', imageUrl: '/1704149608485.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 11, firm: 'Prop Firm', imageUrl: '/1745769892931.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 12, firm: 'Prop Firm', imageUrl: '/1qWOKufHbUIyfSIAY2zFHnEiU.avif', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 13, firm: 'Prop Firm', imageUrl: '/1qWOKufHbUIyfSIAY2zFHnEiU.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 14, firm: 'Prop Firm', imageUrl: '/39500.png', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 15, firm: 'Prop Firm', imageUrl: '/FzTnZwsaUAIKvBf.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 16, firm: 'Prop Firm', imageUrl: '/G34CgmBWsAApzJ2.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 17, firm: 'Prop Firm', imageUrl: '/G_wAoKzW8AAZ5JJ.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 18, firm: 'Prop Firm', imageUrl: '/GwI2iDUasAAVg1j.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 19, firm: 'Prop Firm', imageUrl: '/GxkplLKXYAAW6i_.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 20, firm: 'Prop Firm', imageUrl: '/GzNNM8OWYAErCpn.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 21, firm: 'Prop Firm', imageUrl: '/HAz6fHRbsAAi_9N.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 22, firm: 'Prop Firm', imageUrl: '/HCaAZUfWUAAALUr.jpg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 23, firm: 'Prop Firm', imageUrl: '/JAiGGQEABvOArTQq1GrYdK48WE.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 24, firm: 'Prop Firm', imageUrl: '/LRUarGuOBbpeZNrR6iBWzNt16o.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 25, firm: 'Prop Firm', imageUrl: '/YuXuf1mpN5QiTrIYjNgq7Iec.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 26, firm: 'Prop Firm', imageUrl: '/aBy2AFDIKytyeJr2jnwRA2E4Hs.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 27, firm: 'Prop Firm', imageUrl: '/baU5RJUHD8KXnNUsPiOYdVsflc.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 28, firm: 'Prop Firm', imageUrl: '/dnkhtr46inaxo8029humm2en.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 29, firm: 'Prop Firm', imageUrl: '/eeZ5pzvrRDh8Xub6O0M7EnAP2JE.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 30, firm: 'Prop Firm', imageUrl: '/image-78.png', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 31, firm: 'Prop Firm', imageUrl: '/image.jpeg', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 32, firm: 'Prop Firm', imageUrl: '/k511eaaMGsogFlZuBiBsMRz1w.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 33, firm: 'Prop Firm', imageUrl: '/rmVxBSRS260orXezrH5WfaHv1fU.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' },
  { id: 34, firm: 'Prop Firm', imageUrl: '/u97E8NNFebjA6NDtmhyBSq2a1PU.webp', color: 'from-[#0A1525] to-[#1A2B4B]', accent: '#3B82F6' }
];

const PROP_FIRMS = [
  { name: 'TopTier Trader', url: 'https://toptiertrader.com', logo: 'https://toptiertrader.com/wp-content/uploads/2021/10/Top-Tier-Trader-Logo-White.png' },
  { name: 'FTMO', url: 'https://www.ftmo.com', logo: 'https://ftmo.com/wp-content/uploads/2021/04/FTMO_logo_white.png' },
  { name: 'FundedNext', url: 'https://www.fundednext.com', logo: 'https://fundednext.com/wp-content/uploads/2022/03/FundedNext-Logo-White.png' },
  { name: 'Alpha Capital', url: 'https://www.alphacapitalgroup.uk', logo: 'https://alphacapitalgroup.uk/wp-content/uploads/2023/10/Alpha-Capital-Group-Logo-White-1.png' },
  { name: 'Funding Pips', url: 'https://fundingpips.com', logo: 'https://fundingpips.com/wp-content/uploads/2023/01/Funding-Pips-Logo-White.png' },
  { name: 'FunderPro', url: 'https://funderpro.com', logo: 'https://funderpro.com/wp-content/themes/funderpro/assets/images/logo-white.svg' },
  { name: 'Comit Capital', url: 'https://comitcapital.com', logo: 'https://comitcapital.com/wp-content/themes/comit/assets/img/logo-white.svg' },
];

const BROKERS = [
  { name: 'SpaceMarkets', url: 'https://spacemarkets.io', logo: 'https://spacemarkets.io/wp-content/uploads/2023/05/logo-white.png' },
  { name: 'Trive', url: 'https://trive.com', logo: 'https://cdn.trive.com/assets/images/logo/trive-logo-white.svg' },
  { name: 'RCG Markets', url: 'https://rcgmarkets.com', logo: 'https://rcgmarkets.com/wp-content/uploads/2021/08/RCG-Markets-Logo-White.png' },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: <Linkedin />, url: 'https://www.linkedin.com/in/branwillstorm', color: 'hover:text-blue-500' },
  { name: 'X', icon: <Twitter />, url: 'https://www.x.com/branwillstorm', color: 'hover:text-white' },
  { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/branwillstorm', color: 'hover:text-pink-500' },
  { name: 'YouTube', icon: <Youtube />, url: 'https://www.youtube.com/branwillstorm', color: 'hover:text-red-600' },
  { name: 'Kick', icon: <KickIcon />, url: 'https://www.kick.com/branwillstorm', color: 'hover:text-[#53FC18]' },
  { name: 'Telegram', icon: <TelegramIcon />, url: 'https://t.me/branwillstorm', color: 'hover:text-blue-400' },
  { name: 'Discord', icon: <DiscordIcon />, url: 'https://whop.com/branwillstorm/branwillstorm/', color: 'hover:text-indigo-500' },
  { name: 'WhatsApp', icon: <MessageCircle />, url: 'https://api.whatsapp.com/send?phone=27614471418', color: 'hover:text-green-500' },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="font-bold tracking-tighter text-lg">STORM</span>
          <span className="font-medium tracking-tight text-xs ml-1.5 opacity-60 uppercase">Trading Group</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-white/70">
          <a href="#about" className="hover:text-brand-primary transition-colors">Experience</a>
          <a href="#methodology" className="hover:text-brand-primary transition-colors">Methodology</a>
          <a href="#products" className="hover:text-brand-primary transition-colors">Products</a>
          <a href="#apply" className="hover:text-brand-primary transition-colors">Apply</a>
          <a href="#results" className="hover:text-brand-primary transition-colors">Partners</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
        </div>
        <a 
          href="#apply" 
          className="gradient-bg text-white px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
        >
          JOIN NOW
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden trading-grid min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            5+ YEARS MARKET EXPERIENCE
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
            MASTER THE <br />
            <span className="gradient-text uppercase">Markets</span> <br />
            <span className="text-2xl md:text-4xl uppercase tracking-[0.2em] text-white/80">
              With <span className="gradient-text">Branwill Storm</span>
            </span>
          </h1>
          <div className="mb-8 max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-brand-primary mb-2">Shorten your learning curve</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-4">
              Learn from a day trader and swing trader who has studied with the best in the industry.
            </p>
            <p className="text-white/60 leading-relaxed">
              Professional multi-asset trading strategies for Crypto, Forex, Commodities, and Stocks. 
              From mentorship to capital raising, we build elite traders.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#products" 
              className="gradient-bg text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all group"
            >
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://calendly.com/branwillstorm/45min" 
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all"
            >
              Book 1-on-1 Call
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-6 neon-glow relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <TrendingUp className="text-brand-primary w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-mono uppercase">Live Performance</div>
                  <div className="font-bold text-lg">+142.8% YTD</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 font-mono uppercase">Status</div>
                <div className="text-brand-primary font-bold">ACTIVE</div>
              </div>
            </div>
            <div className="h-48 flex items-end gap-1 mb-6">
              {[40, 60, 45, 80, 70, 90, 85, 100, 95, 110, 120, 115].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + (i * 0.05), duration: 0.5 }}
                  className="flex-1 bg-brand-primary/40 rounded-t-sm hover:bg-brand-primary transition-colors cursor-pointer"
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-brand-border pt-6">
              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono mb-1">Win Rate</div>
                <div className="font-bold">68.4%</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono mb-1">Avg RR</div>
                <div className="font-bold">1:3.2</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono mb-1">Drawdown</div>
                <div className="font-bold text-red-500">2.4%</div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary/10 blur-3xl rounded-full"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ title, subtitle, badge }: { title: string, subtitle: string, badge?: string }) => (
  <div className="mb-16">
    {badge && (
      <div className="text-brand-primary font-mono text-xs uppercase tracking-[0.3em] mb-4">{badge}</div>
    )}
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
    <p className="text-white/50 max-w-2xl text-lg">{subtitle}</p>
  </div>
);

const About = () => (
  <section id="about" className="py-24 bg-brand-card/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading 
            badge="The Founder"
            title="My Trading Journey"
            subtitle="I started trading in 2019 through trial and error, learning the hard way what works and what doesn't. Over the years, I've had the privilege of learning from some of the most successful traders around the world. Now, I'm here to share that knowledge with you—to help you avoid the mistakes I made and fast-track your journey to becoming a profitable trader."
          />
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card flex items-center justify-center">
                <Globe className="text-brand-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1 text-white">Multi-Asset Expertise</h4>
                <p className="text-white/50 text-sm">Specializing in Crypto (Spot/Perps), Forex, Commodities, Indices, and Stocks.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card flex items-center justify-center">
                <Target className="text-brand-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1 text-white">Capital Management</h4>
                <p className="text-white/50 text-sm">Managing private capital and helping students secure funding from top prop firms like FTMO and Funded Next.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 glass-card flex items-center justify-center">
                <Cpu className="text-brand-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1 text-white">Hybrid Trading System</h4>
                <p className="text-white/50 text-sm">90% rules-based execution with 10% discretionary intuition built from 5+ years of market experience.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">2019</div>
            <div className="text-xs text-white/40 uppercase font-mono">Started Trading</div>
          </div>
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center mt-8">
            <div className="text-4xl font-bold text-brand-primary mb-2">500+</div>
            <div className="text-xs text-white/40 uppercase font-mono">Students Taught</div>
          </div>
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">$10M+</div>
            <div className="text-xs text-white/40 uppercase font-mono">Student Funding</div>
          </div>
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center mt-8">
            <div className="text-4xl font-bold text-brand-primary mb-2">90/10</div>
            <div className="text-xs text-white/40 uppercase font-mono">Rule/Discretionary</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Methodology = () => (
  <section id="methodology" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        badge="The Strategy"
        title="Our Trading Methodology"
        subtitle="We combine raw price action with fundamental context to find high-probability setups across multiple timeframes."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Top-Down Analysis",
            desc: "Starting from Monthly/Weekly timeframes to identify the 'Big Picture' trend before drilling down to execution timeframes.",
            icon: <BarChart3 />
          },
          {
            title: "Price Action Mastery",
            desc: "Utilizing Japanese Candlestick patterns, liquidity concepts, and market structure without the noise of lagging indicators.",
            icon: <TrendingUp />
          },
          {
            title: "Confluence Checklist",
            desc: "Every trade must meet a strict 5-point criteria. If it doesn't tick all the boxes, we don't take the risk.",
            icon: <CheckCircle2 />
          }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 group hover:border-brand-primary/50 transition-all">
            <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-white/50 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Products = () => (
  <section id="products" className="py-24 bg-brand-card/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        badge="Programs"
        title="Choose Your Path"
        subtitle="From free community access to intensive 1-on-1 mentorship, we have a program tailored for your current level."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="glass-card flex flex-col h-full">
            <div className="p-8 border-b border-brand-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
              </div>
              <p className="text-white/50 mb-8">{product.description}</p>
              <div className="space-y-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-black/20 flex-grow flex flex-col justify-between">
              <div className="mb-8">
                {product.pricing.map((p, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] text-brand-primary uppercase font-mono mb-2 tracking-widest">{p.tier}</div>
                    <div className="text-2xl font-bold text-white mb-1">{p.price}</div>
                    <div className="text-xs text-white/40 font-mono italic">{p.period}</div>
                  </div>
                ))}
              </div>
              <a 
                href={product.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full gradient-bg text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                {product.buttonText || 'Get Started'} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CertificateGallery = () => {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATES.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCert(cert)}
            className="glass-card p-0 aspect-[1.4/1] shadow-2xl overflow-hidden group/cert border-2 border-brand-primary/20 cursor-pointer relative"
          >
            <div className="w-full h-full relative bg-zinc-900">
              <img 
                src={cert.imageUrl} 
                alt="Certificate" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/cert:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${cert.id}/800/600`;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="flex flex-col transform translate-y-4 group-hover/cert:translate-y-0 transition-transform duration-500">
                  <div className="h-1 w-12 bg-brand-primary mt-4 rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-6 right-6 p-3 bg-brand-primary/20 backdrop-blur-xl rounded-full border border-brand-primary/40 text-brand-primary shadow-2xl transform group-hover/cert:rotate-12 transition-transform duration-500">
                <ShieldCheck size={24} />
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/cert:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover/cert:translate-x-full transform skew-x-12"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              <div className="flex-grow overflow-hidden flex items-center justify-center p-2 md:p-4">
                <img 
                  src={selectedCert.imageUrl} 
                  alt="Certificate Full" 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-10"
              >
                <X className="w-5 h-5 md:w-6 h-6" />
              </button>

              <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="text-brand-primary w-5 h-5" />
                  <span className="text-white font-bold uppercase tracking-widest text-[10px]">Verified Achievement</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Results = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);

  useDraggableScroll(testimonialRef);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="results" className="py-24 overflow-hidden bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading 
          badge="Wall of Fame"
          title="Student Results and Testimonials"
          subtitle="Our community consists of traders who follow the rules and reap the rewards. Here's what they have to say."
        />
      </div>
      
      {/* Testimonials Marquee */}
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-4 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll(testimonialRef, 'left')}
            className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:text-black transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll(testimonialRef, 'right')}
            className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:text-black transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div 
          ref={testimonialRef}
          className="relative w-full overflow-hidden touch-scroll no-scrollbar py-10"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="flex animate-marquee-reverse-slow whitespace-nowrap">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div key={`${t.id}-${idx}`} className="inline-block w-[420px] h-[420px] mx-4 whitespace-normal touch-scroll-item">
                <div className="glass-card p-8 h-full flex flex-col border-brand-primary/20 hover:border-brand-primary transition-all duration-500 rounded-[4rem]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-primary/30" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-[9px] text-brand-primary font-mono uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic mb-4 flex-grow leading-relaxed text-xs overflow-y-auto no-scrollbar">"{t.content}"</p>
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[8px] text-white/40 uppercase font-mono tracking-widest">Result</div>
                    <div className="text-xs font-bold text-brand-primary uppercase tracking-tighter">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-bg to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent z-10"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-12 text-center uppercase tracking-widest text-white/60">Student Success & Payout Certificates</h3>
          <CertificateGallery />
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest text-white/60">Partnered Prop Firms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROP_FIRMS.map((firm) => (
              <a key={firm.name} href={firm.url} target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex flex-col items-center justify-center group hover:border-brand-primary transition-all">
                <div className="w-full h-16 bg-white/5 rounded-lg p-3 flex items-center justify-center overflow-hidden border border-white/10">
                  <img 
                    src={firm.logo} 
                    alt={firm.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-white/60 font-bold text-xs uppercase tracking-widest">${firm.name}</span>`;
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest text-white/60">Partnered Brokers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BROKERS.map((broker) => (
              <a key={broker.name} href={broker.url} target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex flex-col items-center justify-center group hover:border-brand-secondary transition-all">
                <div className="w-full h-16 bg-white/5 rounded-lg p-3 flex items-center justify-center overflow-hidden border border-white/10">
                  <img 
                    src={broker.logo} 
                    alt={broker.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-white/60 font-bold text-xs uppercase tracking-widest">${broker.name}</span>`;
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    otherLocation: '',
    tradedBefore: '',
    tradingDuration: '',
    activelyTrading: '',
    accountType: '',
    budget: '',
    previousMentorship: '',
    mentorName: '',
    phoneNumber: '',
    countryCode: '+1'
  });

  const questions = [
    {
      id: 'fullName',
      question: "What's your full name?",
      type: 'text',
      placeholder: 'Type your answer here...',
      required: true
    },
    {
      id: 'email',
      question: "What's your Gmail address?",
      type: 'email',
      placeholder: 'name@gmail.com',
      required: true
    },
    {
      id: 'location',
      question: "Where are you based?",
      type: 'choice',
      options: ['United Kingdom', 'United States', 'South Africa', 'Europe', 'Other'],
      required: true
    },
    {
      id: 'tradedBefore',
      question: "Have you traded before?",
      type: 'choice',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: 'activelyTrading',
      question: "Are you actively trading now?",
      type: 'choice',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: 'budget',
      question: "What budget are you looking to invest in your training?",
      type: 'choice',
      options: ['$200-$400', '$500-$800', '$1000-$1500'],
      required: true
    },
    {
      id: 'previousMentorship',
      question: "Have you joined a mentorship or watched any other course before?",
      type: 'choice',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: 'phoneNumber',
      question: "What is your phone number?",
      type: 'phone',
      required: true
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      // Validation
      const currentQuestion = questions[step];
      if (currentQuestion.required && !formData[currentQuestion.id as keyof typeof formData] && currentQuestion.type !== 'phone') {
        return;
      }
      
      // Skip logic for mentor name if previousMentorship is No
      if (step === 6 && formData.previousMentorship === 'No') {
        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isLastStep = step === questions.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const summary = `*New Application Form Submission*\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Email:* ${formData.email}\n` +
      `*Location:* ${formData.location === 'Other' ? formData.otherLocation : formData.location}\n` +
      `*Traded Before:* ${formData.tradedBefore}${formData.tradedBefore === 'Yes' ? ' (' + formData.tradingDuration + ')' : ''}\n` +
      `*Actively Trading:* ${formData.activelyTrading}${formData.activelyTrading === 'Yes' ? ' (' + formData.accountType + ')' : ''}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Previous Mentorship:* ${formData.previousMentorship}${formData.previousMentorship === 'Yes' ? ' (' + formData.mentorName + ')' : ''}\n` +
      `*Phone:* +${formData.phoneNumber}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=27614471418&text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
    alert("Thank you for your application! Redirecting to WhatsApp...");
  };

  return (
    <section id="apply" className="py-16 bg-brand-bg relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 md:p-10 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-brand-primary transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-brand-primary font-mono text-lg">{step + 1} →</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">{questions[step].question}</h3>
              </div>

              {questions[step].type === 'text' || questions[step].type === 'email' ? (
                <input
                  type={questions[step].type}
                  value={formData[questions[step].id as keyof typeof formData]}
                  onChange={(e) => updateField(questions[step].id, e.target.value)}
                  placeholder={questions[step].placeholder}
                  className="w-full bg-transparent border-b-2 border-brand-primary/30 py-4 text-xl outline-none focus:border-brand-primary transition-colors text-white"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              ) : questions[step].type === 'choice' ? (
                <div className="space-y-3">
                  {questions[step].options?.map((option, i) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateField(questions[step].id, option);
                        // Auto-next only if no follow-up is needed
                        const hasFollowUp = 
                          (questions[step].id === 'location' && option === 'Other') ||
                          (questions[step].id === 'tradedBefore' && option === 'Yes') ||
                          (questions[step].id === 'activelyTrading' && option === 'Yes') ||
                          (questions[step].id === 'previousMentorship' && option === 'Yes');
                        
                        if (!hasFollowUp) setTimeout(handleNext, 300);
                      }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between group ${
                        formData[questions[step].id as keyof typeof formData] === option
                          ? 'border-brand-primary bg-brand-primary/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-xs font-bold group-hover:border-brand-primary transition-colors">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-base">{option}</span>
                      </div>
                      {formData[questions[step].id as keyof typeof formData] === option && (
                        <CheckCircle2 className="text-brand-primary w-5 h-5" />
                      )}
                    </button>
                  ))}
                  
                  {questions[step].id === 'location' && formData.location === 'Other' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <input
                        type="text"
                        placeholder="Please specify your location..."
                        value={formData.otherLocation}
                        onChange={(e) => updateField('otherLocation', e.target.value)}
                        className="w-full bg-transparent border-b-2 border-brand-primary/30 py-2 text-xl outline-none focus:border-brand-primary transition-colors text-white"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      />
                    </motion.div>
                  )}

                  {questions[step].id === 'tradedBefore' && formData.tradedBefore === 'Yes' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <p className="text-sm text-white/40 mb-2 uppercase font-mono">How long have you been trading/learning? When did you start?</p>
                      <input
                        type="text"
                        placeholder="e.g. 2 years, started in 2024..."
                        value={formData.tradingDuration}
                        onChange={(e) => updateField('tradingDuration', e.target.value)}
                        className="w-full bg-transparent border-b-2 border-brand-primary/30 py-2 text-xl outline-none focus:border-brand-primary transition-colors text-white"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      />
                    </motion.div>
                  )}

                  {questions[step].id === 'activelyTrading' && formData.activelyTrading === 'Yes' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <p className="text-sm text-white/40 mb-2 uppercase font-mono">Are you trading Live, Demo, or Prop Firm account?</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Live', 'Demo', 'Prop Firm'].map((type) => (
                          <button
                            key={type}
                            onClick={() => updateField('accountType', type)}
                            className={`px-4 py-2 rounded-full border text-sm transition-all ${
                              formData.accountType === type 
                                ? 'bg-brand-primary text-black border-brand-primary' 
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {questions[step].id === 'previousMentorship' && formData.previousMentorship === 'Yes' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                      <p className="text-sm text-white/40 mb-2 uppercase font-mono">Whose course/mentorship did you join?</p>
                      <input
                        type="text"
                        placeholder="Mentor name..."
                        value={formData.mentorName}
                        onChange={(e) => updateField('mentorName', e.target.value)}
                        className="w-full bg-transparent border-b-2 border-brand-primary/30 py-2 text-xl outline-none focus:border-brand-primary transition-colors text-white"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      />
                    </motion.div>
                  )}
                </div>
              ) : questions[step].type === 'phone' ? (
                <div className="phone-input-container">
                  <PhoneInput
                    country={'za'}
                    value={formData.phoneNumber}
                    onChange={(phone) => updateField('phoneNumber', phone)}
                    enableSearch={true}
                    containerClass="!w-full"
                    inputClass="!w-full !bg-transparent !border-none !border-b-2 !border-brand-primary/30 !py-8 !text-xl !outline-none !focus:border-brand-primary !transition-colors !text-white !h-auto !pl-14"
                    buttonClass="!bg-transparent !border-none !border-b-2 !border-brand-primary/30 !hover:bg-white/5"
                    dropdownClass="!bg-brand-card !text-white !border-brand-border"
                    searchClass="!bg-brand-bg !text-white !border-brand-border"
                  />
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {step > 0 && (
                <button onClick={handleBack} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
              )}
            </div>
            
            {!isLastStep ? (
              <button 
                onClick={handleNext}
                className="gradient-bg text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all text-sm"
              >
                OK <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="gradient-bg text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20"
              >
                SUBMIT APPLICATION <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="mt-6 text-[10px] text-white/20 font-mono uppercase tracking-widest text-center">
            Press Enter ↵ to continue
          </div>
        </div>
      </div>
    </section>
  );
};

const Trustpilot = () => {
  const trustRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(trustRef);

  const scroll = (direction: 'left' | 'right') => {
    if (trustRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      trustRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-brand-card/20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="bg-[#00b67a] p-3 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Trustpilot</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                ))}
                <span className="ml-2 text-white/60 text-sm font-medium">Excellent 4.9/5</span>
              </div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/40 text-sm uppercase tracking-widest font-mono mb-2">Based on 150+ reviews</p>
            <a href="https://trustpilot.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline font-bold">View all reviews</a>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#00b67a] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#00b67a] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={trustRef} 
          className="relative w-full overflow-hidden touch-scroll no-scrollbar py-8"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="flex animate-marquee-reverse-slow whitespace-nowrap">
            {[...TRUSTPILOT_REVIEWS, ...TRUSTPILOT_REVIEWS].map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="inline-block w-[450px] h-[450px] mx-6 whitespace-normal touch-scroll-item">
                <div className="bg-white/5 p-10 rounded-[5rem] border border-white/10 hover:border-[#00b67a]/40 transition-all h-full flex flex-col shadow-2xl relative group/card">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="#00b67a">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.stars)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/90 mb-6 italic flex-grow leading-relaxed overflow-y-auto no-scrollbar">"{review.content}"</p>
                  <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-white">{review.name}</span>
                      <span className="text-[9px] text-[#00b67a] font-bold uppercase tracking-widest">Verified Customer</span>
                    </div>
                    <span className="text-[9px] text-white/20 uppercase font-mono">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-bg to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-brand-card/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading 
            badge="Contact"
            title="Let's Connect"
            subtitle="Have questions about our programs or want to discuss a private partnership? Reach out through any of our channels."
          />
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-white/40 font-mono uppercase">Email</div>
                <a href="mailto:stormbranwill@gmail.com" className="font-bold hover:text-brand-primary transition-colors">stormbranwill@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-white/40 font-mono uppercase">WhatsApp Business</div>
                <a href="https://api.whatsapp.com/send?phone=27614471418" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-brand-primary transition-colors">+27 61 447 1418</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-white/40 font-mono uppercase">Booking</div>
                <a href="https://calendly.com/branwillstorm/45min" className="font-bold hover:text-brand-primary transition-colors">calendly.com/branwillstorm/45min</a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 glass-card flex items-center justify-center transition-all ${social.color}`}
                title={social.name}
              >
                {React.cloneElement(social.icon as React.ReactElement, { size: 20 })}
              </a>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form 
            className="space-y-4" 
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const formData = new FormData(target);
              const name = formData.get('name');
              const email = formData.get('email');
              const subject = formData.get('subject');
              const message = formData.get('message');
              
              const fullMessage = `*New Inquiry from Storm Trading Group Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
              
              // Open WhatsApp
              const whatsappUrl = `https://api.whatsapp.com/send?phone=27614471418&text=${encodeURIComponent(fullMessage)}`;
              window.open(whatsappUrl, '_blank');
              
              // Also trigger Email
              const mailtoUrl = `mailto:stormbranwill@gmail.com?subject=${encodeURIComponent('Website Inquiry: ' + subject)}&body=${encodeURIComponent(fullMessage)}`;
              setTimeout(() => {
                window.location.href = mailtoUrl;
              }, 500);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-white/40 font-mono uppercase">Name</label>
                <input name="name" type="text" required className="w-full bg-black/40 border border-brand-border rounded-lg p-3 focus:border-brand-primary outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 font-mono uppercase">Email</label>
                <input name="email" type="email" required className="w-full bg-black/40 border border-brand-border rounded-lg p-3 focus:border-brand-primary outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 font-mono uppercase">Subject</label>
              <select name="subject" className="w-full bg-black/40 border border-brand-border rounded-lg p-3 focus:border-brand-primary outline-none transition-all">
                <option>General Inquiry</option>
                <option>Mentorship Program</option>
                <option>Course Support</option>
                <option>Partnership</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 font-mono uppercase">Message</label>
              <textarea name="message" required className="w-full bg-black/40 border border-brand-border rounded-lg p-3 focus:border-brand-primary outline-none transition-all h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-full gradient-bg text-white font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Send Message <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-white/30 text-center mt-4">
              Clicking send will open both WhatsApp and your Email client to ensure we receive your message.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-brand-border bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center">
          <span className="font-bold tracking-tighter text-lg">STORM</span>
          <span className="font-medium tracking-tight text-xs ml-1.5 opacity-60 uppercase">Trading Group</span>
        </div>
        <div className="text-white/40 text-sm text-center md:text-right">
          <p>© 2026 Storm Trading Group. All rights reserved.</p>
          <p className="mt-1">Trading involves significant risk. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Methodology />
      <Products />
      <ApplicationForm />
      <Results />
      <Trustpilot />
      <Contact />
      <Footer />
    </div>
  );
}
