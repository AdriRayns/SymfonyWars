<?php

namespace Funny\WebBundle\Util;

use Doctrine\ORM\EntityManager;
use Funny\ProductBundle\Entity\Category;

class Util extends \Twig_Extension {

    protected $em;

    public function __construct(EntityManager $em){
      $this->em = $em;
    }

    public function getAllCategories(){
        $allCategories = $this->em->getRepository('ProductBundle:Category')->getAllCategories();
        return $allCategories;
    }

    public function getName(){
      return 'WebBundle:Util';
   }



}
?>
