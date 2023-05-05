import React from "react";
import classname from "classnames";
import { useStore } from "@/context/Store";
import { updateFileContent } from "@/services/api.service";

const FileInformation: React.FC<{
  title?: string;
  data: string;
  path: string;
}> = ({ title, data, path }) => {
  const { setSelectedFile, setShowModal } = useStore();
  const [inputValue, setInputValue] = React.useState(data);

  const isValueChanged = React.useMemo(
    () => inputValue !== data,
    [data, inputValue]
  );

  React.useState(() => {
    if (isValueChanged) setInputValue(data);
  }, [data]);

  const handleUpdateFileDetails = async () => {
    const response = await updateFileContent(path, inputValue);
    setSelectedFile();
    setShowModal(false);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto text-center">
        <h4 className="text-xl font-extrabold text-gray-900">{title}</h4>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          rows={20}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        />
      </div>
      <button
        disabled={!isValueChanged}
        className={classname("hover:text-gray-500 mx-2", {
          "text-green-400": isValueChanged,
          "text-grey-400": !isValueChanged,
        })}
        onClick={handleUpdateFileDetails}
      >
        Update
      </button>
    </div>
  );
};

export default FileInformation;
