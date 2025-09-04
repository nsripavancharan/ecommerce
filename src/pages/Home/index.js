import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useEffect,useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { getAllCategories } from "../../api/getAllCategories"; 
import { useCart } from "../../context/card-context";
import { getProductsByCategory } from "../../utils/getProductsByCategory";

export const Home=()=>{

    const [products,setProducts]=useState([])
    const [categories,setCategories]=useState([])
    const [selectedCategory,setSelectedCategory]=useState("All");
    const {cart}=useCart();



    useEffect(()=>{
        (async()=>{
            const products=await getAllProducts();
            const categories=await getAllCategories();
            const updatedCategories=[...categories,{id:'1a',name:'All'}]
            setProducts(products);
            setCategories(updatedCategories);
        })()
    },[]);

    const onCategoryClick=(category)=>{
        setSelectedCategory(category);
    }
    const filterByCategories=getProductsByCategory(products,selectedCategory);

    return(
        <>
            <Navbar/>
            <main className="pt-8">
                <div className="flex gap-4 mb-4 justify-center">
                    {
                        categories?.length>0 && categories.map(category=><div className="bg-cyan-300 font-semibold rounded-full p-2 hover:cursor-pointer"
                        onClick={()=>onCategoryClick(category.name)}>{category.name}</div>)
                    }
                </div>
                <div className="flex flex-wrap gap-8 justify-center">
                {
                    filterByCategories?.length>0 ? filterByCategories.map(product =><ProductCard key={product.id} product={product}/>):
                    <h2>No Products found.Please try with another category</h2>
                }
                </div>
            </main>
        </>
    )
}

export default Home;