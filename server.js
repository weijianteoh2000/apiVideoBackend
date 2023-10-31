const http = require('http');
const url = require('url');
const ApiVideoClient = require('@api.video/nodejs-client');

const client = new ApiVideoClient({ apiKey: "NkaLmydeIOtdBlVKuayXJ5rQjxHtIMGnEgBAnHgrE9V" });

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/getStream') {
        handleGetStream(req, res, parsedUrl.query);
    } else if (pathname === '/addStream') {
        handleAddStream(req, res, parsedUrl.query);
    } else if (pathname === '/deleteStream') {
        handleDeleteStream(req, res, parsedUrl.query);
    } else {
        handleNotFound(req, res);
    }
});

server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

async function handleGetStream(req, res, query) {
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

    const responseData = {
        data: {
            liveStreams
        },
        status: "SUCCESS"
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}

async function handleAddStream(req, res, query) {
    const liveStreamCreationPayload = {
        name: "My Live Stream", // Add a name for your live stream here.
        _public: true, // Whether your video can be viewed by everyone, or requires authentication to see it. 
    };

    const liveStream = await client.liveStreams.create(liveStreamCreationPayload);

    const responseData = {
        data: {
            liveStream
        },
        status: "SUCCESS"
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}

async function handleDeleteStream(req, res, query) {
    if(query.id == null){
        handleNotFound(req, res)
    }
    const liveStreamId = query.id;

    const liveStream = await client.liveStreams.delete(liveStreamId);

    const responseData = {
        data: {
            liveStream
        },
        status: "SUCCESS"
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}

function handleNotFound(req, res) {
    const responseData = {
        data: {
            message: 'Wrong URL'
        },
        status: "FAIL"
    };

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
}
