import {
  File,
  GetRepoDetails,
  GithubFileInformation,
  GithubRepoResults,
} from "@/types";

const REPO_URL = process.env.REPO_URL;
const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const getRepoFileNames = (path: string = "") =>
  new Promise<File[]>(async (res, rej) => {
    const url = `${BASE_URL}/${REPO_URL}/contents/${path}`;
    const response = await fetch(url, {
      cache: "no-cache",
      headers,
    });
    const results = await response.json();

    if (Array.isArray(results)) {
      // results is an array of file objects
      const fileNames: File[] = [];
      for (const file of results) {
        if (file.type === "file") {
          fileNames.push({
            path: file.path,
            url: file.html_url,
            download: file.download_url,
            contentUrl: file.url,
          });
        } else if (file.type === "dir") {
          const nestedFileNames = await getRepoFileNames(file.path);
          fileNames.push(...nestedFileNames);
        }
      }
      res(fileNames);
    } else {
      rej(results.message);
    }
  });

const getRepoInformation = () =>
  new Promise<GetRepoDetails>(async (res, rej) => {
    try {
      const infoRaw = await fetch(`${BASE_URL}/${REPO_URL}`);
      const infoResults: GithubRepoResults = await infoRaw.json();
      const fileNames: File[] = await getRepoFileNames("");

      const payload: GetRepoDetails = {
        fullName: infoResults?.full_name,
        description: infoResults?.description,
        fileNames,
      };

      res(payload);
    } catch (error) {
      rej(error);
    }
  });

const getFileInformation = (path: string) =>
  new Promise<GithubFileInformation>(async (res, rej) => {
    try {
      const infoRaw = await fetch(path);
      const infoResults: GithubFileInformation = await infoRaw.json();
      const content = atob(infoResults.content);
      res({ ...infoResults, content });
    } catch (error) {
      rej(error);
    }
  });

const updateFileContent = (url: string, content: string) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const currentSha = data.sha;

        // Encode the new content as Base64
        const encodedContent = btoa(content);

        // Construct the request payload
        const payload = {
          message: "Update file",
          content: encodedContent,
          sha: currentSha,
        };

        // Send a PUT request to update the file
        fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

const deleteFileContent = (url: string) =>
  new Promise((resolve, reject) => {
    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        // Get the current SHA of the file from the API response
        const currentSha = data.sha;

        // Construct the request payload
        const payload = {
          message: "Delete file",
          sha: currentSha,
        };

        // Send a DELETE request to delete the file
        fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve("File deleted successfully");
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

export {
  getRepoInformation,
  getFileInformation,
  updateFileContent,
  deleteFileContent,
};
