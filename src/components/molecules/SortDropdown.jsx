import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const SortDropdown = ({ sortBy, onSortChange, className }) => {
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "largest", label: "Largest First" },
    { value: "smallest", label: "Smallest First" }
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ApperIcon name="ArrowUpDown" className="w-4 h-4 text-neutral-600" />
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-48"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SortDropdown;