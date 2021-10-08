import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { environment } from '../../../../environments/environment'

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
    }, chief: '',

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
  searchedNrcData: any = []
  expandSet = new Set<number>()
  nrc: string=''
  visible: boolean =false
  duplicatedNrcs: any=[]
  chosenTab: number=0
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id)
    } else {
      this.expandSet.delete(id)
    }
  }
  constructor(private utility: UtilitiesService) {
    this.getConfigData()
  }
  ngOnInit() {
    this.resetImages();
    this.getCountUnconfirmedNrc()
    this.getUnconfirmedNrc()
    this.nrcForms = new FormGroup({
      nrc: new FormControl(null, Validators.required),
      names: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      dor: new FormControl(null, Validators.required),
      village: new FormControl(null, Validators.required),
      chief: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      district: new FormControl('', Validators.required),
    })
  }
  resetImages(){
    this.pic1 = 'assets/images/zambiaCoatOfArms.jfif'
    this.pic2 = 'assets/images/zambiaCoatOfArms.jfif'
  }
  getUnconfirmedNrc() {
    this.resetImages();
    this.utility.getUnapprovedNrcs()
      .subscribe(({ data, errors }) => {
      if (errors) {
        this.utility.auditQuery({item:`NRC `,action:'Failed -Get Unconfirmed'}).subscribe(
          data=>{}
        )
        return
      }
      if (data) {
        this.utility
          .auditQuery({item:"NRC",action:'Get unconfirmed'}).subscribe(
          data=>{}
        )
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
          if(rnd == -1) rnd = 0
          // console.log(data)
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
        this.utility.approveNrc(this.downloaded.id)
          .subscribe(({ data, errors }) => {
          if (errors) {
            this.utility.auditQuery({item:`NRC - ${this.downloaded.nrc}`,action:'Failed - Approve'}).subscribe(
              data=>{}
            )
            this.utility.notify.error('Approve failed, try again later')
            return
          }
          if (data) {
            this.utility.auditQuery({item:`NRC - ${this.downloaded.nrc}`,action:'Approve'}).subscribe(
              data=>{}
            )
            this.utility.notify.success('Nrc Approve Completed')
            this.refresh()
          }
        })
        break
      }
      case 'd': {
        this.utility.deleteNrc(this.downloaded.id)
          .subscribe(({ data, errors }) => {
          if (errors) {
            this.utility.auditQuery({item:`NRC - ${this.downloaded.nrc}`,action:'Failed - Delete'}).subscribe(
              data=>{}
            )
            this.utility.notify.error('Update failed, try again later')
            return
          }
          if (data) {
            this.utility.auditQuery({item:`NRC - ${this.downloaded.nrc}`,action:'Delete'}).subscribe(
              data=>{}
            )
            this.utility.notify.success('Nrc Delete Completed')
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
  approveNrc(nrcData){
    this.utility.approveNrc(nrcData.id)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utility.auditQuery({item:`NRC - ${nrcData.nrc}`,action:'Failed - Approve'}).subscribe(
            data=>{}
          )
          this.utility.notify.error('Approve failed, try again later')
          return
        }
        if (data) {
          this.utility.auditQuery({item:`NRC - ${nrcData.nrc}`,action:'Approve'}).subscribe(
            data=>{}
          )
          this.utility.notify.success('Nrc Approve Completed')
          this.refresh()
        }
      })
  }
  deleteNrc(nrcData){
    this.utility.deleteNrc(nrcData.id)
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utility.auditQuery({item:`NRC - ${nrcData.nrc}`,action:'Failed - delete'}).subscribe(
            data=>{}
          )
          this.utility.notify.error('delete failed, try again later')
          return
        }
        if (data) {
          this.nrc=nrcData.nrc;
          this.searchNrc()
          this.utility.auditQuery({item:`NRC - ${nrcData.nrc}`,action:'Deleted'}).subscribe(
            data=>{}
          )
          this.utility.notify.success('Nrc deleted Completed')
          this.refresh()
        }
      })
  }
  editNrc(nrcData){
    this.visible=true;
    this.downloaded=nrcData;
    this.nrcForms.patchValue({
      district:nrcData.district.label,
      nrc : nrcData.nrc,
      names : nrcData.names,
      village : nrcData.village,
      chief : nrcData.chief,
      gender : nrcData.gender,
      dob : nrcData.dob,
      dor : nrcData.dor,
    })

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
    let { district, nrc, dor, dob, names, village, gender,chief } = this.nrcForms.value
    let { id } = this.downloaded
    this.utility
      .updateNrcAndApprove({chief, district, nrc, dor, dob, names, village, gender, id })
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

  searchNrc() {
    this.utility.searchNrcs(this.nrc).subscribe(
      ({data,errors})=>{
        if(errors){
          return
        }
        if(data){
          // @ts-ignore
          this.searchedNrcData=data.nrcs;
        }
      }
    )
  }

  close() {
    this.visible =false
  }

  chooseRow(data: any) {
    // console.log(data)
    this.downloaded = data;
    this.updateValues();
  }

  duplicateList() {
    this.utility.http.get(environment.url+'/nrcs/duplicates').subscribe(
      (data:any)=>{
        // let myd = data?.data.replace(/Nrcs.nrc/g,"nrc")
        //  myd = myd.replace(/Nrcs.count/g,"count");
       // myd = JSON.parse(myd)
        console.log(data.data[0]['nrc'])
        this.duplicatedNrcs =data.data;

      },err=>{
        this.utility.notify.error('Error: Failed to get duplicate NRC')
      }
    )
  }

  getDuplicateInfo(data: any) {
    this.utility.searchNrcs(data.nrc).subscribe(
      ({data,errors})=>{
        if(errors){
          return ;
        }
        if(data){
          // @ts-ignore
          this.searchedNrcData = data?.nrcs;
          this.chosenTab=1;
        }
      }
    )
  }
}
