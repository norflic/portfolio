import { ReactNode, useMemo } from "react";
import { Lien as LinkItem } from "../Models/Project";

export type LinkManagerProps = {
    links: LinkItem[];
    children: ReactNode;
    className?: string;
};

export default function LinkManager({ links, children, className }: LinkManagerProps) {
    const primaryLink = useMemo(
        () => links.find((link) => link.status === "isValid") ?? links[0],
        [links]
    );

    const isInvalidLink =
        primaryLink?.status === "isInvalid" || primaryLink?.status === "error";

    const linkClassName = [
        className,
        isInvalidLink ? "cursor-not-allowed" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isInvalidLink) return;

        event.preventDefault();
        window.alert("Ce lien est invalide.");
    };

    if (!primaryLink) return null;

    return (
        <a
            href={primaryLink.lien}
            className={linkClassName}
            style={isInvalidLink ? { color: "#dc2626" } : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
        >
            {children}
        </a>
    );
}