import axiosInstance from "@/lib/api/axiosInstanceApi";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.accessToken;
  const { folderId } = req.query;
  const id = Number(folderId);

  if (!token) {
    return res.status(401).json({ error: "사용자 정보를 찾을 수 없습니다." });
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "유효하지 않은 폴더 ID 입니다" });
  }

  switch (req.method) {
    case "DELETE":
      try {
        await axiosInstance.delete(`/folders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.status(204).json({ message: "폴더 삭제 성공" });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error); // 여기서 error 객체 전체를 확인
          if (error.response) {
            const status = error.response.status;
            const message =
              error.response.data?.message || "알 수 없는 오류 발생";
            console.error("Error Response Data:", error.response.data);
            return res.status(status).json({ message: message });
          }
          console.error("Unknown Error:", error); // Axios 오류가 아닌 경우
          throw error;
        }
        return res.status(500).json({ message: "서버 오류 발생" });
      }

    case "PUT":
      try {
        await axiosInstance.put(`/folders/${id}`, req.body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.status(204).json({ message: "폴더 수정 성공" });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const message =
            error.response.data?.message || "알 수 없는 오류 발생";
          throw error;
          return res.status(status).json({ message });
        }
      }
  }
};
export default handler;
