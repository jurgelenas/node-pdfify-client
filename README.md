# PDFify Node.js client

Client module to query
[PDFify](https://www.github.com/jurgelenas/pdfify-server) server.

# Installation

With the command below you will install PDFify client package and
it will be added to your app package.json dependencies. 

```
npm install --save pdfify-client
```

# Usage

PDFify client exposes only one method ```convert(options)```. It returns Promise.

You can view available ```options``` fields in PDFify server 
[Readme.md Parameters section](https://www.github.com/jurgelenas/pdfify-server/Readme.md#parameters)


```javascript
const PDFifyClient = require('pdfify-client');
const fs = require('fs');

let client = new PDFifyClient({
  baseUrl: 'http://localhost:3000'
});

client.convert({
  url: 'https://news.ycombinator.com'
}).then((body) => {
  console.log(body);
  fs.writeFile('hn.pdf', body, 'binary', () => {});
}).catch((err) => {
  console.log(err);
});
```
