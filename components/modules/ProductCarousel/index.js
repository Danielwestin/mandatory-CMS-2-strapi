import { useRef } from "react";
import ArrowRight from "../../svg/ArrowRight";
import ProductCard from "../ProductCard";
import styles from "./ProductCarousel.module.css";

export default function ProductCarousel({ products }) {
  const carouselRef = useRef();

  function goForwards() {
    if (
      carouselRef.current.scrollLeft + carouselRef.current.offsetWidth ===
      carouselRef.current.scrollWidth
    ) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }

  function goBackwards() {
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollWidth,
        behavior: "smooth",
      });
    } else {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={goBackwards}>{<ArrowRight />}</button>
      <ul className={styles.carousel} ref={carouselRef}>
        {products.map((product) => (
          <li key={product.id} className={styles.article}>
            <ProductCard product={product} size="small" />
          </li>
        ))}
      </ul>
      <button onClick={goForwards}>{<ArrowRight />}</button>
    </div>
  );
}
