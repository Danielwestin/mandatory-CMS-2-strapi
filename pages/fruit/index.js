import { getRouteMatcher } from "next/dist/next-server/lib/router/utils";
import Image from "next/image";
import { useRouter } from "next/router";

function Fruits({ categories }) {
  return <div>category</div>;
}

// Fruits.getInitialProps = async () => {
//   const response = await fetch("http://localhost:1337/categories");
//   const data = await response.json();

//   return { categories: data };
// };
export default Fruits;
