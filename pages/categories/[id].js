import CMS from "../../cms";
import ProductCard from "../../components/modules/ProductCard";
import { capitalize, pluralize } from "../../library/strings";
import styles from "./Category.module.css";

export default function Category({ category }) {
  console.log(category);

  return (
    <>
      <h1 className={styles.title}>{capitalize(category.title)}</h1>
      <section className={styles.section}>
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

//getServerSide: Om något behöver renderas om ofta.
//getStaticPath: Om något ändras väldigt sällan.

export async function getServerSideProps(ctx) {
  const category = await CMS.category(ctx.params.id);

  return {
    props: {
      category,
    },
  };
}

// export async function getStaticPaths(ctx) {
//   const categories = await CMS.categories();

//   return {
//     paths: categories.map(({ id }) => `/categories/${id}`),
//     fallback: true,
//   };
// }
