import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { ImagePostFunction } from '@/services/service';
import FormData from 'form-data';
import Label from '../ui/label';
import { FiUploadCloud } from 'react-icons/fi';
const FileInput = ({
  keyPrefix,
  multiple,
  image,
  setImage,

  icon,
}: any) => {
  const formData = new FormData();
  const [loading, setloading] = useState<any>(false); // create separate loading state
  const uploadImageToCloud = async (event: any) => {
    setloading(true);
    ImagePostFunction('/fileUpload', formData).then((result1: any) => {
      setImage((prevInputs: any) => {
        const updatedValue = [...prevInputs[0].value]; // Create a copy of the value array
        updatedValue[keyPrefix] = {
          ...updatedValue[keyPrefix],
          image: result1.url,
        }; // Update the image property of the first element

        return [
          {
            ...prevInputs[0], // Keep the rest of the object unchanged
            value: updatedValue, // Update the value array
          },
          ...prevInputs.slice(1), // Keep the remaining elements unchanged
        ];
      });

      setloading(false);
      event.target.value = null;
    });
  };

  const handleFileUpload = (event: any) => {
    let file = event.target.files[0];
    formData.append('file', file);
    uploadImageToCloud(event);
  };

  const handleRemoveFile = (index: any) => {
    const newFiles = [...image];
    newFiles.splice(index, 1);
    setImage(newFiles);
  };

  return (
    <>
      <div className="mt-2 flex justify-center text-red-500">
        <Label className="inline-block h-5 w-5">
          <FiUploadCloud className="h-6 w-6 cursor-pointer" color="#EE4B2B" />
          <input
            onChange={handleFileUpload}
            type="file"
            id="image"
            name="image"
            className="hidden"
          />
        </Label>
      </div>
      <div className="flex flex-row justify-center ">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          //(
          //   image?.map((file: any, index: any) => (
          //     <div key={index} className="m-2 my-2 flex  flex-row">
          //       <div className="flex-1  font-semibold text-gray-500">
          //         <span>
          //           <img
          //             src={file.url ? file.url : file.image}
          //             height={75}
          //             width={75}
          //           />
          //         </span>
          //       </div>
          //       <TiDeleteOutline
          //         color="red"
          //         className="cursor-pointer"
          //         size={20}
          //         onClick={() => handleRemoveFile(index)}
          //       />
          //     </div>
          //   ))
          // )
          ''
        )}
      </div>
    </>
  );
};

export default FileInput;
