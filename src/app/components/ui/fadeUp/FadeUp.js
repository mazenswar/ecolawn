"use client";

import { useEffect, useRef, useState } from "react";
import "./fadeup.scss";

function getPrefersReduced() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function FadeUp({
	children,
	delay = 0,
	duration = 0.5,
	distance = 24,
	threshold = 0.15,
	className = "",
	as: Tag = "div",
	id,
}) {
	const ref = useRef(null);
	const [prefersReduced, setPrefersReduced] = useState(getPrefersReduced);
	const [visible, setVisible] = useState(getPrefersReduced);

	// Mark document as JS-ready so CSS animation styles apply
	useEffect(() => {
		document.documentElement.setAttribute("data-js-ready", "");
	}, []);

	// Watch for prefers-reduced-motion changes
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handler = (e) => setPrefersReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	// Intersection observer
	useEffect(() => {
		if (prefersReduced) return;

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [prefersReduced, threshold]);

	const style = prefersReduced
		? {}
		: {
				"--fadeup-delay": `${delay}ms`,
				"--fadeup-duration": `${duration}s`,
				"--fadeup-distance": `${distance}px`,
			};

	return (
		<Tag
			ref={ref}
			className={`fadeup ${visible ? "fadeup--visible" : ""} ${className}`.trim()}
			style={style}
			id={id}
		>
			{children}
		</Tag>
	);
}
