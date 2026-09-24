export type Course = {
  slug: string;
  name: string;
  short: string;
  college: string;
  duration: string;
  overview: string;
  highlights: string[];
  subjects: string[];
  careers: string[];
};

export const courses: Course[] = [
  {
    slug: "bs-fisheries",
    name: "BS Fisheries",
    short: "Capture fisheries, aquaculture, post-harvest processing",
    college: "College of Science",
    duration: "4 years",
    overview:
      "Rooted in the Tuna Capital of the Philippines, this program trains students in the science and management of fisheries resources — from open-sea capture to fish farming and seafood processing.",
    highlights: [
      "Field work at the General Santos fish port complex",
      "Hands-on aquaculture and hatchery practicum",
      "Focus on sustainable and responsible fishing",
    ],
    subjects: ["Ichthyology", "Aquaculture Systems", "Fish Processing Technology", "Fisheries Law & Management", "Oceanography"],
    careers: ["Fisheries technologist", "Aquaculture manager", "Quality control officer in canneries", "BFAR specialist"],
  },
  {
    slug: "bs-industrial-engineering",
    name: "BS Industrial Engineering",
    short: "Operations, quality systems, plant management",
    college: "College of Technology",
    duration: "5 years",
    overview:
      "Industrial Engineering teaches students to design and improve systems of people, machines and materials so that factories, ports and businesses run efficiently and safely.",
    highlights: [
      "Plant visits and on-the-job training with local industries",
      "Lean manufacturing and quality systems training",
      "Preparation for the board licensure exam",
    ],
    subjects: ["Operations Research", "Work Study & Ergonomics", "Quality Control", "Production Planning", "Engineering Economics"],
    careers: ["Industrial engineer", "Production supervisor", "Quality assurance engineer", "Logistics analyst"],
  },
  {
    slug: "bs-information-technology",
    name: "BS Information Technology",
    short: "Software development, networks, data systems",
    college: "College of Technology",
    duration: "4 years",
    overview:
      "BSIT prepares students to build software, manage networks and work with data — skills needed by every business, government office and startup in the city.",
    highlights: [
      "Project-based learning with real clients",
      "Modern labs for programming and networking",
      "Capstone project and industry internship",
    ],
    subjects: ["Programming Fundamentals", "Web Development", "Database Systems", "Networking", "Information Security"],
    careers: ["Software developer", "Network administrator", "IT support specialist", "Data analyst"],
  },
  {
    slug: "bs-business-administration",
    name: "BS Business Administration",
    short: "Marketing management, financial management",
    college: "College of Business",
    duration: "4 years",
    overview:
      "Business Administration develops future managers and entrepreneurs, with majors in Marketing Management and Financial Management tailored to the local economy.",
    highlights: [
      "Majors in Marketing or Financial Management",
      "Entrepreneurship and business plan competitions",
      "Internships with local companies",
    ],
    subjects: ["Principles of Management", "Marketing Research", "Financial Management", "Business Law", "Entrepreneurship"],
    careers: ["Marketing officer", "Financial analyst", "Entrepreneur", "Bank officer"],
  },
  {
    slug: "bs-accountancy",
    name: "BS Accountancy",
    short: "Financial accounting, audit, taxation",
    college: "College of Business",
    duration: "4 years",
    overview:
      "The Accountancy program builds a strong foundation in accounting, auditing and taxation, preparing students for the CPA licensure examination.",
    highlights: [
      "CPA board exam review integration",
      "Accounting software training",
      "Practicum in firms and government offices",
    ],
    subjects: ["Financial Accounting", "Cost Accounting", "Auditing", "Taxation", "Accounting Information Systems"],
    careers: ["Certified Public Accountant", "Auditor", "Tax consultant", "Budget officer"],
  },
  {
    slug: "bachelor-of-public-administration",
    name: "Bachelor of Public Administration",
    short: "Local governance, policy, public finance",
    college: "College of Public Service",
    duration: "4 years",
    overview:
      "Public Administration prepares students for careers in government and public service, with a strong focus on local governance and city development.",
    highlights: [
      "Internships with the city government",
      "Policy research and community projects",
      "Civil service exam preparation",
    ],
    subjects: ["Public Policy", "Local Government Administration", "Public Fiscal Administration", "Human Resource Management", "Ethics in Public Service"],
    careers: ["Government administrative officer", "Policy analyst", "Barangay / LGU staff", "NGO program officer"],
  },
  {
    slug: "bachelor-of-elementary-education",
    name: "Bachelor of Elementary Education",
    short: "Generalist track with practicum in city schools",
    college: "College of Education",
    duration: "4 years",
    overview:
      "BEEd trains passionate teachers for elementary schools, combining teaching methods, child development and classroom practice in General Santos public schools.",
    highlights: [
      "Practice teaching in city elementary schools",
      "Licensure Examination for Teachers (LET) review",
      "Training in inclusive and mother-tongue education",
    ],
    subjects: ["Child & Adolescent Development", "Teaching Strategies", "Assessment of Learning", "Curriculum Development", "Educational Technology"],
    careers: ["Elementary school teacher", "Tutor / learning coach", "School administrator", "Curriculum developer"],
  },
  {
    slug: "bs-criminology",
    name: "BS Criminology",
    short: "Law enforcement administration and forensic science",
    college: "College of Criminal Justice",
    duration: "4 years",
    overview:
      "Criminology prepares students for careers in law enforcement, corrections and forensic science, with discipline, ethics and community safety at its core.",
    highlights: [
      "Forensic and crime scene training",
      "On-the-job training with local police and agencies",
      "Criminologist licensure exam preparation",
    ],
    subjects: ["Criminal Law", "Forensic Science", "Law Enforcement Administration", "Criminal Sociology", "Correctional Administration"],
    careers: ["Police officer", "Forensic investigator", "Jail / corrections officer", "Security manager"],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
