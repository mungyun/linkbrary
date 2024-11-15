import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import { putFolder } from "@/lib/api/folder";
import SubmitButton from "../SubMitButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const EditModal = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) => {
  const [value, setValue] = useState("");

  const { closeModal } = useModalStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    if (value === folderName) {
      toast.error(toastMessages.error.sameFolderName);
    } else if (value === "") {
      toast.error(toastMessages.error.inputFolderName);
    } else {
      try {
        await putFolder(folderId, body);
        toast.success(toastMessages.success.editFolder);
      } catch (error) {
        toast.error(toastMessages.error.editFolder);
      }
    }
    closeModal();
  };
  return (
    <ModalContainer title="폴더 이름 변경">
      <ModalInput
        placeholder={folderName}
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="positive"
      >
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditModal;
