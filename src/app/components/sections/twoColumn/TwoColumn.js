import Image from "next/image";
import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./twocolumn.scss";

export default function TwoColumn({ twoColumnConfig }) {
	const {
		id = "two-col",
		eyebrow,
		heading,
		subheading,
		paragraphs,
		list,
		cta,
		image,
		imagePosition = "right",
		classNames = "",
	} = twoColumnConfig;

	const imageFirst = imagePosition === "left";

	return (
		<section
			className={`block two-col-section ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<div
					className={`two-col-section__layout ${imageFirst ? "image-first" : ""} ${!image ? "no-image" : ""} ${list?.length > 0 && !image ? "has-list" : ""}`.trim()}
				>
					<FadeUp as="div" className="two-col-section__copy" delay={0}>
						{eyebrow && (
							<p className="label two-col-section__eyebrow">{eyebrow}</p>
						)}
						<h2 id={`${id}-heading`}>{heading}</h2>
						{subheading && <p className="two-col-section__sub">{subheading}</p>}
						{paragraphs?.map((para, i) => (
							<p key={i}>{para}</p>
						))}
						{list?.length > 0 && image && (
							<ul className="two-col-section__list">
								{list.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						)}
						{cta && (
							<div className="two-col-section__actions">
								<Button
									text={cta.text}
									href={cta.href}
									variant={cta.variant ?? "secondary"}
									external={cta.external ?? false}
								/>
							</div>
						)}
					</FadeUp>

					{list?.length > 0 && !image && (
						<FadeUp as="ul" className="two-col-section__list" delay={150}>
							{list.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</FadeUp>
					)}

					{image && (
						<FadeUp as="figure" className="two-col-section__media" delay={150}>
							<Image
								src={image.src}
								alt={image.alt}
								width={image.width}
								height={image.height}
								sizes="(max-width: 768px) 92vw, 420px"
							/>
						</FadeUp>
					)}
				</div>
			</div>
		</section>
	);
}
