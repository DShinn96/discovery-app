export const questions = [
  {
    id: 1,
    text: "What is the primary goal of your website?",
    type: "choice",
    options: [
      { text: "Just an online presence / Info only", points: 5 },
      { text: "Attract local customers & generate leads", points: 15 },
      { text: "Sell products or services online", points: 40 },
    ],
  },
  {
    id: 2,
    text: "How many pages do you anticipate needing?",
    type: "choice",
    options: [
      { text: "1 page (Single-page scroll)", points: 5 },
      { text: "3-5 pages (Home, Services, About, etc.)", points: 15 },
      { text: "6-10+ pages (Deep site structure)", points: 30 },
    ],
  },
  {
    id: 3,
    text: "Do you already have a logo and brand colors?",
    type: "choice",
    options: [
      { text: "Yes, I have everything ready", points: 0 },
      { text: "I have a logo but need a color palette", points: 5 },
      { text: "I need a full brand identity designed", points: 20 },
    ],
  },
  {
    id: 4,
    text: "Do you need a way for customers to book appointments?",
    type: "choice",
    options: [
      { text: "No, just a contact form", points: 0 },
      { text: "Yes, a simple booking calendar", points: 15 },
      { text: "Yes, a complex scheduling system", points: 30 },
    ],
  },
  {
    id: 5,
    text: "Do you want to update the website content yourself later?",
    type: "choice",
    options: [
      { text: "No, I'll text/email you for updates", points: 0 },
      { text: "I want to update photos and text myself (CMS)", points: 35 },
    ],
  },
  {
    id: 6,
    text: "How important is showing up first on Google Search?",
    type: "choice",
    options: [
      { text: "Not a priority right now", points: 0 },
      { text: "Somewhat important (Local SEO)", points: 10 },
      { text: "Crucial for my business (Advanced SEO)", points: 25 },
    ],
  },
  {
    id: 7,
    text: "Do you have professional photos of your work?",
    type: "choice",
    options: [
      { text: "Yes, I have high-quality photos", points: 0 },
      { text: "I have some, but they need editing", points: 10 },
      { text: "I don't have any professional photos", points: 20 },
    ],
  },
  {
    id: 8,
    text: "Do you need a specialized tool (e.g., a Quote Calculator)?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes, a simple calculator", points: 20 },
      { text: "Yes, a complex custom tool", points: 40 },
    ],
  },
  {
    id: 10,
    text: "Do you need integration with a CRM (like HubSpot or Salesforce)?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes", points: 30 },
    ],
  },
  {
    id: 9,
    text: "Will your site need to support multiple languages?",
    type: "choice",
    options: [
      { text: "English only", points: 0 },
      { text: "English + one other language", points: 25 },
    ],
  },
  {
    id: 11,
    text: "What is your target launch date?",
    type: "choice",
    options: [
      { text: "Flexible (1 month+)", points: 0 },
      { text: "Standard (2-4 weeks)", points: 5 },
      { text: "Urgent (Less than 2 weeks)", points: 20 },
    ],
  },
  {
    id: 12,
    text: "Do you need professional copywriting (text written for you)?",
    type: "choice",
    options: [
      { text: "No, I'll provide all text", points: 0 },
      { text: "I'll provide notes, you polish them", points: 10 },
      { text: "I need you to write everything", points: 25 },
    ],
  },
  {
    id: 13,
    text: "Will you be running paid ads (Google/Facebook Ads) to the site?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes, I need landing pages built for ads", points: 20 },
    ],
  },
  {
    id: 14,
    text: "Do you need a blog or news section?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes", points: 15 },
    ],
  },
  {
    id: 15,
    text: "Do you need password-protected areas for members/clients?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes", points: 40 },
    ],
  },
  {
    id: 16,
    text: "Do you have a domain and hosting already?",
    type: "choice",
    options: [
      { text: "Yes", points: 0 },
      { text: "No, I need you to set it up", points: 5 },
    ],
  },
  {
    id: 17,
    text: "Is your business local, national, or global?",
    type: "choice",
    options: [
      { text: "Local neighborhood", points: 5 },
      { text: "National / Global", points: 20 },
    ],
  },
  {
    id: 18,
    text: "Do you need live chat or a chatbot integrated?",
    type: "choice",
    options: [
      { text: "No", points: 0 },
      { text: "Yes", points: 15 },
    ],
  },
  {
    id: 19,
    text: "How would you describe your desired design style?",
    type: "choice",
    options: [
      { text: "Simple / Minimalist", points: 0 },
      { text: "Rugged / Industrial", points: 5 },
      { text: "Luxury / High-End", points: 15 },
    ],
  },
  {
    id: 20,
    text: "Are there specific legal requirements (HIPAA, ADA Compliance, etc)?",
    type: "choice",
    options: [
      { text: "Just standard privacy policy", points: 0 },
      { text: "Yes, I have specific compliance needs", points: 35 },
    ],
  },
];

export const tiers = [
  { min: 0, max: 25, name: "Tier 1", price: "$100 - $175" },
  { min: 26, max: 45, name: "Tier 2", price: "$200 - $450" },
  { min: 46, max: 65, name: "Tier 3", price: "$500 - $950" },
  { min: 66, max: 90, name: "Tier 4", price: "$1,000 - $2,500" },
  { min: 91, max: 200, name: "Tier 5", price: "$3,000+" },
];
