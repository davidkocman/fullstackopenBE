# Backend Project

This is the backend project for the Full Stack Open course.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/davidkocman/fullstackopenBE
  ```
2. Navigate to the project directory:
  ```sh
  cd fullstackopenBE
  ```
3. Install the dependencies:
  ```sh
  npm i
  ```

### Running the Project

To run the project and watch for changes use the following command (nodemon):
```sh
npm dev
```

### Building the Project

Creates a new build of FE part and copies it into /dist folder of BE project:
```sh
npm build:ui
```

Executes `build:ui` script and commits changes to BE repo with message `uibuild`:
```sh
npm deploy:full
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- Full Stack Open course
- Node.js
- Express.js