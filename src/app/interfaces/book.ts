import {Author} from "./author";
import {Genre} from "./genre";
import {Serie} from "./serie";

export interface Book {
  id:number;
  name:string;
  year:number;
  plot:string;
  lang:string;
  pages:number;
  form:string;
  cover:string;
  authors:Array<Author>;
  genres:Array<Genre>;
  serie:Serie;

}
