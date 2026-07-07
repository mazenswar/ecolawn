// components/sections/Testimonials/Testimonials.js
import "./testimonials.scss";

/* =========================
   TESTIMONIALS CONFIGURATION
   Edit this section per project
   ========================= */

const testimonialsConfig = {
	heading: "What our clients say",
	subheading: null,
	layout: "grid", // "grid" or "featured"
	testimonials: [
		{
			id: "t1",
			quote:
				"Working with this team completely transformed how I show up online. My website finally feels like me.",
			name: "Sarah M.",
			title: "Licensed Therapist, Private Practice",
			rating: 5,
		},
		{
			id: "t2",
			quote:
				"I had no idea where to start with SEO or Google Analytics. They made it simple and I actually understand my data now.",
			name: "James K.",
			title: "Clinical Psychologist",
			rating: 5,
		},
		{
			id: "t3",
			quote:
				"The process was smooth, collaborative, and they delivered exactly what they promised. I have already referred two colleagues.",
			name: "Priya R.",
			title: "Marriage and Family Therapist",
			rating: 5,
		},
	],
};

/* =========================
   HELPERS
   ========================= */

function StarRating({ count = 5 }) {
	return (
		<div className="testimonial__stars" aria-label={`${count} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<span
					key={i}
					className={`testimonial__star ${i < count ? "is-filled" : ""}`}
					aria-hidden="true"
				>
					★
				</span>
			))}
		</div>
	);
}

/* =========================
   COMPONENT
   ========================= */

export default function Testimonials() {
	const { testimonials, layout } = testimonialsConfig;
	const featured = layout === "featured" ? testimonials[0] : null;
	const rest = layout === "featured" ? testimonials.slice(1) : testimonials;

	return (
		<section
			className="block blockTint testimonials"
			aria-labelledby="testimonials-heading"
		>
			<div className="block__content container">
				{/* Header */}
				<div className="testimonials__header">
					<h2 id="testimonials-heading">{testimonialsConfig.heading}</h2>
					{testimonialsConfig.subheading && (
						<p className="testimonials__sub">{testimonialsConfig.subheading}</p>
					)}
				</div>

				{/* Featured layout */}
				{layout === "featured" && featured && (
					<blockquote className="testimonial testimonial--featured">
						{featured.rating && <StarRating count={featured.rating} />}
						<p className="testimonial__quote">&ldquo;{featured.quote}&rdquo;</p>
						<footer className="testimonial__footer">
							<p className="testimonial__name">{featured.name}</p>
							{featured.title && (
								<p className="testimonial__title">{featured.title}</p>
							)}
						</footer>
					</blockquote>
				)}

				{/* Grid */}
				<div
					className={`testimonials__grid ${layout === "featured" ? "is-secondary" : ""}`}
				>
					{rest.map((t) => (
						<blockquote key={t.id} className="testimonial">
							{t.rating && <StarRating count={t.rating} />}
							<p className="testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
							<footer className="testimonial__footer">
								<p className="testimonial__name">{t.name}</p>
								{t.title && <p className="testimonial__title">{t.title}</p>}
							</footer>
						</blockquote>
					))}
				</div>
			</div>
		</section>
	);
}
