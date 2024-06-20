const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin

    let path = url.parse(req.url, true);

    if (path.pathname === "/find") {
        let num = path.query.number;

        // Validate if 'number' parameter exists and is a valid integer
        if (!num || isNaN(parseInt(num))) {
            res.statusCode = 400; // Bad Request
            res.end("Invalid number parameter");
            return;
        }

        let n = parseInt(num);
        let result = n % 2 === 0 ? "even" : "odd";
        
        // Respond with the result
        res.end(result);
    } else {
        // Handle requests to undefined paths
        res.statusCode = 404; // Not Found
        res.end("Invalid endpoint");
    }
});

server.listen(9000, () => {
    console.log("Server is running on port 9000");
});
