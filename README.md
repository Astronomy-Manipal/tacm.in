# TACM.in — The Astronomy Club of Manipal

The official website of The Astronomy Club of Manipal (TACM), showcasing the club's team, activities, events, and astronomy photography.

## Features

- **Interactive 3D Earth:** Custom WebGL rendering with animated surface details, atmospheric lighting, and a highlighted location at Manipal.
- **Animated night sky:** Twinkling stars and shooting meteors.
- **Astronomy gallery:** Categorized photographs with thumbnails and a load-more interface.
- **Team directory:** Club office-bearer and domain-head profiles.
- **Events and activities:** Information about stargazing nights, expert talks, and planetarium visits.
- **Frequently asked questions:** Information about recruitment, membership, and club activities.
- **Social media integration:** Links to the club's social platforms and official email address.
- **Responsive interface:** Layout adaptations for desktop and mobile devices.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Three.js and React Three Fiber dependencies
- WebGL and GLSL shaders
- Sharp for image processing

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) and npm
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/khushiag/tacm.in.git
cd tacm.in
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the website

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

Keep the terminal running while developing. Vite automatically updates the website when you save changes to supported source files.

## Adding Images to the Gallery

The gallery is generated from image files stored in `public/images/gallery/`. You do not need to manually add each photograph to the React component.

### 1. Choose a category

Inside `public/images/gallery/`, create a folder for the category you want to use, or use an existing category.

The existing categories include:

- `Nebula`
- `Galaxy`
- `Moon`
- `Planet`
- `Star Cluster`
- `Night Sky`

For example, to add photographs of galaxies:

```text
public/
└── images/
    └── gallery/
        ├── Galaxy/
        ├── Moon/
        ├── Nebula/
        ├── Night Sky/
        ├── Planet/
        └── Star Cluster/
```

Category folder names are used as the gallery category labels. Use consistent capitalization when adding images to an existing category.

### 2. Add the image files

Copy your photographs into the appropriate category folder.

Supported formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

Example:

```text
public/images/gallery/Galaxy/
├── andromeda-galaxy.jpg
├── milky-way.png
└── whirlpool-galaxy.webp
```

Use descriptive filenames. The filename is used to generate the initial display title, with hyphens and underscores converted to spaces.

For example, `andromeda-galaxy.jpg` becomes `andromeda galaxy`.

### 3. Regenerate the gallery

After adding images, run the gallery-generation script from the project root:

```bash
npm run gallery
```

The script automatically:

1. Scans the category folders inside `public/images/gallery/`.
2. Detects supported image files.
3. Generates WebP thumbnails, resized to a maximum width of 700 pixels, under `public/images/gallery-thumbs/`.
4. Creates or updates `src/galleryData.json` with the image paths, category, title, date, thumbnail path, and ID.

You should see a message indicating how many photographs were written to the gallery metadata.

**Important:** The script preserves existing gallery metadata, including manually edited titles and dates, when the image source path remains unchanged. It also skips generating a thumbnail if one already exists at the expected path. If you replace an existing image with a new image using the same filename, delete its corresponding thumbnail first so that it can be regenerated.

### 4. View the updated gallery

If the development server is already running, return to your browser and refresh the page if the gallery has not updated automatically.

If the server is not running, start it again:

```bash
npm run dev
```

Open the local URL printed in the terminal.

### Complete workflow for adding images

Whenever you add new photographs, follow these commands:

```bash
# 1. Add images to public/images/gallery/<Category>/

# 2. Generate thumbnails and gallery metadata
npm run gallery

# 3. Start the website if it is not already running
npm run dev
```

Run `npm run gallery` before checking the updated gallery. Restarting the development server alone does not regenerate the gallery metadata or thumbnails.

## Updating Other Website Images

Not all images on the website belong to the astronomy gallery. Some images, such as team portraits and event banners, are referenced directly in `src/App.tsx`.

For these images:

1. Place the new image in the appropriate location under `public/images/`.
2. Update the corresponding image path in `src/App.tsx` if the filename or location changes.
3. Save the file and check the website in your browser.

For example, team portraits are referenced from:

```text
public/images/board pictures/
```

Event images are also referenced directly by their paths in the application code.

Use the exact filename and path, including capitalization and spaces. Files inside `public/` are served from the website root, so an image stored at `public/images/example.jpg` is referenced as `/images/example.jpg`.

## Available Commands

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the development server |
| `npm run gallery` | Generates gallery thumbnails and metadata |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Previews the production build locally |

### Building the Project

To verify that the project builds successfully:

```bash
npm run build
```

To preview the generated build:

```bash
npm run preview
```

## Project Structure

```text
tacm.in/
├── public/
│   └── images/
│       ├── gallery/          # Original gallery photographs by category
│       ├── gallery-thumbs/   # Generated WebP thumbnails
│       └── board pictures/   # Team portraits and related images
├── scripts/
│   └── makeGallery.mjs       # Gallery generation script
├── src/
│   ├── App.tsx               # Main application and UI components
│   ├── main.tsx              # React entry point
│   ├── index.css             # Global styles
│   └── galleryData.json      # Generated gallery metadata
├── index.html
├── package.json              # Dependencies and npm scripts
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Development Guidelines

- Keep image assets in the appropriate directories under `public/images/`.
- Run `npm run gallery` after adding gallery photographs.
- Preserve the existing gallery category naming conventions.
- Check image paths and filenames when replacing team portraits or event images.
- Test the website at desktop and mobile screen sizes.
- Run `npm run build` before submitting changes.
- Do not commit `node_modules/` or unnecessary generated build artifacts.

## Contact and Social Media

- **Instagram:** [@astronomy.manipal](https://www.instagram.com/astronomy.manipal/)
- **LinkedIn:** [The Astronomy Club, Manipal](https://in.linkedin.com/company/the-astronomy-club-manipal)
- **Facebook:** [The Astronomy Club, Manipal](https://m.facebook.com/theastronomyclubmanipal/)
- **Email:** [astronomy.club@manipal.edu](mailto:astronomy.club@manipal.edu)

## License

Refer to the repository's license file, if present, for the applicable terms of use and distribution.
