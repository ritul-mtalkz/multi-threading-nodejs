### How To Use Multithreading in Node.js
I followed this tutorial **[Link](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js)**.

#### Without Using Multithreading
![Without Using Multithreading](https://raw.githubusercontent.com/ritul-mtalkz/multi-threading-nodejs/main/images/Without_using_threading.jpg)
Output shows that it takes about **16** seconds to get a response

#### Using Multithreading
![Using Multithreading](https://raw.githubusercontent.com/ritul-mtalkz/multi-threading-nodejs/main/images/Using_threading.jpg) Output shows that it takes about **6** seconds to get a response

The **time** command measures how long the curl command runs. The **curl** command sends an HTTP request to the given URL and the **--get** option instructs curl to make a **GET** request