<h1 align="center">CIVITAS - API</h1>

## About this Project

This application allows users to manage course records. Built with a focus on simplicity, it has functionalities to add, search, and delete courses.
The application handles course details such as subject, course number (formatted as three-digit, zero-padded integer), and description. And it prevents the addition of duplicate courses and validates course numbers.

<!-- ## Project presentation

<img
  alt="Civitas API"
  title="Civitas API' presentation gif"
  src="./src/assets/presentationGif.gif"
  height="425"
/> -->

## Functionalities

- Primary

  - Search: Find courses by partial descriptions (e.g., "Bio" finds "Introduction to Biology").
  - Add/Delete: Easily add new courses or delete existing ones.
  - Validation: Ensures course number formatting and unique course entries.

## Used Techs

- Fastify: A highly performant and low-overhead web framework for Node.js, designed to help developers build fast and scalable web applications.

# How to run the project

> Node version used: v20.9.0

> NPM version used: v10.1.0

## Application

```bash
# To install project dependencies
npm install
```

```bash
# Run the application on localhost -> http://localhost:3333
npm run dev
```

# Author

Made with 💚 by Guilherme Bafica 👋

[![LinkedIn Badge](https://img.shields.io/badge/-GuilhermeBafica-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/guilhermebafica/)](https://www.linkedin.com/in/guilhermebafica/)
