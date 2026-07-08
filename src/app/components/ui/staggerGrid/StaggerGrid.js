"use client";

import { Children, isValidElement } from "react";
import { useState, useEffect } from "react";
import FadeUp from "../fadeUp/FadeUp";

function getPrefersReduced() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function StaggerGrid({
	children,
	baseDelay = 0,
	stagger = 100,
	duration = 0.5,
	distance = 24,
	threshold = 0.15,
	as: Tag = "div",
	itemAs = "div",
	className = "",
	id,
	role,
}) {
	const [prefersReduced, setPrefersReduced] = useState(getPrefersReduced);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handler = (e) => setPrefersReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	return (
		<Tag className={className || undefined} role={role} id={id}>
			{Children.map(children, (child, i) => {
				if (!isValidElement(child)) return child;

				if (prefersReduced) return child;

				return (
					<FadeUp
						key={i}
						as={itemAs}
						delay={baseDelay + i * stagger}
						duration={duration}
						distance={distance}
						threshold={threshold}
					>
						{child}
					</FadeUp>
				);
			})}
		</Tag>
	);
}
