"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import "./gallery.scss";

const galleryConfig = {
	heading: "Our Work",
	subheading: "A look at some of the projects we are proud of.",
	layout: "grid",
	filterable: true,
	columns: 3,
	categories: [
		{ id: "all", label: "All" },
		{ id: "lawn", label: "Lawn Care" },
		{ id: "landscaping", label: "Landscaping" },
		{ id: "cleanup", label: "Cleanups" },
	],
	images: [
		{
			id: "g1",
			src: "/gallery/assets/1.jpg",
			alt: "Freshly mowed lawn with clean edges",
			category: "lawn",
			width: 800,
			height: 600,
		},
		{
			id: "g2",
			src: "/gallery/assets/2.jpg",
			alt: "Landscaped front yard with flower beds",
			category: "landscaping",
			width: 800,
			height: 600,
		},
		{
			id: "g3",
			src: "/gallery/assets/3.jpg",
			alt: "Fall cleanup with leaf removal",
			category: "cleanup",
			width: 800,
			height: 600,
		},
		{
			id: "g4",
			src: "/gallery/assets/4.jpg",
			alt: "Backyard lawn maintenance",
			category: "lawn",
			width: 800,
			height: 600,
		},
		{
			id: "g5",
			src: "/gallery/assets/5.jpg",
			alt: "Garden bed installation",
			category: "landscaping",
			width: 800,
			height: 600,
		},
		{
			id: "g6",
			src: "/gallery/assets/6.jpg",
			alt: "Spring cleanup and mulching",
			category: "cleanup",
			width: 800,
			height: 600,
		},
	],
	beforeAfter: [
		{
			id: "ba1",
			label: "Front Yard Transformation",
			before: {
				src: "/gallery/before-1.webp",
				alt: "Front yard before landscaping",
				width: 800,
				height: 600,
			},
			after: {
				src: "/gallery/after-1.webp",
				alt: "Front yard after landscaping",
				width: 800,
				height: 600,
			},
		},
		{
			id: "ba2",
			label: "Backyard Cleanup",
			before: {
				src: "/gallery/before-2.webp",
				alt: "Backyard before cleanup",
				width: 800,
				height: 600,
			},
			after: {
				src: "/gallery/after-2.webp",
				alt: "Backyard after cleanup",
				width: 800,
				height: 600,
			},
		},
	],
};

/* =========================
   LIGHTBOX
   ========================= */

function Lightbox({ image, onClose }) {
	const dialogRef = useRef(null);
	const closeRef = useRef(null);
	const triggerRef = useRef(null);

	useEffect(() => {
		triggerRef.current = document.activeElement;
		dialogRef.current?.showModal();
		requestAnimationFrame(() => closeRef.current?.focus());

		return () => {
			triggerRef.current?.focus();
		};
	}, []);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
				return;
			}
			if (e.key !== "Tab") return;
			e.preventDefault();
			closeRef.current?.focus();
		},
		[onClose],
	);

	if (!image) return null;

	return (
		<dialog
			ref={dialogRef}
			className="gallery__lightbox"
			onClick={(e) => e.target === e.currentTarget && onClose()}
			onKeyDown={handleKeyDown}
			aria-label={image.alt}
			aria-modal="true"
		>
			<div className="gallery__lightbox-inner">
				<button
					ref={closeRef}
					type="button"
					className="gallery__lightbox-close"
					onClick={onClose}
					aria-label="Close image"
				>
					✕
				</button>
				<figure className="gallery__lightbox-figure">
					<Image
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						style={{ width: "100%", height: "auto" }}
						priority
					/>
					{image.alt && (
						<figcaption className="gallery__lightbox-caption">
							{image.alt}
						</figcaption>
					)}
				</figure>
			</div>
		</dialog>
	);
}

/* =========================
   COMPONENT
   ========================= */

export default function Gallery() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [lightboxImage, setLightboxImage] = useState(null);
	const isBeforeAfter = galleryConfig.layout === "before-after";

	const filteredImages =
		activeCategory === "all"
			? galleryConfig.images
			: galleryConfig.images.filter((img) => img.category === activeCategory);

	return (
		<section className="block gallery" aria-labelledby="gallery-heading">
			<div className="block__content container">
				<div className="gallery__header">
					<h2 id="gallery-heading">{galleryConfig.heading}</h2>
					{galleryConfig.subheading && (
						<p className="gallery__sub">{galleryConfig.subheading}</p>
					)}
				</div>

				{/* Filter buttons */}
				{galleryConfig.filterable && !isBeforeAfter && (
					<div
						className="gallery__filters"
						role="group"
						aria-label="Filter gallery by category"
					>
						{galleryConfig.categories.map((cat) => (
							<button
								key={cat.id}
								type="button"
								aria-pressed={activeCategory === cat.id}
								className={`gallery__filter ${activeCategory === cat.id ? "is-active" : ""}`}
								onClick={() => setActiveCategory(cat.id)}
							>
								{cat.label}
							</button>
						))}
					</div>
				)}

				{/* Grid layout */}
				{!isBeforeAfter && (
					<div
						className="gallery__grid"
						style={{ "--gallery-cols": galleryConfig.columns }}
					>
						{filteredImages.map((image) => (
							<button
								key={image.id}
								type="button"
								className="gallery__item"
								onClick={() => setLightboxImage(image)}
								aria-label={`View larger: ${image.alt}`}
							>
								<Image
									src={image.src}
									alt=""
									width={image.width}
									height={image.height}
									sizes="(max-width: 768px) 90vw, 33vw"
									style={{ width: "100%", height: "auto" }}
								/>
								<div className="gallery__item-overlay" aria-hidden="true">
									<span>View</span>
								</div>
							</button>
						))}
					</div>
				)}

				{/* Before and after layout */}
				{isBeforeAfter && (
					<div className="gallery__before-after-list">
						{galleryConfig.beforeAfter.map((pair) => (
							<div key={pair.id} className="gallery__before-after">
								{pair.label && (
									<h3 className="gallery__before-after-label">{pair.label}</h3>
								)}
								<div className="gallery__before-after-grid">
									<figure className="gallery__before-after-item">
										<div
											className="gallery__before-after-badge"
											aria-hidden="true"
										>
											Before
										</div>
										<Image
											src={pair.before.src}
											alt={pair.before.alt}
											width={pair.before.width}
											height={pair.before.height}
											sizes="(max-width: 768px) 90vw, 45vw"
											style={{ width: "100%", height: "auto" }}
										/>
										<figcaption className="sr-only">
											Before: {pair.before.alt}
										</figcaption>
									</figure>
									<figure className="gallery__before-after-item">
										<div
											className="gallery__before-after-badge is-after"
											aria-hidden="true"
										>
											After
										</div>
										<Image
											src={pair.after.src}
											alt={pair.after.alt}
											width={pair.after.width}
											height={pair.after.height}
											sizes="(max-width: 768px) 90vw, 45vw"
											style={{ width: "100%", height: "auto" }}
										/>
										<figcaption className="sr-only">
											After: {pair.after.alt}
										</figcaption>
									</figure>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{lightboxImage && (
				<Lightbox
					image={lightboxImage}
					onClose={() => setLightboxImage(null)}
				/>
			)}
		</section>
	);
}
