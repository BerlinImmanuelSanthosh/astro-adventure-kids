import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { planets, type Planet } from "@/data/planets";
import { StarField } from "@/components/space/StarField";
import { PlanetOrb } from "@/components/space/PlanetOrb";
import rocket from "@/assets/rocket.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmic Kids — A Space Adventure Game for Little Explorers" },
      {
        name: "description",
        content:
          "Fly a rocket through the solar system, meet friendly planets, learn fun space facts and collect stars in this playful game for young children.",
      },
      { property: "og:title", content: "Cosmic Kids — Space Adventure for Little Explorers" },
      {
        property: "og:description",
        content:
          "Visit the Sun, Saturn, Mars and more. Fun facts, gentle quizzes and star rewards for curious kids.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const spring = { type: "spring" as const, stiffness: 260, damping: 24 };

function Index() {
  const [stage, setStage] = useState<"start" | "map" | "planet" | "done">("start");
  const [active, setActive] = useState<Planet | null>(null);
  const [visited, setVisited] = useState<string[]>([]);

  const allDone = visited.length === planets.length;

  function openPlanet(p: Planet) {
    setActive(p);
    setStage("planet");
  }

  function completePlanet(id: string) {
    const next = visited.includes(id) ? visited : [...visited, id];
    setVisited(next);
    setActive(null);
    setStage(next.length === planets.length ? "done" : "map");
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-8">
      <StarField />

      <div className="relative mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {stage === "start" && (
            <motion.section
              key="start"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={spring}
              className="flex min-h-[80vh] flex-col items-center justify-center text-center"
            >
              <motion.img
                src={rocket}
                alt="Smiling child astronaut waving from a cartoon rocket"
                width={768}
                height={768}
                className="w-56 drop-shadow-2xl sm:w-72"
                animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="mt-6 text-5xl leading-tight sm:text-6xl">
                Cosmic <span className="text-glow text-secondary">Kids</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Hop in the rocket, meet the planets and collect a star from every new friend!
              </p>
              <motion.button
                onClick={() => setStage("map")}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={spring}
                className="mt-8 rounded-full bg-primary px-10 py-4 font-display text-2xl text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                Blast off! 🚀
              </motion.button>
            </motion.section>
          )}

          {stage === "map" && (
            <motion.section
              key="map"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={spring}
            >
              <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl">Pick a space friend</h2>
                  <p className="text-muted-foreground">Tap a planet to fly there.</p>
                </div>
                <StarCounter count={visited.length} total={planets.length} />
              </header>

              <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {planets.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.7, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ ...spring, delay: i * 0.07 }}
                    className="flex flex-col items-center"
                  >
                    <PlanetOrb
                      planet={p}
                      visited={visited.includes(p.id)}
                      onClick={() => openPlanet(p)}
                      scale={0.8}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {stage === "planet" && active && (
            <PlanetScene
              key={active.id}
              planet={active}
              onBack={() => {
                setActive(null);
                setStage("map");
              }}
              onDone={() => completePlanet(active.id)}
            />
          )}

          {stage === "done" && (
            <motion.section
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring}
              className="flex min-h-[80vh] flex-col items-center justify-center text-center"
            >
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                🏆
              </motion.div>
              <h2 className="mt-6 text-4xl sm:text-5xl">You are a Space Hero!</h2>
              <p className="mt-3 max-w-md text-lg text-muted-foreground">
                You visited all {planets.length} space friends and collected every star.
              </p>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={spring}
                onClick={() => {
                  setVisited([]);
                  setStage("map");
                }}
                className="mt-8 rounded-full bg-secondary px-9 py-4 font-display text-xl text-secondary-foreground shadow-[var(--shadow-glow)]"
              >
                Fly again 🪐
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function StarCounter({ count, total }: { count: number; total: number }) {
  return (
    <div className="surface-card flex items-center gap-2 px-5 py-3">
      <motion.span
        key={count}
        initial={{ scale: 0.4, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={spring}
        className="text-2xl"
      >
        ⭐
      </motion.span>
      <span className="font-display text-xl">
        {count} / {total}
      </span>
    </div>
  );
}

function PlanetScene({
  planet,
  onBack,
  onDone,
}: {
  planet: Planet;
  onBack: () => void;
  onDone: () => void;
}) {
  const [factIndex, setFactIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === planet.quiz.answer;
  const lastFact = factIndex === planet.facts.length - 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={spring}
      className="min-h-[85vh]"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ x: -4 }}
        className="font-display text-lg text-muted-foreground"
      >
        ← Back to space map
      </motion.button>

      <div className="mt-6 grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <PlanetOrb planet={planet} scale={1.5} />
          </motion.div>
        </div>

        <div>
          <h2 className="text-4xl sm:text-5xl">
            {planet.emoji} {planet.name}
          </h2>
          <p className="mt-2 text-lg text-secondary">{planet.greeting}</p>

          <div className="surface-card mt-6 min-h-40 p-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={spring}
                className="text-xl leading-relaxed"
              >
                {planet.facts[factIndex]}
              </motion.p>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-3">
              {planet.facts.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: i === factIndex ? 1.3 : 1, opacity: i <= factIndex ? 1 : 0.4 }}
                  transition={spring}
                  className="size-3 rounded-full bg-accent"
                />
              ))}
              {!lastFact && (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={spring}
                  onClick={() => setFactIndex((f) => f + 1)}
                  className="ml-auto rounded-full bg-primary px-6 py-2.5 font-display text-lg text-primary-foreground"
                >
                  Next fact
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {lastFact && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
                className="surface-card mt-6 p-6"
              >
                <h3 className="text-2xl">{planet.quiz.question}</h3>
                <div className="mt-4 grid gap-3">
                  {planet.quiz.options.map((opt, i) => {
                    const chosen = picked === i;
                    const isRight = i === planet.quiz.answer;
                    return (
                      <motion.button
                        key={opt}
                        onClick={() => setPicked(i)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        animate={
                          chosen && !isRight
                            ? { x: [0, -8, 8, -6, 0] }
                            : chosen
                              ? { scale: [1, 1.05, 1] }
                              : { x: 0 }
                        }
                        transition={spring}
                        className={`rounded-2xl border-2 px-5 py-3.5 text-left font-display text-lg transition-colors ${
                          chosen && isRight
                            ? "border-success bg-success text-success-foreground"
                            : chosen
                              ? "border-destructive bg-destructive/20 text-foreground"
                              : "border-border bg-input text-foreground hover:border-secondary"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={spring}
                      className="mt-5 flex flex-wrap items-center gap-4"
                    >
                      <p className="text-lg">
                        {correct ? "Yay! That's right! ⭐" : "Almost! Try another one 💫"}
                      </p>
                      {correct && (
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          transition={spring}
                          onClick={onDone}
                          className="ml-auto rounded-full bg-secondary px-7 py-3 font-display text-lg text-secondary-foreground shadow-[var(--shadow-glow)]"
                        >
                          Take my star 🚀
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
