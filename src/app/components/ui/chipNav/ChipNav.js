"use client";
import { useEffect, useState } from "react";
import "./chipnav.scss";

function getIsMobile() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(max-width: 767px)").matches;
}

export default function ChipNav({ chipNavConfig }) {
	const { label, chips } = chipNavConfig;
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(getIsMobile);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const handler = (e) => setIsMobile(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		const nav = document.querySelector(".chip-nav");
		if (!nav) return;

		const getOffset = () => {
			const chipNav = document.querySelector(".chip-nav");
			return chipNav ? chipNav.getBoundingClientRect().bottom : 80;
		};

		const getDocumentTop = (el) => {
			let top = 0;
			let current = el;
			while (current) {
				top += current.offsetTop;
				current = current.offsetParent;
			}
			return top;
		};

		const onClick = (e) => {
			const a = e.target.closest("a[href^='#']");
			if (!a) return;
			const id = a.getAttribute("href").slice(1);
			const el = document.getElementById(id);
			if (!el) return;
			e.preventDefault();
			if (isMobile) setOpen(false);
			el.scrollIntoView({ behavior: "smooth" });
		};

		nav.addEventListener("click", onClick);
		return () => nav.removeEventListener("click", onClick);
	}, [isMobile]);

	return (
		<nav className="chip-nav" aria-label={label}>
			<div className="container">
				<button
					className="chip-nav__toggle"
					aria-expanded={open}
					aria-controls="chip-nav-list"
					onClick={() => setOpen((prev) => !prev)}
				>
					<span>{label}</span>
					<svg
						className={`chip-nav__chevron ${open ? "chip-nav__chevron--open" : ""}`}
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
						focusable="false"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>

				<div className="chip-nav__desktop-header">
					<span className="chip-nav__label">{label}</span>
				</div>

				<ul
					id="chip-nav-list"
					className={`chip-nav__list ${open ? "chip-nav__list--open" : ""}`}
					role="list"
				>
					{chips.map((chip) => (
						<li key={chip.id}>
							<a href={`#${chip.id}`} className="chip-nav__chip">
								{chip.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
