import Image from "next/image";
import Link from "next/link";

export default function Card({ product }) {
  return (
    <div className="card lg:w-72 md:w-80 bg-base-100 shadow-xl">
      <Link href={`/products/${product.id}`}>
        <figure className="h-72 relative cursor-pointer hover:scale-95">
          <Image src={product.image} alt={product.title} layout="fill" />
        </figure>
      </Link>
      <div className="card-body py-5 px-5">
        <h2 className="card-title">
          {product.title}
          <div className="badge badge-secondary">{product.price}</div>
        </h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end items-center">
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
            <span className="pl-1">{product.rating.rate} {`(${product.rating.count})`}</span>
          </div>
          <div className="badge badge-outline">{product.category}</div>
        </div>
      </div>
    </div>
  );
}
