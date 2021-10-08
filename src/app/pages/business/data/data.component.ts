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
  districtsFather: any = []
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
    education: '',
    race: 'undefined',
    birthCountry: 'undefined',
    birthDistrict: '',
    fatDistrict: 'undefined',
    fatVillage: 'undefined',
    fatChief: 'undefined',
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
  province: any = ''
  provinces: any = []
  chiefs: any = []
  countries: any = []
  education: any = [
    {
      name: 'Never',
    },
    {
      name: 'Primary',
    },
    {
      name: 'Secondary',
    },
    {
      name: 'Post Secondary',
    },
  ]
  race: any = [
    {
      name: 'African',
    },
    {
      name: 'Asian',
    },
    {
      name: 'European',
    },
    {
      name: 'Other',
    },
  ]
  chiefsFather: any = []
  constructor(private utility: UtilitiesService, private nzImageService: NzImageService) {
    this.getConfigData()
  }
  ngOnInit() {
    this.utility.getDistricts().valueChanges.subscribe(result => {
      // @ts-ignore
      this.provinces = result?.data?.districts
    })
    this.getUnconfirmed()
    this.nrcForms = new FormGroup({
      id: new FormControl(null, Validators.required),
      nrc: new FormControl(null, Validators.required),
      appVillage: new FormControl(null),
      appDistrict: new FormControl(null),
      appCountry: new FormControl(null),
      fatVillage: new FormControl(null, Validators.required),
      fatDistrict: new FormControl(null, Validators.required),
      fatChief: new FormControl(null, Validators.required),
      education: new FormControl(null, Validators.required),
      race: new FormControl(null, Validators.required),
      names: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      dor: new FormControl(null, Validators.required),
      village: new FormControl(null),
      chief: new FormControl(null),
      gender: new FormControl(null, Validators.required),
      district: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
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
    let {
      district,
      nrc,
      dor,
      dob,
      names,
      village,
      gender,
      chief,
      fatVillage,
      fatChief,
      fatDistrict,
      appDistrict,
      id,
      education,
      race,
      country,
    } = this.nrcForms.value
    // let { id } = this.downloaded
    this.utility
      .updateNrc({
        district,
        nrc,
        dor,
        dob,
        names,
        village,
        gender,
        id,
        chief,
        fatVillage,
        fatChief,
        fatDistrict,
        appDistrict,
        education,
        race,
        country,
      })
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utility.notify.error('NRC Update failed')
          this.utility
            .auditQuery({ item: `NRC - ${nrc}`, action: 'Failed - Update' })
            .subscribe(data => {})
          return
        }
        if (data) {
          this.utility
            .auditQuery({ item: `NRC - ${nrc}`, action: 'Confirmed' })
            .subscribe(data => {})
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
    /*Get all unconfirmed NRC by chosen districts*/
    // @ts-ignore
    this.downloaded = {}
    this.utility.getUnconfirmedNrcsByDistrict(this.province).subscribe(({ data, errors }) => {
      if (errors) {
        this.utility
          .auditQuery({ item: `NRC`, action: 'Failed -Get Unconfirmed' })
          .subscribe(data => {})
        return
      }
      if (data) {
        this.utility
          .auditQuery({ item: `NRC`, action: 'Get Unconfirmed' })
          .subscribe((data: any) => {})
        // @ts-ignore
        if (data.nrcs.length == 1) {
          //@ts-ignore
          this.downloaded = data.nrcs[0]
        }
        // @ts-ignore
        let rnd = Math.floor(Math.random() * data.nrcs.length - 1)
        // console.log(data)
        // @ts-ignore
        this.downloaded = data.nrcs[rnd]
        this.updateValues()
      }
    })
  }
  updateValues() {
    // id: new FormControl(null, Validators.required),
    //   nrc: new FormControl(null, Validators.required),
    //   appVillage: new FormControl(null),
    //   appDistrict: new FormControl(null),
    //   appCountry: new FormControl(null),
    //   fatVillage: new FormControl(null,Validators.required),
    //   fatDistrict: new FormControl(null,Validators.required),
    //   fatChief: new FormControl(null,Validators.required),
    //   education: new FormControl(null, Validators.required),
    //   race: new FormControl(null, Validators.required),
    //   names: new FormControl(null, Validators.required),
    //   dob: new FormControl(null, Validators.required),
    //   dor: new FormControl(null, Validators.required),
    //   village: new FormControl(null),
    //   chief: new FormControl(null),
    //   gender: new FormControl(null, Validators.required),
    //   district: new FormControl('', Validators.required),
    //   country: new FormControl('', Validators.required),
    this.dob = this.downloaded.dob
    this.dor = this.downloaded.dor
    this.nrcForms.patchValue({
      id: this.downloaded.id,
      race: this.downloaded.race,
      education: this.downloaded.education,
      appCountry: this.downloaded.birthCountry,
      appDistrict: this.downloaded.birthDistrict,
      fatDistrict: this.downloaded.fatDistrict,
      fatVillage: this.downloaded.fatVillage,
      fatChief: this.downloaded.fatChief,
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
      this.utility
        .auditQuery({
          item: `NRC Image - ${this.downloaded?.nrc}`,
          action: 'Downloaded Image for NRC',
        })
        .subscribe(data => {})
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
  onDistrictChange() {
    this.getChiefsByDistricts()
  }

  private getConfigData() {
    this.utility.getCountries().subscribe(
      ({ data, errors }) => {
        if (errors) {
          this.errorMsg('Failed to get countries')
          return
        }
        if (data) {
          // @ts-ignore
          this.countries = data.countries
        }
      },
      error => {
        console.log(error)
        this.utility.notify.error('Failed to get countries')
      },
      () => {},
    )
    this.utility.getDistricts().valueChanges.subscribe(
      ({ data, errors }) => {
        if (errors) {
          this.errorMsg('Failed to get districts')
          return
        }
        if (data) {
          // @ts-ignore
          this.districtsFather = data.districts
        }
      },
      error => {
        console.log(error)
        this.utility.notify.error('Failed to get districts')
      },
      () => {},
    )
  }
  getDistrictsByCountry() {
    let { country } = this.nrcForms.value
    this.utility.getDistrictsByCountry(country).subscribe(
      ({ data, errors }) => {
        if (errors) {
          this.errorMsg('Failed to get districts')
          return
        }
        // @ts-ignore
        this.districts = data?.districts
      },
      error => {
        this.errorMsg('Failed to get districts')
        return
      },
      () => {},
    )
  }
  checkNrc() {
    let { nrc } = this.nrcForms.value
    this.utility.checkIfNrcExists(nrc).subscribe(({ data, errors }) => {
      if (errors) {
        this.utility
          .auditQuery({ item: `NRC`, action: 'Failed -Failed - Check Nrc for duplication' })
          .subscribe(data => {})
        return
      }
      if (data) {
        this.utility
          .auditQuery({ item: `NRC`, action: 'Check Nrc for duplication' })
          .subscribe(data => {})
        // @ts-ignore
        if (data.nrcs.length > 1) {
          this.nrcExists = true
        } else {
          this.nrcExists = false
        }
      }
    })
  }

  getChiefsByDistricts() {
    //get Chiefs
    let { appDistrict } = this.nrcForms.value
    this.utility.getChiefByDistrict(appDistrict).subscribe(({ data, errors }) => {
      if (errors) {
        this.errorMsg('Failed to get chiefs')
        return
      }
      if (data) {
        //@ts-ignore
        this.chiefs = data?.chiefs
        return
      }
    })
  }
  getChiefsByDistrictsFather() {
    //get Chiefs
    let { fatDistrict } = this.nrcForms.value
    this.utility.getChiefByDistrict(fatDistrict).subscribe(({ data, errors }) => {
      if (errors) {
        this.errorMsg('Failed to get chiefs')
        return
      }
      if (data) {
        //@ts-ignore
        this.chiefsFather = data?.chiefs
        return
      }
    })
  }
  errorMsg(msg) {
    this.utility.notify.error(msg)
  }
  successMsg(msg) {
    this.utility.notify.success(msg)
  }
}
