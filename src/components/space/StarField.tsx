import { useEffect, useMemo, useState } from "react";

export function StarField({ count = 70 }: { count?: number }) {
  // Stars are randomized, so only render them after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 3.5,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute rounded-full bg-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
