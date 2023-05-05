export interface Row {
  filename: string;
  url: string;
  download: string;
  contentURL: string;
}

export interface TableBodyProps {
  data: Row[];
}
