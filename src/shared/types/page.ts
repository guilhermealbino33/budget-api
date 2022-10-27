export default interface Page<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalDocuments: number;
}
