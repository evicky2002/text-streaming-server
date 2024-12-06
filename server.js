import { createServer } from "http";
import { createReadStream } from "fs";

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/text") {
    res.writeHead(200, { "Content-Type": "application/text" });
    const readStream = createReadStream("results.txt", {
      encoding: "utf-8",
    });

    readStream.on("readable", () => {
      const interval = setInterval(() => {
        const chunk = readStream.read(1);
        if (chunk !== null) {
          res.write(chunk);
        } else {
          clearInterval(interval);
          res.end();
        }
      }, 10);
    });
  }
});

server.listen(3000, () => {
  console.log("server started");
});
