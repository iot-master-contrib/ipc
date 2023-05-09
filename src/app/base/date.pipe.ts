import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from "dayjs";
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: any, format?: string): string {
    return dayjs(date).format(format || 'YYYY-MM-DD HH:mm:ss')
  }

}
