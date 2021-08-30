import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'
import { DomSanitizer } from '@angular/platform-browser'
import { NzImageService } from 'ng-zorro-antd/image'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-business-data',
  templateUrl: './data.component.html',
})
export class BusinessDataComponent implements OnInit {
  submitting: boolean = false
  nrcForms: FormGroup
  districts: any = []
  dob: any = ''
  dor: any = ''
  downloaded = {
    nrc: '',
    createdAt: '',
    pic_id1: '',
    pic_id2: '',
    names: '',
    dor: '',
    dob: '',
    gender: '',
    village: '',
    id: '',
    district: {
      id: '',
    },
  }
  pic1: any = ''
  pic2: any = ''
  images = [
    {
      src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
      width: '200px',
      height: '200px',
      alt: 'ng-zorro',
    },
    {
      src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
      width: '200px',
      height: '200px',
      alt: 'angular',
    },
  ]
  nrcExists: boolean = false
  constructor(private utility: UtilitiesService, private nzImageService: NzImageService) {
    this.getConfigData()
  }
  ngOnInit() {
    this.getUnconfirmed()
    this.nrcForms = new FormGroup({
      nrc: new FormControl(null, Validators.required),
      names: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      dor: new FormControl(null, Validators.required),
      village: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      district: new FormControl('', Validators.required),
    })
  }

  submitForm() {
    if (!this.nrcForms.valid) {
      for (const i in this.nrcForms.controls) {
        if (this.nrcForms.controls.hasOwnProperty(i)) {
          this.nrcForms.controls[i].markAsDirty()
          this.nrcForms.controls[i].updateValueAndValidity()
        }
      }
      this.utility.notify.error('Kindly ensure all fields are completed')
      return
    }
    let { district, nrc, dor, dob, names, village, gender } = this.nrcForms.value
    let { id } = this.downloaded
    this.utility
      .updateNrc({ district, nrc, dor, dob, names, village, gender, id })
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utility.notify.error('NRC Update failed')
          return
        }
        if (data) {
          this.utility.notify.success('NRC update success')
          this.nrcForms.reset()
        }
      })
  }

  changeDob(result: Date) {
    // console.log('onChange: ', result);
    let isoDate = result.toISOString()
    this.nrcForms.patchValue({
      dob: isoDate,
    })
  }
  changeDor(result: Date) {
    let isoDate = result.toISOString()
    this.nrcForms.patchValue({
      dor: isoDate,
    })
  }
  getUnconfirmed() {
    // this.checkNrc();
    // @ts-ignore
    this.downloaded = {}
    this.utility.getUnconfirmedNrcs().subscribe(({ data, errors }) => {
      if (errors) {
        return
      }
      if (data) {
        // @ts-ignore
        let rnd = Math.floor(Math.random() * data.nrcs.length - 1)
        console.log(data)
        // @ts-ignore
        this.downloaded = data.nrcs[rnd]
        this.updateValues()
      }
    })
  }
  updateValues() {
    this.dob = this.downloaded.dob
    this.dor = this.downloaded.dor
    this.nrcForms.patchValue({
      names: this.downloaded.names,
      nrc: this.downloaded.nrc,
      village: this.downloaded.village,
      gender: this.downloaded.gender,
      dob: this.downloaded.dob,
      dor: this.downloaded.dor,
      district: this.downloaded.district.id,
    })
    //get images
    this.utility.downloadFile(this.downloaded?.pic_id1).subscribe(data => {
      this.pic1 = URL.createObjectURL(data)
      // this.pic1 = data
    })
    this.utility.downloadFile(this.downloaded?.pic_id2).subscribe(data => {
      this.pic2 = URL.createObjectURL(data)
      // this.pic1 = data
    })
  }
  clickImage() {
    this.images[0].src = this.pic1
    this.images[1].src = this.pic2
    this.nzImageService.preview(this.images, { nzZoom: 1.5, nzRotate: 0 })
  }

  private getConfigData() {
    setInterval(() => {
      this.districts = this.utility.districts
    }, 3000)
  }

  checkNrc() {
    let { nrc } = this.nrcForms.value
    this.utility.checkIfNrcExists(nrc).subscribe(({ data, errors }) => {
      if (errors) {
        return
      }
      if (data) {
        // @ts-ignore
        if (data.nrcs.length > 1) {
          this.nrcExists = true
        } else {
          this.nrcExists = false
        }
      }
    })
  }
}
