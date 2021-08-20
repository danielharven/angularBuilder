import { Injectable } from '@angular/core'
import { of } from 'rxjs'

@Injectable()
export class dataService{

  getUserRoles() {
    return of([
      {value:"guest", label:"Guest"},
      {value:"mgf_applicant", label:"MGF Applicant"},
      {value:"camp_officer", label:"Camp Officer"},
      {value:"category_b", label:"Category B Farmer"},
      {value:"audit", label:"Auditor"},
      {value:"external_reviewer", label:"External Reviewer"},
      {value:"do", label:"District Officer"},
      {value:"po", label:"Provincial Officer"},
      {value:"pco", label:"ESAPP"},
    ])
  }

  getUserCardsFilter(role){
    return of({
        "mgf_applicant":[
          {
            "title": "ESAPP MGF",
            "description": "",
            "url": "#",
            "icon":"fe-edit-3"
          },{
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-user"
          },{

            "title": "ESAPP Training Material",
            "description": "",
            "url": "#",
            "icon":"fe-user"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://e-sapp.co.zm/",
            "icon":"fe-globe"
          }
        ],"guest":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-user"
          },{

            "title": "ESAPP Training Material",
            "description": "",
            "url": "#",
            "icon":"fe-user"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://e-sapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "camp_officer":[
          {
            "title": "ESAPP Mobile",
            "description": "",
            "url": "#",
            "icon":"fe-smartphone"
          },{
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "ESAPP Backend",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-briefcase"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://e-sapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "category_b":[
          {
            "title": "ESAPP Mobile",
            "description": "",
            "url": "#",
            "icon":"fe-smartphone"
          },{
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "ESAPP Backend",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-briefcase"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "external_reviewer":[
          {
            "title": "ESAPP External Review",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-edit-3"
          },{
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }

        ],
        "do":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "ESAPP Backend",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-briefcase"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "po":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "ESAPP Backend",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-briefcase"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "pco":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "ESAPP Backend",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-briefcase"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }
        ],
        "shareholder":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },
          {
            "title": "Budget",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-dollar-sign"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "https://esapp.co.zm/",
            "icon":"fe-globe"
          }],
        "audit":[
          {
            "title": "ESAPP Knowledgebase",
            "description": "",
            "url": "#",
            "icon":"fe-book-open"
          },{
            "title": "Audit Trail",
            "description": "",
            "url": "http://mis.e-sapp.co.zm/",
            "icon":"fe-align-left"
          },{
            "title": "ESAPP Website",
            "description": "",
            "url": "#",
            "icon":"fe-globe"
          }
        ]
      }[role]
    )

  }

}
