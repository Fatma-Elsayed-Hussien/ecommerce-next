import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Products from "../components/Products";
import Head from "next/head";

// export async function getStaticProps(){
//   return fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json);
//     return{
//       props:{
//         products: json
//       }
//     }
//   });
// }

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setIsLoading(false);
        setProducts(json);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  // if (products) return <p>Loading...</p>;
  return (
    <>
    <Head>
      <title>Home Page</title>
    </Head>
      <h3 className="text-2xl text-center font-semibold mt-8">Our Top Products</h3>
      <div className={styles.container}>
          <Products isMain products={products} />
      </div>
    </>
  );
}
