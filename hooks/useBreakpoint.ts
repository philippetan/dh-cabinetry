import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 425) return "xs"; // < 425px
  if (width < 768) return "sm"; // 425px - 767px
  if (width < 1024) return "md"; // 768px - 1023px
  if (width < 1440) return "lg"; // 1024px - 1439px
  if (width < 2560) return "xl"; // 1440px - 2559px
  return "2xl"; // ≥ 2560px
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
