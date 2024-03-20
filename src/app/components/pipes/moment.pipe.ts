import {Pipe, PipeTransform} from '@angular/core';
import {isMoment, Moment} from 'moment';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  private translate: TranslateService;

  constructor(
    translate: TranslateService
  ) {
    this.translate = translate;
  }
  transform(value: any, ...args: any[]): any {
    let parsed: Moment;
    if (isMoment(value)) {
      parsed = value;
    } else {
      parsed = moment.utc(value);
    }
    if (!parsed.isValid()) {
      return '-';
    }
    const browserLang = this.translate.getBrowserLang();
    parsed.locale(browserLang);
    return parsed.format('DD/MM/yyyy');
  }

}
