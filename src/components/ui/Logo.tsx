
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code, Award } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'code' | 'award';
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
    default: 'text-primary',
    white: 'text-white',
    code: 'text-primary',
    award: 'text-primary',
  };

  const getIcon = () => {
    switch (variant) {
      case 'code':
        return <Code className={`${sizes[size]} stroke-[2.5]`} />;
      case 'award':
        return <Award className={`${sizes[size]} stroke-[2.5]`} />;
      default:
        return <Zap className={`${sizes[size]} stroke-[2.5]`} />;
    }
  };

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-bold ${className}`}
      aria-label="HackTrack"
    >
      <div className={`relative ${colors[variant]} ${sizes[size]}`}>
        {getIcon()}
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
