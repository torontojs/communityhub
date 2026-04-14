const initializeIconDefinitions = async () => {
	if (!document.querySelector('#icon-definitions')) {
		const result = await fetch('/scripts/icon-definitions.svg');
		const svgText = await result.text();

		document.body.insertAdjacentHTML('afterbegin', svgText);
	}
};

await initializeIconDefinitions();
