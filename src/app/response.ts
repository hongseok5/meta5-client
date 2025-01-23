export interface GenericPagingResponse<T> {
    content: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}