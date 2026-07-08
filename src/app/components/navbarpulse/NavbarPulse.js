"use client";

import { useState, useEffect, useRef, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import "./navbarpulse.scss";

/* =========================
   NAV CONFIGURATION
   ========================= */

const navConfig = {
	brand: {
		label: "Binswar",
		href: "/",
		logoSrc: "/logo/binswar-white-b.png",
		logoWidth: 130,
		logoHeight: 35,
	},
	items: [
		{ id: "home", label: "Home", href: "/" },
		{
			id: "services",
			label: "Services",
			href: "/services",
		},
		{
			id: "case-studies",
			label: "Case Studies",
			items: [
				{
					id: "calm",
					label: "CALM Therapy",
					href: "/case-studies/calm-therapy",
				},
			],
		},
		{ id: "about", label: "About", href: "/about" },
		{ id: "blog", label: "Blog", href: "/blog" },
	],
	cta: { text: "Let's talk", href: "/contact", variant: "primary" },
};

/* =========================
   COMPONENT
   ========================= */

export default function NavbarPulse() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [lineStyles, setLineStyles] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});
	const navListRef = useRef(null);
	const burgerRef = useRef(null);
	const closeTimerRef = useRef(null);
	const menuId = useId();

	function isDesktop() {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(min-width: 1024px)").matches;
	}

	function isItemActive(item) {
		if (item.href) {
			if (item.href === "/") return pathname === "/";
			return pathname === item.href || pathname.startsWith(item.href + "/");
		}
		if (item.items) {
			return item.items.some((child) => pathname.startsWith(child.href));
		}
		return false;
	}

	function updateLinePosition(targetId) {
		if (!navListRef.current) return;

		const selector = targetId
			? `[data-nav-id="${targetId}"]`
			: ".pulse-toplink.is-active, .pulse-link.is-active";

		const target = navListRef.current.querySelector(selector);

		if (target) {
			const wrapRect = navListRef.current.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();

			setLineStyles({
				left: targetRect.left - wrapRect.left,
				width: targetRect.width,
				opacity: 1,
			});
		} else {
			setLineStyles((prev) => ({ ...prev, opacity: 0 }));
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => updateLinePosition(null), 40);
		return () => clearTimeout(timer);
	}, [pathname]);

	useEffect(() => {
		function handleResize() {
			updateLinePosition(null);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		function onKey(e) {
			if (e.key === "Escape") {
				closeAllMenus();
				burgerRef.current?.focus();
			}
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [isOpen]);

	function cancelCloseDropdown() {
		if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
	}

	function scheduleCloseDropdown() {
		closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
	}

	function handleTopHover(item) {
		if (!isDesktop()) return;

		cancelCloseDropdown();
		if (item.items) {
			setActiveDropdown(item.id);
		} else {
			setActiveDropdown(null);
		}
		updateLinePosition(item.id);
	}

	function handleNavLeave() {
		if (!isDesktop()) return;
		scheduleCloseDropdown();
		updateLinePosition(null);
	}

	function handleToplinkClick(item) {
		if (isDesktop()) return;
		if (!item.items) return;
		setActiveDropdown((prev) => (prev === item.id ? null : item.id));
	}

	function closeAllMenus() {
		setIsOpen(false);
		setActiveDropdown(null);
	}

	return (
		<header className="pulse-nav-container">
			<div className="pulse-nav-inner">
				<Link
					href={navConfig.brand.href}
					className="pulse-brand"
					aria-label={`${navConfig.brand.label} home`}
					onClick={(e) => {
						if (pathname === navConfig.brand.href) {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
						}
					}}
				>
					{navConfig.brand.logoSrc ? (
						<Image
							src={navConfig.brand.logoSrc}
							alt={navConfig.brand.label}
							width={navConfig.brand.logoWidth}
							height={navConfig.brand.logoHeight}
							priority
							style={{ objectFit: "contain", height: "auto" }}
						/>
					) : (
						<span className="brand-text-fallback">{navConfig.brand.label}</span>
					)}
				</Link>

				<button
					ref={burgerRef}
					className={`pulse-menu-toggler ${isOpen ? "is-open" : ""}`}
					type="button"
					onClick={() => (isOpen ? closeAllMenus() : setIsOpen(true))}
					aria-controls={menuId}
					aria-expanded={isOpen}
					aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
				>
					<span className="hamburger-box">
						<span className="hamburger-inner" />
					</span>
				</button>

				<nav
					id={menuId}
					className={`pulse-collapse-menu ${isOpen ? "show" : ""}`}
					aria-label="Primary"
				>
					<div
						className="pulse-track-wrap"
						ref={navListRef}
						onMouseLeave={handleNavLeave}
					>
						<ul className="pulse-nav-list" role="list">
							{navConfig.items.map((item) => {
								const active = isItemActive(item);
								const hasChildren = !!item.items;
								const dropdownOpen = activeDropdown === item.id;

								return (
									<li
										key={item.id}
										className={`pulse-nav-item ${dropdownOpen ? "has-open" : ""}`}
										onMouseEnter={() => handleTopHover(item)}
									>
										{hasChildren ? (
											<>
												<button
													type="button"
													className={`pulse-toplink ${active ? "is-active" : ""}`}
													data-nav-id={item.id}
													aria-haspopup="menu"
													aria-expanded={dropdownOpen}
													onClick={() => handleToplinkClick(item)}
												>
													{item.label}
													<svg
														className="pulse-caret"
														viewBox="0 0 20 20"
														aria-hidden="true"
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
													className={`pulse-dropdown ${dropdownOpen ? "is-open" : ""}`}
													role="menu"
													onMouseEnter={cancelCloseDropdown}
												>
													{item.items.map((child) => {
														const childActive = pathname.startsWith(child.href);
														return (
															<Link
																key={child.id}
																href={child.href}
																className={`pulse-dropdown-link ${childActive ? "is-active" : ""}`}
																role="menuitem"
																onClick={closeAllMenus}
															>
																{child.label}
															</Link>
														);
													})}
												</div>
											</>
										) : (
											<Link
												href={item.href}
												data-nav-id={item.id}
												className={`pulse-link ${active ? "is-active" : ""}`}
												aria-current={active ? "page" : undefined}
												onClick={(e) => {
													if (pathname === item.href) {
														e.preventDefault();
														window.scrollTo({ top: 0, behavior: "smooth" });
													}
													closeAllMenus();
												}}
											>
												{item.label}
											</Link>
										)}
									</li>
								);
							})}
						</ul>

						<div
							className="pulse-tracker-line"
							style={{
								left: `${lineStyles.left}px`,
								width: `${lineStyles.width}px`,
								opacity: lineStyles.opacity,
							}}
							aria-hidden="true"
						/>
					</div>

					{navConfig.cta && (
						<div className="pulse-cta">
							<Button
								text={navConfig.cta.text}
								href={navConfig.cta.href}
								variant={navConfig.cta.variant ?? "primary"}
								external={navConfig.cta.external ?? false}
							/>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
