import React from "react";
import Image from "next/image";
import Comment from "../../components/Comment";
import { getCommentData } from "../api/comment";

export async function getServerSideProps(context) {
  const { params } = context;
  const productId = params.productId;
  const dataProduct = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  const product = await dataProduct.json();
  console.log(product);

  const dataComments = await getCommentData();
  const comments = dataComments.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
  }));

  return {
    props: {
      product,
      comments,
    },
  };
}

export default function Product(props) {
  const { product, comments } = props;
  console.log(comments);
  return (
    <>
      <div className="bg-base-200 pt-6 min-h-screen">
        <div className="card card-side bg-base-100 shadow-xl w-[50%] m-auto">
          <figure className="relative">
            <Image
              src={product.image}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <div className="flex flex-row gap-3">
              <div className="badge badge-secondary">{product.price} {"LE"}</div>
              <div className="badge badge-outline">{product.category}</div>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="orange"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="pl-1">
                  {product.rating.rate} {`(${product.rating.count})`}
                </span>
              </div>
            </div>

            <p>{product.description}</p>
          </div>
        </div>
        <Comment productId={product.id} comments={comments} />
      </div>
    </>
  );
}
