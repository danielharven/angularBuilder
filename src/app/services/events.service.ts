import { EventEmitter, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  onUploaded = new EventEmitter<{ status: boolean; downloadUrl?: string }>()
  onProductProcessesCompleted = new EventEmitter<{ status: boolean; product: any }>()
  onUploadCompleted = new EventEmitter<{ status: boolean; downloadUrl?: string[] }>()
  onPostProduct = new EventEmitter<{ status: boolean; downloadUrl?: [] }>()
  onOpenProducts = new EventEmitter<{ status: boolean }>()
}
