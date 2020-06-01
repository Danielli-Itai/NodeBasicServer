
var mongojs = require('mongojs');
var db = mongojs('usersapp', ['users']);









/*****************************************\
*            Users Database               *
\*****************************************/
module.exports.get = function(req,res){
    var title = 'users db';  //  Server variable declaration.

    db.users.find(function (err,docs){
        console.log(docs);
        res.render('usersDb',{title:'Users Db', users:docs})
    })
    docs = [];
    res.render('usersDb',{title:'Users Db', users:docs})
}

module.exports.add_post = function(req,resp){
    db.users.find(function (err,docs){
        console.log(docs);

        //  Checking the in coming information and setting error messages in case of errors.
        req.checkBody("first_name", "Empty First name is not allowed.").notEmpty();
        req.checkBody("last_name", "Empty Last name is not allowed.").notEmpty();  
        req.checkBody("email", "Enter a valid email address.").isEmail();

        //  Getting the errors found during validation.
        var errors = req.validationErrors();
        if(errors){ //  re-rendering the document and returning the errors list.
            res.render('usersDbAdd',{title:'/users/db/add', users:docs, errors:errors});
            console.log('Errors');    
        }
        else{// Handling arrival of correct information.
            console.log(req.body.first_name);
            var newUser={
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email
            }
            db.users.insert(newUser, function(err,res){
                if(err){
                    console.log(err);
                }
                console.log(newUser);
                resp.redirect('/users/db');
            });
        }
    });
}
