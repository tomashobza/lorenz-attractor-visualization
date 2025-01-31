# 🦋 React Three Fiber Lorenz Attractor

A beautiful 3D visualization of the Lorenz system using React Three Fiber. This project creates an interactive, particle-based representation of the famous butterfly-shaped strange attractor.

## 🌌 Preview

Check out the live demo [here](https://lorenz-attractor-visualization.vercel.app/).

![Lorenz Attractor Example](https://github.com/tomashobza/lorenz-attractor-visualization/blob/main/lorenz-attraction-demo.gif?raw=true)

## 🚀 Features

- Real-time 3D particle simulation
- Interactive camera controls
- Beautiful color gradients
- Thousands of particles following the Lorenz system
- Smooth animation with efficient rendering
- Fully responsive design

## 🎮 Controls

- **Rotate**: Left mouse button drag
- **Zoom**: Mouse wheel
- **Pan**: Right mouse button drag

## 🛠️ Installation

First, clone the repository:

```bash
git clone https://github.com/tomashobza/lorenz-attractor-visualization
cd lorenz-attractor-visualization
```

Install the dependencies:

```bash
bun install
```

## 📦 Dependencies

- `@react-three/fiber`
- `@react-three/drei`
- `three.js`

## 🏃‍♂️ Running the Project

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` to see the visualization.

## 🔢 The Math Behind It

The Lorenz system is described by three coupled differential equations:

```
dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
```

Where:

- σ (sigma) = 10
- ρ (rho) = 28
- β (beta) = 8/3

These parameters create the classic butterfly-shaped strange attractor discovered by Edward Lorenz in 1963.

## 🎨 Customization

You can customize various aspects of the visualization by modifying the constants in the `LorenzParticles` component:

```javascript
const SIGMA = 10; // Affects the spread of particles
const RHO = 28; // Affects the height of the attractor
const BETA = 8 / 3; // Affects the overall shape
const DT = 0.005; // Animation speed
const NUM_PARTICLES = 2000; // Number of particles
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- Edward Lorenz for discovering this beautiful mathematical system
- React Three Fiber team for the amazing 3D rendering tools
- Three.js community for the underlying 3D engine

## 🎯 Future Improvements

- Add UI controls for parameters
- Implement different color schemes
- Add particle trails
- Add support for different strange attractors
- Optimize performance for mobile devices

---

Made with ❤️ using React Three Fiber
