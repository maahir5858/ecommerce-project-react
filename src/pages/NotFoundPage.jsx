import Header from '../components/Header';
import './NotFoundPage.css';

export default function NotFoundPage({ cart }) {
    return (
        <>
            <title>404 Page Not Found</title>
            <link rel="icon" type="image/svg+xml" href="" />

            <Header cart={cart} />

            <div className="page-not-found">
                <h1 className='h1-text'>404</h1>
                <p className='page-not-found-text'>... Page Not Found ...</p>
            </div>
        </>
    );
}