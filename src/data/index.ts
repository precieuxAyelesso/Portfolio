import type { Project, Discipline, FAQItem, Social } from '../types';

export const projects: Project[] = [
  {
    id: 'benin-beyond',
    title: 'Bénin Beyond',
    key: 'p-benin',
    image: '/benin_beyond.jpg',
    url: 'https://beninbeyond.com',
    tags: ['React', 'Vite', 'Tailwind', 'Supabase'],
    tint: '#1f6f5c',
    featured: true,
  },
  {
    id: 'sonorya',
    title: 'Sonorya',
    key: 'p-sonorya',
    image: '/sonorya.png',
    url: 'https://sonorya.co',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    tint: '#ff4f1a',
    featured: true,
  },
  {
    id: 'technova-learning',
    title: 'Technova Learning',
    key: 'p-technova',
    image: '/technova_learning.jpg',
    url: 'https://www.technovalearning.com',
    tags: ['React', 'Next.js', 'Tailwind', 'Node.js'],
    tint: '#6d7cff',
    featured: true,
  },
  {
    id: 'technovaqcm',
    title: 'Technova QCM',
    key: 'p-qcm',
    image: '/technovaqcm.png',
    url: 'https://technovaqcm.vercel.app',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    tint: '#ffcf3d',
  },
  {
    id: 'humanizer',
    title: 'Humanizer',
    key: 'p-humanizer',
    image: '/humanizer.jpg',
    url: 'https://humanizer-ai-technova.vercel.app',
    tags: ['IA', 'Python', 'React', 'API'],
    tint: '#4dd6ff',
  },
  {
    id: 'viral-ai',
    title: 'Viral AI',
    key: 'p-viral',
    image: '/viral_ai.jpg',
    url: 'https://viral-ai-media.vercel.app',
    tags: ['IA', 'OpenAI', 'TypeScript', 'Tailwind'],
    tint: '#ff5dc8',
  },
  {
    id: 'bidossessi',
    title: 'Bidossessi Enterprise',
    key: 'p-bidossessi',
    image: '/bidossessi.png',
    url: 'https://bidossessi.vercel.app/',
    tags: ['HTML/CSS', 'JavaScript', 'Tailwind'],
    tint: '#9cff8a',
  },
  {
    id: 'chez-elle',
    title: 'ETS Chez Elle',
    key: 'p-chezelle',
    image: '/chez_elle.jpg',
    url: 'https://chez-elle.vercel.app/',
    tags: ['HTML/CSS', 'JavaScript', 'Bootstrap'],
    tint: '#ffa36b',
  },
];

export const disciplines: Discipline[] = [
  { number: '01', key: 'd-web', tags: ['React', 'Next.js', 'TypeScript', 'Laravel', 'Node.js', 'Supabase', 'Vercel'] },
  { number: '02', key: 'd-net', tags: ['TCP/IP', 'Cisco IOS', 'GNS3', 'VLAN', 'Wi-Fi'] },
  { number: '03', key: 'd-sys', tags: ['Ubuntu', 'Debian', 'Bash', 'Apache', 'SSH', 'Python'] },
  { number: '04', key: 'd-hw', tags: ['Diagnostic', 'Hardware', 'Windows', 'Linux', 'Office'] },
];

export const faqItems: FAQItem[] = [
  { questionKey: 'faq-q1', answerKey: 'faq-a1' },
  { questionKey: 'faq-q2', answerKey: 'faq-a2' },
  { questionKey: 'faq-q3', answerKey: 'faq-a3' },
  { questionKey: 'faq-q4', answerKey: 'faq-a4' },
  { questionKey: 'faq-q5', answerKey: 'faq-a5' },
];

export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/precieuxAyelesso' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pr%C3%A9cieux-ayelesso-a09850327/' },
  { name: 'WhatsApp', url: 'https://wa.me/2290149046574' },
  { name: 'Facebook', url: 'https://www.facebook.com/precieux.ayele' },
];

export const EMAIL = 'arimelprecieux@gmail.com';
export const WHATSAPP = '2290149046574';

export const techStack = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind',
  'PHP', 'Laravel', 'Python', 'Supabase', 'Vercel', 'Git', 'Linux', 'Bash', 'GNS3', 'Cisco', 'Windows',
];
