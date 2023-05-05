import { getFileContent } from "@/services/api.service";
import React from "react";

const useGetFileDetails = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<string>("");

  const getData = async (path: string) => {
    try {
      setLoading(true);
      const response = await getFileContent(path);
      console.log(
        "🚀 ~ file: useGetFileDetails.tsx:12 ~ getData ~ response:",
        response
      );

      setData(response.content);
    } catch (error) {
      console.log(
        "🚀 ~ file: useGetFileDetails.tsx:12 ~ getData ~ error:",
        error
      );
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, data, getData };
};

export default useGetFileDetails;
