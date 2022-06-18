import type { NextPage } from "next";
import Head from "next/head";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import type { Product } from "@prisma/client";
import useUser from "@libs/client/useUser";

interface ProductsWithCount extends Product {
  _count: {
    favs: number;
  };
}

type ProductsResponse = {
  ok: boolean;
  products: ProductsWithCount[];
};

const Home: NextPage = () => {
  useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
