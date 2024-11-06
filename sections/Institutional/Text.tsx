import { HTMLWidget } from "apps/admin/widgets.ts";

interface Props {
  html?: HTMLWidget;
}

const Text = ({ html }: Props) => {
  return (
    <>
      {html && (
        <div
          class="fluid-text text-[12px] lg:text-[14px] mb-8 container px-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default Text;
