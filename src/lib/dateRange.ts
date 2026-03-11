export interface DateConfig {
  start: string;
  end?: string;
  autoEndAfterMonths?: number;
  showDuration?: boolean;
}

interface DateDisplay {
  date: string;
  dateRange: string;
  duration?: string;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toMonthIndex = (value: string) => {
  const [yearText, monthText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid month value: ${value}`);
  }

  return year * 12 + (month - 1);
};

const formatMonthYear = (monthIndex: number) => {
  const year = Math.floor(monthIndex / 12);
  const month = monthIndex % 12;

  return `${MONTH_NAMES[month]} ${year}`;
};

const getCurrentMonthIndex = (today: Date) => today.getFullYear() * 12 + today.getMonth();

const formatDuration = (totalMonths: number) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
};

export const getDateDisplay = (config: DateConfig, today = new Date()): DateDisplay => {
  const startMonthIndex = toMonthIndex(config.start);
  const currentMonthIndex = getCurrentMonthIndex(today);
  let endMonthIndex: number | null = null;
  let durationMonthIndex = currentMonthIndex;

  if (config.end) {
    endMonthIndex = toMonthIndex(config.end);
    durationMonthIndex = endMonthIndex;
  } else if (config.autoEndAfterMonths) {
    const autoEndMonthIndex = startMonthIndex + config.autoEndAfterMonths - 1;

    if (currentMonthIndex > autoEndMonthIndex) {
      endMonthIndex = autoEndMonthIndex;
      durationMonthIndex = autoEndMonthIndex;
    }
  }

  const totalMonths = Math.max(durationMonthIndex - startMonthIndex + 1, 1);
  const dateRange = `${formatMonthYear(startMonthIndex)} - ${endMonthIndex === null ? "Present" : formatMonthYear(endMonthIndex)}`;
  const duration = config.showDuration === false ? undefined : formatDuration(totalMonths);

  return {
    date: duration ? `${dateRange} · ${duration}` : dateRange,
    dateRange,
    duration,
  };
};