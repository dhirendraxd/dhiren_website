import { getDateDisplay, type DateConfig } from "@/lib/dateRange";

interface ExperienceConfig {
  order: number;
  title: string;
  company: string;
  link: string;
  dateConfig: DateConfig;
  suffix?: string;
}

export interface RelevantExperience {
  title: string;
  company: string;
  suffix?: string;
  dateRange: string;
  duration: string;
  link: string;
}

const experiences: ExperienceConfig[] = [
  {
    order: 1,
    title: "Digital Marketer",
    company: "Ctrl Bits",
    link: "https://www.ctrlbits.com/",
    dateConfig: {
      start: "2025-04",
    },
  },
  {
    order: 2,
    title: "Business Operations Intern",
    company: "Paramendo Nepal",
    link: "https://www.linkedin.com/in/dhirendrasinghdhami/edit/forms/position/2952537919/",
    dateConfig: {
      start: "2026-06",
    },
  },
  {
    order: 3,
    title: "Co-host",
    company: "Lovelac Talk",
    link: "https://linktr.ee/lovelacetalk",
    dateConfig: {
      start: "2026-02",
    },
    suffix: "",
  },
  {
    order: 4,
    title: "Fellow",
    company: "ALL In Foundation (AIF)",
    link: "https://www.facebook.com/allinfoundationnp/",
    dateConfig: {
      start: "2026-02",
      autoEndAfterMonths: 6,
    },
  },
  {
    order: 5,
    title: "Sustainability Mentee",
    company: "Sustainability Solutions",
    link: "https://sustainability.com.np/",
    dateConfig: {
      start: "2025-08",
      end: "2025-12",
    },
  },
];

const toRelevantExperience = (experience: ExperienceConfig): RelevantExperience => {
  const dateDisplay = getDateDisplay(experience.dateConfig);

  return {
    title: experience.title,
    company: experience.company,
    suffix: experience.suffix,
    dateRange: dateDisplay.dateRange,
    duration: dateDisplay.duration ?? "",
    link: experience.link,
  };
};

export const getRelevantExperiences = (): RelevantExperience[] => {
  return [...experiences]
    .sort((left, right) => left.order - right.order)
    .map(toRelevantExperience);
};