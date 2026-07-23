import { describe, expect, it } from "vitest";
import { getDateDisplay } from "./dateRange";

describe("getDateDisplay", () => {
  it("renders an open-ended range as 'Present' and counts duration from today", () => {
    const today = new Date(2024, 5, 15); // June 2024
    const result = getDateDisplay({ start: "2024-01" }, today);

    expect(result.dateRange).toBe("Jan 2024 - Present");
    expect(result.duration).toBe("6 mos");
    expect(result.date).toBe("Jan 2024 - Present · 6 mos");
  });

  it("renders a closed range with an explicit end date", () => {
    const today = new Date(2024, 5, 15);
    const result = getDateDisplay({ start: "2023-01", end: "2023-06" }, today);

    expect(result.dateRange).toBe("Jan 2023 - Jun 2023");
    expect(result.duration).toBe("6 mos");
  });

  it("keeps an auto-ending range open while still within the window", () => {
    const today = new Date(2024, 2, 1); // Mar 2024
    const result = getDateDisplay({ start: "2024-01", autoEndAfterMonths: 6 }, today);

    expect(result.dateRange).toBe("Jan 2024 - Present");
  });

  it("closes an auto-ending range once the window has elapsed", () => {
    const today = new Date(2025, 0, 1); // Jan 2025, well past the window
    const result = getDateDisplay({ start: "2024-01", autoEndAfterMonths: 6 }, today);

    expect(result.dateRange).toBe("Jan 2024 - Jun 2024");
    expect(result.duration).toBe("6 mos");
  });

  it("formats a multi-year duration with both years and months", () => {
    const today = new Date(2024, 5, 15);
    const result = getDateDisplay({ start: "2022-03", end: "2024-05" }, today);

    expect(result.dateRange).toBe("Mar 2022 - May 2024");
    expect(result.duration).toBe("2 yrs 3 mos");
  });

  it("omits duration when showDuration is false", () => {
    const today = new Date(2024, 5, 15);
    const result = getDateDisplay({ start: "2024-01", showDuration: false }, today);

    expect(result.duration).toBeUndefined();
    expect(result.date).toBe("Jan 2024 - Present");
  });

  it("throws on a malformed month value", () => {
    expect(() => getDateDisplay({ start: "2024-13" })).toThrow("Invalid month value");
    expect(() => getDateDisplay({ start: "not-a-date" })).toThrow("Invalid month value");
  });

  it("handles a December-to-January year rollover", () => {
    const today = new Date(2024, 5, 15);
    const result = getDateDisplay({ start: "2023-12", end: "2024-01" }, today);

    expect(result.dateRange).toBe("Dec 2023 - Jan 2024");
    expect(result.duration).toBe("2 mos");
  });
});
