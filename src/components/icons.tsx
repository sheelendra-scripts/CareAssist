import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16v16H4z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M9 12l2 2 4-4" stroke="hsl(var(--primary-foreground))" />
    </svg>
  );
}
