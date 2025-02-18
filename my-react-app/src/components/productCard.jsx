import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';
import Price from '../components/Price';

function ProductCard({ product }) {
  // const handle = product.node.handle
  console.log(product);
  const title = product.name;
  const id = product.id;
  const price = product.price;
  const discountPercentage = product.discountPercentage;
  const originalPrice = discountPercentage > 0
    ? Math.round(price / (1 - discountPercentage / 100))
    : price;
  const navigate = useNavigate();

  const imageNode = product.image;

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking cart button
    const userId = localStorage.getItem('userId');

    if (!userId) {
      toast.warning('Please login to add items to cart');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // For handling cookies
        body: JSON.stringify({
          productId: id,
          quantity: 1,
          userId: userId
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Added to cart successfully!');
      } else {
        toast.error(result.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Error adding to cart');
    }
  };

  return (
    <Link to={`/${title}`} state={{ productId: id }}>
      <section id="Projects"
        class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 justify-items-center justify-center">
        
        <div class="w-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <div className="group my-1.5 flex w-full max-w-xs flex-col overflow-hidden bg-white">
            <a className="relative flex h-64 w-60 overflow-hidden" href="#">
              {discountPercentage > 0 && (
                <div className="absolute right-2 top-2 z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-md animate-pulse">
                    <span className="text-xs font-bold text-white">
                      -{discountPercentage}%
                    </span>
                  </div>
                </div>
              )}
              <img className="absolute top-0 right-0 h-full w-60 object-cover rounded-t-xl" 
                   src={imageNode} 
                   alt="product image" />

              <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button
                  onClick={handleAddToCart}
                  className="flex h-8 w-8 items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-full text-white transition hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            </a>
            <div className="px-2 py-1">
              <h5 className="text-sm text-center tracking-tight text-gray-500">{title}</h5>
              <div className="flex justify-center gap-2 items-center">
                <span className="text-sm font-bold text-gray-900">₹{price}</span>
                {discountPercentage > 0 && (
                  <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default ProductCard;