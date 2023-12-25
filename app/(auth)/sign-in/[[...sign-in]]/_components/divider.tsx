export const Divider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow h-px bg-muted"></div>
      <div className="mx-4">{text}</div>
      <div className="flex-grow h-px bg-muted"></div>
    </div>
  );
};

