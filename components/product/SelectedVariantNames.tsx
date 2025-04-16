import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

const SelectedVariantNames = ({ product }: Props) => {
  const baseName = product.isVariantOf?.name || "";
  const complement = product.name?.replace(baseName, "") || "";
  const completeName = `${baseName.trim()} ${complement.trim()}`;

  return (
    <>
      <h1 class="text-base font-bold lg:text-xl flex-grow">
        {completeName}
      </h1>
    </>
  );
};

export default SelectedVariantNames;
