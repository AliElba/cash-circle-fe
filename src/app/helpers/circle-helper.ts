export const getUserTurnMonth = (startDate: string, userSlot: number): string => {
  if (!userSlot) return "Your turn (Slot not assigned)";

  const turnDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + (userSlot - 1)));
  return turnDate.toLocaleString("en-US", { month: "short", year: "numeric" });
};

export const formatAmount = (amount: number, locale: string = "en-US"): string => amount.toLocaleString(locale);
