"use client";

import { memo, type ComponentProps, type HTMLAttributes } from "react";
import { Streamdown } from "streamdown";
import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full flex-col gap-2",
      from === "user" ? "is-user ml-auto justify-end" : "is-assistant",
      className,
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex w-fit max-w-full min-w-0 flex-col gap-2 overflow-hidden text-sm",
      "group-[.is-user]:bg-brand-ink group-[.is-user]:ml-auto group-[.is-user]:rounded-2xl group-[.is-user]:px-3 group-[.is-user]:py-2 group-[.is-user]:text-white",
      "group-[.is-assistant]:text-brand-ink group-[.is-assistant]:w-full",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

export const MessageResponse = memo(
  ({ className, isAnimating, caret, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cn(
        "[&_a]:text-brand-action [&_strong]:text-brand-ink size-full text-sm leading-relaxed [&_ol]:my-2 [&_p]:my-2 [&_ul]:my-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className,
      )}
      controls={false}
      lineNumbers={false}
      isAnimating={isAnimating}
      caret={isAnimating ? (caret ?? "block") : undefined}
      {...props}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.isAnimating === nextProps.isAnimating,
);

MessageResponse.displayName = "MessageResponse";
