import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ViewToggle = ({ view, onViewChange, className }) => {
  return (
    <div className={cn("flex bg-neutral-100 rounded-lg p-1", className)}>
      <button
        onClick={() => onViewChange("grid")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
          view === "grid" 
            ? "bg-white text-primary-600 shadow-sm" 
            : "text-neutral-600 hover:text-neutral-800"
        )}
      >
        <ApperIcon name="Grid3X3" className="w-4 h-4" />
        <span className="text-sm font-medium">Grid</span>
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
          view === "list" 
            ? "bg-white text-primary-600 shadow-sm" 
            : "text-neutral-600 hover:text-neutral-800"
        )}
      >
        <ApperIcon name="List" className="w-4 h-4" />
        <span className="text-sm font-medium">List</span>
      </button>
    </div>
  );
};

export default ViewToggle;