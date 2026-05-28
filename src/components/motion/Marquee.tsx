"use client";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export default function Marquee({ children, speed = 40, className }: Props) {
  const duration = `${speed}s`;
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="flex w-max gap-16 animate-emarat-marquee"
        style={{ animationDuration: duration }}
      >
        <div className="flex gap-16 shrink-0">{children}</div>
        <div className="flex gap-16 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
