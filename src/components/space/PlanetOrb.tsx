import { motion } from "framer-motion";
import type { Planet } from "@/data/planets";

type Props = {
  planet: Planet;
  visited?: boolean;
  onClick?: () => void;
  scale?: number;
  spin?: boolean;
};

export function PlanetOrb({ planet, visited, onClick, scale = 1, spin = true }: Props) {
  const size = planet.size * scale;

  const orb = (
    <motion.div
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 32% 28%, ${planet.colorA}, ${planet.colorB})`,
        boxShadow: `inset -10px -14px 26px oklch(0.1 0.05 280 / 0.55), 0 0 34px ${planet.colorA}55`,
      }}
      animate={spin ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{ duration: 4 + planet.size / 60, repeat: Infinity, ease: "easeInOut" }}
    >
      {planet.id === "saturn" && (
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-[50%] border-4 border-accent/70"
          style={{
            width: size * 1.85,
            height: size * 0.5,
            translateX: "-50%",
            translateY: "-50%",
            rotate: "-18deg",
          }}
          animate={{ rotate: ["-18deg", "-14deg", "-18deg"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {visited && (
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 14 }}
          className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-star text-base shadow-lg"
        >
          ⭐
        </motion.span>
      )}
    </motion.div>
  );

  if (!onClick) return orb;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Visit ${planet.name}`}
      className="group relative grid place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
    >
      {orb}
      <span className="mt-3 font-display text-lg text-foreground/90 group-hover:text-glow">
        {planet.name}
      </span>
    </motion.button>
  );
}
