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
          <img src={`http://localhost:1337${product.image.url}`} />
        </>
      ))}
    </div>
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
