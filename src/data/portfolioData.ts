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
  whatsapp: '+263 77946 6786',
  phone: '+263 71 800 1031',
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
        'Python Flask', 'Python Django 6', 'FastAPI', 'Celery & Redis',
        'Django Channels', 'Nginx Reverse Proxy', 'Tailwind CSS', 'Git/GitHub'
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
      id: 'school-management-system',
      title: 'Chibuwe Technical High School — Management System',
      category: 'School Information System & Enterprise Web App',
      date: 'Production Architecture',
      github: 'https://github.com/recallmabika/e-learning',
      repoName: 'recallmabika/e-learning',
      description: 'A comprehensive, full-featured School Management System built with Django 6, PostgreSQL, Celery, Django Channels, and Tailwind CSS. Designed to digitise every aspect of school administration — from student enrollment and academic tracking to fee management, payroll, and real-time messaging.',
      tags: ['Django 6', 'PostgreSQL', 'Celery', 'Django Channels', 'Tailwind CSS', 'School SIS'],
      highlights: [
        'Student enrollment & academic grading tracking',
        'Automated fee management & institutional payroll',
        'Real-time communication & staff-student notification channels'
      ]
    },
    {
      id: 'booking-platform',
      title: 'Regional Lodging & Hotel Booking Platform (BookItNow)',
      category: 'Two-Sided Marketplace & Microservices Architecture',
      date: 'Product & Tech Plan',
      github: 'https://github.com/recallmabika/BookItNow',
      repoName: 'recallmabika/BookItNow',
      description: 'A two-sided hotel & lodging booking marketplace connecting guests with hotels and guesthouses. Features real-time availability with instant booking, zero double-booking locks, and seamless multi-channel payments.',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'Flutter', 'Paynow/EcoCash', 'Stripe', 'Celery'],
      highlights: [
        'Full multi-platform architecture: Next.js Web, Flutter Mobile, Host & Admin SPAs, FastAPI backend',
        'ACID transactions & row-level locking (SELECT FOR UPDATE) to eliminate double-bookings',
        'EcoCash, OneMoney, Paynow & Stripe integration with webhook verification & Celery workers'
      ]
    },
    {
      id: 'starlink-bridging',
      title: 'Starlink Network Bridging & Dual-Building Deployment',
      category: 'Network Engineering & Infrastructure',
      date: 'Field Deployment',
      description: 'Independently reconfigured a Starlink installation incorrectly set up by a professional IT firm, successfully bridging high-speed Wi-Fi across two residential buildings in under three hours. Resolved in 72 hours what the contractor left incomplete.',
      tags: ['Starlink', 'Network Bridging', 'Wi-Fi Optimization', 'Hardware Routing'],
      highlights: [
        'Long-range point-to-point Wi-Fi bridge',
        'Subnet routing and latency minimization'
      ]
    },
    {
      id: 'enterprise-outage-recovery',
      title: 'Enterprise Outage Resolution & ISP Recovery',
      category: 'Systems Administration & Infrastructure',
      date: 'Production Resolution',
      description: 'Diagnosed and resolved a persistent 4-day enterprise network outage caused by misconfiguration and physical cable faults at Rupise Hot Springs Estate, transitioning into the permanent IT Specialist.',
      tags: ['Cable Diagnostics', 'Switching', 'Subnetting', 'Firewall'],
      highlights: [
        'Cable diagnostics & switch loop isolation',
        'Permanent appointment as IT Specialist'
      ]
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
      file: '/certs/Introduction to Cybersecurity - Cisco.pdf',
      image: '/certs/Introduction to Cybersecurity - Cisco.png'
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
    whatsapp: '+263 77946 6786',
    call: '+263 71 800 1031',
    status: 'Open to high-impact InfoSec, Network Engineering, and Database Administration roles.',
    location: 'Harare / Gweru, Zimbabwe'
  }
};