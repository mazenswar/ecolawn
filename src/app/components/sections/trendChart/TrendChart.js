// components/sections/TrendChart/TrendChart.js
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./trendchart.scss";

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 260;
const PADDING_X = 32;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 48;

function buildPath(points, invert) {
	const values = points.map((p) => p.value);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;

	const plotWidth = VIEW_WIDTH - PADDING_X * 2;
	const plotHeight = VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

	const coords = points.map((p, i) => {
		const x = PADDING_X + (i / (points.length - 1)) * plotWidth;
		const normalized = (p.value - min) / range;
		const fromTop = invert ? normalized : 1 - normalized;
		const y = PADDING_TOP + fromTop * plotHeight;
		return { x, y, ...p };
	});

	const linePath = coords
		.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
		.join(" ");

	const areaPath =
		`M ${coords[0].x.toFixed(1)} ${(PADDING_TOP + plotHeight).toFixed(1)} ` +
		coords.map((c) => `L ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ") +
		` L ${coords[coords.length - 1].x.toFixed(1)} ${(PADDING_TOP + plotHeight).toFixed(1)} Z`;

	return { coords, linePath, areaPath };
}

export default function TrendChart({ trendChartConfig }) {
	const {
		id = "trend-chart",
		heading,
		subheading,
		unitLabel,
		invert = false,
		points,
		footnote,
		classNames = "",
	} = trendChartConfig;

	const { coords, linePath, areaPath } = buildPath(points, invert);
	const gradientId = `${id}-gradient`;
	const tableCaption = heading || unitLabel || "Trend data";

	return (
		<section
			className={`block trend-chart ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				{(heading || subheading) && (
					<FadeUp as="div" className="trend-chart__header">
						{heading && <h2 id={`${id}-heading`}>{heading}</h2>}
						{subheading && <p className="trend-chart__sub">{subheading}</p>}
					</FadeUp>
				)}

				<FadeUp as="div" className="trend-chart__figure" delay={100}>
					<svg
						className="trend-chart__svg"
						viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
						preserveAspectRatio="xMidYMid meet"
						role="img"
						aria-labelledby={`${id}-svg-title`}
					>
						<title id={`${id}-svg-title`}>{tableCaption}</title>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="0%"
									stopColor="var(--brand-1-bright)"
									stopOpacity="0.35"
								/>
								<stop
									offset="100%"
									stopColor="var(--brand-1-bright)"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>

						<line
							x1={PADDING_X}
							y1={VIEW_HEIGHT - PADDING_BOTTOM}
							x2={VIEW_WIDTH - PADDING_X}
							y2={VIEW_HEIGHT - PADDING_BOTTOM}
							stroke="var(--color-border)"
							strokeWidth="1"
						/>

						<path
							d={areaPath}
							fill={`url(#${gradientId})`}
							stroke="none"
							aria-hidden="true"
						/>
						<path
							d={linePath}
							fill="none"
							stroke="var(--brand-1-bright)"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						/>

						{coords.map((c, i) => (
							<g key={i} aria-hidden="true">
								<circle
									cx={c.x}
									cy={c.y}
									r="4"
									fill="var(--color-bg)"
									stroke="var(--brand-1-bright)"
									strokeWidth="2"
								/>
								<text
									x={c.x}
									y={VIEW_HEIGHT - PADDING_BOTTOM + 22}
									textAnchor="middle"
									className="trend-chart__axis-label"
								>
									{c.label}
								</text>
								<text
									x={c.x}
									y={c.y - 12}
									textAnchor="middle"
									className="trend-chart__value-label"
								>
									{c.value}
								</text>
							</g>
						))}
					</svg>

					<table className="trend-chart__table">
						<caption>{tableCaption}</caption>
						<thead>
							<tr>
								<th scope="col">Period</th>
								<th scope="col">{unitLabel || "Value"}</th>
							</tr>
						</thead>
						<tbody>
							{points.map((p, i) => (
								<tr key={i}>
									<td>{p.label}</td>
									<td>{p.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</FadeUp>

				{footnote && <p className="trend-chart__footnote">{footnote}</p>}
			</div>
		</section>
	);
}
