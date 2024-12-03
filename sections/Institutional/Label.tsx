interface Props {
  label: string;
}

const Text = ({ label }: Props) => {
  return (
    <div class="container px-5">
        <p class="text-xs lg:text-sm my-3 lg:my-6 text-black">{label}</p>
    </div>
  );
};

export default Text;
