import axios from 'axios';

import { uploadAPI } from '../../services/api/upload';

export const generatePresignedUrl = async (
  fileList: any,
  presignedUrls: any,
  setPresignedUrls: any
) => {
  const numberOfFiles = fileList.length - presignedUrls.length;
  try {
    const response = await uploadAPI.getUploadFileUrl({
      number_of_urls: numberOfFiles.toString()
    });
    setPresignedUrls((prev: any) => {
      return [...prev, ...response.data];
    });
  } catch (error) {
    console.log('err: ', error);
    throw error;
  }
};

export const updateFileListWithUrl = async (
  fileList: any,
  presignedUrl: any,
  setFileList: any,
  getObj: any = false
) => {
  const updatedFileList = fileList.map((file: any, index: number) => {
    if (!file?.isOld) {
      return {
        ...file,
        presignedUrl: presignedUrl[index] // Append url as a key to each object
      };
    } else {
      return { ...file };
    }
  });
  const files = await Promise.all(
    updatedFileList.map((file: any) => {
      if (!file?.isOld) {
        return uploadImageTOS3(file.presignedUrl, file.originFileObj);
      } else {
        return { status: 200, statusText: 'OK' };
      }
    })
  )
    .then((response) => {
      const isStatus200 = response.every((res) => res.status === 200);
      if (isStatus200) {
        return getObj ? getFilesObject(updatedFileList) : getFilesArr(updatedFileList);
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
  setFileList(updatedFileList);
  return files;
};

export const getFilesArr = (fileList: any) => {
  const files = fileList.map((file: any) => {
    const [baseUrl, urlParams] = file.presignedUrl.split('?');
    console.log('urlParams: ', urlParams);
    return baseUrl;
  });

  return files;
};

const getFilesObject = (fileList: any) => {
  const imageFiles: any = [];
  const docFiles: any = [];
  const imageName: any = [];
  const docName: any = [];

  fileList.forEach((file: any) => {
    const [baseUrl, urlParams] = file.presignedUrl.split('?');
    console.log('urlParams: ', urlParams);
    if (file.type.startsWith('image')) {
      imageFiles.push(baseUrl);
      imageName.push(file.name);
    } else {
      docFiles.push(baseUrl);
      docName.push(file.name);
    }
  });

  return { image: imageFiles, doc: docFiles, image_name: imageName, doc_name: docName };
};

export const uploadImageTOS3 = async (url: any, file: any) => {
  const res = await axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  });
  return res;
};
