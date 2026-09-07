import type { SectionMeta } from '../types';

// Top nav and ring sections (Home is NOT in the top nav or ring, it is the initial state)
export const SECTIONS: SectionMeta[] = [
  { id: 'about', label: 'About', badge: 'ABOUT', angle: 0 },
  { id: 'competencies', label: 'Competencies', badge: 'COMPETENCIES', angle: 72 },
  { id: 'projects', label: 'Projects', badge: 'PROJECTS', angle: 144 },
  { id: 'certifications', label: 'Certifications', badge: 'CERTIFICATION', angle: 216 },
  { id: 'contact', label: 'Contact', badge: 'CONTACT', angle: 288 },
];