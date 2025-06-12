import React from 'react';
import { clsx } from 'clsx';

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
    <div className={clsx('bg-white rounded-lg shadow-sm p-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-[#2563EB]/10 rounded-lg">
            {icon}
          </div>
          <h3 className="ml-4 text-lg font-medium text-gray-900">{title}</h3>
        </div>
        {trend && (
          <span className={clsx(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}