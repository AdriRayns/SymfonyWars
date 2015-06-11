var $container = $('#elementos');
    // init
$container.isotope({
    // options
    itemSelector: '.elemento',
    getSortData: {
        nombreAsc: '.nombreAsc',
        nombreDes: '.nombreDes',
        precioAsc: '.precioAsc parseFloat',
        precioDes: '.precioDes parseFloat'
    },
    sortAscending: {
        nombreAsc: true,
        nombreDes: false,
        precioAsc: false,
        precioDes: true
    }
});


$('#sort').on('click','button',function(){
    var sortByValue= $(this).attr('data-sort-by');
    $container.isotope({sortBy: sortByValue});

    if( sortByValue === 'nombreAsc') {
        $(this).attr('data-sort-by', 'nombreDes');
        $(this).text("Nombre Descendiente");
    }
    else if(sortByValue === 'nombreDes'){
        $(this).attr('data-sort-by', 'nombreAsc');
        $(this).text("Nombre Ascendiente");
    }
    else if(sortByValue === 'precioAsc'){
        $(this).attr('data-sort-by', 'precioDes');
        $(this).text("Nombre Descendiente ");
    }
    else if(sortByValue === 'precioDes'){
        $(this).attr('data-sort-by', 'precioAsc');
        $(this).text("Nombre Ascendiente ");
    }

});


