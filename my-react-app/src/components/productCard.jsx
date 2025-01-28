import { Link , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/apiConfig';
import Price from '../components/Price';

function ProductCard({ product }) {
  // const handle = product.node.handle
  const title = product.name;
  const id = product.id;
  const price = product.price;
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
        class="w-fit mx-auto grid  grid-cols-1 lg:grid-cols-1 md:grid-cols-2 justify-items-center justify-center ">

        <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">

          <div className="group my-1.5 flex w-full max-w-xs flex-col overflow-hidden bg-white">
            <a className="relative flex h-80 w-72 overflow-hidden" href="#">
              <img className="absolute top-0 right-0 h-full w-72 object-cover  ch-80  rounded-t-xl" src={imageNode} alt="product image" />

              <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button
                  onClick={handleAddToCart}
                  className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            </a>
            <div className="rounded-t-xl">
              <h5 className="text-center tracking-tight text-gray-500">{title}</h5>
              <div className=" flex justify-center">
                <p>
                  <span className="text-sm font-bold text-gray-900">&#8377;{price}</span>
                  <span className="text-sm text-gray-400 line-through">{price + 1000}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Link >

  )
}

export default ProductCard;