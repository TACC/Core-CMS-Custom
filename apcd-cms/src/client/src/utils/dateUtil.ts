export const formatDate = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

/**
 *
 * @param period string - Jan. 2024 as example
 * @returns string. 2024-01 for Jan. 2024.
 */
export const convertPeriodLabelToApiValue = (period: string): string | null => {
  // Return as-is if already in expected format
  if (/^\d{4}-(0[1-9]|1[0-2])$/.test(period)) {
    return period;
  }
  const monthMap: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const match = period.match(/^([A-Za-z]{3})\.?\s(\d{4})$/);
  if (!match) {
    console.log(`Invalid period format: ${period}`);
    return period;
  }

  const [_, month, year] = match;
  const numericMonth = monthMap[month];

  if (!numericMonth) {
    console.log(`Invalid month: ${month} in ${period}`);
    return period;
  }

  return `${year}-${numericMonth}`;
};
