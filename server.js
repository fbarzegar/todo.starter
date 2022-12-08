// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/api/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const user = router.db.getState().users.find((u) => u.username === username);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password === password) {
      return res.status(200).json({ message: "done", user, token: user.id });
    } else {
      return res.status(401).json({
        message: "Username or Password incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

server.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const createdAt = Date.now();
    if (!username) {
      throw new Error("Missing username");
    }
    if (!password) {
      throw new Error("Missing password");
    }
    const ids = router.db.getState().users.map((u) => u.id);
    const lastId = Math.max(...ids);
    await router.db
      .get("users")
      .push({ id: lastId + 1, username, password, createdAt })
      .write();

    return res.status(200).json({
      message: "done",
      token: lastId + 1,
      user: { id: lastId + 1, username, password, createdAt },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

server.get("/api/me", (req, res) => {
  try {
    if (isAuthorized(req)) {
      const id = Number(req.headers.authorization.split("Bearer")[1].trim());
      const user = router.db.get("users").find({ id }).value();
      if (!user) {
        throw new Error("Not found");
      }
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

server.use(["/api/todos", "/api/comments"], (req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// ---------------------------- UTILS

function isAuthorized(req, res) {
  try {
    const token = req.headers.authorization.split("Bearer")[1].trim();
    if (token) {
      const user = router.db.getState().users.find((u) => String(u.id) === token);
      return Boolean(user);
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
