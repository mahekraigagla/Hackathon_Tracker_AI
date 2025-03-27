
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'default',
  withText = true,
}) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const colors = {
    default: 'text-hacktrack-blue',
    white: 'text-white',
  };

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-bold ${className}`}
      aria-label="HackTrack"
    >
      <div className={`relative ${colors[variant]} ${sizes[size]}`}>
        <Zap className={`${sizes[size]} stroke-[2.5]`} />
      </div>
      {withText && (
        <span className={`font-semibold tracking-tight ${colors[variant]} ${textSizes[size]}`}>
          HackTrack
        </span>
      )}
    </Link>
  );
};

export default Logo;
