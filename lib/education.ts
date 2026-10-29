export type Education = { meta: string; title: string; short: string; text: string; chips?: string[] }

export const education: Education[] = [
  {
    meta: 'BSc · 2018 – 2023',
    title: 'Applied Statistics with Computing',
    short: 'Moi University, Kenya. Majored in data science and AI.',
    text: 'Moi University, Kenya. Majored in data science and AI. Final-year project: air pollution trends in Nairobi with a VAR model across 58 locations.',
    chips: ['Time series', 'R', 'Python'],
  },
  {
    meta: 'Professional · 2018',
    title: 'CPA, Part I Section 1',
    short: 'Financial accounting, business law and entrepreneurship.',
    text: 'Financial accounting, business law and entrepreneurship: the finance grounding behind my tariff, revenue and volatility models.',
  },
]
