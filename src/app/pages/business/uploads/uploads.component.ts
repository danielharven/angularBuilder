import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { EventsService } from '../../../services/events.service'
import { error } from '@ant-design/icons-angular'

@Component({
  selector: 'app-business-uploads',
  templateUrl: './uploads.component.html',
})
export class BusinessUploadsComponent implements OnInit {
  fallback =
    'data:image/png;base64,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'
  nrcForms: FormGroup
  provinces: any = [
    {
      id: 1,
      name: 'Lusaka',
    },
  ]
  uploadIs = []
  fileList = []
  allDistricts: any = [
    {
      id: 1,
      name: 'Kafue',
      province: {
        id: 1,
      },
    },
  ]
  districts: any = []
  completed: any = []
  submitting: boolean = false
  readableFormData: any = {}
  isVisible: boolean = false
  nrc: any
  constructor(
    private utitlity: UtilitiesService,
    private ref: ChangeDetectorRef,
    private evt: EventsService,
  ) {
    this.setupEvents()
  }
  ngOnInit() {
    this.nrcForms = new FormGroup({
      end: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      start: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      ext: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
    })
    this.getData()
  }
  setupEvents() {
    this.evt.onUploadCompleted.subscribe(
      ({ downloadUrl, status, files }) => {
        if (status) {
          this.uploadIs = downloadUrl
          this.fileList = files
          this.generateNrcs()
        }
      },
      error => {},
    )
    this.evt.onConfrimData.subscribe(({ status, data }) => {
      if (status) {
        this.isVisible = true
        this.submitting = true
        this.evt.onPostProduct.emit({ status: true })
      }
    })
    this.evt.onPostProduct.subscribe(({ status, files }) => {
      if (!status) {
        this.utitlity.notify.error('Verify you have chosen the right number of files')
        this.submitting = false
      }
    })
  }
  getData() {
    this.utitlity.getProvinces().valueChanges.subscribe(result => {
      // @ts-ignore
      this.provinces = result?.data?.provinces
    })
  }
  getProvinces() {
    this.provinces = this.utitlity.provinces
  }
  submitForm() {
    if (!this.nrcForms.valid) {
      for (const i in this.nrcForms.controls) {
        if (this.nrcForms.controls.hasOwnProperty(i)) {
          this.nrcForms.controls[i].markAsDirty()
          this.nrcForms.controls[i].updateValueAndValidity()
        }
      }
      return
    }
    let province = this.provinces.filter(item => item.id == this.nrcForms.value.province)
    console.log(province)
    this.readableFormData.province = province[0].name
    let district = this.districts.filter(item => item.id == this.nrcForms.value.district)
    console.log(district)
    this.readableFormData.district = district[0].label
    this.readableFormData.startNrc = this.nrcForms.value.start + '/' + this.nrcForms.value.ext
    this.readableFormData.endNrc = this.nrcForms.value.end + '/' + this.nrcForms.value.ext
    this.evt.onConfrimData.emit({
      status: false,
      data: this.readableFormData,
    })
  }
  getDistrictsByProvince() {
    let pid = this.nrcForms.value.province
    console.log(pid)
    this.districts = this.utitlity.districts.filter(item => item.province.id == pid)
  }
  async generateNrcs() {
    let { start, end, ext, district } = this.nrcForms.value
    console.log(this.fileList)

    //ids are already sorted when uploading
    let indexer = 0
    for (let x = 0; x < this.fileList.length; x = x + 2) {
      let item = this.fileList[x]
      let item2 = this.fileList[x + 1]

      let picArr = this.uploadIs.filter(i => i.filename == item.name)
      let picArr2 = this.uploadIs.filter(i => i.filename == item2.name)

      let pic1 = picArr[0]._id
      let pic2 = picArr2[0]._id
      let nrc = start + indexer + '/' + ext
      this.nrc = nrc
      let confirmed = false
      let data = {
        pic2,
        pic1,
        confirmed,
        district,
        nrc,
      }
      indexer++
      this.utitlity.createNrc(data).subscribe(({ data, errors }) => {
        if (errors) {
          this.completed.push('Failed to create : ' + nrc)
          return
        }
        if (data) {
          this.completed.push(nrc)
        }
      })
      // console.log(y)
    }
  }

  handleOk() {
    this.isVisible = false
    this.submitting = false
  }

  handleCancel() {
    this.utitlity.notify.info('Cancel is not available')
  }

  resetForm() {
    this.nrcForms.reset()
    this.evt.onResetForm.emit()
  }
}
