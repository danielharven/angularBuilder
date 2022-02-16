import { HttpClient } from '@angular/common/http';
export function emailExists(control: FormControl): ValidationErrors {
  // return /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  let http = new HttpClient(http);
  return false
}
