import { useRouter } from "next/router";
import { useEffect } from "react";
import CMS from "../../cms";

export default function Category({ category }) {
  console.log(category);
  return (
    <div>
      category {category.id}
      {category.products.map((product) => (
        <>
          <p>{product.title}</p>
          {console.log(`localhost:1337${product.image.url}`)};
          <img src={`http://localhost:1337${product.image.url}`} />
        </>
      ))}
    </div>
  );
}

export async function getStaticProps(ctx) {
  console.log(ctx);
  const category = await CMS.category(ctx.params.id);
  return {
    props: {
      category,
    },
  };
}

export async function getStaticPaths(ctx) {
  const categories = await CMS.categories();

  return {
    paths: categories.map(({ id }) => `/categories/${id}`),
    fallback: true,
  };
}
