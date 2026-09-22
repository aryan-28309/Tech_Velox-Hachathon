/**
 * Date Utility for Indian Scholarship Deadlines and Countdown Tracking
 */

export interface ScholarshipTimelineInfo {
  daysLeft: number;
  status: 'active' | 'closing_soon' | 'ended' | 'upcoming';
  statusText: string;
  badgeLabel: string;
  badgeClass: string;
  badgeClassHighContrast: string;
  progressPercent: number; // 0 to 100% of duration elapsed
  formattedStartDate: string;
  formattedEndDate: string;
  isUrgent: boolean;
}

const MONTH_MAP: Record<string, number> = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sep: 8, sept: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11,
};

/**
 * Parses dates formatted like "31 October 2026" or "15 July 2026"
 */
export function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;

  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].toLowerCase();
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && MONTH_MAP[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, MONTH_MAP[monthKey], day, 23, 59, 59);
    }
  }

  // Fallback
  const standardDate = new Date(dateStr);
  return isNaN(standardDate.getTime()) ? null : standardDate;
}

/**
 * Calculates days remaining to fill out scholarship form
 */
export function getScholarshipTimeline(
  endDateStr: string,
  startDateStr?: string
): ScholarshipTimelineInfo {
  const now = new Date();
  const endDate = parseDateString(endDateStr) || new Date(Date.now() + 45 * 86400000);
  const startDate = startDateStr ? parseDateString(startDateStr) : new Date(endDate.getTime() - 90 * 86400000);

  // Time difference in milliseconds
  const diffToEnd = endDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffToEnd / (1000 * 60 * 60 * 24));

  // Progress percentage calculation
  let progressPercent = 50;
  if (startDate) {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    if (totalDuration > 0) {
      progressPercent = Math.min(100, Math.max(5, Math.round((elapsed / totalDuration) * 100)));
    }
  }

  // Determine status and badges
  if (daysLeft < 0) {
    return {
      daysLeft: 0,
      status: 'ended',
      statusText: 'Application Window Closed',
      badgeLabel: 'Window Closed',
      badgeClass: 'bg-stone-100 text-stone-600 border-stone-300',
      badgeClassHighContrast: 'bg-stone-900 text-yellow-500 border-yellow-500',
      progressPercent: 100,
      formattedStartDate: startDateStr || 'Start Date: Announced',
      formattedEndDate: endDateStr,
      isUrgent: false,
    };
  }

  if (startDate && now.getTime() < startDate.getTime()) {
    const daysUntilStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      daysLeft,
      status: 'upcoming',
      statusText: `Opens in ${daysUntilStart} ${daysUntilStart === 1 ? 'day' : 'days'}`,
      badgeLabel: `Opening Soon (${daysUntilStart}d)`,
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
      badgeClassHighContrast: 'bg-stone-900 text-yellow-300 border-yellow-400',
      progressPercent: 0,
      formattedStartDate: startDateStr || '',
      formattedEndDate: endDateStr,
      isUrgent: false,
    };
  }

  // Urgent: 15 days or less remaining
  if (daysLeft <= 15) {
    return {
      daysLeft,
      status: 'closing_soon',
      statusText: daysLeft === 0 
        ? 'Last Day to Apply Today!' 
        : `Hurry! Only ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left to fill form`,
      badgeLabel: `⚡ ${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'} Left (Closing Soon)`,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse font-extrabold',
      badgeClassHighContrast: 'bg-yellow-400 text-black border-yellow-300 font-black',
      progressPercent,
      formattedStartDate: startDateStr || 'Opened',
      formattedEndDate: endDateStr,
      isUrgent: true,
    };
  }

  // Active: > 15 days
  return {
    daysLeft,
    status: 'active',
    statusText: `${daysLeft} days remaining to submit application`,
    badgeLabel: `⏳ ${daysLeft} Days Left to Apply`,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
    badgeClassHighContrast: 'bg-stone-900 text-yellow-300 border-yellow-400',
    progressPercent,
    formattedStartDate: startDateStr || 'Opened',
    formattedEndDate: endDateStr,
    isUrgent: false,
  };
}
