<?php

namespace Funny\ProductBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * 
 */
class CategoryRepository extends EntityRepository
{
    
    public function getAllCategories() {
      $q = $this->getEntityManager()->createQuery('SELECT category
                                                   FROM ProductBundle:Category category');
      return $q->getResult();
    }
   
}