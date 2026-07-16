/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface TrainingArea {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BrandingProduct {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export interface ClientCompany {
  name: string;
  sector: 'Public Sector' | 'Manufacturing' | 'Finance' | 'Tourism' | 'SME Development';
  shortDesc: string;
}

export const marketResearchServices: ServiceItem[] = [
  {
    id: 'mr-1',
    title: 'Customer, Staff & Supplier Surveys',
    description: 'Scientifically validated feedback loops designed to capture multi-stakeholder sentiments, operational friction, and organizational satisfaction.',
  },
  {
    id: 'mr-2',
    title: 'Quantitative Surveys',
    description: 'Rigorous statistical sampling, data modeling, and large-scale demographic outreach using customized survey methodologies.',
  },
  {
    id: 'mr-3',
    title: 'Focus Groups',
    description: 'Moderated, qualitative group discussions capturing deep emotional drivers, subtext, and consumer feedback on complex propositions.',
  },
  {
    id: 'mr-4',
    title: 'Personal In-Depth Interviewing (Senior Level)',
    description: 'Executive-level interviews requiring sophisticated questioning, targeting C-suite leaders and key corporate decision makers.',
  },
  {
    id: 'mr-5',
    title: 'Intercept Research',
    description: 'Real-time street or mall intercepts capturing immediate, unfiltered consumer reaction and physical shopping behaviors.',
  },
  {
    id: 'mr-6',
    title: 'Multi-lingual Research',
    description: 'Localized research executed across major South African languages (including isiZulu, English, Xhosa, and Afrikaans) to ensure cultural resonance and accuracy.',
  },
  {
    id: 'mr-7',
    title: 'Advertising Effectiveness Tracking',
    description: 'Evaluating reach, recall, emotional connection, and return on investment for omni-channel advertising campaigns.',
  },
  {
    id: 'mr-8',
    title: 'Market Segmentation',
    description: 'Advanced statistical clustering to split diverse markets into clear demographic, psychographic, and behavioral targets.',
  },
  {
    id: 'mr-9',
    title: 'New Product Evaluation & Commercialisation',
    description: 'Concept testing, feature optimization, and pricing validation to de-risk market entries for new innovations.',
  },
  {
    id: 'mr-10',
    title: 'Advertising & Positioning Studies',
    description: 'Deep market diagnostics establishing where your brand sits in the consumer psyche relative to competitors.',
  },
];

export const marketingBrandingServices: ServiceItem[] = [
  {
    id: 'mb-1',
    title: 'Brand Strategy & Positioning',
    description: 'Defining your unique value proposition, tone of voice, and competitive whitespace in the South African marketplace.',
  },
  {
    id: 'mb-2',
    title: 'Marketing Strategy Development',
    description: 'Data-backed omni-channel marketing campaigns that bridge traditional channels with digital activation to drive measurable growth.',
  },
  {
    id: 'mb-3',
    title: 'Logo Design & Corporate Identity',
    description: 'Crafting modern, distinctive, and professionally tailored visual signatures that reflect your core corporate values.',
  },
  {
    id: 'mb-4',
    title: 'Corporate Stationery, Brochures & Annual Reports',
    description: 'High-end layout design and copywriting for key stakeholder documents, financial reports, and professional collateral.',
  },
  {
    id: 'mb-5',
    title: 'Physical Display Products & Collateral',
    description: 'Custom banners, flags, tablecloths, gazebos, parasols, and outdoor branding designed to amplify physical presence at corporate events.',
  },
  {
    id: 'mb-6',
    title: 'Corporate Gifting',
    description: 'Premium curated corporate gifts that strengthen business relationships, aligned perfectly to your brand aesthetics.',
  },
];

export const trainingAreas: TrainingArea[] = [
  {
    id: 't-1',
    title: 'Digital Marketing',
    description: 'Social media, SEO, paid ads, and content strategy for reaching South African digital consumers.',
    iconName: 'Globe',
  },
  {
    id: 't-2',
    title: 'Strategic Planning',
    description: 'Turning corporate mission statements into actionable quarterly objectives, KPIs, and resource roadmaps.',
    iconName: 'TrendingUp',
  },
  {
    id: 't-3',
    title: 'Creative Problem Solving',
    description: 'Methodologies to break cognitive biases, spark team innovation, and solve systemic business operational blocks.',
    iconName: 'Lightbulb',
  },
  {
    id: 't-4',
    title: 'Customer Excellence',
    description: 'Designing empathetic customer service guidelines, complaint resolution steps, and lifetime loyalty standards.',
    iconName: 'Users',
  },
  {
    id: 't-5',
    title: 'Coaching & Mentoring',
    description: 'Enabling business leaders and supervisors to build high-performance cultures and retain high-potential talent.',
    iconName: 'UserCheck',
  },
  {
    id: 't-6',
    title: 'Interpersonal Skills',
    description: 'High-impact emotional intelligence, conflict resolution, active listening, and negotiation techniques.',
    iconName: 'Heart',
  },
  {
    id: 't-7',
    title: 'Business Management',
    description: 'Basic accounting, cost optimization, cash flow management, compliance, and legal frameworks for SMEs.',
    iconName: 'Briefcase',
  },
  {
    id: 't-8',
    title: 'Corporate Social Responsibility',
    description: 'Designing sustainable community engagement projects that align corporate values with impactful social growth.',
    iconName: 'Layers',
  },
  {
    id: 't-9',
    title: 'Life Skills',
    description: 'Time management, goal setting, personal financial literacy, and professional work ethic training.',
    iconName: 'Smile',
  },
  {
    id: 't-10',
    title: 'Research Methodologies',
    description: 'Teaching staff and organizations how to gather, parse, and act on qualitative and quantitative insights.',
    iconName: 'Search',
  },
  {
    id: 't-11',
    title: 'Social Entrepreneurship',
    description: 'Building dual-purpose business models that solve social issues while maintaining independent financial profitability.',
    iconName: 'Compass',
  },
  {
    id: 't-12',
    title: 'Innovation & Disruption',
    description: 'Staying agile amidst industry shifts, leveraging emerging technologies, and designing disruptive business models.',
    iconName: 'Zap',
  },
];

export const brandingProducts: BrandingProduct[] = [
  {
    id: 'bp-1',
    name: 'Custom Printed Gazebos',
    category: 'Outdoor Displays',
    imageUrl: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bp-2',
    name: 'Telescopic & Sharkfin Flags',
    category: 'Outdoor Displays',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bp-3',
    name: 'Pull-up Banners',
    category: 'Indoor Displays',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bp-4',
    name: 'Branded Table Cloths',
    category: 'Exhibition Gear',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
];

export const clientCompanies: ClientCompany[] = [
  {
    name: 'Umgeni Water',
    sector: 'Public Sector',
    shortDesc: 'State-owned water services provider, surveying regional customer sentiments and service delivery metrics.',
  },
  {
    name: 'Protea Engineering',
    sector: 'Manufacturing',
    shortDesc: 'Heavy manufacturing specialist, establishing market segmentation and business training programs.',
  },
  {
    name: 'Hulamin',
    sector: 'Manufacturing',
    shortDesc: 'Pietermaritzburg-based aluminium giant, utilizing staff culture diagnostics and corporate training.',
  },
  {
    name: 'Regional Tourism Board',
    sector: 'Tourism',
    shortDesc: 'The official regional tourism authority, executing visitor satisfaction and intercept surveys.',
  },
  {
    name: 'Metropolitan Municipality',
    sector: 'Public Sector',
    shortDesc: 'Local metropolitan government, utilizing extensive social and multilingual community research.',
  },
  {
    name: 'Sizakala Centres',
    sector: 'Public Sector',
    shortDesc: 'Metropolitan customer care hubs, measuring staff customer excellence and service feedback.',
  },
  {
    name: 'SEDA',
    sector: 'SME Development',
    shortDesc: 'Small Enterprise Development Agency, supplying business training workshops and consulting audits.',
  },
  {
    name: 'Metro Film Commission',
    sector: 'Tourism',
    shortDesc: 'Promoting local media, measuring regional film industry economic impacts.',
  },
  {
    name: 'Atlas Finance',
    sector: 'Finance',
    shortDesc: 'Nationwide consumer finance brand, tracking consumer perception and brand position studies.',
  },
  {
    name: 'Assupol',
    sector: 'Finance',
    shortDesc: 'Insurance provider, conducting focus groups and client demographic analysis across South Africa.',
  },
];
