# Memory Game

The classic memory game with new features and game modes. A classic memory game experience enhanced with multiple game modes, including time trials, move limits, and local multiplayer support.

## Features

- **Classic Gameplay**: Flip cards to find matching pairs and clear the board.
- **Multiple Game Modes**:
  - **Time Mode**: Race against the clock to match all pairs before time runs out.
  - **Move Mode**: Challenge yourself to clear the board within a limited number of moves.
  - **Multiplayer Mode**: Play locally with a friend! Players take turns flipping cards to find matches.
- **Dynamic Interface**: responsive design built with Tailwind CSS.
- **Game Configuration**: easy-to-use "Game Mode" menu to switch between different challenges.
- **State Management**: Robust game state handling using Zustand.

## Technologies Used

- **Frontend Framework**: [React](https://react.dev/) (with TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: TypeScript

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/DiogoAlip/memory-game.git
    cd memory-game
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

    ```bash
    yarn install
    ```

    ```bash
    pnpm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

## Project Structure

- **`src/components`**: Reusable UI components including Game configurations and Modes.
- **`src/store`**: Zustand stores for managing global state (Cards, Players).
- **`src/assets`**: Static assets like images and icons from fontawesome.
- **`src/MemoryApp.tsx`**: Main application component containing the game logic foundation.
