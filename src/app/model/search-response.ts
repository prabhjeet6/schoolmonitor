export interface SearchResponse {
    searchResults?:{url:string;
    category:string;
    name:string;
    author:string;
    Thumbnail:string}[];

    totalNumberOfRecords?:number;
}
