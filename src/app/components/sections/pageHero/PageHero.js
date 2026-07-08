import Image from "next/image";
import Button from "../../ui/Button";
import "./pagehero.scss";

export default function PageHero({ pageHeroConfig }) {
	const centered = pageHeroConfig.align === "center";

	return (
		<section
			className={`block page-hero ${centered ? "page-hero--centered" : ""}`}
			aria-labelledby="page-hero-heading"
		>
			<div className="block__content container">
				<div
					className={`page-hero__layout ${pageHeroConfig.image ? "has-image" : ""} ${pageHeroConfig.illustration ? "has-illustration" : ""}`}
				>
					{/* Copy */}
					<div className="page-hero__copy">
						{pageHeroConfig.eyebrow && (
							<p className="page-hero__eyebrow label">
								{pageHeroConfig.eyebrow}
							</p>
						)}
						<h1 id="page-hero-heading">{pageHeroConfig.heading}</h1>
						{pageHeroConfig.subheading && (
							<p className="lead">{pageHeroConfig.subheading}</p>
						)}
						{pageHeroConfig.cta && (
							<div className="page-hero__cta">
								<Button
									text={pageHeroConfig.cta.text}
									href={pageHeroConfig.cta.href}
									variant={pageHeroConfig.cta.variant ?? "primary"}
									external={pageHeroConfig.cta.external ?? false}
								/>
							</div>
						)}
					</div>

					{/* Optional image */}
					{pageHeroConfig.image && (
						<figure className="page-hero__media">
							<Image
								src={pageHeroConfig.image.src}
								alt={pageHeroConfig.image.alt}
								width={pageHeroConfig.image.width}
								height={pageHeroConfig.image.height}
								priority
								sizes="(max-width: 768px) min(90vw, 400px), 420px"
							/>
						</figure>
					)}

					{pageHeroConfig.illustration && !pageHeroConfig.image && (
						<figure className="page-hero__media" aria-hidden="true">
							{pageHeroConfig.illustration}
						</figure>
					)}
				</div>
			</div>
		</section>
	);
}
