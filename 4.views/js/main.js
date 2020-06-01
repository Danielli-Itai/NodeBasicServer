/*****************************************\
*         Document class events           *
\*****************************************/
$(document).ready(function(){
    $('.deleteUser').on('click',deleteUser);
    $('.deleteFile').on('click',deleteFile);
    $('.downloadFile').on('click',downloadFile);
});




/*****************************************\
*               User Events               *
\*****************************************/

function deleteUser(){
    var confirmation = confirm('Are you shore');

    if(confirmation){
        $.ajax({
            type:'DELETE',
            url:'/users/delete/' + $(this).data('id')
        }).done(function(response){
            window.location.replace('/users');
        });
    }else{
        return(false);
    }
}




/*****************************************\
*               File Events               *
\*****************************************/
//  Delete file on server.
function deleteFile(){
    var confirmation = confirm('Are you shore');

    if(confirmation){
        $.ajax({
            type:'DELETE',
            url:'/files/delete/' + $(this).data('id')
        }).done(function(response){
            window.location.replace('/files');
        });
    }else{
        return(false);
    }
}

//  Delete file on server.
function downloadFile(){
    var name = this;
    $.ajax({
        type:'GET',
        url:'/files/download/' + $(name).data('id')
    }).done(function(response){
        window.location.replace('/files');
        window.location.href = '/files/download/' + $(name).data('id');
    });
}
