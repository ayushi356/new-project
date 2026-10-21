import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EditorialIconContainerProps {
  icon: LucideIcon;
  variant?: 'ivory' | 'green' | 'active' | 'muted' | 'subtle-saffron' | 'subtle-alert';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  iconSize?: number;
  'aria-hidden'?: boolean;
}

export function EditorialIconContainer({
  icon: Icon,
  variant = 'ivory',
  size = 'md',
  className = '',
  iconSize,
  'aria-hidden': ariaHidden = true,
}: EditorialIconContainerProps) {
  const sizeClasses = {
    sm: 'h-7 w-7 rounded-md',
    md: 'h-8 w-8 sm:h-9 sm:w-9 rounded-lg',
    lg: 'h-10 w-10 sm:h-11 sm:w-11 rounded-xl',
  }[size];

  const variantClasses = {
    ivory: 'border border-[#E5E0D8] bg-[#FAF8F5] text-[#1A3D2F]',
    green: 'border border-[#1A3D2F]/15 bg-[#1A3D2F]/5 text-[#1A3D2F]',
    active: 'border border-[#1A3D2F] bg-[#1A3D2F] text-white shadow-2xs',
    muted: 'border border-[#E5E0D8] bg-[#F5F2EB] text-[#5C6460]',
    'subtle-saffron': 'border border-[#B45309]/20 bg-[#B45309]/5 text-[#B45309]',
    'subtle-alert': 'border border-rose-200 bg-rose-50/60 text-rose-800',
  }[variant];

  const defaultIconSize = {
    sm: 13,
    md: 16,
    lg: 20,
  }[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center transition-colors ${sizeClasses} ${variantClasses} ${className}`}
      aria-hidden={ariaHidden}
    >
      <Icon size={iconSize ?? defaultIconSize} strokeWidth={1.5} />
    </span>
  );
}
