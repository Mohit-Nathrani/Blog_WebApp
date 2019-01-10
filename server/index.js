// dependencied
var express = require('express')
var app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const Blog = require('./models/blog');
const User = require('./models/user');
const Comment = require('./models/comment')

//middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.CookieKey]
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

//connect to database
mongoose.connect(keys.database,{ useNewUrlParser: true })
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));
mongoose.Promise = global.Promise;



//app.use(express.static(path.join(__dirname, 'client/build')));
 
//basic-get
app.get('/check', (req,res) => {
    res.send({success:true});
});

// set up routes
app.use('/auth', authRoutes);

app.post('/api/home', (req,res) => {
    if(!req.user){
	   isAuth= false
       user= null 
    }
    else{
        isAuth=true
        user=req.user
    }   
    Blog.find()
    .sort({'_id':-1})
    .limit(10)
    .populate({
        path:'auther',
        model: User
    })
    .exec( function(err,recent){
        if(err){
            res.send({
                success:true,
                got_homepage: false, 
                isAuth:isAuth, 
                user:user
            });
        }
        else{
            Blog.find()
            .sort({'liked_by':-1})
            .limit(10)
            .populate({
                path:'auther',
                model: User
            })
            .exec( function(err,popular){
                if(err){
                    res.send({
                        success:true,
                        got_homepage: false, 
                        isAuth:isAuth, 
                        user:user
                    });
                }
                else{
                    res.send({
                        success:true, 
                        got_homepage: true,
                        isAuth: isAuth, 
                        user: user,
                        recent: recent,
                        popular: popular
                    });
                }
            });
        }
    });
});

app.post('/api/profile', (req, res) => {
    if(!req.user){
        res.send({success:true, isAuth:false});
    } 
    else{
        blog_details = []
        Blog.find({_id: { $in : req.user.blogs }}, function(err,blogs){
            blogs.forEach(blog => {
                blog_details.push({
                    title:blog.title,
                    featured_image: blog.featured_image,
                    id:blog._id
                })
            })
            res.send({success:true, isAuth:true, user:req.user, blog_details: blog_details});
        });
    }
});

app.post('/api/check_login',(req,res) => {
    if(!req.user){
        res.send({success:true, isAuth:false});
    } 
    else {
        res.send({success:true, isAuth:true, user:req.user});
    }
});


app.post('/api/post_blog', (req, res)=> {
    if(!req.user)
    {
        res.send({
            success: true,
            posted_blog :false,
            err: 'Login first to post a blog.'
        });
    }
    else{
        Blog.create({
            auther: req.user._id,
            title: req.body.title,
            featured_image: req.body.featured_image,
            content: req.body.content
        })
        .then(blog => {
            User.findOneAndUpdate({_id: req.user._id}, {$push: {blogs:blog._id}})
                .then(user => res.send({success:true,blog_created: true, blog_id: blog._id}))
                .catch(err => {
                    res.send({success:true,blog_created: false, err: 'Some data is missing.'})
                });
        })
        .catch(err => {
            res.send({success: true, blog_created: false, err: 'Some data is missing.'});
        });
    }
});

app.post('/api/get_blog', (req, res)=> {
    Blog.findById(req.body.blog_id)
    .populate({
        path:'comments',
        model: Comment,
        options: { sort: { _id: -1 } },
        populate:{
            path:'reply',
            options: { sort: { _id: -1 } },
            populate: { 
                path: 'reply',
                options: { sort: { _id: -1 } },
                populate: { 
                    path: 'reply',
                    options: { sort: { _id: -1 } },
                    populate: { 
                        path: 'reply',
                        options: { sort: { _id: -1 } },
                        populate: { 
                            path: 'reply',
                            options: { sort: { _id: -1 } }
                        }
                    }   
                }    
            }
        }
    })
    .exec(function (err, blog) {
        if (err){
            res.send({success:true, got_blog:false, err:'some error'});
        }
        else{
            User.findById(blog.auther,function(err, user){
                if(err){
                    res.send({
                        success: true,
                        got_blog: false,
                        error: 'auther info is not available',
                    });
                }
                if(!req.user){
                    res.send({
                        success: true,
                        got_blog: true,
                        isAuth: false,
                        user: null,
                        blog: blog,
                        auther: user,
                        liked: false
                    });
                }
                else{
                    var flag=false;
                    blog.liked_by.forEach((id) => {
                        if(req.user._id.equals(id)){
                            flag=true;
                        }
                    });
                    res.send({
                        success: true,
                        got_blog: true,
                        isAuth: true,
                        user: req.user,
                        blog: blog,
                        auther: user,
                        liked: flag
                    });
                }
            });
        }
    });
    /*Blog.findOne({_id:req.body.post_id},function(err,blog){
        if(err){
            res.send({
                success: true,
                got_blog :false,
                error: 'inputs are not proper'
            });
        }
        else if(blog){
            User.findOne({_id: blog.auther},function(err, user){
                if(err){
                    console.log('err: ',err);
                    res.send({
                        success: true,
                        got_blog: false,
                        error: 'auther info is not available',
                    });
                }
                else if(!req.user){
                    res.send({
                        success: true,
                        got_blog: true,
                        isAuth: false,
                        user: null,
                        blog: blog,
                        auther: user
                    });
                }
                else{
                    var flag=false;
                    blog.liked_by.forEach((id) => {
                        if(req.user._id.equals(id)){
                            flag=true;
                        }
                    });
                    res.send({
                        success: true,
                        got_blog: true,
                        isAuth: true,
                        user: req.user,
                        blog: blog,
                        auther: user,
                        liked: flag
                    });
                }
            });
        }
        else{
            res.send({
                success: true,
                got_blog :false,
                error: 'Blog not found'
            });
        }
    });*/
});

app.post('/api/like_blog', (req, res)=> {
    Blog.findOne({_id:req.body.blog_id},function(err,blog){
        if(err){
            res.send({
                success: true,
                liked_blog :false,
                error: 'inputs are not proper'
            });
        }
        else if(blog){
            if(!req.user){
                res.send({
                    success: true,
                    liked_blog :false,
                    error: 'Login first.'
                });
            }
            else{
                var flag=false;
                blog.liked_by.forEach((id) => {
                    if(req.user._id.equals(id)){
                        flag=true;
                    }
                });

                if(flag){
                    res.send({
                        success: true,
                        liked_blog: false,
                        error: 'You have already liked this blog.'
                    });
                }
                else{
                    blog.liked_by.push(req.user._id);
                    blog.save();
                    res.send({
                        success: true,
                        liked_blog: true
                    });
                }
            }
        }
        else{
            res.send({
                success: true,
                liked_blog :false,
                error: 'Blog not found.'
            });
        }
    });
});


app.post('/api/post_comment_reply', (req, res)=> {
    if(!req.user)
    {
        res.send({
            success: true,
            posted_blog :false,
            err: 'Login first to post a comment.'
        });
    }
    else{
        Comment.findById(req.body.comment_id,function(err,comment){
            if(err){
                res.send({
                    success: true,
                    liked_blog :false,
                    error: 'inputs are not proper'
                });
            }
            else if(!comment){
                res.send({
                    success: true,
                    liked_blog :false,
                    error: 'Blog not found.'
                });
            }
            else{
                if(comment.level>5){
                    res.send({success:true,commment_created: false, err: 'comment not saved.'})
                }
                else{
                    Comment.create({
                        auther: req.user._id,
                        auther_name: req.user.username,
                        text: req.body.text,
                        level: comment.level+1
                    })
                    .then(new_comment => {
                        comment.reply.push(new_comment._id);
                        comment.save()
                        .then(saved_comment => res.send({success:true,comment_created: true, comment_id: new_comment._id}))
                        .catch(err => {
                            res.send({success:true,commment_created: false, err: 'comment not saved.'})
                        });
                    })
                    .catch(err => {
                        res.send({success: true, comment_created: false, err: 'Some data is missing.'});
                    });
                }
            }
        });
    }
});


app.post('/api/post_comment', (req, res)=> {
    if(!req.user)
    {
        res.send({
            success: true,
            posted_blog :false,
            err: 'Login first to post a comment.'
        });
    }
    else{
        Blog.findById(req.body.blog_id,function(err,blog){
            if(err){
                res.send({
                    success: true,
                    comment_created :false,
                    error: 'inputs are not proper'
                });
            }
            else if(!blog){
                res.send({
                    success: true,
                    comment_created :false,
                    error: 'Blog not found.'
                });
            }
            else{
                Comment.create({
                    auther: req.user._id,
                    auther_name: req.user.username,
                    text: req.body.text,
                    level: 0
                })
                .then(comment => {
                    blog.comments.push(comment._id);
                    blog.save()
                    .then(saved_blog => res.send({success:true,comment_created: true, comment_id: comment._id}))
                    .catch(err => {
                        res.send({success:true,commment_created: false, err: 'comment not saved.'})
                    });
                })
                .catch(err => {
                    res.send({success: true, comment_created: false, err: 'Some data is missing.'});
                });
            }
        });
    }
});

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

var port = process.env.PORT || 3001;
var server = app.listen(port,function(){
	console.log('server listening....')
});