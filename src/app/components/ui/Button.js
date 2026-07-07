// components/ui/Button.js
"use client";
import Link from "next/link";

/**
 * Unified Button component
 *
 * Props:
 * - text: string (required)
 * - href: string (required for link buttons)
 * - variant: "primary" | "secondary" | "ghost" (default: "primary")
 * - onClick: function (optional, for non-link buttons)
 * - external: boolean (opens in new tab, default: false)
 * - trackEvent: object (optional GTM dataLayer push before navigation)
 *     { event: "event_name", ...additionalData }
 * - disabled: boolean (default: false)
 * - className: string (optional additional classes)
 * - type: "button" | "submit" | "reset" (only used when no href)
 */

const variantMap = {
	primary: "btnPrimary",
	secondary: "btnSecondary",
	ghost: "btnGhost",
};

export default function Button({
	text,
	href,
	variant = "primary",
	onClick,
	external = false,
	trackEvent,
	disabled = false,
	className = "",
	type = "button",
}) {
	const baseClass = variantMap[variant] ?? "btnPrimary";
	const classes = [baseClass, className].filter(Boolean).join(" ");

	// GTM tracking handler
	function handleTrackedClick(e) {
		if (disabled) {
			e.preventDefault();
			return;
		}

		if (trackEvent) {
			e.preventDefault();
			try {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
					...trackEvent,
					button_text: text,
					button_url: href,
				});
			} catch {
				// no-op if dataLayer unavailable
			}
			setTimeout(() => {
				window.location.href = href;
			}, 200);
			return;
		}

		if (onClick) onClick(e);
	}

	// Render as plain button if no href
	if (!href) {
		return (
			<button
				type={type}
				className={classes}
				onClick={onClick}
				disabled={disabled}
			>
				{text}
			</button>
		);
	}

	// Render as link — disabled links block navigation and remove from tab order
	if (disabled) {
		return (
			<span className={classes} aria-disabled="true" role="link">
				{text}
			</span>
		);
	}

	// Render as active link
	return (
		<Link
			href={href}
			className={classes}
			onClick={handleTrackedClick}
			aria-label={external ? `${text} (opens in a new tab)` : undefined}
			{...(external && {
				target: "_blank",
				rel: "noopener noreferrer",
			})}
		>
			{text}
		</Link>
	);
}
