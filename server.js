//Install express server
express = require('express');
path = require('path');

app = express();

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + 'velostok-ui'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
