// config/formatPhone.js
// Formats a US E.164 number ("+18179133284") as "(817) 913-3284".

export function formatPhone(e164) {
	const digits = e164.replace(/^\+1/, "");
	return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
