"use client";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  openModal: boolean;
};

function DefaultModal({ children, onClose, openModal }: Props) {
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 opacity-100 flex justify-center items-center z-50 w-full h-full"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

export default DefaultModal;
