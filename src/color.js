export function fromHex(hex) {
	return hex;
}

export function fromRGB(r, g, b) {
	const hex = ((r << 16) | (g << 8) | b).toString(16);
	return "#" + "000000".substring(hex.length) + hex;
}

export function random() {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
