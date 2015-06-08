<?php

namespace Funny\ProductBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{   


    public function seeAction(Request $request, $category_slug ){
        $em = $this->getDoctrine()->getManager();

    }



    public function getCategories(){
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();

        return $categories;
    }

}
