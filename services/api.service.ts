import { GetRepoDetails, GithubFileInformation } from "@/types";

const getRepoInformation = () =>
  new Promise<GetRepoDetails>(async (res, rej) => {
    try {
      const raw = await fetch("/api/github", {
        cache: "no-cache",
      });

      const results = await raw.json();

      res(results as GetRepoDetails);
    } catch (error) {
      rej(error);
    }
  });

const getFileContent = (path: string) =>
  new Promise<GithubFileInformation>(async (res, rej) => {
    try {
      const raw = await fetch(`/api/github/file?path=${path}`, {
        cache: "no-cache",
      });

      const results = await raw.json();
      res(results as GithubFileInformation);
    } catch (error) {
      rej(error);
    }
  });

const updateFileContent = (path: string, content: string) =>
  new Promise(async (res, rej) => {
    try {
      const raw = await fetch(`/api/github/file`, {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify({
          path,
          content,
        }),
      });

      const results = await raw.json();
      res(results);
    } catch (error) {
      rej(error);
    }
  });

const deleteFileContent = (path: string) =>
  new Promise(async (res, rej) => {
    try {
      const raw = await fetch(`/api/github/file?path=${path}`, {
        cache: "no-cache",
        method: "DELETE",
      });

      const results = await raw.json();
      res(results);
    } catch (error) {
      rej(error);
    }
  });

export {
  getRepoInformation,
  getFileContent,
  updateFileContent,
  deleteFileContent,
};
