import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const url = environment.url;

@Pipe({
  name: 'teacherLocation'
})
export class TeacherLocationPipe implements PipeTransform {

  constructor (private http : HttpClient){

  }
  async transform(value: unknown, ...args: unknown[]): Promise <string> {
    let item:any = await this.http.get(url+'/teachers/location/'+value).toPromise();
    return item?.data;
  }

}
