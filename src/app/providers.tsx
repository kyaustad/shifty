import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { ThemeSwitcher } from "@/features/theme-button/components/theme-switcher"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <ThemeSwitcher className="fixed top-4 right-4" />
            {children}
        </ThemeProvider>
    )
}