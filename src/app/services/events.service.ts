import { EventEmitter, Injectable } from '@angular/core'
import { NzUploadFile } from 'ng-zorro-antd/upload'

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}
  onUploaded = new EventEmitter<{ status: boolean; downloadUrl?: string }>()
  onProductProcessesCompleted = new EventEmitter<{ status: boolean; product: any }>()
  onUploadCompleted = new EventEmitter<{ status: boolean; downloadUrl?: string[]; files?: any }>()
  onPostProduct = new EventEmitter<{ status: boolean; files?: [] }>()
  onOpenProducts = new EventEmitter<{ status: boolean }>()
  onResetForm = new EventEmitter()
  onUploadProgress = new EventEmitter<{total:number,nrc:NzUploadFile,
    status:boolean,current:number,downloadUrl}>()
  onConfrimData = new EventEmitter<{ status: boolean; data: any }>()
}
