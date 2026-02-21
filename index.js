import express from "express";
import authenticate from "./security/authenticator.js";
import session from "express-session";
import USER from "./views/private/data.js"

const app = express();
const host = "localhost";
const port = 3000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    },
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views/public"));

app.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  if (user == USER.user && password == USER.password) {
    req.session.currentUser = true;
    res.redirect("/home.html");
  } else {
    res.redirect("/login.html");
  }
});

app.get("/login", (req, res) => {
  res.redirect("/login.html");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

app.use(authenticate, express.static("./views/private"));

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
