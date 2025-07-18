import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No properties found", 
  message = "Try adjusting your search criteria or browse all properties.",
  actionLabel = "Browse All Properties",
  onAction,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Search" className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-800 mb-3 font-display">{title}</h3>
          <p className="text-neutral-600 text-lg">{message}</p>
        </div>
        
        {onAction && (
          <Button onClick={onAction} className="flex items-center gap-2">
            <ApperIcon name="Home" className="w-4 h-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;