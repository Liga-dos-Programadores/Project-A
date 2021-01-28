// Definindo constante fs para inicialização de eventos
const fs = require('fs');

/**
 * Search for all files with the given extension
 * inside a folder and all sub-folders.
 *
 * @param {string} directory - The directory to run the search.
 * @param {string} extension - File extension to search, defaults to `js`
 * @returns {DirectorySearchInfo[]} Array of objects containing the directory and all files inside.
 */
function searchByExtension(directory, extension = 'js') {
	const files = fs.readdirSync(directory);

	/** @type {DirectorySearchInfo[]} */
	const accumulator = [];
	const currentDirFiles = [];

	for (const file of files) {
		if (file.split('.').length === 1) {
			// It's a directory, try to search for files there.
			const result = searchByExtension(`${directory}/${file}`, extension);
			accumulator.push(...result);
			continue;
		}

		if (file.split('.').pop() === extension) {
			currentDirFiles.push(`${directory}/${file}`);
		}
	}

	if (currentDirFiles.length > 0) {
		accumulator.push({
			directory: directory,
			files: currentDirFiles,
		});
	}

	return accumulator;
}

module.exports.searchByExtension = searchByExtension;

/**
 * @typedef DirectorySearchInfo
 * @type {object}
 * @property {string} directory - The directory name.
 * @property {string[]} files - All files inside the directory.
 */