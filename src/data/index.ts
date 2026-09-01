import type { Project, Skill, Service, FAQItem, Social } from '../types';

export const projects: Project[] = [
  {
    id: 'sonorya',
    title: 'Sonorya',
    titleKey: 'project-card-sonorya-title',
    descKey: 'project-card-sonorya-desc',
    altKey: 'project-card-sonorya-alt',
    image: '/sonorya.png',
    url: 'https://sonorya.co',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
  },
  {
    id: 'technovaqcm',
    title: 'Technova QCM',
    titleKey: 'project-card-technovaqcm-title',
    descKey: 'project-card-technovaqcm-desc',
    altKey: 'project-card-technovaqcm-alt',
    image: '/technovaqcm.png',
    url: 'https://technovaqcm.vercel.app',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
  },
  {
    id: 'technova-learning',
    title: 'Technova Learning',
    titleKey: 'project-card-technova-title',
    descKey: 'project-card-technova-desc',
    altKey: 'project-card-technova-alt',
    image: '/technova_learning.jpg',
    url: 'https://www.technovalearning.com',
    tags: ['React', 'Next.js', 'Tailwind', 'Node.js'],
  },
  {
    id: 'bidossessi',
    title: 'BIDOSSESSI ENTERPRISE',
    titleKey: 'project-card1-title',
    descKey: 'project-card1-desc',
    altKey: 'project-card1-alt',
    image: '/bidossessi.png',
    url: 'https://bidossessi.vercel.app/',
    tags: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'Tailwind'],
  },
  {
    id: 'chez-elle',
    title: 'ETS CHEZ ELLE',
    titleKey: 'project-card3-title',
    descKey: 'project-card3-desc',
    altKey: 'project-card3-alt',
    image: '/chez_elle.jpg',
    url: 'https://chez-elle.vercel.app/',
    tags: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'Tailwind'],
  },
  {
    id: 'humanizer',
    title: 'Humanizer',
    titleKey: 'project-card-humanizer-title',
    descKey: 'project-card-humanizer-desc',
    altKey: 'project-card-humanizer-alt',
    image: '/humanizer.jpg',
    url: 'https://humanizer-ai-technova.vercel.app',
    tags: ['IA / AI', 'Python', 'React', 'API'],
  },
  {
    id: 'viral-ai',
    title: 'Viral AI',
    titleKey: 'project-card-viralai-title',
    descKey: 'project-card-viralai-desc',
    altKey: 'project-card-viralai-alt',
    image: '/viral_ai.jpg',
    url: 'https://viral-ai-media.vercel.app',
    tags: ['IA / AI', 'OpenAI', 'TypeScript', 'Tailwind'],
  },
];

export const skills: Skill[] = [
  {
    icon: 'fa-solid fa-code',
    titleKey: 'skills-card1-title',
    descKey: 'skills-card1-desc',
    tags: ['HTML5', 'CSS3', 'JS', 'TypeScript', 'PHP', 'Laravel', 'React', 'Node'],
    accentTags: ['Vercel', 'Supabase'],
  },
  {
    icon: 'fa-solid fa-network-wired',
    titleKey: 'skills-card2-title',
    descKey: 'skills-card2-desc',
    tags: ['TCP/IP', 'GNS3', 'Cisco IOS', 'VLAN', 'Routeurs'],
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    titleKey: 'skills-card3-title',
    descKey: 'skills-card3-desc',
    tags: ['skills-tag-diag', 'skills-tag-repair', 'Hardware'],
  },
  {
    icon: 'fa-brands fa-linux',
    titleKey: 'skills-card4-title',
    descKey: 'skills-card4-desc',
    tags: ['Ubuntu', 'Debian', 'Bash', 'Apache', 'SSH'],
  },
  {
    icon: 'fa-solid fa-laptop',
    titleKey: 'skills-card5-title',
    descKey: 'skills-card5-desc',
    tags: ['Windows', 'Linux', 'Drivers', 'Office'],
  },
  {
    icon: 'fa-solid fa-terminal',
    titleKey: 'skills-card6-title',
    descKey: 'skills-card6-desc',
    tags: ['Python', 'Git', 'skills-tag-scripts'],
  },
];

export const services: Service[] = [
  { number: '01', icon: 'fa-solid fa-wrench', titleKey: 'services-item1-title', descKey: 'services-item1-desc' },
  { number: '02', icon: 'fa-solid fa-laptop', titleKey: 'services-item2-title', descKey: 'services-item2-desc' },
  { number: '03', icon: 'fa-solid fa-globe', titleKey: 'services-item3-title', descKey: 'services-item3-desc' },
  { number: '04', icon: 'fa-solid fa-network-wired', titleKey: 'services-item4-title', descKey: 'services-item4-desc' },
  { number: '05', icon: 'fa-brands fa-linux', titleKey: 'services-item5-title', descKey: 'services-item5-desc' },
  { number: '06', icon: 'fa-solid fa-headset', titleKey: 'services-item6-title', descKey: 'services-item6-desc' },
];

export const faqItems: FAQItem[] = [
  { questionKey: 'faq-q1', answerKey: 'faq-a1' },
  { questionKey: 'faq-q2', answerKey: 'faq-a2' },
  { questionKey: 'faq-q3', answerKey: 'faq-a3' },
  { questionKey: 'faq-q4', answerKey: 'faq-a4' },
  { questionKey: 'faq-q5', answerKey: 'faq-a5' },
];

export const socials: Social[] = [
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/2290149046574', label: 'WhatsApp' },
  { name: 'Email', icon: 'fa-regular fa-envelope', url: 'mailto:arimelprecieux@gmail.com', label: 'Email' },
  { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/precieuxAyelesso', label: 'GitHub' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/in/pr%C3%A9cieux-ayelesso-a09850327/', label: 'LinkedIn' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://www.facebook.com/precieux.ayele', label: 'Facebook' },
];

export const techStack = [
  { icon: 'fa-brands fa-html5', name: 'HTML5' },
  { icon: 'fa-brands fa-css3', name: 'CSS3' },
  { icon: 'fa-brands fa-square-js', name: 'JavaScript' },
  { icon: 'fa-brands fa-js', name: 'TypeScript' },
  { icon: 'fa-brands fa-php', name: 'PHP' },
  { icon: 'fa-brands fa-bootstrap', name: 'Bootstrap' },
  { icon: 'fa-brands fa-laravel', name: 'Laravel' },
  { icon: 'fa-brands fa-react', name: 'React' },
  { icon: 'fa-brands fa-node-js', name: 'Node.js' },
  { icon: 'fa-brands fa-python', name: 'Python' },
  { icon: 'fa-brands fa-linux', name: 'Linux' },
  { icon: 'fa-solid fa-network-wired', name: 'GNS3' },
  { icon: 'fa-brands fa-windows', name: 'Windows' },
  { icon: 'fa-brands fa-git-alt', name: 'Git' },
  { icon: 'fa-solid fa-bolt', name: 'Supabase' },
  { icon: 'fa-solid fa-triangle-exclamation', name: 'Vercel' },
];
