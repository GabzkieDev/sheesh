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
    slug: "bs-agribusiness",
    name: "BS Agribusiness",
    short: "Crop production, agri-marketing, farm enterprise management",
    college: "College of Agriculture",
    duration: "4 years",
    overview:
      "BS Agribusiness trains students in the science and business of agriculture — from crop and livestock production to marketing and farm enterprise management — rooted in the agricultural heartland of SOCCSKSARGEN.",
    highlights: [
      "Field work in farms and agri-enterprises in the region",
      "Hands-on crop, livestock and aquaculture practicum",
      "Focus on sustainable farming and agri-entrepreneurship",
    ],
    subjects: [
      "Principles of Crop Production",
      "Agricultural Economics",
      "Soil Science",
      "Agri-Marketing & Value Chains",
      "Agribusiness Entrepreneurship",
    ],
    careers: [
      "Agribusiness manager",
      "Farm supervisor",
      "Agricultural extension officer",
      "Agri-entrepreneur",
    ],
  },
  {
    slug: "bped",
    name: "Bachelor of Physical Education",
    short: "Sports, fitness and movement education",
    college: "College of Education",
    duration: "4 years",
    overview:
      "BPEd develops teachers, coaches and fitness professionals who promote health, sportsmanship and physical literacy — combining exercise science, sports skills and teaching practice.",
    highlights: [
      "Practice teaching in schools and community sports programs",
      "Coaching, officiating and first-aid training",
      "Licensure Examination for Teachers (LET) review",
    ],
    subjects: [
      "Movement Education",
      "Human Anatomy & Physiology",
      "Individual & Team Sports",
      "Sports Psychology",
      "Physical Education Curriculum",
    ],
    careers: [
      "PE teacher",
      "Sports coach",
      "Fitness trainer",
      "Sports program coordinator",
    ],
  },
  {
    slug: "beced",
    name: "Bachelor of Early Childhood Education",
    short: "Teaching and caring for young learners (ages 0–8)",
    college: "College of Education",
    duration: "4 years",
    overview:
      "BECEd prepares teachers of preschool and early-grade children, focusing on child development, play-based learning and the foundations of literacy and numeracy in the crucial early years.",
    highlights: [
      "Practice teaching in preschools and kindergarten classes",
      "Training in play-based and child-centered methods",
      "Licensure Examination for Teachers (LET) review",
    ],
    subjects: [
      "Child Growth & Development",
      "Early Literacy & Numeracy",
      "Play-Based Learning",
      "Curriculum for Young Learners",
      "Health, Safety & Nutrition",
    ],
    careers: [
      "Preschool / kindergarten teacher",
      "Daycare administrator",
      "Early childhood program coordinator",
      "Learning facilitator",
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
