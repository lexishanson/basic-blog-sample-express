'use strict';

var express = require('express');
var posts = require('./mock/posts');

var postLists = Object.keys(posts).map(function(value) {
                                  return posts[value]});

var app = express();


//  use method defines middleware for application. Middleware is
// the logic that tells express how to handle a request in between
// the time the request is made by the client, but before it
//  arrives at a route.
//  middleware can be used for many tasks, including authentication to serving static files.
//  middleware we're using is already included with Express
// first parameter we pass to 'static' method is path to public dir
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.get('/', (req, res) => {
    var path = req.path;
    // can do below to provide variable to template, or {} syntax, like in line 35.
    res.locals.path = path;
    res.render('index');
});

app.get('/blog/:title?', (req, res) => {
    var title = req.params.title;
    if (title === undefined) {
      res.status(503);
      res.render('blog', {posts: postLists})
    } if (posts[title] === undefined) {
      res.status(400);
      res.send("Post not found");
    } else {
      var post = posts[title];
      res.render('post', {post: post});
    }
});

app.listen(3000, () => {
    console.log("Front end site is running on 3000")
});