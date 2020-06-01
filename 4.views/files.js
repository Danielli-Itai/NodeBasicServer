const fs = require('fs');
var path = require('path');
const uploadFolder = path.join(__dirname, '../public');





/*****************************************\
*           Handle files list view        *
\*****************************************/
var uploaded_list = [];
module.exports.get = function(req,res){
    var errors = req.validationErrors();
    var title = 'Uploaded Files';  //  Server variable declaration.
    var files_list = []
    fs.readdirSync(uploadFolder).forEach(file => {
          console.log(file);
          files_list.push(file);
      })    
    res.render('files',{title:title, files:files_list});    // Embedding the values in the client document.
}

module.exports.add_post = function(req, res)
{
    uploaded_list = [];
    console.log(req.files);
    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    sampleFile.mv(path.join(uploadFolder, sampleFile.name), function(err) {
        if (err){
            return res.status(500).send(err);
        }
        else{
            uploaded_list.push(sampleFile.name);
        }
    });

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFiles = req.files.sampleFiles;
    sampleFiles.forEach(function(file){
        console.log(file);
        // Use the mv() method to place the file somewhere on your server
        file.mv(path.join(uploadFolder, file.name), function(err) {
            if (err){
                return res.status(500).send(err);
            }
            else{
                uploaded_list.push(file.name);
            }
        });
    })
    res.redirect('/files');
}




module.exports.delete = function(req, res)
{
    //var title = 'users';  //  Server variable declaration.
    console.log(req.params.id);

    fs.unlink(path.join(uploadFolder, req.params.id), function(err){
        if(err){
            console.log(err);
        }
    });
    this.get(req,res);
    //res.redirect('/files');
}


module.exports.download = function(req, res)
{
    res.download(path.join(uploadFolder, req.params.id));
}

