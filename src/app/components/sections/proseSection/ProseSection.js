import "./prosesection.scss";

/* =========================
   PROSE SECTION CONFIGURATION
   Edit this section per project
   ========================= */

// const proseSectionConfig = {
// 	heading: "Optional section heading", // or null
// 	paragraphs: [
// 		"First paragraph of body text.",
// 		"Second paragraph of body text.",
// 	],
// 	align: "left", // "left" | "center"
// };

/* =========================
   COMPONENT
   ========================= */

export default function ProseSection({ proseSectionConfig }) {
	const {
		id = "heading",
		heading,
		paragraphs,
		align = "left",
		classNames = "",
	} = proseSectionConfig;
	const centered = align === "center";

	return (
		<section
			className={`block prose-section ${centered ? "prose-section--centered" : ""} ${classNames}`.trim()}
			aria-labelledby={id ? `prose-section-${id}` : undefined}
		>
			<div className="container">
				<div className="prose">
					{heading && (
						<h2 id={`prose-section-${id}`} className="prose-section__heading">
							{heading}
						</h2>
					)}
					{paragraphs.map((text, i) => (
						<p key={i}>{text}</p>
					))}
				</div>
			</div>
		</section>
	);
}
