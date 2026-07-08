import site from "../../config/site";

export default function manifest() {
	return {
		name: site.name,
		short_name: "EcoLawn",
		description: site.description,
		start_url: "/",
		display: "standalone",
		background_color: "#f7f3ee",
		theme_color: "#3d6b4f",
		icons: [
			{
				src: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
