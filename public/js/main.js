// Um Artikel einer DB zu löschen, muss eine Ajax-Request gemacht werden
// Mit Hilfe von jQuery wird die Request durchgeführt
$(document).ready(function() {
    $('.delete-article').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/article/' + id,
            success: function(response) {
                alert('Artikel gelöscht');
                window.location.href='/';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});