"use client";

import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : "password";
  return (
    <div className="relative w-full">
      <Input type={type} className={className} {...props} />
      <Button
        variant="empty"
        size="icon"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};
