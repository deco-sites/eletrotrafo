import { FunctionalComponent } from "preact";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";

interface TeasersComponentProps {
  page: ProductDetailsPage | null;
  context: "product-details" | "product-card";
}

const teaserNameMap: Record<string, string> = {
  "Novidades 5% (5% allever - 0% seller)" : "Oferta por tempo limitado",
};

const TeasersComponent: FunctionalComponent<TeasersComponentProps> = (
  { page, context },
) => {
  if (!page) return null;

  const { product } = page;
  const { offers } = product || {};
  const { teasers = [] } = useOffer(offers) || {};

  const validTeasers = teasers.filter((teaser) => teaserNameMap[teaser.name]);

  console.log("Teasers recebidos do produto:", teasers);

  if (validTeasers.length === 0) return null;

  const getTailwindClassForContext = (context: string) => {
    if (context === "product-details") {
      return "text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center items-center px-2 py-1 rounded-[6px] w-full h-10 flex justify-center";
    }
    if (context === "product-card") {
      return "text-xs font-medium text-gray-800 uppercase bg-yellow-500 text-center items-center px-2 py-1 rounded-[4px] w-full h-8 flex justify-center";
    }
    return "";
  };

  const Ctx_class = getTailwindClassForContext(context);

  return (
    <>
      {validTeasers.map((teaser) => {
        const teaserName = teaserNameMap[teaser.name];

        return (
          <p
            key={teaser.name}
            class={`${Ctx_class}`}
          >
            {teaserName}
          </p>
        );
      })}
    </>
  );
};

export default TeasersComponent;
