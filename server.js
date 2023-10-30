const http = require('http');
const url = require('url');
const ApiVideoClient = require('@api.video/nodejs-client');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/getStream') {
        handleGetStream(req, res);
    } else if (pathname === '/addStream') {
        handleAddStream(req, res);
    } else if (pathname === '/deleteStream') {
        handleDeleteStream(req, res);
    } else {
        handleNotFound(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

async function handleGetStream(req, res) {
    const client = new ApiVideoClient({ apiKey: "NkaLmydeIOtdBlVKuayXJ5rQjxHtIMGnEgBAnHgrE9V" });

    // retrieve the first page of all livestreams
    const liveStreams = await client.liveStreams.list({});

    // retrieve the livestreams having a given name
    const liveStreams2 = await client.liveStreams.list({
        name: 'Testing1'
    });

    // retrieve the livestreams having a given stream key
    const liveStreams3 = await client.liveStreams.list({
        streamKey: '1e46ce94-5877-4646-89fb-71cfe037c745'
    });

    // retrieve the second page of 30 items sorted by name desc
    const liveStreams4 = await client.liveStreams.list({
        sortBy: 'name',
        sortOrder: 'desc',
        currentPage: 1,
        pageSize: 30
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ liveStreams }));
}

function handleAddStream(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Response for Route 2' }));
}

function handleDeleteStream(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Response for Route 3' }));
}

function handleNotFound(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Wrong URL' }));
}
