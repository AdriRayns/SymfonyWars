<?php

namespace Funny\ProductBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends Controller
{   


    public function seeCategoryAction(Request $request, $category_slug ){
        $category = $this->getDoctrine()->getRepository('Funny\ProductBundle\Entity\Category')->findOneBySlug($category_slug);
        $category_products = $this->getDoctrine()->getRepository('Funny\ProductBundle\Entity\Product')->findByCategory($category);

        //return var_dump($category_products);
        return $this->render('ProductBundle:Category:show_category.html.twig', array('category_products' => $category_products));


        
    }



    public function getCategories(){
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();

        return $categories;
    }

}
