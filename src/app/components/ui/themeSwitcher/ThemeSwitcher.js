// components/ui/ThemeSwitcher/ThemeSwitcher.js
"use client";
import { useState, useRef, useEffect } from "react";
import "./themeswitcher.scss";

const themes = [
	{
		id: "warm",
		label: "Warm",
		description: "Terracotta & sand",
		group: "light",
	},
	{
		id: "clean",
		label: "Clean",
		description: "Navy & crisp white",
		group: "light",
	},
	{
		id: "earth",
		label: "Earth",
		description: "Forest & sage",
		group: "light",
	},
	{
		id: "minimal",
		label: "Minimal",
		description: "Black & white",
		group: "light",
	},
	{
		id: "bold",
		label: "Bold",
		description: "Dark & electric",
		group: "dark",
	},
	{
		id: "fiery-ocean",
		label: "Fiery Ocean",
		description: "Crimson & deep navy",
		group: "light",
	},
];

export default function ThemeSwitcher({ defaultTheme = "clean" }) {
	const [active, setActive] = useState(defaultTheme);
	const [open, setOpen] = useState(false);
	const panelRef = useRef(null);
	const triggerRef = useRef(null);

	function applyTheme(themeId) {
		document.documentElement.setAttribute("data-theme", themeId);
		setActive(themeId);
	}

	// Close on outside click
	useEffect(() => {
		function handleClickOutside(e) {
			if (
				panelRef.current &&
				!panelRef.current.contains(e.target) &&
				!triggerRef.current.contains(e.target)
			) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	// Close on Escape
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const activeTheme = themes.find((t) => t.id === active);
	const lightThemes = themes.filter((t) => t.group === "light");
	const darkThemes = themes.filter((t) => t.group === "dark");

	return (
		<div className="palette-switcher">
			{/* Trigger button */}
			<button
				ref={triggerRef}
				className="palette-trigger"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				aria-haspopup="dialog"
				aria-label="Change color palette"
			>
				<span
					className="palette-trigger__preview"
					data-theme={active}
					aria-hidden="true"
				>
					<span className="palette-trigger__swatch palette-trigger__swatch--1" />
					<span className="palette-trigger__swatch palette-trigger__swatch--2" />
					<span className="palette-trigger__swatch palette-trigger__swatch--3" />
				</span>
				<span className="palette-trigger__label">{activeTheme?.label}</span>
				<svg
					className={`palette-trigger__chevron ${open ? "is-open" : ""}`}
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M2 4L6 8L10 4"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{/* Panel */}
			{open && (
				<div
					ref={panelRef}
					className="palette-panel"
					role="dialog"
					aria-label="Choose a palette"
				>
					<p className="palette-panel__heading">Choose a palette</p>

					{lightThemes.length > 0 && (
						<div className="palette-group">
							<p className="palette-group__label">Light</p>
							<div className="palette-group__grid">
								{lightThemes.map((theme) => (
									<PaletteCard
										key={theme.id}
										theme={theme}
										active={active === theme.id}
										onSelect={() => {
											applyTheme(theme.id);
											setOpen(false);
										}}
									/>
								))}
							</div>
						</div>
					)}

					{darkThemes.length > 0 && (
						<div className="palette-group">
							<p className="palette-group__label">Dark</p>
							<div className="palette-group__grid">
								{darkThemes.map((theme) => (
									<PaletteCard
										key={theme.id}
										theme={theme}
										active={active === theme.id}
										onSelect={() => {
											applyTheme(theme.id);
											setOpen(false);
										}}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

function PaletteCard({ theme, active, onSelect }) {
	return (
		<button
			className={`palette-card ${active ? "is-active" : ""}`}
			onClick={onSelect}
			aria-pressed={active}
			aria-label={`${theme.label} palette`}
			data-theme={theme.id}
		>
			{/* Mini preview using the theme's own CSS variables */}
			<span className="palette-card__preview" aria-hidden="true">
				<span className="palette-card__bar palette-card__bar--1" />
				<span className="palette-card__bar palette-card__bar--2" />
				<span className="palette-card__bar palette-card__bar--3" />
				<span className="palette-card__dot" />
			</span>
			<span className="palette-card__info">
				<span className="palette-card__name">{theme.label}</span>
				<span className="palette-card__desc">{theme.description}</span>
			</span>
			{active && (
				<span className="palette-card__check" aria-hidden="true">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
						<path
							d="M2 6L5 9L10 3"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			)}
		</button>
	);
}
