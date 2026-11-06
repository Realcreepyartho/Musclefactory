# MUSCLE FACTORY GYM — Website project

A modular, responsive refresh of the original MUSCLE FACTORY GYM website for Dindoli, Surat.

## Open the website

1. Extract the ZIP file to a folder on your computer.
2. Open the `muscle-factory-gym` folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Keep the browser tab open while testing. The project uses relative CSS and JavaScript paths, so do not open `index.html` as a `file://` URL.

The Three.js library, Google Fonts, the six existing Unsplash facility images, Google Maps and WhatsApp links use external services and therefore need an internet connection.

## Project structure

```text
muscle-factory-gym/
├── index.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   ├── animations.css
│   └── navigation.css
├── js/
│   ├── config.js
│   ├── main.js
│   ├── navigation.js
│   ├── three-scene.js
│   └── contact.js
├── assets/
│   └── images/
│       └── README.md
└── README.md
```

## Owner updates

Most frequently changed gym information is centralized near the top of `js/config.js`:

- Gym name and club type
- Reception phone and WhatsApp number
- Full address
- Opening hours
- Google rating and review count
- Google Maps embed and directions URLs
- Women's, men's and monthly/trial membership names and prices
- WhatsApp enquiry messages for trials and each membership plan

The HTML includes readable fallback values. The JavaScript configuration updates the matching visible fields and contact links when the page loads.

## Where to edit design and features

- `css/style.css`: core colors, typography, shared component styles and premium card refinements.
- `css/responsive.css`: tablet, mobile and desktop layout rules.
- `css/animations.css`: hover and transition behavior, including reduced-motion adjustments.
- `css/navigation.css`: desktop navigation, mobile drawer and menu transitions.
- `js/navigation.js`: mobile menu, keyboard handling, active link tracking and back-to-top visibility.
- `js/three-scene.js`: Three.js dumbbell and geometric crest, lighting, interaction and render lifecycle.
- `js/contact.js`: WhatsApp, click-to-call and Google Maps directions URLs.
- `js/main.js`: config hydration and lightweight facility/pricing card interaction.

## Notes

- All six original facility cards and their existing Unsplash image URLs are retained.
- Coach Utkarsh / Google review spotlight, all three membership options and their original prices, full contact details, original Google Maps embed and mobile sticky WhatsApp bar are retained.
- The old navigation was replaced. The Reviews link points to the existing Google-review/Coach Utkarsh spotlight; About points to the existing hero introduction because the original file did not contain separate About or Reviews sections.
- The three old 3D mode buttons and their switching logic were removed as requested. The combined dumbbell + crest WebGL object, geometry, materials, lighting and animation remain.
- WhatsApp links open WhatsApp with a prefilled message. Sending the message remains a user action.
- The project does not include a fake admin dashboard or backend. Editing `js/config.js` is the intended owner-maintenance method.

## Basic checks

The delivered source is checked for JavaScript syntax and internal anchor destinations. The live external services (Google Maps, WhatsApp, Google Fonts, Unsplash and the Three.js CDN) should be checked in a browser with internet access before publishing.
