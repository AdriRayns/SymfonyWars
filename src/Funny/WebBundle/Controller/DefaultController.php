<?php

namespace Funny\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{   

    public function indexAction() {
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

        $product_query = $em->createQuery('SELECT Product FROM ProductBundle:Product Product WHERE Product.name LIKE :toSearch ');
        $product_query->setParameters(array(':toSearch' => '%'.$toSearch.'%')); 
        $product_results = $product_query->getResult();

        $category_query = $em->createQuery('SELECT Category FROM ProductBundle:Category Category WHERE Category.name LIKE :toSearch ');
        $category_query->setParameters(array(':toSearch' => '%'.$toSearch.'%')); 
        $category_results = $category_query->getResult();

        return $this->render('WebBundle:Templates:Searchs/search_results.html.twig', array('product_results' => $product_results,
                                                                                            'category_results' =>$category_results));

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
    public function getTokenAction() {
        return new Response($this->container->get('form.csrf_provider')
                                ->generateCsrfToken('authenticate'));
    }

}
