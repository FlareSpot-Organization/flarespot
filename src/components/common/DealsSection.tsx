import { DealsSectionProps } from "@/types/public";

const DealsSection: React.FC<DealsSectionProps> = ({
  title,
  icon: Icon,
  badge,
  children,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md transition-colors duration-300">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:mb-4">
      <h2 className="text-md font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="flex items-center gap-2 text-sm">
        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full transition-colors duration-300">
          {badge}
        </span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 gap-4">
      {children}
    </div>
  </div>
);

export default DealsSection;
