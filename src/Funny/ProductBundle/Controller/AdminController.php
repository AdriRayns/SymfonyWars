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
        $entityObj->removeUpload();
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





    public function prePersistProductEntity($entity){
        /*
        $slug = $this->get('slugger')->slugify($entity->getTitle());
        $entity->setSlug($slug);



        if(array_key_exists('img',$post))
            return var_dump($post['img']);
        else
            return var_dump($post);

        $post = $this->get('request')->get("img");
        return var_dump($post);

        */
        $file = $this->get('request')->files->get('form');
        $entity->preUpload($file['file']);
        $entity->upload();
    }



    public function preUpdateProductEntity($entity){
        $entity->removeUpload();
        $file = $this->get('request')->files->get('form');
        $entity->preUpload($file['file']);
        $entity->upload();

    }













    public function createProductForm($entity, array $entityProperties){

        /*$formBuilder = $this->createFormBuilder($entity, array(
            'data_class' => $this->entity['class'],
            'attr' => array('class' => $formCssClass, 'id' => $view.'-form'),
        ));*/
        $formCssClass = array_reduce($this->config['design']['form_theme'], function ($previousClass, $formTheme) {
            return sprintf('theme_%s %s', strtolower(str_replace('.html.twig', '', basename($formTheme))), $previousClass);
        });

        $formBuilder = $this->createFormBuilder($entity, array(
            'data_class' => $this->entity['class'],
            'attr' => array('class' => $formCssClass),
        ));

        foreach ($entityProperties as $name => $metadata) {
            $formFieldOptions = array();

            if ('association' === $metadata['fieldType'] && in_array($metadata['associationType'], array(ClassMetadataInfo::ONE_TO_MANY, ClassMetadataInfo::MANY_TO_MANY))) {
                continue;
            }

            if ('collection' === $metadata['fieldType']) {
                $formFieldOptions = array('allow_add' => true, 'allow_delete' => true);

                if (version_compare(\Symfony\Component\HttpKernel\Kernel::VERSION, '2.5.0', '>=')) {
                    $formFieldOptions['delete_empty'] = true;
                }
            }

            $formFieldOptions['attr']['field_type'] = $metadata['fieldType'];
            $formFieldOptions['attr']['field_css_class'] = $metadata['class'];
            $formFieldOptions['attr']['field_help'] = $metadata['help'];

            $formBuilder->add($name, $metadata['fieldType'], $formFieldOptions)
            ->add('file', 'file', array('label' => 'Imagen'));
        
        }

        return $formBuilder->getForm();
        /*
        return var_dump($formBuilder);
         */


    }

}
