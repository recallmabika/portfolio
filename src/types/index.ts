export type SectionId = 'home' | 'about' | 'competencies' | 'projects' | 'certifications' | 'contact';

export interface SectionMeta {
  id: SectionId;
  label: string;
  badge: string;
  angle: number;
}