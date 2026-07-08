import FadeUp from "../../ui/fadeUp/FadeUp";
import "./legalcontent.scss";

export default function LegalContent({ legalContentConfig }) {
	const {
		id = "legal-content",
		heading,
		lastUpdated,
		intro,
		sections,
	} = legalContentConfig;

	return (
		<main id="main-content">
			<section
				className="block legal-content"
				aria-labelledby={`${id}-heading`}
			>
				<div className="block__content container">
					<FadeUp as="div" className="legal-content__header">
						<h1 id={`${id}-heading`}>{heading}</h1>
						{lastUpdated && (
							<p className="legal-content__updated">
								Last updated: {lastUpdated}
							</p>
						)}
						{intro && (
							<p
								className="legal-content__intro"
								dangerouslySetInnerHTML={{ __html: intro }}
							/>
						)}
					</FadeUp>

					<div className="legal-content__sections">
						{sections.map((section, i) => (
							<FadeUp
								as="section"
								key={section.id}
								id={section.id}
								className="legal-content__section"
								delay={i * 50}
								aria-labelledby={`${section.id}-heading`}
							>
								<h2 id={`${section.id}-heading`}>{section.heading}</h2>

								{section.paragraphs?.map((p, j) => (
									<p
										key={j}
										className="legal-content__paragraph"
										dangerouslySetInnerHTML={{ __html: p }}
									/>
								))}

								{section.list && (
									<ul
										className={`legal-content__list ${section.listStyle === "check" ? "legal-content__list--check" : ""}`.trim()}
										role="list"
									>
										{section.list.map((item, j) => (
											<li key={j}>{item}</li>
										))}
									</ul>
								)}
							</FadeUp>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
