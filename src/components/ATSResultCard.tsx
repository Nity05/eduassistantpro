
import React from "react";

interface ATSResultCardProps {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}

const ATSResultCard = ({ title, items, icon }: ATSResultCardProps) => {
  return (
    <div className="glass-card p-6 rounded-xl hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            {icon && <div className="mt-0.5 flex-shrink-0">{icon}</div>}
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ATSResultCard;
