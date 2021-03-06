const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const login				= require('./controllers/login');
const logout			= require('./controllers/logout');
const admin_home		= require('./controllers/Admin_home');
const Scout_home		= require('./controllers/Scout_home');
const Guser_home		= require('./controllers/Guser_home');
const home				= require('./controllers/home');
//const job				= require('./controllers/job');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/Admin_home', admin_home);
app.use('/Scout_home',Scout_home);
app.use('/Guser_home',Guser_home);
app.use('/logout', logout);
app.use('/home', home);
//app.use('/job',job);

//router
app.get('/', (req, res)=>{
	res.redirect('/login');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});