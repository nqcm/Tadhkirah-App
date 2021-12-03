import { DateTime } from 'luxon';

import calculateDays from './calculateDays';

export default function calculateDueDate(level, revDate) {
  const daysToAdd = calculateDays(level);
  const dueDate = DateTime.fromISO(revDate).plus({ days: daysToAdd });
  return dueDate.toISO().split('T')[0];
}
