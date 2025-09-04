import { Navbar } from "../../components/Navbar"
import { useCart } from "../../context/card-context";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { PriceDetails } from "../../components/PriceDetails";
import { useNavigate } from "react-router-dom";

export const Cart=()=>{

    const {cart}=useCart();

    const Navigate=useNavigate();

    return(
        <>
            <Navbar/>
            <main className="flex flex-col items-center pt-6">
                {
                    cart?.length>0?(
                        <>
                            <h1 className="text-5xl">My Cart</h1>
                            <div className="flex gap-8">
                                <div className="pt-7 flex flex-col gap-4">
                                {
                                    cart?.length>0 &&cart.map(product => <HorizontalProductCard key={product.id} product={product}/>)
                                }
                            </div>
                            <div>
                                <PriceDetails/>
                            </div>
                            </div>
                        </>
                    ):  <div className="flex-row">
                            <h1 className="text-4xl gap-3 p-3 font-bold text-cyan-900">Cart empty</h1>
                            <p className="text-cyan-600 underline hover:cursor-pointer font-semibold" onClick={()=>Navigate("/")}>Click to add items to cart</p>
                        </div>
                }
            </main>
        </>
    )
}