const express= require('express'),
  path = require('path');

const app =express();


app.use(express.static('./dist/velostok-ui'));

app.get('/*', (req,res)=>{

  res.sendFile(path.join(__dirname,'/dist/velostok-ui/index.html'));

});

app.listen(process.env.PORT || 8080, ()=>{
  console.log('Server started');
})
