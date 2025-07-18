import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const ContactForm = ({ property, className }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${property.title} at ${property.address}. Please contact me with more information.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Your inquiry has been sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in ${property.title} at ${property.address}. Please contact me with more information.`
    });
    setIsSubmitting(false);
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2 flex items-center gap-2">
          <ApperIcon name="Mail" className="w-5 h-5 text-primary-600" />
          Contact Agent
        </h3>
        <p className="text-neutral-600">
          Get more information about this property
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            rows={4}
            className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 resize-none"
            placeholder="Enter your message"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ApperIcon name="Send" className="w-4 h-4" />
              Send Inquiry
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;