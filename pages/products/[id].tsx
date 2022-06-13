import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import type { ProductDetailResponse } from "pages/api/products/[id]";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<ProductDetailResponse>(
    router.query?.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isFav: !data.isFav }, false);
    toggleFav({});
    // toggleFav({});
  };
  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        {!data ? (
          <Skeleton count={20} />
        ) : (
          <>
            <div className="mb-8">
              <div className="h-96 bg-slate-300" />
              <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {data.product?.user?.name}
                  </p>
                  <Link href={`/users/profiles/${data.product?.user?.id}`}>
                    <a className="text-xs font-medium text-gray-500">
                      View profile &rarr;
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.product.name}
                </h1>
                <span className="text-2xl block mt-3 text-gray-900">
                  ${data.product.price}
                </span>
                <p className=" my-6 text-gray-700">
                  My money&apos;s in that office, right? If she start giving me
                  some bullshit about it ain&apos;t there, and we got to go
                  someplace else and get it, I&apos;m gonna shoot you in the
                  head then and there. Then I&apos;m gonna shoot that bitch in
                  the kneecaps, find out where my goddamn money is. She gonna
                  tell me too. Hey, look at me when I&apos;m talking to you,
                  motherfucker. You listen: we go in there, and that ni**a
                  Winston or anybody else is in there, you the first
                  motherfucker to get shot. You understand?
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <Button large text="Talk to seller" />
                  <button
                    onClick={onFavClick}
                    className={cls(
                      "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center ",
                      data?.isFav
                        ? "text-red-500  hover:text-red-600"
                        : "text-gray-400  hover:text-gray-500"
                    )}
                  >
                    {data?.isFav ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 "
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Similar items
              </h2>
              <div className=" mt-6 grid grid-cols-2 gap-4">
                {data.relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <h3 className="text-gray-700 -mb-1">
                      {relatedProduct.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-900">
                      ${relatedProduct.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ItemDetail;
