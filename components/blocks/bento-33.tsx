"use client";

/**
 * React Bits Pro `bento-33`: marks drifting in a row.
 * Only confirmed partner lockups are passed in.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export interface BentoMark {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function Bento33({
  marks,
  title,
  body,
}: {
  marks: readonly BentoMark[];
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const row = [...marks, ...marks, ...marks, ...marks];

  return (
    <article className="border-brand-mist flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative py-10">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max items-center gap-16 px-8"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {row.map((mark, index) => (
              <Image
                key={`${mark.src}-${index}`}
                src={mark.src}
                alt={index < marks.length ? mark.alt : ""}
                width={mark.width}
                height={mark.height}
                className="h-12 w-auto object-contain"
              />
            ))}
          </motion.div>
        </div>
      </div>
      <div className="px-6 pt-2 pb-6 text-center">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        <p className="text-brand-slate mx-auto mt-1.5 max-w-xl text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
