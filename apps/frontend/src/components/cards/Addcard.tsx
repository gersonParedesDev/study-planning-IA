type AddCardProps = {
  title: string;
  onClick?: () => void;
};

export function AddCard({ title, onClick }: AddCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        h-full w-full
        rounded-[14px]
        flex flex-col items-center justify-center
        transition-all duration-300
        bg-transparent
        cursor-pointer
        border border-dashed border-[#263041]
        hover:border-[#4fffb0]
        hover:bg-[#111620]/50
        group
      "
    >
      <span className="
        text-4xl
        text-[#4fffb0]/70
        transition-all duration-300
        group-hover:text-[#4fffb0]
        group-hover:scale-110
      ">
        +
      </span>

      <span className="
        mt-4
        text-sm
        text-[#5a6478]
        transition-colors duration-300
        group-hover:text-[#9fb0c8]
      ">
        {title}
      </span>
    </button>
  );
}