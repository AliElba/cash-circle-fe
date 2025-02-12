export const getUserTurnMonth = (startDate: string, userSlot: number): string => {
  if (!userSlot) return "Your turn (Slot not assigned)";

  const turnDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + (userSlot - 1)));
  return getMonthYearString(turnDate);
};

export const getMonthYearString = (date: Date): string =>
  date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

export const formatAmount = (amount: number, locale: string = "en-US"): string => amount.toLocaleString(locale);

export const calcAdminFees = (amount: number): number => Math.round(amount * 0.025);

/**
 * Extracts the first 2 initials from a given name.
 * @example getNameInitials('John Doe') => 'JD'
 * @param {string} name
 * @returns {string}
 */
export const getNameInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0)).slice(0, 2);
  return initials.join("");
};
