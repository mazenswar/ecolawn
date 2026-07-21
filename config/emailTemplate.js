// config/emailTemplate.js
// Builds the branded HTML/text email sent to the business when someone
// submits a quote request. Table-based layout with inline styles —
// required for consistent rendering across email clients (Outlook in
// particular ignores modern CSS like flexbox/grid).

import site from "./site";

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function buildQuoteRequestEmail({
	name,
	email,
	phone,
	serviceAddress,
	serviceLabel,
	message,
}) {
	const logoUrl = `${site.url}${site.logo.src}`;
	const firstName = name.split(" ")[0];

	const fields = [
		{ label: "Name", value: name },
		{ label: "Email", value: email },
		{ label: "Phone", value: phone },
		{ label: "Service Address", value: serviceAddress },
		{ label: "Service", value: serviceLabel },
	];

	const fieldRows = fields
		.map(
			(f) => `
				<tr>
					<td style="padding:12px 0;border-bottom:1px solid #e8ede4;font-size:12px;font-weight:600;color:#5c7060;text-transform:uppercase;letter-spacing:0.04em;width:150px;vertical-align:top;">
						${escapeHtml(f.label)}
					</td>
					<td style="padding:12px 0;border-bottom:1px solid #e8ede4;font-size:15px;color:#1c2b22;vertical-align:top;">
						${escapeHtml(f.value)}
					</td>
				</tr>`,
		)
		.join("");

	const messageBlock = message
		? `
			<div style="margin-top:20px;background-color:#e8ede4;border-radius:8px;padding:16px 20px;">
				<div style="font-size:12px;font-weight:600;color:#5c7060;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">
					Message
				</div>
				<div style="font-size:14px;line-height:1.6;color:#1c2b22;">
					${escapeHtml(message).replace(/\n/g, "<br />")}
				</div>
			</div>`
		: "";

	const html = `
<!doctype html>
<html>
	<body style="margin:0;padding:0;background-color:#f7f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f3ee;padding:32px 16px;">
			<tr>
				<td align="center">
					<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #b8c9bc;">
						<tr>
							<td align="center" style="background-color:#2e5240;padding:28px 24px;">
								<img src="${logoUrl}" alt="${escapeHtml(site.name)}" width="140" style="display:block;max-width:140px;height:auto;" />
							</td>
						</tr>
						<tr>
							<td style="padding:32px 28px;">
								<h1 style="margin:0 0 4px;font-size:20px;line-height:1.3;color:#1c2b22;font-weight:700;">
									New Quote Request
								</h1>
								<p style="margin:0 0 24px;font-size:14px;color:#5c7060;">
									Someone just submitted a quote request from the ${escapeHtml(site.name)} website.
								</p>
								<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
									${fieldRows}
								</table>
								${messageBlock}
								<div style="margin-top:28px;">
									<a
										href="mailto:${escapeHtml(email)}"
										style="display:inline-block;background-color:#3d6b4f;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;"
									>
										Reply to ${escapeHtml(firstName)}
									</a>
								</div>
							</td>
						</tr>
						<tr>
							<td style="padding:20px 28px;background-color:#f7f3ee;border-top:1px solid #e8ede4;">
								<p style="margin:0;font-size:12px;color:#5c7060;">
									Sent from the contact form at ${site.url.replace(/^https?:\/\//, "")}
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`;

	const text = `New Quote Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Address: ${serviceAddress}
Service: ${serviceLabel}

Message:
${message || "(none)"}

Sent from the contact form at ${site.url}`;

	return {
		subject: `New quote request from ${name}`,
		html,
		text,
	};
}
