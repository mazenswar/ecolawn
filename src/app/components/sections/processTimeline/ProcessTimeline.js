// components/sections/ProcessTimeline/ProcessTimeline.js
"use client";
import { useEffect, useRef, useState } from "react";
import "./processtimeline.scss";

/* =========================
   CONFIG EXAMPLE
   ========================= */

// const processConfig = {
// 	eyebrow: "How it works",
// 	heading: "From first conversation to launch.",
// 	subheading: "Four phases, clearly defined, so you always know what happens next.",
// 	phases: [
// 		{
// 			id: "phase-1",
// 			number: "01",
// 			title: "Getting Started",
// 			description: "A short call to confirm fit, a signed agreement, and a quick questionnaire so we have everything we need to begin.",
// 			tasks: ["Book a free call", "Sign the agreement", "Submit the questionnaire"],
// 		},
// 	],
// };

export default function ProcessTimeline({ processConfig }) {
	const {
		eyebrow,
		heading,
		subheading,
		phases,
		classNames = "",
	} = processConfig;
	const containerRef = useRef(null);
	const [activeIds, setActiveIds] = useState(new Set());

	useEffect(() => {
		const nodes = containerRef.current?.querySelectorAll("[data-phase-id]");
		if (!nodes || nodes.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				setActiveIds((prev) => {
					const next = new Set(prev);
					entries.forEach((entry) => {
						const id = entry.target.getAttribute("data-phase-id");
						if (entry.isIntersecting) {
							next.add(id);
						} else {
							next.delete(id); // ← this line is the entire fix
						}
					});
					return next;
				});
			},
			{ rootMargin: "-15% 0px -35% 0px", threshold: 0 },
		);

		nodes.forEach((node) => observer.observe(node));
		return () => observer.disconnect();
	}, []);

	return (
		<section
			className={`process-timeline block ${classNames}`.trim()}
			aria-labelledby="process-heading"
		>
			<div className="container">
				<div className="process-timeline__intro">
					{eyebrow && (
						<p className="process-timeline__eyebrow label">{eyebrow}</p>
					)}
					<h2 id="process-heading" className="process-timeline__heading">
						{heading}
					</h2>
					{subheading && (
						<p className="process-timeline__subheading lead">{subheading}</p>
					)}
				</div>

				<div className="process-timeline__list" ref={containerRef}>
					<div className="process-timeline__line" aria-hidden="true" />

					{phases.map((phase, index) => {
						const isActive = activeIds.has(phase.id);
						return (
							<div
								key={phase.id}
								data-phase-id={phase.id}
								className={`process-phase ${isActive ? "is-active" : ""}`}
							>
								<div className="process-phase__marker" aria-hidden="true" />

								<div className="process-phase__content">
									<span className="process-phase__number" aria-hidden="true">
										{phase.number}
									</span>
									<h3 className="process-phase__title">{phase.title}</h3>
									<p className="process-phase__description">
										{phase.description}
									</p>

									{phase.tasks?.length > 0 && (
										<ul className="process-phase__tasks" role="list">
											{phase.tasks.map((task) => (
												<li key={task} className="process-phase__task">
													{task}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
