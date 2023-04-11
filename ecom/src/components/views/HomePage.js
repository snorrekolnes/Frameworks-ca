import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../store/modules/productsSlice';
import {Link} from 'react-router-dom';
import ErrorComponent from "../../components/shared/ErrorComponent";

function HomePage() {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.products);
    const {isError} = useSelector(state => state.error);
    const {errorMessage} = useSelector(state => state.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Use useMemo to memoize the products data and only recompute it when necessary.
    // This can help reduce unnecessary re-rendering.

    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    {isError ? (
                        <ErrorComponent message={errorMessage}/>
                    ) : (
                        <div
                            className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {memoizedProducts.map((product) => (
                                <div key={product.id} className="group relative flex flex-col gap-y-3">
                                    <Link to={`product/${product.id}`}
                                          className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                        <img src={product.thumbnail} alt={product.title}
                                             className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                                             loading="lazy"/>
                                    </Link>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-md text-gray-700 relative">
                                                <Link to={`product/${product.id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0"/>
                                                    {product.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">NOK{product.price}</p>
                                    </div>
                                    <Link to={`product/${product.id}`}
                                          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center">
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;