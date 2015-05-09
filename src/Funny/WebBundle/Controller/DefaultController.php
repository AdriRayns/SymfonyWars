<?php

namespace Funny\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{   

    public function indexAction()
    {
        

        return $this->render('WebBundle:Templates/Body/Home:body_home.html.twig', array('categories' => $this->getCategories(),
                                                                        'products' => $this->getProductsAll() ));
    }


    public function searchAction(){
        $bag = $this->get('request')->request->all();

        //$toSearch = $bag['to_search'];
        
        /* Realizar busqueda y devolver la plantilla 
        ** search_results con el resultado de productos y categorías
        ** obtenidos 
        */
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();
        
        $results = $this->getProductsAll();;

        return $this->render('WebBundle:Templates:Searchs/search_results.html.twig', array('results' => $results ,
                                                                                'categories' => $this->getCategories() ));

    }


    public function getCategories(){
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();

        return $categories;
    }

    public function getProductsAll(){
        $em = $this->getDoctrine()->getManager();
        $allProducts = $em->getRepository('ProductBundle:Product')->findAll();

        return $allProducts;
    }

}
