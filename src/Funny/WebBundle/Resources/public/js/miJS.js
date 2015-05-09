var cambiar = function(id_campo){
   
    if(!$('#modifyForm').get(0)){
        form = $("<form id='modifyForm' name='modifyForm' action='perfil/modify' method='POST' >");
        $('#cuerpoPerfil').before(form);
        $('#modifyForm').append($('#cuerpoPerfil'));
    }
    
    if(!$('#Input_'+id_campo).get(0)){
        input = $("<input type=\"text\" id=Input_"+id_campo+"  \n\
                    name=newData["+id_campo+"] value=\"\"/>");
        $("#"+id_campo+" a").before($(input));
        $("#Btn_"+id_campo+"").remove();
        
        if(!$('#Btn_post').get(0)){
            button = $("<input id='Btn_post' class='btnSesion' type=submit name='submit' value='Enviar Cambios' />");
            $("#"+id_campo).before($(button));
        }
    }
    //Falta quitar botones de MODIFICAR y añadir un BOTON-POST comprobando si existe antes
}




 var crearGestion = function(gestion_name){
    $('#modalShareBody').css('display', 'block');
    switch (gestion_name){
        case 'users': 
            $('#btnAdminUsers a').text("Introducir nuevo Usuario").attr('onclick',"formularioInsercionUser()");
            $('#resultsUsers').css('display', 'block');
            $('#btnAdminCategories').remove();
            $('#btnAdminProducts').remove();
            $('#submitArea').css('display', 'none');
            
            break;
        case 'categories': 
            $('#btnAdminCategories a').text("Introducir nueva Categoría").attr('onclick',"formularioInsercionCategory()");
            $('#resultsCategories').css('display', 'block');
            $('#btnAdminUsers').remove();
            $('#btnAdminProducts').remove();
            $('#submitArea').css('display', 'none');
            break;
        case 'products': 
            $('#btnAdminProducts a').text("Introducir nuevo Producto").attr('onclick',"formularioInsercionProduct()");
            $('#resultsProducts').css('display', 'block');
            $('#btnAdminUsers').remove();
            $('#btnAdminCategories').remove();
            $('#submitArea').css('display', 'none');
            break;
        case 'cargaMasiva':
            $('#panelGuest').css('display', 'none');
            $('#XMLArea').css('display', 'inline');
            $('#submitArea').css('display', 'inline');
            $('#btnAdminProducts').remove();
            $('#btnAdminUsers').remove();
            $('#btnAdminCategories').remove();
            
            $('#formUser').css('display','none');
            $('#formProduct').css('display','none');
            $('#formCategory').css('display','none');
            $('#formNewUser').css('display','none');
            $('#formNewProduct').css('display','none');
            $('#formNewCategory').css('display','none');
            
            $('#btnCargaMasiva').css('display','block');
            $('#formFile').css('display','block');
            $('#btnCargaMasiva').children(0).remove();//METER ONCLICK FUNCTION
            $('#btnCargaMasiva').append($('#formFile'));
            
            break;
    }
    
 };
  
 var rellenarFormularioModUser = function (user_id){
     var formUser = $('#formUser'),
        ruta = $('#formUser').attr('action'),
        input,rutaGeneral,finIndex;
    finIndex = ruta.indexOf('/public');
    rutaGeneral = ruta.substring(0,finIndex+7);
    
    var values= new Array(),
            as= $("#li_userID_"+user_id+" a:not(:last)"),
            total_as = as.length;
    
    for(var i=1 ; i<total_as ; i++){
        values.push(as[i].innerHTML);
    }
    $('#btnAdminUsers').css('display','block');
    formUser.css('display','block');
    if(!formUser.hasClass('activo')){
        formUser.attr({class:'activo',action:rutaGeneral+'/user/'+user_id});
        
        input = $('<input type="text" name="nickname" placeholder='+values[0]+'>');
        formUser.append(input);
        input = $('<input type="text" name="name" placeholder='+values[1]+'>');
        formUser.append(input);
        input = $('<input type="text" name="last_name" placeholder='+values[2]+'>');
        formUser.append(input);
        input = $('<input type="text" name="dni" placeholder='+values[3]+'>');
        formUser.append(input);
        input = $('<input type="text" name="email" placeholder='+values[4]+'>');
        formUser.append(input);
        input = $('<input type="text" name="birthday" placeholder='+values[5]+'>');
        formUser.append(input);
        
        
        
        br = $('<br>').appendTo(formUser);
        labelCheckbox = $('<label/>', {for:"checkboxActive",text:"Activo:" }).appendTo(formUser).appendTo(formUser);
        checkbox = $('<input type="checkbox" id="checkboxActive" name="active" value=1 >').appendTo(formUser);
        labelCheckbox = $('<label/>', {for:"checkboxActive",text:"Si  " }).appendTo(formUser).appendTo(formUser);
        checkbox = $('<input type="checkbox" id="checkboxActive" name="active" value=0 >').appendTo(formUser);
        labelCheckbox = $('<label/>', {for:"checkboxActive",text:"No  " }).appendTo(formUser).appendTo(formUser);
        
        input = $("<input id='submitUser' type='submit' name='submit' >").attr('value','Modificar Usuario');
        formUser.append(input);
    } else{
        $('#formNewUser').css('display','none');
        $("#formUser input[name='nickname']").attr('placeholder',values[0]);
        $("#formUser input[name='name']").attr('placeholder',values[1]);
        $("#formUser input[name='last_name']").attr('placeholder',values[2]);
        $("#formUser input[name='dni']").attr('placeholder',values[3]);
        $("#formUser input[name='email']").attr('placeholder',values[4]);
        $("#formUser input[name='birthday']").attr('placeholder',values[5]);
        $("#formUser input[name='active']").attr('placeholder',values[6]);
        
        $('#submitUser').attr('value','Modificar Usuario');
        formUser.attr('action',rutaGeneral+'/user/'+user_id);
    }
     
 };
 
 
 var rellenarFormularioModCategoria = function (category_id){ //Si se piensa se recibe el objeto en vez de un id y se genera dinamicamente
    var formCategory = $('#formCategory'),
        ruta = $('#formCategory').attr('action'),
        input,rutaGeneral,finIndex;
    finIndex = ruta.indexOf('/public');
    rutaGeneral = ruta.substring(0,finIndex+7);
    
    var values= new Array(),
            as= $("#li_categoryID_"+category_id+" a"),
            total_as = as.length,
            span = $("#li_categoryID_"+category_id+" span").text();
    console.log(span);
    for(var i=1 ; i<total_as ; i++){
        values.push(as[i].innerHTML);
    } 

    var x = $('#resultsCategories li').toArray(),
            categoriasPadre = new Array(),
            y= Array.prototype.slice.call(x);
    
    y.forEach(function (li) {
        var categoria = (li.querySelector('span').innerHTML),
            nombre = $(li).children("a[title='category_name']").text(),
            id = $(li).children("a[title='id']").text();
        if( categoria == 0)
            categoriasPadre.push({'nombre': nombre , 'id':id, 'padre': categoria});
    });
    
//    console.log(categoriasPadre);
    
    
    if(!formCategory.hasClass('activo')){
        $('#formCategory').attr({class:'activo',action:rutaGeneral+'/category/'+category_id});

        input = $('<input type="text" name="category_name" placeholder='+values[0]+'>').appendTo(formCategory);
//        input = $('<input type="text" name="father_id" >').attr('placeholder','PADRE ='+values[2]).appendTo(formCategory);
        input = $('<select id="fathersList" name="father_id" >').appendTo(formCategory);
        if (span != 0){
            categoriasPadre.forEach(function (categoria){
                option= $('#fathersList').append($('<option value='+categoria.id+'>'+categoria.nombre+'</option>'));
            });
        } else {
            option= $('#fathersList').append($('<option value=0> Es categoría padre </option>'));
        }
            input = $("<input id='submitCategory' type='submit' name='submit' >").attr('value','Modificar Categoría').appendTo(formCategory);
        
    } else{
        $("#formCategory input[name='category_name']").attr('placeholder',values[0]);
        $('#fathersList').empty();
        if (span != 0){
            categoriasPadre.forEach(function (categoria){
                option= $('#fathersList').append($('<option value='+categoria.id+'>'+categoria.nombre+'</option>'));
            });
        } else {
            option= $('#fathersList').append($('<option value=0> Es categoría padre </option>'));
        }
        
        formCategory.attr('action',rutaGeneral+'/category/'+category_id);
    }
 };
 
 
 var rellenarFormularioModProduct = function (product_id){
     var formProduct = $('#formProduct'),
        ruta = $('#formProduct').attr('action'),
        input,rutaGeneral,finIndex;
    finIndex = ruta.indexOf('/public');
    rutaGeneral = ruta.substring(0,finIndex+7);
    var values= new Array();
    
    var as= $("#li_productID_"+product_id+" a:not(:last)"),
            total_as = as.length;
    
    for(var i=1 ; i < total_as ; i++){
        values.push(as[i].innerHTML);
    }
    
    var x = $('#resultsCategories li').toArray(),
            categoriasHijas = new Array(),
            y= Array.prototype.slice.call(x);
    
    y.forEach(function (li) {
        var categoria = (li.querySelector('span').innerHTML),
            nombre = $(li).children("a[title='category_name']").text(),
            id = $(li).children("a[title='id']").text();
        if( categoria != 0)
            categoriasHijas.push({'nombre': nombre , 'id':id, 'padre': categoria});
    });
    
    
    $('#btnAdminProducts').css('display','block');
    formProduct.css('display','block');
    if(!formProduct.hasClass('activo')){
        $('#formProduct').attr({display: 'block',class:'activo ',action:rutaGeneral+'/product/'+product_id});
        $('#formNewProduct').css('display','none');
        input = $('<select id="sonsList" name="category_id">').appendTo(formProduct);
        input = $('<input type="text" name="name" >').attr('placeholder',values[0]).appendTo(formProduct);
        input = $('<input type="text" name="brand" >').attr('placeholder',values[1]).appendTo(formProduct);
        input = $('<input type="text" name="price" >').attr('placeholder',values[2]).appendTo(formProduct);
        input = $('<input type="text" name="discount"  >').attr('placeholder',values[3]).appendTo(formProduct);
//        input = $('<input type="text" name="category_id"  >').attr('placeholder',values[4]).appendTo(formProduct);


        categoriasHijas.forEach(function (categoria){
            if(values[4].toString() ==    categoria.id.toString()){
                option = $('#sonsList').append($('<option value='+categoria.id+' selected>'+categoria.nombre+'</option>'));
            } else{
                option = $('#sonsList').append($('<option value='+categoria.id+'>'+categoria.nombre+'</option>'));
            } 
        });
        
        
        input = $('<textarea name="description"  >').attr('placeholder','Descripción del producto').appendTo(formProduct);
        br = $('<br>').appendTo(formProduct);
        
        labelCheckbox = $('<label/>', {for:"checkboxDestacar",text:"Destacar" }).appendTo(formProduct).appendTo(formProduct);
        checkbox = $('<input type="checkbox" id="checkboxDestacar" name="destacar" value=1 >').appendTo(formProduct);
        labelCheckbox = $('<label/>', {for:"checkboxDestacar",text:"Si  " }).appendTo(formProduct).appendTo(formProduct);
        checkbox = $('<input type="checkbox" id="checkboxDestacar" name="destacar" value=0 >').appendTo(formProduct);
        labelCheckbox = $('<label/>', {for:"checkboxDestacar",text:"No  " }).appendTo(formProduct).appendTo(formProduct);
        
        br = $('<br>').appendTo(formProduct);
        labelCheckbox = $('<label/>', {for:"checkboxNovedad",text:"Novedad" }).appendTo(formProduct).appendTo(formProduct);
        checkbox = $('<input type="checkbox" id="checkboxNovedad" name="novedad" value=1 >').appendTo(formProduct);
        labelCheckbox = $('<label/>', {for:"checkboxNovedad",text:"Si  " }).appendTo(formProduct).appendTo(formProduct);
        checkbox = $('<input type="checkbox" id="checkboxNovedad" name="novedad" value=0 >').appendTo(formProduct);
        labelCheckbox = $('<label/>', {for:"checkboxNovedad",text:"No  " }).appendTo(formProduct).appendTo(formProduct);
        
        $('#fileImageProduct').removeClass('oculto');
        
        input = $("<input id='submitProduct' type='submit' name='submit' >").attr('value','Modificar Producto ').appendTo(formProduct);;
        
        
    } else{
        $('#sonsList').empty();
        categoriasHijas.forEach(function (categoria){
            if(values[4].toString() ==    categoria.id.toString()){
                option = $('#sonsList').append($('<option value='+categoria.id+' selected>'+categoria.nombre+'</option>'));
            } else{
                option = $('#sonsList').append($('<option value='+categoria.id+'>'+categoria.nombre+'</option>'));
            } 
        });
        
        $('#formNewProduct').css('display','none');
        $("#formProduct input[name='name']").attr('placeholder',values[0]);
        $("#formProduct input[name='brand']").attr('placeholder',values[1]);
        $("#formProduct input[name='price']").attr('placeholder',values[2]);
        $("#formProduct input[name='discount']").attr('placeholder',values[3]);
        
        $('#submitProduct').attr('value','Modificar Producto');
        formProduct.attr('action',rutaGeneral+'/product/'+product_id);
    }
 };
 
 
 var formularioInsercionUser = function(){
    $('#formNewUser').css('display','block');
    $('#btnAdminUsers').css('display','none');
    $('#formUser').css('display','none');
    
     
 }
 var formularioInsercionCategory = function(){
    $('#formNewCategory').css('display','block');
    $('#btnAdminCategories').css('display','none');
     
 };
 var formularioInsercionProduct = function(){
    $('#formNewProduct').css('display','block');
    $('#btnAdminProducts').css('display','none');
    $('#formProduct').css('display','none');
 };
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 