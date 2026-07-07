"use client";
import { useState, useMemo, useEffect } from "react";
import "./faq.scss";
import FadeUp from "../../ui/fadeUp/FadeUp";

function useDebounced(value, ms = 200) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setV(value), ms);
		return () => clearTimeout(t);
	}, [value, ms]);
	return v;
}

export default function FAQ({ faqConfig }) {
	const [query, setQuery] = useState("");
	const debounced = useDebounced(query, 200);
	const {
		heading,
		subheading,
		contact,
		searchable,
		showToc,
		groups,
		id = "faq",
	} = faqConfig;

	const filteredGroups = useMemo(() => {
		const q = debounced.trim().toLowerCase();
		if (!q) return groups;
		return groups
			.map((g) => {
				const items = g.items.filter((item) => {
					const hay =
						`${item.q} ${item.a} ${(item.tags || []).join(" ")}`.toLowerCase();
					return hay.includes(q);
				});
				return items.length ? { ...g, items } : null;
			})
			.filter(Boolean);
	}, [debounced, groups]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const hash = window.location.hash.replace("#", "");
		if (!hash) return;
		const el = document.getElementById(hash);
		if (el?.tagName === "DETAILS") {
			el.setAttribute("open", "");
			setTimeout(
				() => el.scrollIntoView({ behavior: "smooth", block: "start" }),
				60,
			);
		}
	}, []);

	return (
		<section className="block faq" aria-labelledby={`${id}-heading`} id={id}>
			<div className="block__content container">
				<FadeUp as="div" className="faq__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && (
						<p className="faq__sub">
							{subheading}{" "}
							{contact && (
								<a href={contact.href} className="link">
									{contact.text}
								</a>
							)}
						</p>
					)}
					{searchable && (
						<div className="faq__search">
							<label htmlFor="faq-search" className="sr-only">
								Search frequently asked questions
							</label>
							<input
								id="faq-search"
								type="search"
								placeholder="Search questions..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
						</div>
					)}
				</FadeUp>

				<div className={`faq__layout ${showToc ? "has-toc" : ""}`}>
					{showToc && (
						<nav className="faq__toc" aria-label="FAQ sections">
							<p className="faq__toc-title">On this page</p>
							<ul role="list">
								{groups.map((g) => (
									<li key={g.id}>
										<a href={`#${g.id}`} className="faq__toc-link">
											{g.title}
										</a>
									</li>
								))}
							</ul>
						</nav>
					)}

					<div className="faq__content">
						{filteredGroups.length === 0 ? (
							<div className="faq__empty">
								<p>
									No results for <strong>{debounced}</strong>. Try a different
									search term.
								</p>
								<button className="btnGhost" onClick={() => setQuery("")}>
									Clear search
								</button>
							</div>
						) : (
							filteredGroups.map((group) => (
								<section
									key={group.id}
									id={group.id}
									className="faq__group"
									aria-labelledby={`${group.id}-title`}
								>
									<h3 id={`${group.id}-title`} className="faq__group-title">
										{group.title}
									</h3>
									<div className="faq__accordion">
										{group.items.map((item) => (
											<details key={item.id} id={item.id} className="faq__item">
												<summary className="faq__question">
													<span>{item.q}</span>
													<span className="faq__icon" aria-hidden="true" />
												</summary>
												<div
													className="faq__answer"
													dangerouslySetInnerHTML={{ __html: item.a }}
												/>
											</details>
										))}
									</div>
								</section>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
