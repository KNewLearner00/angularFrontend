import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( value:any[],filterString: string,propName:string):any[] {
   const result:any=[];
   if(!value || filterString===''|| propName===''){
    return value;
   }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){  //filter the value at this condition.
        result.push(a); //tey to push in the particular object.
      }
    });
    return result;//return as well.
  }

}
