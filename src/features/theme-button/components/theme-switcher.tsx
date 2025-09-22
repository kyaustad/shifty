"use client"

import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeSwitcher({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Button variant="default" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={cn("transition-all duration-300", className)}>
            {!mounted && <Loader2 className="size-4 animate-spin" />}
            {mounted &&theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
        </Button>
    )
}