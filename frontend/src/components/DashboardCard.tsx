import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function DashboardCard({ title, value, icon, trend, className }: DashboardCardProps) {
  return (
    <div className={clsx('bg-dark-secondary border border-dark-border rounded-xl p-6 hover:bg-dark-tertiary transition-colors', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-dark-tertiary rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={clsx(
            'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
            trend.isPositive 
              ? 'bg-secondary/20 text-secondary' 
              : 'bg-error/20 text-error'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
}