import { useState, useEffect } from "react"

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        // Vérifie si le code est exécuté côté client (window est défini)
        if (typeof window !== "undefined") {
            const media = window.matchMedia(query)
            if (media.matches !== matches) {
                setMatches(media.matches)
            }
            const listener = () => setMatches(media.matches)
            media.addEventListener("change", listener)
            return () => media.removeEventListener("change", listener)
        }
    }, [matches, query])

    return matches
}
