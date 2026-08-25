import { useEffect, useState } from "react";

type Star = { id: number; top: number; left: number; size: number; delay: number };

export function StarField({ count = 70 }: { count?: number }) {
  // Randomized positions are generated after mount so SSR and client markup match.
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 3.5,
      })),
    );
  }, [count]);

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
