// components/sections/Hero/Hero.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import "./hero.scss";
import FadeUp from "../../ui/fadeUp/FadeUp";

/* ── Hook — reads data-style from html element ──────────────── */
// This watches for changes to data-style and returns the current value.
// When DesignPanel changes data-style, this hook updates automatically
// and the correct hero variant renders without any page reload.

function useStyle() {
	const [style, setStyle] = useState(() => {
		// lazy initializer — runs once on mount, reads the attribute directly
		// this avoids calling setState inside useEffect
		if (typeof window !== "undefined") {
			return (
				document.documentElement.getAttribute("data-style") || "split-contained"
			);
		}
		return "hero-background";
	});

	useEffect(() => {
		// only responsible for watching future changes
		const observer = new MutationObserver(() => {
			const current = document.documentElement.getAttribute("data-style");
			if (current) setStyle(current);
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-style"],
		});

		return () => observer.disconnect();
	}, []);

	return style;
}

/* ── Main component ─────────────────────────────────────────── */

export default function Hero({ heroConfig }) {
	const variant = useStyle(); // source of truth for which variant renders

	if (variant === "split-contained")
		return <HeroSplitContained config={heroConfig} />;
	if (variant === "split-rectangular")
		return <HeroSplitRectangular config={heroConfig} />;
	if (variant === "full-bleed") return <HeroFullBleed config={heroConfig} />;
	if (variant === "asymmetric") return <HeroAsymmetric config={heroConfig} />;
	if (variant === "centered") return <HeroCentered config={heroConfig} />;
	if (variant === "background-hero")
		return <HeroBackground config={heroConfig} />;

	return <HeroBackground config={heroConfig} />;
}

/* ── Variant A — Split Contained (circular portrait) ────────── */

function HeroSplitContained({ config }) {
	const img = config.images?.portrait;
	return (
		<section
			className="hero hero--split-contained block"
			aria-labelledby="hero-heading"
		>
			<div className="container hero__inner">
				<div className="hero__copy">
					<HeroCopy config={config} />
				</div>
				{img && (
					<div className="hero__media hero__media--circle">
						<Image
							src={img.src}
							alt={img.alt}
							width={500}
							height={500}
							priority
							sizes="(max-width: 768px) 90vw, 480px"
						/>
						{config.caption && <HeroCaption caption={config.caption} />}
					</div>
				)}
			</div>
		</section>
	);
}

/* ── Variant B — Split Rectangular (contained, no rounding) ─── */

function HeroSplitRectangular({ config }) {
	const img = config.images?.portrait;
	return (
		<section
			className="hero hero--split-rectangular block"
			aria-labelledby="hero-heading"
		>
			<div className="container hero__inner">
				<div className="hero__copy">
					<HeroCopy config={config} />
				</div>
				{img && (
					<div className="hero__media hero__media--rect">
						<Image
							src={img.src}
							alt={img.alt}
							width={480}
							height={600}
							priority
							sizes="(max-width: 768px) 90vw, 420px"
						/>
						{config.caption && <HeroCaption caption={config.caption} />}
					</div>
				)}
			</div>
		</section>
	);
}

/* ── Variant C — Full Bleed Half Split ──────────────────────── */
// Background/bleed image is decorative — alt="" is correct here.
// The section is labeled by the h1 heading via aria-labelledby.

function HeroFullBleed({ config }) {
	const img = config.images?.background || config.images?.portrait;
	return (
		<section className="hero hero--full-bleed" aria-labelledby="hero-heading">
			<div className="hero__inner">
				<div className="hero__bleed-copy">
					<div className="hero__bleed-copy-inner">
						<HeroCopy config={config} />
					</div>
				</div>
				{img && (
					<div className="hero__bleed-image">
						<Image
							src={img.src}
							alt=""
							fill
							priority
							sizes="50vw"
							style={{ objectFit: "cover", objectPosition: "center top" }}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

/* ── Variant D — Asymmetric Rectangles ──────────────────────── */

function HeroAsymmetric({ config }) {
	const img = config.images?.portrait;
	return (
		<section
			className="hero hero--asymmetric block"
			aria-labelledby="hero-heading"
		>
			<div className="container hero__inner">
				{img && (
					<div className="hero__media hero__media--landscape">
						<Image
							src={img.src}
							alt={img.alt}
							width={560}
							height={380}
							priority
							sizes="(max-width: 768px) 90vw, 560px"
							style={{ objectFit: "cover", width: "100%", height: "100%" }}
						/>
					</div>
				)}
				<div className="hero__copy hero__copy--tall">
					<HeroCopy config={config} />
					{config.caption && <HeroCaption caption={config.caption} />}
				</div>
			</div>
		</section>
	);
}

/* ── Variant E — Centered ───────────────────────────────────── */

function HeroCentered({ config }) {
	const img = config.images?.landscape;
	return (
		<section
			className="hero hero--centered block"
			aria-labelledby="hero-heading"
		>
			<div className="container hero__inner">
				<div className="hero__copy hero__copy--centered">
					<HeroCopy config={config} centered />
				</div>
				{img && (
					<div className="hero__media hero__media--wide">
						<Image
							src={img.src}
							alt={img.alt}
							width={900}
							height={480}
							priority
							sizes="(max-width: 768px) 100vw, 900px"
							style={{ objectFit: "cover", width: "100%", height: "100%" }}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

/* ── Variant F — Background Hero ────────────────────────────── */
// Full-width background image is decorative — alt="" is correct here.
// The section is labeled by the h1 heading via aria-labelledby.

function HeroBackground({ config }) {
	const img = config.images?.landscape || config.images?.background;
	return (
		<section className="hero hero--background" aria-labelledby="hero-heading">
			{img && (
				<div className="hero__bg-image">
					<Image
						src={img.src}
						alt=""
						fill
						priority
						sizes="100vw"
						style={{ objectFit: "cover", objectPosition: "center" }}
					/>
				</div>
			)}
			<div className="hero__bg-overlay" aria-hidden="true" />
			<div className="container hero__bg-content">
				<div className="hero__copy hero__copy--light">
					<HeroCopy config={config} />
				</div>
			</div>
		</section>
	);
}

/* ── Shared sub-components ──────────────────────────────────── */

// HeroCopy renders the heading, eyebrow, subheading, and CTA buttons.
// The h1 carries id="hero-heading" so every variant's section can
// reference it via aria-labelledby="hero-heading".

function HeroCopy({ config, centered = false }) {
	return (
		<>
			{config.eyebrow && (
				<FadeUp as="p" delay={0} className="hero__eyebrow label">
					{config.eyebrow}
				</FadeUp>
			)}

			<FadeUp
				as="h1"
				delay={config.eyebrow ? 100 : 0}
				className="hero__heading"
				id="hero-heading"
			>
				{config.heading}
			</FadeUp>

			{config.subheading && (
				<FadeUp
					as="p"
					delay={config.eyebrow ? 200 : 100}
					className="hero__subheading lead"
				>
					{config.subheading}
				</FadeUp>
			)}

			{config.cta && (
				<FadeUp
					as="div"
					delay={config.eyebrow ? 300 : 200}
					className={`hero__actions ${centered ? "hero__actions--centered" : ""}`}
				>
					<Button
						text={config.cta.text}
						href={config.cta.href}
						variant={config.cta.variant ?? "primary"}
						external={config.cta.external ?? false}
					/>
					{config.ctaSecondary && (
						<Button
							text={config.ctaSecondary.text}
							href={config.ctaSecondary.href}
							variant={config.ctaSecondary.variant ?? "secondary"}
							external={config.ctaSecondary.external ?? false}
						/>
					)}
				</FadeUp>
			)}
		</>
	);
}

// HeroCaption renders the therapist name and title below portrait images.

function HeroCaption({ caption }) {
	return (
		<div className="hero__caption">
			{caption.name && <p className="hero__caption-name">{caption.name}</p>}
			{caption.title && <p className="hero__caption-title">{caption.title}</p>}
		</div>
	);
}
