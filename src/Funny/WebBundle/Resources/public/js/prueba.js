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
});

