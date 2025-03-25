import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { formatPrice } from "../../sdk/format.ts";

import Icon from "../ui/Icon.tsx";
import Collapsable from "../ui/Collapsable.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li class="flex items-center gap-2 relative">
      <a
        href={url}
        rel="nofollow"
        class="absolute top-0 left-0 w-full h-full z-[1]"
        aria-label="filtro"
      />
      <input
        type="checkbox"
        checked={selected}
        aria-label="botão de filtro"
        class="checkbox checkbox-sm"
      />
      <span class="text-xs font-semibold">{label}</span>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2 pb-4`, flexDirection)}>
      {values.map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  if (filters.length <= 0) {
    return null;
  }

  const selectedFilters = filters.reduce<FilterToggleValue[]>(
    (initial, filter) => {
      const selected = filter.values.find((value) => value.selected);
      if (!selected) return initial;

      return [...initial, selected];
    },
    [],
  );

  return (
    <aside class="place-self-start flex flex-col w-full">
      {selectedFilters.length > 0 && (
        <div class="pl-5 lg:pl-0 border-b border-gray-300 mb-4 pt-4 lg:pt-0">
          <label class="flex justify-between text-base font-semibold items-center pb-2">
            Filtros selecionados:
          </label>
          <ul class="flex flex-wrap gap-2 my-2">
            {selectedFilters.map((item) => (
              <li class="flex items-center gap-1 bg-gray-200 p-2 rounded-lg relative flex-row-reverse">
                <a
                  href={item?.url}
                  rel="nofollow"
                  class="absolute top-0 left-0 w-full h-full z-[1]"
                  aria-label="filtro"
                />

                <button
                  class={`shadow-none ${item?.selected && "text-red-300 font-light text-[10px]"
                    }`}
                  aria-label="botão de filtro"
                >
                  {item?.selected && 
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 2.5L2.5 7.5M7.5 7.50001L2.5 2.5" stroke="#FCA5A5" stroke-width="2" stroke-linecap="round" />
                  </svg>

                  }
                </button>

                <span class="text-xs font-semibold">{item?.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <label class="pl-5 lg:pl-0 flex justify-between text-base lg:text-lg font-semibold pb-4 items-center border-b border-gray-300">
        Filtros
      </label>

      <ul class="flex flex-col">
        {filters
          .filter(isToggle)
          .filter((filter) => filter.values.length > 0)
          .map((filter) => (
            <li class="flex flex-col gap-4 border-b border-gray-300 px-5 lg:pl-0">
              <Collapsable
                title={
                  <div class="flex items-center justify-between py-4 gap-5 lg:gap-0">
                    <span>{filter.label}</span>
                    <div class="w-[14px] h-[14px]">
                      <Icon
                        class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                        id={"arrow-right"}
                        size={13}
                      />
                    </div>
                  </div>
                }
              >
                <FilterValues {...filter} />
              </Collapsable>
            </li>
          ))}
      </ul>
    </aside>
  );
}

export default Filters;
