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
        $toSearch = $bag['stringToSearch'];
        
        /* Realizar busqueda y devolver la plantilla 
        ** search_results con el resultado de productos y categorías
        ** obtenidos 
        */
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('ProductBundle:Product');
        $query = $em->createQuery('SELECT Product FROM ProductBundle:Product Product WHERE Product.name LIKE :toSearch ');
        $query->setParameters(array(':toSearch' => '%'.$toSearch.'%')); 

        $results = $query->getResult();

        return $this->render('WebBundle:Templates:Searchs/search_results.html.twig', array('results' => $results ));

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
