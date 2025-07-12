import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 font-headline">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="0"
            y1="0"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
        <path
          d="M26.6667 14.1667L23.5 17.3333M26.6667 14.1667C26.1834 13.565 25.5947 13.069 24.9392 12.7118C24.2837 12.3545 23.5755 12.1438 22.85 12.0917C22.1246 12.04 21.396 12.1485 20.7117 12.4083C20.0274 12.6682 19.403 13.0734 18.8834 13.5917L12.05 20.425C11.5317 20.9433 11.1265 21.5678 10.8666 22.252C10.6067 22.9363 10.5 23.6649 10.55 24.3903C10.5917 25.1158 10.7925 25.8239 11.15 26.4794C11.5073 27.1349 12.0033 27.7236 12.6084 28.2083C13.2134 28.6931 13.9113 29.049 14.65 29.25C15.3887 29.451 16.1559 29.4925 16.9084 29.3708C17.6608 29.2492 18.3743 28.9683 18.9917 28.55C19.6092 28.1317 20.1167 27.5883 20.4917 27.0083L27.325 20.175C27.8433 19.6567 28.2485 19.0322 28.5084 18.348C28.7683 17.6637 28.875 16.9351 28.825 16.2097C28.775 15.4842 28.5625 14.7761 28.205 14.1206C27.8477 13.4651 27.3517 12.8764 26.75 12.3917L26.6667 14.1667Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold text-foreground">Fix My City</span>
    </div>
  );
}
