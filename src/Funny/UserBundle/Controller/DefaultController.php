<?php

namespace Funny\UserBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('UserBundle:Default:index.html.twig', array('name' => $name));
    }


    public function deleteUserAction() {
        $em= $this->getDoctrine()->getManager();
        $user = $this->get('security.context')->getToken()->getUser();

        if($user === null || $user === "anon.") return $this->redirect($this->generateUrl('web_homepage'));
        else{
            $em->remove($user);
            $em->flush();
            return $this->redirect($this->generateUrl('fos_user_security_logout'));
        }
    }




    public function getCategories(){
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();

        return $categories;
    }
}
