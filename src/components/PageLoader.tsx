import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

let hasLoaded = false;

// Threshold: if the page took longer than this to mount, the connection is slow.
const SLOW_MOUNT_THRESHOLD_MS = 700;

function isSlowLoad(): boolean {
  // Network Information API (Chrome/Android)
  const conn = (navigator as { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) return true;

  // Fallback: how long since the browser started loading this page
  if (performance.now() > SLOW_MOUNT_THRESHOLD_MS) return true;

  return false;
}

const PageLoader = () => {
  const [visible, setVisible] = useState(() => !hasLoaded && isSlowLoad());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!visible) {
      // Mark as loaded even if we skipped showing the loader
      hasLoaded = true;
      return;
    }

    hasLoaded = true;
    document.body.style.overflow = "hidden";

    const duration = 900;
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.5);
      setPct(Math.round(eased * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    const hideTimer = setTimeout(() => setVisible(false), 1300);
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2100);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unlockTimer);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-nekst tracking-widest text-foreground select-none"
          >
            DHIREN
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-4 text-sm font-rajdhani tracking-[0.25em] text-muted-foreground tabular-nums"
          >
            {pct}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
