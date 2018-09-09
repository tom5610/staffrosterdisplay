'use strict';

let ejs = require('ejs');
let read = require('fs').readFileSync;
let join = require('path').join;
let path = join(__dirname, '/views/page.ejs');

let data = {
  users: [
    { name: 'Tobi', date: '10/09/2018', location: 'ABC Centre' },
		{ name: 'Alex', date: '11/09/2018', location: 'XZY Centre' },
		{ name: 'Monica', date: '12/09/2018', location: 'ANZ Centre' },
		{ name: 'Judy', date: '13/09/2018', location: 'XXX Centre' },
		{ name: 'Robert', date: '14/09/2018', location: 'ABC Centre' },
		{ name: 'Sam', date: '15/09/2018', location: 'ANZ Centre' }
  ]
};

const html = ejs.compile(read(path, 'utf8'), {filename: path})(data);

module.exports.displayPage = (event, context, callback) => {

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};
