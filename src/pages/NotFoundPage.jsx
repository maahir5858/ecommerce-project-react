import Header from '../components/Header';
import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <>
            <Header />

            <div className="page-not-found">
                <h1 className='h1-text'>404</h1>
                <p className='page-not-found-text'>... Page Not Found ...</p>
            </div>
        </>
    );
}