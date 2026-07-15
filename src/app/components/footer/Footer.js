import Link from "next/link";
import Image from "next/image";
import site from "../../../../config/site";
import { formatPhone } from "../../../../config/formatPhone";
import "./footer.scss";

const brandLogo = {
	src: "/logo/ecolawn.png",
	alt: "EcoLawn Solutions",
	width: 190,
	height: 139,
};

const mission = {
	prefix:
		"Reliable, straightforward lawn care for homeowners across North Texas. Ready to",
	linkText: "get a free quote",
	linkHref: "#quote",
	detail: "Locally owned and operated.",
};

const inclusion = null;

const quickLinks = {
	heading: "Quick Links",
	links: [
		{ label: "Services", href: "#services" },
		{ label: "About", href: "#about" },
	],
};

const contact = {
	heading: "Contact",
	phone: site.phone
		? { label: formatPhone(site.phone), href: `tel:${site.phone}` }
		: null,
	email: site.email
		? { label: site.email, href: `mailto:${site.email}` }
		: null,
	cta: { label: "Get a Quote", href: "#quote" },
};

const legalLinks = [{ label: "Privacy Policy", href: "/privacy-policy" }];

const copyright = {
	name: "EcoLawn Solutions",
	creditText: "Designed by Binswar",
	creditHref: "https://binswar.com",
};

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer__main">
				<div className="container footer__grid">
					{/* Mission + inclusion */}
					<div className="footer__col footer__col--mission">
						<Link
							href="/"
							className="footer__brand"
							aria-label={`${brandLogo.alt}, go to homepage`}
						>
							<Image
								src={brandLogo.src}
								alt=""
								width={brandLogo.width}
								height={brandLogo.height}
								className="footer__brand-img"
							/>
						</Link>

						<p className="footer__mission">
							{mission.prefix}{" "}
							<Link href={mission.linkHref} className="footer__mission-link">
								{mission.linkText}
							</Link>
							.
						</p>
						<p className="footer__mission-detail">{mission.detail}</p>

						{inclusion && (
							<div className="footer__inclusion">
								{inclusion.image && (
									<Image
										src={inclusion.image.src}
										alt={inclusion.image.alt}
										width={inclusion.image.width}
										height={inclusion.image.height}
										className="footer__inclusion-icon"
									/>
								)}
								<p className="footer__inclusion-text">{inclusion.statement}</p>
							</div>
						)}
					</div>

					{/* Quick links */}
					<div className="footer__col">
						<p className="footer__col-label">{quickLinks.heading}</p>
						<ul className="footer__nav-list" role="list">
							{quickLinks.links.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="footer__link">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className="footer__col">
						<p className="footer__col-label">{contact.heading}</p>
						<ul className="footer__nav-list" role="list">
							{contact.phone && (
								<li>
									<a href={contact.phone.href} className="footer__link">
										{contact.phone.label}
									</a>
								</li>
							)}
							{/* {contact.email && (
								<li>
									<a href={contact.email.href} className="footer__link">
										{contact.email.label}
									</a>
								</li>
							)} */}
							{/* {contact.cta && (
								<li>
									<a href={contact.cta.href} className="footer__link">
										{contact.cta.label}
									</a>
								</li>
							)} */}
						</ul>
					</div>
				</div>
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
								aria-label={`${copyright.creditText} (opens in a new tab)`}
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
