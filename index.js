const request = require('request');

class PDFifyClient {
  constructor(options) {
    this.baseUrl = options.baseUrl || 'http://localhost:3000';
  }

  /*
    Convert html file to PDF document.

    If request PDF output format is "direct" you will receive binary Buffer,
    otherwise JSON object.

    Data object example:
    {
      "format": "binary",
      "orientation": "portrait",
      "zoomFactor": 0.825,
      "html": "<h1>Test</h1>",
      "paperSize": "A4",
      "paperMargin": {
        "left": "1cm",
        "right": "1cm",
        "top": "1cm",
        "bottom": "1cm"
      },
      "javascriptEnabled": true,
      "loadImages": true,
      "resourceTimeout": 8000,
      "userAgent": "PDFify 1.0"
    }

    Example usage:

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
   */
  convert(data) {
    if (! data) {
      return Promise.reject('Data object is undefined.');
    }

    if (! data.html && ! data.url) {
      return Promise.reject('HTML and URL fields are empty.');
    }

    data.format = data.format || 'binary';
    let requestData = {
      url: this.baseUrl + '/convert',
      headers: {
        'Content-Type': 'application/json'
      },
      json: data
    };

    // We need to set encoding = null to receive binary Buffer from request
    if (data.format === 'binary') {
      requestData.encoding = null;
    }

    return new Promise((resolve, reject) => {
      request.post(requestData, function(err, response, body) {
        if (err) {
          return reject(err);
        }

        if (response.statusCode === 200) {
          return resolve(body);
        } else {
          return reject(body);
        }
      });
    })
  }
}

module.exports = PDFifyClient;
