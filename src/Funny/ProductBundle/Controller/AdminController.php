<?php

namespace Funny\ProductBundle\Controller;

use Symfony\Bundle\SecurityBundle;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use JavierEguiluz\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class AdminController extends BaseAdminController {

/**
 * @Route("/admin/", name="admin")
 */
    public function indexAction(Request $request) {
        
        return parent::indexAction($request);
        /*
        var_dump($request);
        */
    }

/**
 * @Route("/admin", name="easy_admin_bundle")
 */
    public function deleteFromListAction() {
        $entity = $this->request->query->get('entity');
        $id = $this->request->query->get('id');
        $entityObj = $this->em->getRepository('ProductBundle:'.$entity)->find($id);
        $this->em->remove($entityObj);
        $this->em->flush();

        // redirect to the 'list' view of the given entity
        return $this->redirectToRoute('admin', array(
            'view' => 'list',
            'entity' => $entity,
        ));
    }

/**
 * @Route(path = "/admin/", name = "easy_admin_bundle")
 */
    public function pruebaAction() {
        $id = $this->get('request')->query->get('id');
        $entity = $this->get('request')->query->get('entity');
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('ProductBundle:Product');
        $product = $repo->findOneById($id);
        $product->setName('pruebaAction');
        $em->flush();
        // redirect to the 'list' view of the given entity
        return $this->redirectToRoute('admin', array(
            'view' => 'edit',
            'id' => $id,
            'entity' => $entity,
        ));
    }

    

}
