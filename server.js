var service = require("./service.js");
var authData = require("./auth-service");
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 7070;
const exphbs = require("express-handlebars");
const stripJs = require("strip-js");
const clientSessions = require("client-sessions");




//css part
// app.use(express.static('css'));
app.use(express.urlencoded({ extended: true }));

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  helpers: {
      navLink: function (url, options) {
          return '<li' +
              ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
              '><a href="' + url + '">' + options.fn(this) + '</a></li>';
      },
      equal: function (lvalue, rvalue, options) {
          if (arguments.length < 3)
              throw new Error("Handlebars Helper equal needs 2 parameters");
          if (lvalue != rvalue) {
              return options.inverse(this);
          } else {
              return options.fn(this);
          }
      },
      safeHTML: function (context) {
          return stripJs(context);
      },
      formatDate: function(dateObj){
          let year = dateObj.getFullYear();
          let month = (dateObj.getMonth() + 1).toString();
          let day = dateObj.getDate().toString();
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2,'0')}`;
      },
  }
}));
app.set('view engine', '.hbs');

app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "week10example_web322", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));


app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
  app.locals.viewingCategory = req.query.category;
  next();
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
  res.redirect('body');
});

app.get("/body", function(req,res){
  res.render('body');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // var userData = req.body;
  authData.registerUser(req.body)
  
  .then(() => {
      res.render('register', { successMessage: "User created" });
    })
    .catch((err) => {
      res.render('register', { errorMessage: err, userName: req.body.userName });
    });
})

app.post('/login', (req,res) => {
  req.body.userAgent = req.get('User-Agent');
  authData.checkUser(req.body)
  .then((user) => {
      req.session.user = {
          userName: user.userName, // authenticated user's userName
          email: user.email, // authenticated user's email
          loginHistory: user.loginHistory// authenticated user's loginHistory
      };
      res.redirect("/");
  })
  .catch((err) => {
      res.render('login', { errorMessage: err, userName: req.body.userName });
    }); 
})

app.get('/logout', (req, res)=> {
  req.session.reset();
  res.redirect('/');
})

app.get('/userHistory', ensureLogin, (req, res) => {
  res.render('userHistory');
})

app.use((req, res) => {
  res.render('404');
});

// setup http server to listen on HTTP_PORT
// app.listen(HTTP_PORT, onHttpStart);
authData.initialize()
.then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})