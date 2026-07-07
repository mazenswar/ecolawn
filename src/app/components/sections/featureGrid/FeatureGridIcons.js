// components/sections/FeatureGrid/FeatureGridIcons.js

function IconSettings() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	);
}

function IconShield() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z" />
			<path d="M9 12l2 2 4-4" />
		</svg>
	);
}

function IconDesign() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M3 21h4L17 10l-4-4L3 21z" />
			<path d="M14.5 6.5l3-3 3 3-3 3-3-3z" />
		</svg>
	);
}

function IconSearch() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="10.5" cy="10.5" r="6.5" />
			<path d="M15.5 15.5L21 21" />
			<path d="M10.5 7.5v6M7.5 10.5h6" />
		</svg>
	);
}

function IconAccessibility() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="5" r="2" />
			<path d="M5 9h14" />
			<path d="M12 9v5l-3 7" />
			<path d="M12 14l3 7" />
		</svg>
	);
}

function IconChart() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M3 20h18" />
			<path d="M5 20V12" />
			<path d="M9 20V8" />
			<path d="M13 20V14" />
			<path d="M17 20V4" />
		</svg>
	);
}

export function FeatureIcon({ name }) {
	if (name === "design") return <IconDesign />;
	if (name === "search") return <IconSearch />;
	if (name === "accessibility") return <IconAccessibility />;
	if (name === "chart") return <IconChart />;
	if (name === "settings") return <IconSettings />;
	if (name === "shield") return <IconShield />;
	return null;
}
