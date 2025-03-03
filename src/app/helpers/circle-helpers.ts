export const getUserTurnMonth = (startDate: string, userSlot: number): string => {
  if (!userSlot) return "Your turn (Slot not assigned)";

  const turnDate = getUserPayoutDate(startDate, userSlot);
  return getMonthYearString(turnDate);
};

export const getUserPayoutDate = (startDate: string, userSlot: number) => {
  console.log("startDate", startDate);
  console.log("userSlot", userSlot);
  console.log("calc", new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + (userSlot - 1))));
  return new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + (userSlot - 1)));
};

export const getMonthYearString = (date: Date): string =>
  date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

export const formatAmount = (amount: number, locale: string = "en-US"): string =>
  amount.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const calcAdminFees = (amount: number): number => Math.round(amount * 0.025);
