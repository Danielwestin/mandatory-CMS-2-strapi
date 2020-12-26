import { useRouter } from "next/router";

export default function FruitSpecific() {
  const router = useRouter();
  console.log(router);
  const { product } = router.query;

  return <div>specific fruit {product} </div>;
}
