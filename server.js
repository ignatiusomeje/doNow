const http = require("http");

const app = require("./app");

app.set(process.env.PORT || 3000);
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
// .then(() => {} )
// .catch(err => {
//   console.log("here, we are not working due to: ", err);
// });
