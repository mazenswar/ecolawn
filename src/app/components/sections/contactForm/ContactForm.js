"use client";
import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "@/app/actions/contact";
import "./contactform.scss";

const formConfig = {
	heading: "Get a free quote",
	classNames: "blockTint",
	subheading:
		"Tell us a bit about your property and what you need. We'll follow up with a straightforward quote.",
	fields: {
		name: { label: "Your name", placeholder: "Jane Smith" },
		email: { label: "Email address", placeholder: "jane@example.com" },
		phone: { label: "Phone number", placeholder: "(817) 555-0123" },
		service: {
			label: "Service interested in",
			options: [
				{ value: "", label: "Select a service" },
				{ value: "lawn-maintenance", label: "Lawn Maintenance Program" },
				{ value: "moisture-control", label: "Moisture Control add-on" },
				{ value: "both", label: "Both" },
				{ value: "not-sure", label: "Not sure yet" },
			],
		},
		serviceAddress: {
			label: "Service address",
			placeholder: "123 Main St, The Colony, TX 75056",
		},
		message: {
			label: "Anything else we should know? (optional)",
			placeholder: "Tell us about your property or any questions you have",
		},
	},
	submitText: "Send request",
	successHeading: "Request received",
	successMessage:
		"Thanks for reaching out. We will be in touch within three business days.",
};

export default function ContactForm() {
	const [status, setStatus] = useState("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [errors, setErrors] = useState({});
	const formRef = useRef(null);
	const errorRef = useRef(null);

	useEffect(() => {
		if (status === "error" && errorRef.current) {
			errorRef.current.focus();
		}
	}, [status]);

	function validate(formData) {
		const errs = {};
		const name = formData.get("name")?.toString().trim();
		const email = formData.get("email")?.toString().trim();
		const phone = formData.get("phone")?.toString().trim();
		const service = formData.get("service")?.toString().trim();
		const serviceAddress = formData.get("serviceAddress")?.toString().trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!name) errs.name = "Please enter your name.";
		if (!email) errs.email = "Please enter your email address.";
		else if (!emailRegex.test(email))
			errs.email = "Please enter a valid email address.";
		if (!phone) errs.phone = "Please enter your phone number.";
		if (!service) errs.service = "Please select a service.";
		if (!serviceAddress)
			errs.serviceAddress = "Please enter the service address.";

		return errs;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		const formData = new FormData(formRef.current);
		const errs = validate(formData);

		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			setStatus("idle");
			return;
		}

		setErrors({});
		const result = await submitContactForm(formData);

		if (result.success) {
			setStatus("success");
			formRef.current?.reset();
		} else {
			setStatus("error");
			setErrorMessage(result.error);
		}
	}

	return (
		<section
			id="quote"
			className={`block contact-form ${formConfig.classNames}`.trim()}
			aria-labelledby="contact-heading"
		>
			<div className="block__content container">
				<div className="contact-form__layout">
					<div className="contact-form__intro">
						<h2 id="contact-heading">{formConfig.heading}</h2>
						<p className="contact-form__sub">{formConfig.subheading}</p>
					</div>

					<div className="contact-form__body">
						{status === "success" ? (
							<div className="contact-form__success" role="alert">
								<div className="contact-form__success-icon" aria-hidden="true">
									<svg
										viewBox="0 0 24 24"
										width="24"
										height="24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M20 6L9 17L4 12" />
									</svg>
								</div>
								<h3>{formConfig.successHeading}</h3>
								<p>{formConfig.successMessage}</p>
								<button
									className="btnSecondary"
									onClick={() => setStatus("idle")}
								>
									Send another message
								</button>
							</div>
						) : (
							<form
								ref={formRef}
								onSubmit={handleSubmit}
								noValidate
								aria-label="Contact form"
							>
								{/* Honeypot — hidden from real users, bots fill it in */}
								<input
									type="text"
									name="company"
									autoComplete="off"
									tabIndex={-1}
									aria-hidden="true"
									className="contact-form__company-url"
								/>

								{/* Name */}
								<div className="contact-form__field">
									<label htmlFor="contact-name">
										{formConfig.fields.name.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-name"
										name="name"
										type="text"
										placeholder={formConfig.fields.name.placeholder}
										autoComplete="name"
										disabled={status === "loading"}
										aria-invalid={errors.name ? "true" : "false"}
										{...(errors.name && {
											"aria-describedby": "contact-name-error",
										})}
									/>
									{errors.name && (
										<span
											id="contact-name-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.name}
										</span>
									)}
								</div>

								{/* Email */}
								<div className="contact-form__field">
									<label htmlFor="contact-email">
										{formConfig.fields.email.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-email"
										name="email"
										type="email"
										placeholder={formConfig.fields.email.placeholder}
										autoComplete="email"
										disabled={status === "loading"}
										aria-invalid={errors.email ? "true" : "false"}
										{...(errors.email && {
											"aria-describedby": "contact-email-error",
										})}
									/>
									{errors.email && (
										<span
											id="contact-email-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.email}
										</span>
									)}
								</div>

								{/* Phone */}
								<div className="contact-form__field">
									<label htmlFor="contact-phone">
										{formConfig.fields.phone.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-phone"
										name="phone"
										type="tel"
										placeholder={formConfig.fields.phone.placeholder}
										autoComplete="tel"
										disabled={status === "loading"}
										aria-invalid={errors.phone ? "true" : "false"}
										{...(errors.phone && {
											"aria-describedby": "contact-phone-error",
										})}
									/>
									{errors.phone && (
										<span
											id="contact-phone-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.phone}
										</span>
									)}
								</div>

								{/* Service */}
								<div className="contact-form__field">
									<label htmlFor="contact-service">
										{formConfig.fields.service.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<select
										id="contact-service"
										name="service"
										disabled={status === "loading"}
										aria-invalid={errors.service ? "true" : "false"}
										defaultValue=""
										{...(errors.service && {
											"aria-describedby": "contact-service-error",
										})}
									>
										{formConfig.fields.service.options.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
									{errors.service && (
										<span
											id="contact-service-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.service}
										</span>
									)}
								</div>

								{/* Service address */}
								<div className="contact-form__field">
									<label htmlFor="contact-service-address">
										{formConfig.fields.serviceAddress.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-service-address"
										name="serviceAddress"
										type="text"
										placeholder={formConfig.fields.serviceAddress.placeholder}
										autoComplete="street-address"
										disabled={status === "loading"}
										aria-invalid={errors.serviceAddress ? "true" : "false"}
										{...(errors.serviceAddress && {
											"aria-describedby": "contact-service-address-error",
										})}
									/>
									{errors.serviceAddress && (
										<span
											id="contact-service-address-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.serviceAddress}
										</span>
									)}
								</div>

								{/* Message */}
								<div className="contact-form__field message">
									<label htmlFor="contact-message">
										{formConfig.fields.message.label}
									</label>
									<textarea
										id="contact-message"
										name="message"
										rows={5}
										placeholder={formConfig.fields.message.placeholder}
										disabled={status === "loading"}
									/>
								</div>

								{status === "error" && (
									<div
										className="contact-form__error"
										ref={errorRef}
										tabIndex={-1}
										role="alert"
									>
										{errorMessage}
									</div>
								)}

								<button
									type="submit"
									className="btnPrimary"
									disabled={status === "loading"}
									aria-busy={status === "loading"}
								>
									{status === "loading" ? "Sending..." : formConfig.submitText}
								</button>

								<p className="contact-form__note">* Required fields</p>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
