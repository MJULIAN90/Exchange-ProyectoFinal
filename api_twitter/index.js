const http = require("http");
const router = require("express").Router();
const server = http.createServer(router);
require("dotenv").config();
const { TWITTER_BEARER_TOKEN } = process.env;

const socketIo = require("socket.io");
const io = socketIo(server);

const needle = require("needle");
const { SlowBuffer } = require("buffer");
console.log("1 intento");
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.get("/", async (req, res) => {
  res.send({ response: "Server is up and running" }).status(200);
});

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id";

const rules = [
  {
    value: "Bitcoin lang:en sample:15",
  },
];
//is:verified
// Get Stream rules
async function getRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
    },
  });
  return response.body;
}
console.log("2 intento");
// Set stream rules (sendind and deleting rules its gonna be a post request)
async function setRules() {
  const data = {
    add: rules,
  };
  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
    },
  });
  return response.body;
}
console.log("3 intento");
// Delete stream Rules (Because if i change the rules values i have to delete it)
async function deleteRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }
  const ids = rules.data.map((rule) => rule.id);
  const data = {
    delete: {
      ids: ids,
    },
  };
  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
    },
  });
  return response.body;
}

function streamTweets(socket) {
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
    },
  });
  stream.on("data", (data) => {
    try {
      const json = JSON.parse(data);
      socket.emit("tweet", json);
    } catch (error) {}
  });
}
console.log("4 intento");
io.on("connection", async () => {
  let currentRules;
  try {
    currentRules = await getRules();
    await deleteRules(currentRules);
    await setRules();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  streamTweets(io);
});
console.log("5 intento");
console.log(TWITTER_BEARER_TOKEN);
server.listen(3005, () => {
  console.log("Listening on 3005 (twitter stream route)");
});
module.exports = router;