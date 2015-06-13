<?php

namespace Funny\ProductBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\MimeType\ExtensionGuesser;

/**
 * Product
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Product
{
    /**
    * @Assert\File(maxSize="5M")
    */
    private $file;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var Category
     * @ORM\ManyToOne(targetEntity="Funny\ProductBundle\Entity\Category")
     */
    private $category;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="brand", type="string", length=100)
     */
    private $brand;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float")
     */
    private $price;

    /**
     * @var float
     *
     * @ORM\Column(name="discount", type="float")
     */
    private $discount;

    /**
     * @var string
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    private $slug;

    /**
     * @var string
     *
     * @ORM\Column(name="img_route", type="string", length=255,  nullable=true)
     */
    private $imgRoute;

    /**
     * @var boolean
     *
     * @ORM\Column(name="novelty", type="boolean")
     */
    private $novelty;

    /**
     * @var boolean
     *
     * @ORM\Column(name="highlight", type="boolean")
     */
    private $highlight;


    public function __construct(){
        $this->description="";
    }

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
     * Set category
     *
     * @param string $category
     * @return Product
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;
        $this->setSlug($name, $this->getBrand());
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
     * Set brand
     *
     * @param string $brand
     * @return Product
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;

        $this->setSlug($this->name, $brand);
        return $this;
    }

    /**
     * Get brand
     *
     * @return string 
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Product
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set price
     *
     * @param float $price
     * @return Product
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return float 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set discount
     *
     * @param float $discount
     * @return Product
     */
    public function setDiscount($discount)
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * Get discount
     *
     * @return float 
     */
    public function getDiscount()
    {
        return $this->discount;
    }

    /**
     * Set slug
     *
     * @param string $slug
     * @return Product
     */
    public function setSlug($name, $brand)
    {   
        $nameAndBrand = $name . ' ' . $brand;
        $slug = iconv('UTF-8', 'ASCII//TRANSLIT', $nameAndBrand);
        $slug = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $slug);
        $slug = strtolower(trim($slug, '_'));
        $slug = preg_replace("/[\/_|+ -]+/", '_', $slug);
        $this->slug =$slug;

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
     * Set imgRoute
     *
     * @param string $imgRoute
     * @return Product
     */
    public function setImgRoute($imgRoute)
    {
        $this->imgRoute = $imgRoute;

        return $this;
    }

    /**
     * Get imgRoute
     *
     * @return string 
     */
    public function getImgRoute()
    {
        return $this->imgRoute;
    }

    /**
     * Set novelty
     *
     * @param boolean $novelty
     * @return Product
     */
    public function setNovelty($novelty)
    {
        $this->novelty = $novelty;

        return $this;
    }

    /**
     * Get novelty
     *
     * @return boolean 
     */
    public function getNovelty()
    {
        return $this->novelty;
    }

    /**
     * Set highlight
     *
     * @param boolean $highlight
     * @return Product
     */
    public function setHighlight($highlight)
    {
        $this->highlight = $highlight;

        return $this;
    }

    /**
     * Get highlight
     *
     * @return boolean 
     */
    public function getHighlight()
    {
        return $this->highlight;
    }

    public function __toString(){
        return $this->$slug;
    }




    public function getAbsolutePath()
    {
      return null === $this->imgRoute ? null : realpath($this->getUploadRootDir()."/".$this->imgRoute);
    }
    
    public function getWebPath()
    {
      return null === $this->imgRoute ? null : $this->getUploadDir()."/".$this->imgRoute;
    }
    
    public function getUploadRootDir()
    {
      // la ruta absoluta al directorio dï¿½nde se deben guardar los documentos cargados
      return realpath(__DIR__."/../../../../web/".$this->getUploadDir());
    }
        
    protected function getUploadDir()
    {
      // se libra del __DIR__ para no desviarse al mostrar ï¿½doc/imageï¿½ en la vista.
      return 'uploads/';
    }
    
    /**
     * Set file
     *
     * @param file $file
     * 
     */
    public function setFile($file)
    {
        $this->file = $file;
    
        return $this;
    }

    /**
     * Get file
     *
     * @param file $file
     * 
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
    * @ORM\PostRemove()
    */
    public function removeUpload()
    {
      if ($file = $this->getAbsolutePath()) {
        unlink($file);
      }
    }

    /**
    * @ORM\PostPersist()
    * @ORM\PostUpdate()
    */
    public function upload()
    {
      if (null === $this->file) {
        return;
      }
      
      // aquÃ­ debes lanzar una excepciÃ³n si el archivo no se puede mover
      // para que la entidad no se persista en la base de datos
      // lo cual hace automÃ¡ticamente el mÃ©todo move() del archivo subido
      $this->file->move($this->getUploadRootDir(), $this->imgRoute); 
      unset($this->file);
    }

    /**
    * @ORM\PrePersist()
    * @ORM\PreUpdate()
    */
    public function preUpload($file)
    {
      $this->setFile($file);
      if (null !== $this->file) {
        
        //haz lo que quieras para generar un nombre Ãºnico
        if ($this->file->guessExtension() === null) $this->format = 'bin';
        else $this->format = $this->file->guessExtension();
        
        $this->setImgRoute(uniqid().'_'.uniqid() . '.' . $this->format);
      }
    }
}
