export default async function copyTextToClipBoard(text: string) {
	if (navigator.clipboard) {
		// Check if Clipboard API is available
		await navigator.clipboard.writeText(text);
	} else {
		throw new Error("Clipboard API not available.");
	}
}
