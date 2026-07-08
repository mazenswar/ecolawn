"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./footerpulse.scss";

/* =========================
   FOOTER CONFIGURATION
   ========================= */

const footerConfig = {
	brand: {
		label: "Binswar",
		tagline: "The meaningful web presence your practice deserves",
	},
	navLinks: [
		{ label: "Home", href: "/" },
		{ label: "Services", href: "/services" },
		{ label: "About", href: "/about" },
		{ label: "Blog", href: "/blog" },
	],
	cta: { text: "Let's talk", href: "/contact" },
	copyrightName: "Binswar LLC",
};

/* =========================
   COMPONENT
   ========================= */

export default function FooterPulse() {
	const pathname = usePathname();
	const year = new Date().getFullYear();

	return (
		<footer className="pulse-footer" role="contentinfo">
			<div className="pulse-footer__inner container">
				<div className="pulse-footer__top">
					<div className="pulse-footer__brand">
						<p className="pulse-footer__brand-name">
							{footerConfig.brand.label}
						</p>
						{footerConfig.brand.tagline && (
							<p className="pulse-footer__tagline">
								{footerConfig.brand.tagline}
							</p>
						)}
					</div>

					<nav className="pulse-footer__nav" aria-label="Footer">
						<ul className="pulse-footer__nav-list" role="list">
							{footerConfig.navLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="pulse-footer__link"
										onClick={(e) => {
											if (pathname === link.href) {
												e.preventDefault();
												window.scrollTo({ top: 0, behavior: "smooth" });
											}
										}}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{footerConfig.cta && (
						<div className="pulse-footer__cta-wrap">
							<Link href={footerConfig.cta.href} className="pulse-footer__cta">
								{footerConfig.cta.text}
								<svg
									className="pulse-footer__cta-arrow"
									viewBox="0 0 16 16"
									aria-hidden="true"
								>
									<path
										d="M3 8h10M9 4l4 4-4 4"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
						</div>
					)}
				</div>

				<div className="pulse-footer__bottom">
					<p className="pulse-footer__copy">
						© {year} {footerConfig.copyrightName}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
