const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

const THREAD_COUNT = 8;

function createWorker() {
    return new Promise(function (resolve, reject) {
        const worker = new Worker("./four_workers.js", {
            workerData: { thread_count: THREAD_COUNT },
        });
        worker.on("message", (data) => {
            resolve(data);
        });
        worker.on("error", (msg) => {
            reject(`An error ocurred: ${msg}`);
        });
    });
}

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
    // let counter = 0;
    // for (let i = 0; i < 20_000_000_000; i++) {
    //     counter++;
    // }
    // const counter = await calculateCount();
    // res.status(200).send(`result is ${counter}`);
    // const worker = new Worker("./worker.js");
    // worker.on("message", (data) => {
    //     res.status(200).send(`result is ${data}`);
    // });
    // worker.on("error", (msg) => {
    //     res.status(404).send(`An error occurred: ${msg}`);
    // });

    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }
    const thread_results = await Promise.all(workerPromises);
    const total =
        thread_results[0] +
        thread_results[1] +
        thread_results[2] +
        thread_results[3];
    res.status(200).send(`result is ${total}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});