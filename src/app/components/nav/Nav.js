"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import site from "../../../../config/site";
import "./nav.scss";

/* =========================
  NAV CONFIGURATION
   ========================= */

const logo = {
	src: "/logo/ecolawn.png",
	alt: "Eco Lawn Solutions Logo",
	width: 190,
	height: 139,
};

const links = [
	{
		label: "Lawn Maintenance",
		href: "#services",
	},
	{
		label: "Moisture Control",
		href: "#moisture-control",
	},
	{
		label: "About",
		href: "#about",
	},
];

const cta = site.phone
	? {
			text: "Call Now",
			href: `tel:${site.phone}`,
			variant: "primary",
		}
	: {
			text: "Get a Quote",
			href: "#quote",
			variant: "primary",
		};

const homeHref = "/";

/* =========================
  COMPONENT
   ========================= */

export default function Nav() {
	const [openMobile, setOpenMobile] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);
	const menuId = useId();
	const burgerRef = useRef(null);

	useEffect(() => {
		const cls = "nav-open";
		const root = document.documentElement;
		if (openMobile) root.classList.add(cls);
		else root.classList.remove(cls);
		return () => root.classList.remove(cls);
	}, [openMobile]);

	useEffect(() => {
		const handler = () => setOpenMobile(false);
		window.addEventListener("hashchange", handler);
		return () => window.removeEventListener("hashchange", handler);
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		if (!openDropdown) return;
		const handler = (e) => {
			if (!e.target.closest(".nav__dropdownWrap")) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [openDropdown]);

	useEffect(() => {
		if (!openMobile) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				setOpenMobile(false);
				setOpenDropdown(null);
				requestAnimationFrame(() => burgerRef.current?.focus());
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [openMobile]);

	// Close desktop dropdown on Escape
	useEffect(() => {
		if (!openDropdown) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				setOpenDropdown(null);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [openDropdown]);

	const handleLinkClick = () => {
		setOpenMobile(false);
		setOpenDropdown(null);
	};

	const toggleBurger = () => {
		setOpenDropdown(null);
		setOpenMobile((v) => !v);
	};

	return (
		<header className={`nav ${openMobile ? "is-open" : ""}`}>
			<div className="container nav__inner">
				<Link
					href={homeHref}
					className="nav__logo"
					aria-label={`${logo?.alt ?? "Home"}, go to homepage`}
					onClick={handleLinkClick}
				>
					{logo ? (
						<Image
							src={logo.src}
							alt=""
							width={logo.width ?? 140}
							height={logo.height ?? 40}
							priority
						/>
					) : (
						<span className="nav__logo-text">Logo</span>
					)}
				</Link>

				<button
					ref={burgerRef}
					className="nav__burger"
					aria-expanded={openMobile}
					aria-controls={menuId}
					aria-label={
						openMobile ? "Close navigation menu" : "Open navigation menu"
					}
					onClick={toggleBurger}
					type="button"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</button>

				<nav id={menuId} className="nav__panel" aria-label="Primary navigation">
					<ul className="nav__list" role="list">
						{links.map((item) => {
							const isOpen = openDropdown === item.label;
							const dropdownId = `dropdown-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
							return (
								<li
									key={item.label}
									className={`nav__item ${isOpen ? "has-open" : ""}`}
								>
									{item.items ? (
										<div className="nav__dropdownWrap">
											<button
												type="button"
												className="nav__toplink"
												aria-haspopup="true"
												aria-expanded={isOpen}
												aria-controls={dropdownId}
												onClick={() =>
													setOpenDropdown((cur) =>
														cur === item.label ? null : item.label,
													)
												}
											>
												{item.label}
												<svg
													className="nav__caret"
													viewBox="0 0 20 20"
													aria-hidden="true"
													focusable="false"
												>
													<path
														d="M5 7l5 6 5-6"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
													/>
												</svg>
											</button>
											<div
												id={dropdownId}
												className={`nav__dropdown ${isOpen ? "is-open" : ""}`}
											>
												{item.items.map((sub) => (
													<Link
														key={sub.href}
														href={sub.href}
														className="nav__dropdownLink"
														onClick={handleLinkClick}
													>
														{sub.label}
													</Link>
												))}
											</div>
										</div>
									) : (
										<Link
											href={item.href}
											className="nav__toplink"
											onClick={handleLinkClick}
										>
											{item.label}
										</Link>
									)}
								</li>
							);
						})}
					</ul>

					{cta && (
						<div className="nav__cta">
							<Button
								text={cta.text}
								href={cta.href}
								variant={cta.variant ?? "primary"}
								external={cta.external ?? false}
								trackEvent={cta.trackEvent}
							/>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
