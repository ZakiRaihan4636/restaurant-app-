const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeImages() {
	const sourceDir = path.resolve(__dirname, 'src/public/images');
	const destinationDir = path.resolve(__dirname, 'dist/images');

	// Create destination directory if it doesn't exist
	if (!fs.existsSync(destinationDir)) {
		fs.mkdirSync(destinationDir, {
			recursive: true
		});
	}

	try {
		const files = fs.readdirSync(sourceDir);

		for (const file of files) {
			const imageFilePath = path.join(sourceDir, file);
			const imageFileName = path.parse(file).name;

			// Resize image to 800px width and save with '-large.jpg' suffix
			await sharp(imageFilePath)
				.resize(800)
				.toFile(path.join(destinationDir, `${imageFileName}-large.jpg`));

			// Resize image to 480px width and save with '-small.jpg' suffix
			await sharp(imageFilePath)
				.resize(480)
				.toFile(path.join(destinationDir, `${imageFileName}-small.jpg`));

			console.log(`Image ${file} resized successfully.`);
		}

		console.log('All images resized successfully.');
	} catch (error) {
		console.error('Error resizing images:', error);
	}
}

// Call the resizeImages function
resizeImages();
