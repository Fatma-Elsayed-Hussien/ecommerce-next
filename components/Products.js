import Card from "./Card";

export default function Products({ products, isMain }) {
  return (
    <>
      <div className="container mx-auto px-4 flex justify-center items-center py-10 mb-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
          {products?.filter((_, index) => isMain ? index < 4 : true).map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
