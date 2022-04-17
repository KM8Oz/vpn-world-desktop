import * as React from "react";

function Logo({size,fillColor, ...props}) {
  return (
    <svg
      width={size ||24}
      height={size ||24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_38_221)" stroke={fillColor || "#fff"}>
        <circle cx={12} cy={12} r={11} strokeWidth={2} />
        <path d="M15.5 12c0 3.275-.443 6.22-1.146 8.327-.352 1.057-.76 1.876-1.19 2.42-.433.55-.83.753-1.164.753-.333 0-.73-.202-1.164-.753-.43-.544-.838-1.363-1.19-2.42C8.943 18.22 8.5 15.275 8.5 12c0-3.275.443-6.22 1.146-8.327.352-1.057.76-1.876 1.19-2.42C11.269.703 11.666.5 12 .5c.333 0 .73.202 1.164.753.43.544.838 1.363 1.19 2.42C15.057 5.78 15.5 8.725 15.5 12z" />
        <path d="M19.5 12c0 3.229-.873 6.13-2.26 8.208C15.854 22.29 13.99 23.5 12 23.5c-1.99 0-3.853-1.21-5.24-3.292C5.372 18.129 4.5 15.228 4.5 12c0-3.229.873-6.13 2.26-8.208C8.146 1.71 10.01.5 12 .5c1.99 0 3.853 1.21 5.24 3.292C18.628 5.871 19.5 8.772 19.5 12z" />
        <path d="M12 8.5c3.275 0 6.22.443 8.327 1.146 1.057.352 1.876.76 2.42 1.19.55.433.753.83.753 1.164 0 .333-.202.73-.753 1.164-.544.43-1.363.838-2.42 1.19C18.22 15.057 15.275 15.5 12 15.5c-3.275 0-6.22-.443-8.327-1.146-1.057-.352-1.876-.76-2.42-1.19C.703 12.731.5 12.334.5 12c0-.333.202-.73.753-1.164.544-.43 1.363-.838 2.42-1.19C5.78 8.943 8.725 8.5 12 8.5z" />
        <path d="M12 4.5c3.229 0 6.13.873 8.208 2.26C22.29 8.146 23.5 10.01 23.5 12c0 1.99-1.21 3.853-3.292 5.24-2.079 1.387-4.98 2.26-8.208 2.26-3.229 0-6.13-.873-8.208-2.26C1.71 15.854.5 13.99.5 12c0-1.99 1.21-3.853 3.292-5.24C5.871 5.372 8.772 4.5 12 4.5z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_38_221">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Logo;