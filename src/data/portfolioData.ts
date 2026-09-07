import type { SectionMeta } from '../types';

export const SECTIONS: SectionMeta[] = [
  { id: 'about', label: 'About', badge: 'ABOUT', angle: 0 },
  { id: 'competencies', label: 'Competencies', badge: 'COMPETENCIES', angle: 72 },
  { id: 'projects', label: 'Projects', badge: 'PROJECTS', angle: 144 },
  { id: 'certifications', label: 'Certifications', badge: 'CERTIFICATION', angle: 216 },
  { id: 'contact', label: 'Contact', badge: 'CONTACT', angle: 288 },
];

export const PERSONAL_INFO = {
  name: 'RECALL TAWANDA MABIKA',
  title: 'BSc Honours Computer Science (Level 2.2)',
  specialization: 'InfoSec • Networking • Database Administration',
  rolesBadge: 'InfoSec & Networking Specialist',
  institution: 'Midlands State University',
  location: 'Harare, Zimbabwe',
  phone: '+263 77 946 6786',
  whatsapp: '+263 77 946 6786',
  email: 'recallmabika@gmail.com',
  linkedin: 'https://linkedin.com/in/recallmabika',
  github: 'https://github.com/recallmabika',
  website: 'https://mabikarecall.vercel.app',
  year: '2026',
  
  about: {
    headline: 'InfoSec, Networking & Database Specialist',
    summary: 'Resourceful and driven Computer Science student at Midlands State University, specializing in Information Security (InfoSec), Enterprise Networking, and Database Administration. Combining strong systems architecture with verified hands-on achievements in network engineering, threat intelligence, and secure cloud environments.',
    roles: [
      {
        role: 'IT Technician & Support',
        org: 'Midlands State University, Gweru',
        period: 'Feb 2025 – Nov 2026',
        details: 'First-line helpdesk support: hardware, software, user accounts, password policies, DNS/DHCP, enterprise AnyDesk/SSH/TCP/IP troubleshooting and secure system deployments.'
      },
      {
        role: 'IT Support Specialist',
        org: 'Rupise Hot Springs Estate, Chipinge',
        period: 'Oct 2025 – Present',
        details: 'Diagnosed & resolved 4-day critical network outage replacing contracted provider. Manage ongoing router configuration, firewall hardening, network infrastructure, and database support.'
      },
      {
        role: 'Faculty Representative (Science & Technology)',
        org: 'Midlands State University',
        period: 'Aug 2025 – Present',
        details: 'Elected faculty representative, student-administration liaison, and public speaking in academic setting.'
      },
      {
        role: 'Class Representative (BSc Computer Science)',
        org: 'Midlands State University',
        period: 'Aug 2024 – Present',
        details: 'Academic affairs coordination, peer learning support, and course administration.'
      }
    ]
  },

  competencies: [
    {
      category: 'INFOSEC & CYBERSECURITY',
      skills: [
        'Vulnerability Assessment', 'Metasploit', 'BurpSuite (Web App Security)',
        'Wireshark', 'Splunk', 'GoPhish', 'Social Engineering (SET)',
        'Cyber Threat Intelligence (CTI)', 'Privilege Escalation',
        'Primary Access Attacks', 'Port Scanning'
      ]
    },
    {
      category: 'NETWORKING & INFRASTRUCTURE',
      skills: [
        'TCP/IP', 'IPS/IDS', 'OSI Model', 'DNS', 'DHCP', 'SSH',
        'Network Troubleshooting', 'Starlink Installation & Bridging',
        'Router Configuration', 'Firewall Hardening (UFW/IPTables)',
        'Cisco Packet Tracer', 'Subnetting & VLANs'
      ]
    },
    {
      category: 'DATABASE ADMINISTRATION & BACKEND',
      skills: [
        'PostgreSQL', 'MySQL', 'SQLite', 'Database Optimization & Schema Design',
        'Python Flask', 'Python Django', 'Nginx Reverse Proxy',
        'HTML5 / CSS (Tailwind)', 'JavaScript', 'Git/GitHub', 'System Deployment'
      ]
    },
    {
      category: 'OPERATING SYSTEMS & SCRIPTING',
      skills: [
        'Ubuntu 22.04 LTS', 'Kali Linux', 'Parrot Security OS', 'Linux Mint',
        'Windows OS', 'Bash Scripting', 'PowerShell', 'Prompt Engineering',
        'AI Ethics & Workflows'
      ]
    }
  ],

  projects: [
    {
      title: 'Starlink Network Bridging & Dual-Building Deployment',
      category: 'Network Engineering & Infrastructure',
      date: 'Achievement',
      description: 'Independently reconfigured a Starlink installation incorrectly set up by a professional IT firm, successfully bridging high-speed Wi-Fi across two residential buildings in under three hours. Resolved in 72 hours what the contractor left incomplete.',
      tags: ['Starlink', 'Network Bridging', 'Wi-Fi Optimization', 'Hardware Routing']
    },
    {
      title: 'Cloud Server Deployment – E-Learning Platform',
      category: 'Cloud Infrastructure & Systems',
      date: 'Production Deployment',
      description: 'Independently provisioned a cloud server on Clouding.io and deployed a live e-learning platform end-to-end — configuring SSH access, Nginx reverse proxy, firewall hardening (UFW), and PostgreSQL database integration.',
      tags: ['Clouding.io', 'Nginx', 'PostgreSQL', 'Firewall Hardening', 'Ubuntu']
    },
    {
      title: 'Enterprise Outage Resolution & ISP Recovery',
      category: 'Systems Administration',
      date: 'Production Resolution',
      description: 'Diagnosed and resolved a persistent 4-day enterprise network outage caused by misconfiguration and physical cable faults at Rupise Hot Springs Estate, transitioning into the permanent IT Specialist.',
      tags: ['Cable Diagnostics', 'Switching', 'Subnetting', 'Firewall']
    }
  ],

  certifications: [
    {
      title: 'Certified Offensive Security Explorer (COSE)',
      issuer: 'CyberEd / Cyberus',
      date: 'March 2026',
      id: 'COSE-ZW-2619',
      file: '/certs/COSE_Certificate_Cyberus.pdf',
      image: '/certs/COSE.png'
    },
    {
      title: 'Foundation Level Threat Intelligence Analyst',
      issuer: 'arcX',
      date: 'June 2026',
      id: 'arcX-CTI',
      file: '/certs/Cyber_Threat_Intelligence.pdf',
      image: '/certs/Cyber Threat Intelligence.jpg'
    },
    {
      title: 'Deep Learning IndabaX Zimbabwe 2026',
      issuer: 'Deep Learning IndabaX',
      date: 'June 2026',
      id: 'IZW-CERT-2026-RECALLMA',
      file: '/certs/IndabaX.pdf',
      image: '/certs/Deep Learning IndabaX Zim_2026.png'
    },
    {
      title: 'Cybersecurity for Business',
      issuer: 'Industry Certification',
      date: '2026',
      image: '/certs/Cybersecurity for Business.png'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'April 2025',
    },
    {
      title: 'Ethical Hacking 101 & Kali Linux Basics',
      issuer: 'Simplilearn',
      date: '2026',
      file: '/certs/Ethical Hacking 101 - SimpleLearn.pdf'
    },
    {
      title: 'Student SOC Program Foundations Training',
      issuer: 'Microsoft',
      date: '2026',
      file: '/certs/Student SOC Program Foundations training - Microsoft.pdf'
    },
    {
      title: 'AI Ethics & Workflows / Prompt Engineering',
      issuer: 'Microsoft AI Skills First',
      date: '2026'
    }
  ],

  contact: {
    directEmail: 'recallmabika@gmail.com',
    phone: '+263 77 946 6786',
    status: 'Open to high-impact InfoSec, Network Engineering, and Database Administration roles.',
    location: 'Harare / Gweru, Zimbabwe'
  }
};