// Import built-in http module
const http = require("http");

// Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

// Start server on port 3000
server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});