import React from 'react';

interface StarBorderProps {
  as?: 'button' | 'div' | 'span' | 'a';
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  [key: string]: any;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  href,
  onClick,
  ...rest
}) => {
  const baseProps = {
    className: `group relative inline-block overflow-hidden rounded-[8px] ${className}`,
    style: {
      padding: `${thickness}px 0`,
      ...style
    },
    ...rest
  };

  if (as === 'a' && href) {
    return (
      <a href={href} {...baseProps}>
        <div
          className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div
          className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div className="relative z-1 bg-gradient-to-r from-white/95 via-white/90 to-gray-50/95 dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-700/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-600/80 text-center text-[16px] py-[8px] px-[26px] rounded-[8px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
          {children}
        </div>
      </a>
    );
  }

  if (as === 'button') {
    return (
      <button type="button" onClick={onClick} {...baseProps}>
        <div
          className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div
          className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div className="relative z-1 bg-gradient-to-r from-white/95 via-white/90 to-gray-50/95 dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-700/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-600/80 text-center text-[16px] py-[8px] px-[26px] rounded-[8px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
          {children}
        </div>
      </button>
    );
  }

  return (
    <div {...baseProps}>
      <div
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="relative z-1 bg-gradient-to-r from-white/95 via-white/90 to-gray-50/95 dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-700/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-600/80 text-center text-[16px] py-[8px] px-[26px] rounded-[8px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
        {children}
      </div>
    </div>
  );
};

export default StarBorder;
