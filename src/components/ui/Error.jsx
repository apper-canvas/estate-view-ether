import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Error = ({ 
  title = "Something went wrong", 
  message = "We couldn't load the properties. Please try again.",
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>
          <p className="text-neutral-600">{message}</p>
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center gap-2">
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;