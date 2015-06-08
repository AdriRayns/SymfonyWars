<?php

namespace Funny\ProductBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Category
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Funny\ProductBundle\Entity\CategoryRepository")
 */
class Category
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    private $slug;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="childrens")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    private $parent;

    /**
     * @var Category
     *
     * @ORM\OneToMany(targetEntity="Category", mappedBy="parent")
     */
    private $childrens;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;
        $this->setSlug($name);
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set slug
     *
     * @param string $slug
     * @return Category
     */
    public function setSlug($name)
    {
        $slug = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        $slug = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $slug);
        $slug = strtolower(trim($slug, '_'));
        $slug = preg_replace("/[\/_|+ -]+/", '_', $slug);

        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string 
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set parent
     *
     * @param string $parent
     * @return Category
     */
    public function setParent($parent)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return string 
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set childrens
     *
     * @param string $children
     * @return Category
     */
    public function setChildrens($childrens)
    {
        $this->childrens = $childrens;

        return $this;
    }

    /**
     * Get childrens
     *
     * @return string 
     */
    public function getChildrens()
    {
        return $this->childrens;
    }

    public function getExpiresAt(){
        return $this->expiresAt;
    }

    public function __toString(){
        return $this->name;
    }
}
