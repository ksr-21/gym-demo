/**
 * SINGLE SOURCE OF TRUTH for every piece of gym content.
 * Edit this file only — no component changes needed.
 * All values below are PLACEHOLDERS for the sales demo.
 */

export type ProgramIcon = "dumbbell" | "flame" | "lotus" | "target";
export type ClassType = "strength" | "hiit" | "yoga" | "pt";

export const siteConfig = {
  name: "MD FITNESS",
  legalName: "MD Fitness",
  shortName: "MD Fitness",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  area: "Ravet",
  city: "Pune",
  state: "Maharashtra",
  postalCode: "412101",
  country: "IN",
  streetAddress: "SB Patil College Road, Ravet",
  /** Full address, also used for the embedded Google map */
  address: "MD Fitness, SB Patil College Road, Ravet, Pimpri-Chinchwad, Pune, Maharashtra 412101",
  geo: { lat: 18.648, lng: 73.737 },
  phone: "+91 98765 43210",
  /** Digits only, with country code, no "+" — used for wa.me links */
  whatsappNumber: "918789548725",
  email: "hello@mdfitness.example",
  brand: {
    /** Primary accent. Drives CSS + 3D scene colours. */
    accent: "#FF5A1F",
  },
  headline: ["Stronger every week.", "Not someday."],
  subheadline:
    "Ravet's serious training floor — quality equipment, certified coaches and programs built around results, not just memberships.",
  seo: {
    title: "MD Fitness — Best Gym in Ravet, Pune | Personal Trainers",
    description:
      "Looking for the best gym near Ravet? MD Fitness offers strength training, HIIT, yoga and personal trainers in Pimpri-Chinchwad, Pune. Book a free trial today.",
    keywords: [
      "gym in Ravet",
      "best gym near Ravet",
      "personal trainer Pune",
      "gym in Pimpri Chinchwad",
      "HIIT classes Ravet",
      "gym membership Pune",
    ],
  },
  /** Source: FITPASS listing. Replace with the live Google rating/count from the owner. */
  rating: { value: 4.3, count: 10 },
  social: {
    instagram: "https://instagram.com/mdfitness.example",
    facebook: "https://facebook.com/mdfitness.example",
    youtube: "https://youtube.com/@mdfitness-example",
  },
  /** Structured so it can feed both the UI and the JSON-LD schema */
  hours: [
    { label: "Mon – Sun", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "06:00", closes: "22:00", display: "6:00 AM – 10:00 PM" },
  ],
  nav: [
    { label: "Programs", href: "#programs" },
    { label: "Plans", href: "#plans" },
    { label: "Trainers", href: "#trainers" },
    { label: "Transformations", href: "#transformations" },
    { label: "Contact", href: "#contact" },
  ],
  whatsappGreeting: "Hi MD Fitness! I'd like to know more about memberships.",
} as const;

export const stats = [
  { label: "Active members", value: 1200, suffix: "+" },
  { label: "Expert trainers", value: 12, suffix: "" },
  { label: "Years strong", value: 9, suffix: "" },
  { label: "Member rating", value: 4.3, suffix: "★", decimals: 1 },
] as const;

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: ProgramIcon;
  timings: string;
  highlights: string[];
}

export const programs: Program[] = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Progressive overload coaching on a full free-weight floor.",
    icon: "dumbbell",
    timings: "Daily · 6:00 AM – 10:00 PM",
    highlights: ["Olympic lifting platforms", "Periodised 12-week blocks", "Form checks every session"],
  },
  {
    id: "hiit",
    title: "Fat Loss / HIIT",
    description: "High-intensity circuits engineered to torch fat and build stamina.",
    icon: "flame",
    timings: "Mon–Sat · 6:30 AM & 7:00 PM",
    highlights: ["45-minute coached circuits", "Heart-rate zone tracking", "Nutrition guidance included"],
  },
  {
    id: "yoga",
    title: "Yoga & Mobility",
    description: "Move better, recover faster and keep your joints training-ready.",
    icon: "lotus",
    timings: "Mon, Wed, Fri · 7:30 AM  |  Sat · 8:00 AM",
    highlights: ["Vinyasa and mobility flows", "Breathwork & recovery", "All levels welcome"],
  },
  {
    id: "pt",
    title: "Personal Training",
    description: "One-on-one programming built around your body, goal and schedule.",
    icon: "target",
    timings: "By appointment · 6 AM – 9 PM",
    highlights: ["Custom training & diet plan", "Monthly body-composition review", "Flexible 1:1 slots"],
  },
];

export interface Plan {
  id: string;
  name: string;
  /** Duration in months — used to compute the per-month / per-year price view */
  months: number;
  /** Total price (₹) charged for the whole duration */
  price: number;
  popular?: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    months: 1,
    price: 1999,
    features: ["Full gym floor access", "Group classes included", "Locker & shower access", "1 free body assessment"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    months: 3,
    price: 4999,
    popular: true,
    features: ["Everything in Monthly", "2 personal training sessions", "Custom diet guidance", "Freeze up to 7 days", "Guest pass x2"],
  },
  {
    id: "yearly",
    name: "Yearly",
    months: 12,
    price: 14999,
    features: ["Everything in Quarterly", "6 personal training sessions", "Priority class booking", "Freeze up to 30 days", "Free MD Fitness merchandise"],
  },
];

export interface Trainer {
  id: string;
  name: string;
  specialisation: string;
  experience: string;
  bio: string;
  certifications: string[];
  instagram: string;
  image: string;
}

export const trainers: Trainer[] = [
  {
    id: "arjun",
    name: "Arjun Mehta",
    specialisation: "Strength & Powerlifting",
    experience: "10 years",
    bio: "Former state-level powerlifter who has coached 300+ members to their first bodyweight deadlift.",
    certifications: ["NSCA-CPT", "USAPL Coach"],
    instagram: "https://instagram.com/arjun.example",
    image: "/images/trainer-arjun.svg",
  },
  {
    id: "priya",
    name: "Priya Nair",
    specialisation: "Fat Loss & HIIT",
    experience: "7 years",
    bio: "Specialises in sustainable fat loss — high-energy circuits backed by practical nutrition coaching.",
    certifications: ["ACE-CPT", "Precision Nutrition L1"],
    instagram: "https://instagram.com/priya.example",
    image: "/images/trainer-priya.svg",
  },
  {
    id: "rohan",
    name: "Rohan Kapoor",
    specialisation: "Functional & Athletic Performance",
    experience: "8 years",
    bio: "Builds athletic, injury-resilient bodies through mobility, conditioning and calisthenics.",
    certifications: ["CSCS", "FMS Level 2"],
    instagram: "https://instagram.com/rohan.example",
    image: "/images/trainer-rohan.svg",
  },
  {
    id: "sneha",
    name: "Sneha Iyer",
    specialisation: "Yoga & Mobility",
    experience: "9 years",
    bio: "A 500-hr certified yoga teacher blending vinyasa with mobility science for lifters and beginners alike.",
    certifications: ["RYT-500", "Mobility Specialist"],
    instagram: "https://instagram.com/sneha.example",
    image: "/images/trainer-sneha.svg",
  },
];

export interface Transformation {
  id: string;
  name: string;
  duration: string;
  result: string;
  before: string;
  after: string;
}

export const transformations: Transformation[] = [
  { id: "vikram", name: "Vikram S.", duration: "16 weeks", result: "−14 kg fat, +3 kg muscle", before: "/images/before-1.jpg", after: "/images/after-1.jpg" },
  { id: "ananya", name: "Ananya R.", duration: "24 weeks", result: "−11 kg, deadlift 90 kg", before: "/images/before-2.jpg", after: "/images/after-2.jpg" },
  { id: "karthik", name: "Karthik P.", duration: "12 weeks", result: "−9 kg, 8% body fat", before: "/images/before-3.jpg", after: "/images/after-3.jpg" },
];

export interface ClassSession {
  day: string;
  time: string;
  type: ClassType;
  name: string;
  trainer: string;
}

export const classTypeLabels: Record<ClassType, string> = {
  strength: "Strength",
  hiit: "HIIT",
  yoga: "Yoga",
  pt: "Personal Training",
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const timetable: ClassSession[] = [
  { day: "Mon", time: "6:30 AM", type: "hiit", name: "Fat Burn Circuit", trainer: "Priya" },
  { day: "Mon", time: "7:30 AM", type: "yoga", name: "Vinyasa Flow", trainer: "Sneha" },
  { day: "Mon", time: "6:00 PM", type: "strength", name: "Heavy Lift Lab", trainer: "Arjun" },
  { day: "Mon", time: "7:00 PM", type: "hiit", name: "Evening HIIT", trainer: "Priya" },
  { day: "Tue", time: "6:30 AM", type: "strength", name: "Squat Clinic", trainer: "Arjun" },
  { day: "Tue", time: "6:00 PM", type: "pt", name: "1:1 Coaching Slots", trainer: "Rohan" },
  { day: "Tue", time: "7:00 PM", type: "hiit", name: "Tabata Tuesday", trainer: "Priya" },
  { day: "Wed", time: "6:30 AM", type: "hiit", name: "Fat Burn Circuit", trainer: "Priya" },
  { day: "Wed", time: "7:30 AM", type: "yoga", name: "Mobility Reset", trainer: "Sneha" },
  { day: "Wed", time: "6:00 PM", type: "strength", name: "Upper Body Power", trainer: "Arjun" },
  { day: "Thu", time: "6:30 AM", type: "strength", name: "Deadlift Day", trainer: "Arjun" },
  { day: "Thu", time: "6:00 PM", type: "pt", name: "1:1 Coaching Slots", trainer: "Rohan" },
  { day: "Thu", time: "7:00 PM", type: "hiit", name: "Athletic Conditioning", trainer: "Rohan" },
  { day: "Fri", time: "6:30 AM", type: "hiit", name: "Fat Burn Circuit", trainer: "Priya" },
  { day: "Fri", time: "7:30 AM", type: "yoga", name: "Vinyasa Flow", trainer: "Sneha" },
  { day: "Fri", time: "6:00 PM", type: "strength", name: "Full Body Strength", trainer: "Arjun" },
  { day: "Sat", time: "8:00 AM", type: "yoga", name: "Weekend Yoga", trainer: "Sneha" },
  { day: "Sat", time: "9:00 AM", type: "hiit", name: "Saturday Smash", trainer: "Priya" },
  { day: "Sat", time: "10:30 AM", type: "strength", name: "Open Lifting Clinic", trainer: "Arjun" },
  { day: "Sun", time: "8:00 AM", type: "yoga", name: "Restore & Stretch", trainer: "Sneha" },
  { day: "Sun", time: "10:00 AM", type: "pt", name: "1:1 Coaching Slots", trainer: "Rohan" },
];

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  when: string;
}

/** SAMPLE REVIEWS — replace with real, verbatim customer reviews before launch. */
export const testimonials: Testimonial[] = [
  { name: "Rahul Verma", rating: 5, when: "2 weeks ago", text: "Best gym in Ravet by a mile. Equipment is spotless and the trainers actually correct your form." },
  { name: "Shruti Bhat", rating: 5, when: "a month ago", text: "Lost 11 kg in 5 months with Priya's HIIT classes and diet plan. Genuinely life-changing." },
  { name: "Aditya Rao", rating: 5, when: "a month ago", text: "Arjun's strength program took my squat from 60 to 120 kg. Zero ego, all coaching." },
  { name: "Meera Krishnan", rating: 4, when: "2 months ago", text: "Lovely atmosphere and the yoga mobility sessions have fixed my lower back. Gets busy at 7 PM." },
  { name: "Nikhil Jain", rating: 5, when: "2 months ago", text: "Free trial convinced me in one session. Clean, safe, and motivating — joined the yearly plan." },
  { name: "Divya Menon", rating: 5, when: "3 months ago", text: "Personal training here is worth every rupee. Rohan customises everything around my work schedule." },
  { name: "Sandeep Gowda", rating: 5, when: "3 months ago", text: "Open till 10 PM which is perfect for working professionals. Showers and lockers are top notch." },
];

export const trialSlots = [
  "Early morning (6:00 – 8:00 AM)",
  "Morning (8:00 – 11:00 AM)",
  "Afternoon (12:00 – 4:00 PM)",
  "Evening (4:00 – 7:00 PM)",
  "Night (7:00 – 10:00 PM)",
] as const;

export const trialGoals = [
  "Lose fat",
  "Build muscle",
  "Get stronger",
  "Improve flexibility",
  "General fitness",
  "Train with a personal coach",
] as const;
