"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaLink } from "@/components/marketing/cta";
import {
  TESTIMONIALS_ARE_PLACEHOLDER,
  socialProof,
  testimonials,
  type Testimonial,
} from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * SocialProof — adapted from the React Bits Pro `social-proof-14` block.
 *
 * The block's sticky rail and two staggered card columns are kept; everything
 * else is rebuilt on JAIA tokens. The shipped version carried an invented
 * rating ("4.9 across 2,400+ reviews"), Unsplash photographs of real people
 * presented as customers, and a dead link — all removed. Quotes are named
 * client testimonials; avatars are initials unless a consented photograph
 * of that person is supplied (see content/testimonials.ts).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const columns = [testimonials.slice(0, 3), testimonials.slice(3, 6)];

function TestimonialCard({
  testimonial,
  featured,
  variants,
}: {
  testimonial: Testimonial;
  featured: boolean;
  variants: Variants;
}) {
  return (
    <motion.article
      variants={variants}
      className="border-brand-mist shadow-soft rounded-[1.5rem] border bg-white p-6 sm:p-7"
    >
      <p
        className={cn(
          "leading-relaxed",
          featured
            ? "text-brand-ink text-lg font-medium"
            : "text-brand-slate text-[0.9375rem]",
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span className="bg-brand-sky-soft text-brand-action relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold tracking-[0.04em]">
          {testimonial.avatarSrc ? (
            <Image
              src={testimonial.avatarSrc}
              alt=""
              width={80}
              height={80}
              sizes="40px"
              loading="eager"
              className="size-10 object-cover"
            />
          ) : (
            <span aria-hidden="true">{testimonial.initials}</span>
          )}
        </span>
        <div className="min-w-0">
          <p className="text-brand-ink text-sm font-semibold">
            {testimonial.name}
          </p>
          <p className="text-brand-slate text-xs leading-snug">
            {`${testimonial.title}, ${testimonial.organization}`}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function SocialProof() {
  const prefersReducedMotion = useReducedMotion();

  const rail: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      };

  const stack: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.09 },
    },
  };

  const card: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      };

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="section-wash section-wash-sky relative"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[90rem] gap-12 px-5 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-12 lg:gap-x-12">
        <motion.div
          variants={rail}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
        >
          <SectionHeading
            id="social-proof-heading"
            eyebrow={socialProof.eyebrow}
            title={socialProof.heading}
            body={socialProof.body}
          />

          {TESTIMONIALS_ARE_PLACEHOLDER ? (
            <p className="border-brand-mist text-brand-slate mt-6 border-l-2 pl-4 text-sm italic">
              {socialProof.notice}
            </p>
          ) : null}

          <div className="mt-8">
            <CtaLink href={socialProof.cta.href}>
              {socialProof.cta.label}
            </CtaLink>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:col-span-8">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              variants={stack}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={cn(
                "flex flex-col gap-6",
                // Offsetting the second column breaks the grid into a more
                // editorial rhythm; only once the columns actually sit side by side
                columnIndex === 1 && "sm:mt-12",
              )}
            >
              {column.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.quote}
                  testimonial={testimonial}
                  featured={index === 0}
                  variants={card}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
