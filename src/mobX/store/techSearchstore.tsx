import { action, computed, makeObservable, observable, toJS } from "mobx";
import { IRootStore } from "./RootStore";
import { fetchFunction, postFunction } from "../../components/common/AxiosInstance";
export interface techStackSearch {
    status: boolean
    message: string
    payload: Payload[]
    count: number
  }
  
  export interface Payload {
    id: number
    name: string
    display_name: string
    author_id: number
    author_name: string
    author_email: string
    description: string
    features: string
    functions: string
    dependencies: any
    version: string
    status: string
    gitlab_url: string
    image_url: string
    ssh_url: string
    updated_by: string
    views: number
    downloads: number
    createdAt: string
    updatedAt: string
    techstack: string
    techstackId: number
    techstack_image_url: string
    categoryId: number
    isFavorite: number
    rating: any
    avgRating: any
    reviewCount: number
    tags: any[]
    categoryName: string
  }
  
  export interface Root {
    status: boolean
    message: string
    payload: Payload
    count: number
  }
  
  export interface userSearch {
    data: Daum[]
    techstack: Techstack[]
    functions: any[]
    features: Feature[]
    authors: Author[]
  }
  
  export interface Daum {
    id: number
    name: string
    display_name: string
    author_id: number
    author_name: string
    author_email: string
    description: string
    features: string
    functions: string
    dependencies: any
    version: string
    status: string
    gitlab_url: string
    image_url: string
    ssh_url: string
    updated_by: string
    git_updated_at: string
    views: number
    downloads: number
    createdAt: string
    updatedAt: string
    techstack: string
    techstackId: number
    techstack_image_url: string
    categoryId: number
    isFavorite: number
    avgRating: any
    reviewCount: number
    tags: Tag[]
    categoryName: string
  }
  
  export interface Tag {
    id: number
    name: string
    type: string
    tags_component: TagsComponent
  }
  
  export interface TagsComponent {
    componentId: number
    tagId: number
  }
  
  export interface Techstack {
    id: number
    name: string
  }
  
  export interface Feature {
    id: number
    name: string
  }
  
  export interface Author {
    id: number
    name: string
  }
  
export class TechSearchstore {
    rootStore: IRootStore;
    techStacklist :userSearch | null = null;
    searchFilterPost:techStackSearch | null = null;
    constructor(rootStore : IRootStore){
        makeObservable(this, {
            techStacklist: observable,
            fetchtechStackList: action,
            gettechstacklist: computed,
            searchFilterPost:observable,
            fetchseacrchFilterpost:action,
            getsearchtechstacklist:computed
          });
          this.rootStore = rootStore;
    }
    async fetchtechStackList(searchWord : any) {
    
        const getData = await fetchFunction(`api/component/search?search=${searchWord}`);
        console.log(getData, "getData1");
        
        // this.userDetails = tokenRes
        this.techStacklist = getData.payload;
    }
    async fetchseacrchFilterpost(getword : any) {
    
        const getDatasearchData = await postFunction(`api/component/filter`, getword);
        console.log(getDatasearchData, "getData");
        // this.userDetails = tokenRes
        this.searchFilterPost = getDatasearchData;
    }
      get  gettechstacklist(){
        return this.techStacklist
      }
      get  getsearchtechstacklist(){
        return this.searchFilterPost
      }
}