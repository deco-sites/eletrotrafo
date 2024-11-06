import Collapsable from "../../components/ui/Collapsable.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";

interface Faq {
  title?: string;
  /** @titleBy title */
  questions?: {
    /**
     * @format html
     */
    question?: HTMLWidget;
    /**
     * @format html
     */
    response?: HTMLWidget;
  }[];
}

interface Props {
  /** @titleBy questions.question */
  faq?: Faq[];
}

const Faq = ({ faq }: Props) => {
  return (
    <div>
      <div className="container px-5 flex gap-4 flex-col">
        {faq?.map((item, index) => (
          <div key={index} class="">
            <p className="mb-4 font-bold text-base">
              {item?.title}
            </p>
            <div className="flex flex-col gap-4">
              {item.questions?.map((q, qIndex) => (
                <div
                  class="bg-white rounded-[20px] py-4 px-5"
                  key={qIndex}
                >
                  <Collapsable
                    title={
                      <div className="flex justify-between text-sm items-center">
                        <div
                          class="text-base"
                          dangerouslySetInnerHTML={{
                            __html: q.question?.toString() || "",
                          }}
                        />
                        <div className="w-[14px] ml-[10px]">
                          <Icon
                            id="arrow-right"
                            className="group-open:rotate-180"
                            size={13}
                          />
                        </div>
                      </div>
                    }
                  >
                    <div
                      className="text-sm fluid-text text-dark-gray mt-2"
                      dangerouslySetInnerHTML={{
                        __html: q.response?.toString() || "",
                      }}
                    >
                    </div>
                  </Collapsable>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
