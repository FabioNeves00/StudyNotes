import { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import CloseImg from "@assets/close.svg";
import Image from "next/image";

Modal.setAppElement("#__next");

interface ModalProps {
  isOpen: boolean;
  handleOpenClose: Dispatch<SetStateAction<boolean>>;
}

export function CardModal({ isOpen, handleOpenClose }: ModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        handleOpenClose(!isOpen);
      }}
      overlayClassName="fixed bg-black top-0 bottom-0 left-0 right-0 flex items-center justify-center"
      className="max-w-xl w-screen h-3/5 bg-extra p-3 relative rounded"
    >
      <button
        type="button"
        className="absolute right-6 left-6 border-0 bg-transparent transition filter duration-200 hover:brightness-90"
        onClick={() => handleOpenClose(!isOpen)}
      >
        <Image src={CloseImg} alt="fechar" />
      </button>
    </Modal>
  );
}
