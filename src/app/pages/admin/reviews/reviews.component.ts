import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './reviews.component.html',
})
export class AdminReviewsComponent implements OnInit {
  pic1: any = ''
  pic2: any = ''
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
      label: '',
    },
  }
  totals = {
    unapproved: 0,
    approved: 0,
  }
  dob: any = ''
  dor: any = ''
  submitting: boolean = false
  nrcForms: FormGroup
  districts: any = []
  edit: boolean = false
  constructor(private utility: UtilitiesService) {
    this.getConfigData()
  }
  ngOnInit() {
    this.getCountUnconfirmedNrc()
    this.getUnconfirmedNrc()
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
  getUnconfirmedNrc() {
    this.utility.getUnapprovedNrcs().subscribe(({ data, errors }) => {
      if (errors) {
        return
      }
      if (data) {
        // @ts-ignore
        if (data.nrcs.length == 1) {
          // @ts-ignore
          this.downloaded = data.nrcs[0]
          this.updateValues()
          return
        }
        // @ts-ignore
        if (data?.nrcs.length > 1) {
          // @ts-ignore
          let rnd = Math.floor(Math.random() * data.nrcs.length - 1)
          console.log(data)
          // @ts-ignore
          this.downloaded = data.nrcs[rnd]
          this.updateValues()
        }
      }
    })
  }
  getCountUnconfirmedNrc() {
    this.utility.getCountUnapprovedNrcs().subscribe(({ data, errors }) => {
      if (errors) {
        return
      }
      if (data) {
        // @ts-ignore
        this.totals.unapproved = data.nrcsConnection.aggregate.count
        // this.updateValues();
      }
    })
  }

  process(e: string) {
    switch (e) {
      case 'a': {
        this.utility.approveNrc(this.downloaded.id).subscribe(({ data, errors }) => {
          if (errors) {
            this.utility.notify.error('Update failed, try again later')
            return
          }
          if (data) {
            this.utility.notify.success('Nrc Updated Completed')
            this.refresh()
          }
        })
        break
      }
      case 'e': {
        this.updateFormValues()
        break
      }
    }
  }

  refresh() {
    this.edit = false
    // @ts-ignore
    this.downloaded = {}
    this.getUnconfirmedNrc()
    this.getCountUnconfirmedNrc()
  }

  private updateValues() {
    this.utility.downloadFile(this.downloaded.pic_id1).subscribe(data => {
      this.pic1 = URL.createObjectURL(data)
      // this.pic1 = data
    })
    this.utility.downloadFile(this.downloaded.pic_id2).subscribe(data => {
      this.pic2 = URL.createObjectURL(data)
      // this.pic1 = data
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
      .updateNrcAndApprove({ district, nrc, dor, dob, names, village, gender, id })
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utility.notify.error('NRC Update failed')
        }
        if (data) {
          this.utility.notify.success('NRC update success')
          this.nrcForms.reset()
          this.refresh()
        }
      })
  }
  updateFormValues() {
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
    this.edit = true
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

  private getConfigData() {
    setInterval(() => {
      this.districts = this.utility.districts
    }, 3000)
  }
}
