<?php

namespace Funny\ProductBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class ProductController extends Controller
{
    public function seeAction(Request $request, $product_slug)
    {
        $category_repository = $this->getDoctrine()->getRepository('Funny\ProductBundle\Entity\Category');
        $categories = $category_repository->getAllCategories(); 
        $product_repository = $this->getDoctrine()->getRepository('Funny\ProductBundle\Entity\Product');
        $product = $product_repository->findOneBySlug($product_slug);

        return $this->render('ProductBundle:Product:product.html.twig', array('product_slug' => $product_slug,
                                                                            'categories' => $categories,
                                                                            'product' => $product));
    }

    public function editAction($product_slug, Request $request)
    {
        $repository = $this->getDoctrine()->getRepository('Funny\ProductBundle\Entity\Category');
        $categories = $repository->getAllCategories();
        // IF PERSIST saved=1 ahora un texto de prueba
        $saved = 'Me he salvado';
        return $this->render('ProductBundle:Product:product.html.twig', array('product_slug' => $product_slug, 
                                                                            'saveAction' => $saved,
                                                                            'categories' => $categories));
    }


    public function getCategories(){
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('ProductBundle:Category')->findAll();

        return $categories;
    }


    /**
     * @Route(path = "/admin/prueba", name = "prueba")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function pruebaAction()
    {
        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository('Funny\ProductBundle\Entity\Product')->find($id);
        $entity->setName('laputa');
        $this->em->flush();

        // redirect to the 'list' view of the given entity
        return $this->redirectToRoute('admin', array(
            'view' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));
    }

}
