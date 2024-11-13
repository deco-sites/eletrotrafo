import { RichText } from "apps/admin/widgets.ts";

interface Props {
  html?: RichText;
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
