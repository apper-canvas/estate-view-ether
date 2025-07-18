import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-neutral-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;