// app/api/og/route.js
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import site from "@/config/site";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title") || site.name;

	// Load logo from public folder as buffer
	let logoData = null;
	try {
		const logoPath = path.join(
			process.cwd(),
			"public",
			site.logo.src.replace(/^\//, ""),
		);
		const logoBuffer = fs.readFileSync(logoPath);
		const base64 = logoBuffer.toString("base64");
		const mimeType = site.logo.src.endsWith(".svg")
			? "image/svg+xml"
			: site.logo.src.endsWith(".png")
				? "image/png"
				: "image/jpeg";
		logoData = `data:${mimeType};base64,${base64}`;
	} catch {
		// Logo not found, will render text fallback
	}

	return new ImageResponse(
		<div
			style={{
				width: "1200px",
				height: "630px",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "space-between",
				backgroundColor: site.og.background,
				padding: "80px",
				position: "relative",
			}}
		>
			{/* Accent bar top left */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "8px",
					height: "100%",
					backgroundColor: site.og.accent,
				}}
			/>

			{/* Logo or site name */}
			<div style={{ display: "flex", alignItems: "center" }}>
				{logoData ? (
					<img
						src={logoData}
						width={site.logo.width}
						height={site.logo.height}
						alt={site.logo.alt}
						style={{ objectFit: "contain" }}
					/>
				) : (
					<div
						style={{
							fontSize: "32px",
							fontWeight: "700",
							color: site.og.text,
						}}
					>
						{site.name}
					</div>
				)}
			</div>

			{/* Page title */}
			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				<div
					style={{
						fontSize: title.length > 40 ? "52px" : "64px",
						fontWeight: "700",
						color: site.og.text,
						lineHeight: "1.1",
						maxWidth: "900px",
					}}
				>
					{title}
				</div>

				{/* Site URL */}
				<div
					style={{
						fontSize: "24px",
						color: site.og.accent,
						fontWeight: "500",
					}}
				>
					{site.url.replace("https://", "")}
				</div>
			</div>
		</div>,
		{
			width: site.og.width,
			height: site.og.height,
		},
	);
}
