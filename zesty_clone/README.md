# Zentry Clone

Zentry is a modern, interactive web application built with React and GSAP. It is a clone of the Zentry website, an Awwwards-winning site, featuring a visually stunning design with animations, video previews, and interactive elements, providing an immersive user experience.

## 🚀 Features

- **Hero Section**: A dynamic hero section with animated videos that scale up and continue playing seamlessly.
- **Interactive Navbar**: A responsive navbar with hover effects and scroll-based visibility.
- **Features Section**: Showcases various features with animated cards and videos.
- **Story Section**: A visually engaging section with parallax effects and animations.
- **Contact Section**: A call-to-action section with animated titles and styled images.
- **Footer**: A footer with social media links and a privacy policy.

## 🛠️ Technologies Used

- **React**: For building the user interface.
- **GSAP**: For animations and scroll-based effects.
- **Tailwind CSS**: For styling and responsive design.
- **Vite**: For fast development and build processes.

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/zentry_clone.git
   cd zentry_clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to**:
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
zentry_clone/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # React components
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point for the React app
│   ├── index.css         # Global styles
│   └── assets/           # Videos and other media
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## 📜 Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## 🎨 Customization

### Tailwind CSS

Customize styles in the `tailwind.config.js` file. Extend the theme to add custom fonts, colors, and more.

### GSAP Animations

Animations are powered by GSAP. Modify or add animations in the respective components, such as `Hero.jsx`, `Navbar.jsx`, and `Story.jsx`.

## ⚠️ Known Issues <p style="font-size: 10px; display: inline">- Currently being worked on</p>

- **Autoplay Restrictions**: Some browsers may block autoplay for videos. Ensure videos are muted or require user interaction to play.
- **Performance**: Heavy animations and videos may impact performance on low-end devices.
- **Incomplete Sections**: Some sections still need to be added to complete the project.

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **<a href="https://zentry.com/" target="_blank" rel="noreferrer noopener" style="color: white; text-decoration: underline;" onmouseover="this.style.textColor='red'" onmouseout="this.style.textColor='white'">Zentry</a>**: An excellent award-winning website with a perfect blend of animations and video elements.
- **GSAP**: For the animation library.
- **Tailwind CSS**: For the utility-first CSS framework.
- **React Icons**: For the icons used in the project.
