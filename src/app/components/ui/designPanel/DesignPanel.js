"use client";
import { useState, useRef, useEffect } from "react";
import {
	palettes,
	fontPairings,
	siteStyles,
} from "../../../../../config/design";
import "./designpanel.scss";

const DEFAULTS = {
	palette: "slate-mauve",
	font: "binswar",
	style: "hero-background",
};

export default function DesignPanel() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(DEFAULTS);
	const panelRef = useRef(null);
	const triggerRef = useRef(null);

	// Apply all defaults on mount
	useEffect(() => {
		applyPalette(DEFAULTS.palette);
		applyFont(DEFAULTS.font);
		applyStyle(DEFAULTS.style);
	}, []);

	function applyPalette(id) {
		document.documentElement.setAttribute("data-theme", id);
		setActive((prev) => ({ ...prev, palette: id }));
	}

	function applyFont(id) {
		document.documentElement.setAttribute("data-font", id);
		setActive((prev) => ({ ...prev, font: id }));
	}

	function applyStyle(id) {
		// Find the style config so we can read its shape and spacing
		const styleConfig = siteStyles.find((s) => s.id === id);
		if (!styleConfig) return;

		// Apply all three attributes at once
		// Client only sees the style choice, shape and spacing are silent
		document.documentElement.setAttribute("data-style", id);
		document.documentElement.setAttribute("data-shape", styleConfig.shape);
		document.documentElement.setAttribute("data-spacing", styleConfig.spacing);

		setActive((prev) => ({ ...prev, style: id }));
	}

	// Close on outside click
	useEffect(() => {
		function handler(e) {
			if (
				panelRef.current &&
				!panelRef.current.contains(e.target) &&
				!triggerRef.current.contains(e.target)
			)
				setOpen(false);
		}
		if (open) document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	// Close on Escape
	useEffect(() => {
		function handler(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	const activePalette = palettes.find((p) => p.id === active.palette);

	return (
		<div className="design-panel-wrapper">
			{/* Trigger button */}
			<button
				ref={triggerRef}
				className="dp-trigger"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				aria-haspopup="dialog"
				aria-label="Customize design"
			>
				<span className="dp-trigger__swatches" aria-hidden="true">
					{activePalette?.swatches.map((color, i) => (
						<span
							key={i}
							className="dp-trigger__dot"
							style={{ background: color }}
						/>
					))}
				</span>
				<span className="dp-trigger__label">Customize</span>
				<svg
					className={`dp-trigger__chevron ${open ? "is-open" : ""}`}
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
					className="dp-panel"
					role="dialog"
					aria-label="Design customizer"
				>
					{/* Colors */}
					<Section label="Colors">
						{["light", "dark"].map((group) => {
							const grouped = palettes.filter((p) => p.group === group);
							if (!grouped.length) return null;
							return (
								<div key={group} className="dp-group">
									<p className="dp-group__label">{group}</p>
									<div className="dp-grid">
										{grouped.map((palette) => (
											<button
												key={palette.id}
												className={`dp-palette-card ${active.palette === palette.id ? "is-active" : ""}`}
												onClick={() => applyPalette(palette.id)}
												aria-pressed={active.palette === palette.id}
												aria-label={palette.label}
											>
												<span
													className="dp-palette-card__preview"
													aria-hidden="true"
												>
													{palette.swatches.map((color, i) => (
														<span
															key={i}
															className="dp-palette-card__swatch"
															style={{ background: color }}
														/>
													))}
												</span>
												<span className="dp-palette-card__name">
													{palette.label}
												</span>
												<span className="dp-palette-card__desc">
													{palette.description}
												</span>
											</button>
										))}
									</div>
								</div>
							);
						})}
					</Section>

					<Divider />

					{/* Typography */}
					<Section label="Typography">
						<div className="dp-list">
							{fontPairings.map((font) => (
								<button
									key={font.id}
									className={`dp-option-row ${active.font === font.id ? "is-active" : ""}`}
									onClick={() => applyFont(font.id)}
									aria-pressed={active.font === font.id}
								>
									<span className="dp-option-row__label">{font.label}</span>
									<span className="dp-option-row__desc">
										{font.description}
									</span>
									{active.font === font.id && <CheckIcon />}
								</button>
							))}
						</div>
					</Section>

					<Divider />

					{/* Style — this is the new section replacing spacing and shape */}
					<Section label="Style">
						<div className="dp-list">
							{siteStyles.map((style) => (
								<button
									key={style.id}
									className={`dp-option-row ${active.style === style.id ? "is-active" : ""}`}
									onClick={() => applyStyle(style.id)}
									aria-pressed={active.style === style.id}
								>
									<span className="dp-option-row__label">{style.label}</span>
									<span className="dp-option-row__desc">
										{style.description}
									</span>
									{active.style === style.id && <CheckIcon />}
								</button>
							))}
						</div>
					</Section>
				</div>
			)}
		</div>
	);
}

// These small components are unchanged from before
function Section({ label, children }) {
	return (
		<div className="dp-section">
			<p className="dp-section__label">{label}</p>
			{children}
		</div>
	);
}

function Divider() {
	return <div className="dp-divider" aria-hidden="true" />;
}

function CheckIcon() {
	return (
		<svg
			className="dp-check"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M2.5 7L5.5 10L11.5 4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
