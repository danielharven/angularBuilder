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
      let y = await this.utitlity.createNrc(data).subscribe()
      console.log(y)
      this.completed.push(nrc)
      // for(let i=0;i<total;i+=2){
      //   let currentNrc= startNrc.split('/');
      //   currentNrc[0] =  (parseInt(startNrc.split('/')[0])+nrcCounter)+"";
      //
      //   //get both ids from the server
      //   let pic1 = this.fileMetaData[i].data._id;
      //   let pic2 = this.fileMetaData[i+1].data._id;
      //   let nrc = currentNrc[0]+currentNrc[1]+currentNrc[2];
      //   let confirmed = false;
      //   let fullname=''
      //   let district = this.para.district
      //
      //   let data={
      //     nrc,pic1,pic2,confirmed,fullname,district
      //   }
      //   this.conf.nrcModules.createNrc(data);
      //   this.warning =false;
      //   // let nrc =
      //   nrcCounter++;
      // }
    }
    this.submitting = false
  }

  handleOk() {
    this.isVisible = false
  }

  handleCancel() {
    this.isVisible = false
  }
}
