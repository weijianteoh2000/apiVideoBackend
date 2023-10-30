const http = require('http');
const url = require('url');
const ApiVideoClient = require('@api.video/nodejs-client');

const client = new ApiVideoClient({ apiKey: "NkaLmydeIOtdBlVKuayXJ5rQjxHtIMGnEgBAnHgrE9V" });

const local = '127.0.0.1';
const host = 'https://apivideobackend.onrender.com';

const hostname = host;

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

// server.listen(hostname, () => {
//     console.log(`Server running at http://${hostname}/`);
// });

async function handleGetStream(req, res) {
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

async function handleAddStream(req, res) {
    const liveStreamCreationPayload = {
        name: "My Live Stream", // Add a name for your live stream here.
        _public: true, // Whether your video can be viewed by everyone, or requires authentication to see it. 
    };

    const liveStream = await client.liveStreams.create(liveStreamCreationPayload);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Response for Route 2' }));
}

async function handleDeleteStream(req, res) {
    const liveStreamId = 'li400mYKSgQ6xs7taUeSaEKr'; // The unique identifier of the live stream whose thumbnail you want to delete.

    const liveStream = await client.liveStreams.delete(liveStreamId);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Response for Route 3' }));
}

function handleNotFound(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Wrong URL' }));
}
