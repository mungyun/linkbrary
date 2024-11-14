import { FolderItemType } from "@/types/modalTypes";
import FolderList from "./modalComponents/FolderList";
import ModalContainer from "./modalComponents/ModalContainer";
import SubmitButton from "../SubMitButton";
import { useState } from "react";
import { postLink } from "@/lib/api/link";
import useModalStore from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const AddModal = ({ list, link }: { list: FolderItemType[]; link: string }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { closeModal } = useModalStore();
  const handleSubmit = async () => {
    const body = {
      folderId: Number(selectedId),
      url: link,
    };
    if (link !== "" && selectedId) {
      try {
        await postLink(body);
        toast.success(toastMessages.success.addLink);
      } catch (error) {
        toast.error(toastMessages.error.addLink);
      } finally {
        closeModal();
      }
    }
  };

  const handleClickFolderItem = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  return (
    <ModalContainer title="폴더에 추가" subtitle={link}>
      <FolderList
        list={list}
        selectedId={selectedId}
        onClick={handleClickFolderItem}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="positive"
      >
        추가하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default AddModal;
