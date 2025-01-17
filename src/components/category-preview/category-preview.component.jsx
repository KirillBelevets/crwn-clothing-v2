import { Link } from 'react-router-dom';
import ProductCard from "../product-card/product-card.component";

import './category-preview.styles.scss'

const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_, idx) => {
                        return idx < 4;
                    }).map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;