/*****************************************\
*            Users list                   *
\*****************************************/

var users_list =  [ 
    {   id:1,
        first_name:'John',
        last_name:'Bonjoby',
        email:'JohnBonjoby@gmail.com' },
    {   id:2,
        first_name:'Mark',
        last_name:'Knopler',
        email:'MarkKnopler@gmail.com' },
    {   id:3,
        first_name:'Cameroon',
        last_name:'Diez',
        email:'CameroonDiez@gmail.com'}
]

module.exports.get = function(req,res){
    var title = 'users';  //  Server variable declaration.
    res.render('users',{title:title, users:users_list});    // Embedding the values in the client document.    
}

module.exports.add_post = function(req,res){
    //  Checking the incomming information and setting error messages in case of errors.
    req.checkBody("first_name", "Empty First name is not allowed.").notEmpty();
    req.checkBody("last_name", "Empty Last name is not allowed.").notEmpty();  
    req.checkBody("email", "Enter a valid email address.").isEmail();

    //  Getting the errors found during validation.
    var errors = req.validationErrors();
    if(errors){ //  re-rendering the document and returning the errors list.
        res.render('usersAdd',{title:'/users/add', users:users_list, errors:errors});        	console.log('Errors');    
    }
    else{// Handling arrival of correct information.
        console.log(req.body.first_name);
        var newUser={
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email
        }
        users_list.push(newUser);
        console.log(newUser);

        res.redirect('/users');
    }
}

module.exports.delete = function(req,res){
    //var title = 'users';  //  Server variable declaration.
    console.log(req.params.id);

    users_list = users_list.filter(function(el){
        return el.id != req.params.id;
    });
    this.get(req,res);
}
