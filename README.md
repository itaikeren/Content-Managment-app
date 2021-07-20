# Content Management app

A test project that simulates a content management app, which let you create new pages and manage the text inside them (add-edit-remove).

## 🌟 Tech Stack

**Client:** NextJS, i18next, TailwindCSS, SWR

**Server:** Node, Express, MongoDB

## 🚀 Run Locally

Clone the project

```bash
  git clone https://github.com/itaikeren/Content-Managment-app.git
```

Install all dependencies in both backend & frontend directories

```bash
  $ cd backend
  $ yarn install
```

```bash
  $ cd frontend
  $ yarn install
```

**Make sure you create a `default.json` file inside the config folder**

```js
  // default.json
  // MongoDB connection string
  {
  "mongoURI": "mongodb+srv://<USERNAME>:<PASSWORD>@myDB.qpcm9.mongodb.net/myDB?retryWrites=true&w=majority"
  }
```

Then start the app

```bash
  $ cd backend
  $ yarn dev
```

```bash
  $ cd frontend
  $ yarn dev
```

## 👨🏻‍💻 Notes

- Typescript is not fully done

- There is no validation inside the forms

- Long description may break the the shape of the dashboard list

- Text Resource type currently supported: `<h1>, <h2>, <h3>, <h4>, <p>`

- Don't really know if the French translate is correct 🙈

## Screenshots

![1](https://i.ibb.co/VJy6qD9/Screen-Shot-2021-07-20-at-10-09-54.png)
![2](https://i.ibb.co/bWYTrLC/Screen-Shot-2021-07-20-at-10-10-13.png)
![3](https://i.ibb.co/KxfHz4p/Screen-Shot-2021-07-20-at-10-10-40.png)
