import Image from "next/image";
import Link from "next/link";
import "./logobar.scss";

// const logoBarConfig = {
//   heading: "Accepting most major insurance", // optional, remove or set to null to hide
//   logos: [
//     { src: "/logos/aetna.png", alt: "Aetna", href: null },
//     { src: "/logos/bcbs.png", alt: "Blue Cross Blue Shield", href: null },
//     { src: "/logos/cigna.png", alt: "Cigna", href: null },
//     { src: "/logos/united.png", alt: "United Healthcare", href: null },
//     { src: "/logos/psychology-today.png", alt: "Psychology Today", href: "https://psychologytoday.com" },
//     { src: "/logos/zencare.png", alt: "Zencare", href: "https://zencare.co" },
//   ],
// }

export default function LogoBar({ logoBarConfig }) {
	if (!logoBarConfig?.logos?.length) return null;

	return (
		<section
			className="logo-bar block"
			aria-label={logoBarConfig.heading || "Partner logos"}
		>
			<div className="container logo-bar__inner">
				{logoBarConfig.heading && (
					<p className="logo-bar__heading label">{logoBarConfig.heading}</p>
				)}
				<ul className="logo-bar__list" role="list">
					{logoBarConfig.logos.map((logo) => (
						<li key={logo.alt} className="logo-bar__item">
							<LogoItem logo={logo} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

function LogoItem({ logo }) {
	// No link — image carries the alt text directly
	if (!logo.href) {
		return (
			<Image
				src={logo.src}
				alt={logo.alt}
				width={logo.width || 120}
				height={44}
				className="logo-bar__img"
				style={{ width: "auto", height: "44px" }}
			/>
		);
	}

	// Image inside a link — link carries the label, image is decorative
	const image = (
		<Image
			src={logo.src}
			alt=""
			width={logo.width || 120}
			height={44}
			className="logo-bar__img"
			style={{ width: "auto", height: "44px" }}
		/>
	);

	// External link — bare a tag with new tab notice
	if (logo.href.startsWith("http")) {
		return (
			<a
				href={logo.href}
				className="logo-bar__link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${logo.alt} (opens in a new tab)`}
			>
				{image}
			</a>
		);
	}

	// Internal link — Next Link
	return (
		<Link href={logo.href} className="logo-bar__link" aria-label={logo.alt}>
			{image}
		</Link>
	);
}
