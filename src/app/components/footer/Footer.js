// components/footer/Footer.js
import Link from "next/link";
import "./footer.scss";

/* =========================
   FOOTER CONFIGURATION
   ========================= */

const contact = {
	// phone: "(555) 123-4567",
	email: "mazen@binswar.com",
	// address: "123 Main St, Suite 4, New York, NY 10001",
	// virtual: "Serving clients across New Jersey & New York",
};

const badges = [
	// {
	// 	label: "Psychology Today",
	// 	href: "https://psychologytoday.com",
	// 	src: "/badges/psychology-today.png",
	// },
	// { label: "Zencare", href: "https://zencare.co", src: "/badges/zencare.png" },
];

const social = [
	{
		label: "Instagram",
		href: "https://instagram.com/yourhandle",
		icon: "instagram",
	},
	{
		label: "LinkedIn",
		href: "https://linkedin.com/in/yourprofile",
		icon: "linkedin",
	},
	{
		label: "Facebook",
		href: "https://facebook.com/yourpage",
		icon: "facebook",
	},
];

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Services", href: "/services" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

const legalLinks = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms & Conditions", href: "/terms" },
	// { label: "Good Faith Estimate", href: "/good-faith-estimate" },
];

const seoLine = null;

const copyright = {
	name: "Binswar LLC",
	// creditText: "Site by Binswar",
	// creditHref: "https://binswar.com",
};

/* =========================
   SOCIAL ICONS
   ========================= */

function SocialIcon({ icon }) {
	if (icon === "instagram")
		return (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
				<circle cx="12" cy="12" r="4" />
				<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
			</svg>
		);
	if (icon === "linkedin")
		return (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
				<rect x="2" y="9" width="4" height="12" />
				<circle cx="4" cy="4" r="2" />
			</svg>
		);
	if (icon === "facebook")
		return (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
			</svg>
		);
	return null;
}

/* =========================
   COMPONENT
   ========================= */

export default function Footer() {
	const year = new Date().getFullYear();
	const hasContact =
		contact.phone || contact.email || contact.address || contact.virtual;
	const hasBadges = badges.length > 0;
	const hasSocial = social.length > 0;

	return (
		<footer className="footer">
			<div className="footer__main">
				<div className="container footer__grid">
					{/* Col 1 — Contact info */}
					{hasContact && (
						<div className="footer__col">
							<p className="footer__col-label">Contact</p>
							<ul className="footer__contact-list" role="list">
								{contact.phone && (
									<li>
										<a
											href={`tel:${contact.phone.replace(/\D/g, "")}`}
											className="footer__link"
										>
											{contact.phone}
										</a>
									</li>
								)}
								{contact.email && (
									<li>
										<a
											href={`mailto:${contact.email}`}
											className="footer__link"
										>
											{contact.email}
										</a>
									</li>
								)}
								{contact.address && (
									<li className="footer__address">{contact.address}</li>
								)}
								{contact.virtual && (
									<li className="footer__virtual">{contact.virtual}</li>
								)}
							</ul>
						</div>
					)}

					{/* Col 2 — Nav links */}
					<div className="footer__col">
						<p className="footer__col-label">Navigate</p>
						<ul className="footer__nav-list" role="list">
							{navLinks.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="footer__link">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Col 3 — Badges + Social */}
					<div className="footer__col">
						{hasBadges && (
							<>
								<p className="footer__col-label">Find me on</p>
								<ul className="footer__badges" role="list">
									{badges.map((badge) => (
										<li key={badge.href}>
											<a
												href={badge.href}
												className="footer__badge-link"
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${badge.label} (opens in a new tab)`}
											>
												{badge.src ? (
													<img
														src={badge.src}
														alt=""
														className="footer__badge-img"
														width={120}
														height={40}
													/>
												) : (
													<span
														className="footer__badge-text"
														aria-hidden="true"
													>
														{badge.label}
													</span>
												)}
											</a>
										</li>
									))}
								</ul>
							</>
						)}

						{hasSocial && (
							<>
								<p
									className="footer__col-label"
									style={{ marginTop: hasBadges ? "var(--space-6)" : 0 }}
								>
									Follow
								</p>
								<ul className="footer__social" role="list">
									{social.map((item) => (
										<li key={item.href}>
											<a
												href={item.href}
												className="footer__social-link"
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${item.label} (opens in a new tab)`}
											>
												<SocialIcon icon={item.icon} />
											</a>
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>

				{seoLine && (
					<div className="container">
						<p className="footer__seo-line">{seoLine}</p>
					</div>
				)}
			</div>

			{/* Bottom bar */}
			<div className="footer__bottombar" aria-label="Legal and copyright">
				<div className="container footer__bottombar-inner">
					<p className="footer__copy">
						© {year} {copyright.name}. All rights reserved.{" "}
						{copyright.creditHref && (
							<a
								href={copyright.creditHref}
								className="footer__link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Site by Binswar (opens in a new tab)"
							>
								{copyright.creditText}
							</a>
						)}
					</p>
					{legalLinks.length > 0 && (
						<ul className="footer__legal" role="list">
							{legalLinks.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="footer__link">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</footer>
	);
}
