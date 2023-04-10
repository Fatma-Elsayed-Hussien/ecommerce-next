import Head from "next/head";
import Products from "../../components/Products";

export async function getServerSideProps() {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();
  return {
    props: {
      products,
    },
  };
}
export default function ProductsPage({ products }) {
  if (!products) return <p>Loading....</p>;
  return (
    <>
    <Head>
        <title>Products Page</title>
    </Head>
      <Products products={products} />
    </>
  );
}
