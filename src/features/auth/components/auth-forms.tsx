"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/custom/password-input";
import { useAuth } from "./auth-context";

export const AuthForms = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState("log-in");
  return (
    <Card className={cn(className, "transition-transform duration-300")}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader>
          <TabsList>
            <TabsTrigger value="log-in">Log In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <Separator className="my-4" />
        <TabsContent value="sign-up">
          <CardContent className="w-full my-auto h-full space-y-4">
            <CardDescription>
              {`Sign up as a company admin to get started managing your company's schedules. If you are an employee or manager, please contact your company admin to get access.`}
            </CardDescription>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full my-auto h-full"
            >
              <SignUpForm />
            </motion.div>
          </CardContent>
        </TabsContent>
        <TabsContent value="log-in">
          <CardContent className="w-full my-auto h-full">
            <CardDescription></CardDescription>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full my-auto h-full"
            >
              <LogInForm />
            </motion.div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const signUpFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export const SignUpForm = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { refresh } = useAuth();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    console.log(data);
    toast.loading("Signing Up...", { id: "sign-up" });
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      toast.error("Passwords do not match", { id: "sign-up" });
      return;
    }
    try {
      const { data: signUpData, error } = await authClient.signUp.email({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "admin",
      });
      if (error) {
        toast.error(error.message, { id: "sign-up" });
        return;
      }
      toast.success("Sign Up Successfully!", { id: "sign-up" });
      refresh();
      router.push("/guarded/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: "sign-up" });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-4 my-auto")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="given-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="family-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const logInFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const LogInForm = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { refresh } = useAuth();
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof logInFormSchema>) => {
    console.log(data);
    toast.loading("Logging In...", { id: "log-in" });
    try {
      const { data: logInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message, { id: "log-in" });
        return;
      }
      toast.success("Logged In Successfully!", { id: "log-in" });
      refresh();
      router.push("/guarded/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: "log-in" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-4 my-auto h-full")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} autoComplete="current-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
