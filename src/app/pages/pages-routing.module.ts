import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportComponent } from "./report/report.component";
import { SearchComponent } from "./search/search.component";
import { ConsultWizardComponent } from "./consult-wizard/consult-wizard.component";
import { ConsultAutocompleteComponent } from "./consult-autocomplete/consult-autocomplete.component";
import { ConsultComponent } from "./consult/consult.component";
import { ExamEditComponent } from "./exam/exam-edit/exam-edit.component";
import { ExamComponent } from "./exam/exam.component";
import { SpecialtyEditComponent } from "./specialty/specialty-edit/specialty-edit.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { CertGuard } from "../guard/cert.guard";
import { Not403Component } from "./not403/not403.component";
import { Not404Component } from "./not404/not404.component";
import { SignosComponent } from "./signos/signos.component";
import { SignosEditComponent } from "./signos/signos-edit/signos-edit.component";


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[CertGuard]},
    {path:'patient', component: PatientComponent,
    children:[{path:'new', component:PatientEditComponent},
              {path:'edit/:id', component:PatientEditComponent}
            ],
            canActivate:[CertGuard]
    },
    {path:'medic', component:MedicComponent, canActivate:[CertGuard]},
    {path:'specialty', component:SpecialtyComponent,
      children:[{path:'new', component:SpecialtyEditComponent},
              {path:'edit/:id', component:SpecialtyEditComponent}
          ],
          canActivate:[CertGuard]
    },
    {path:'exam', component:ExamComponent,
    children:[{path:'new', component:ExamEditComponent},
              {path:'edit/:id', component:ExamEditComponent}
    ],
    canActivate:[CertGuard]
    },
    {path:'consult', component:ConsultComponent, canActivate:[CertGuard]},
    {path:'consult-autocomplete', component:ConsultAutocompleteComponent, canActivate:[CertGuard]},
    {path:'consult-wizard', component:ConsultWizardComponent, canActivate:[CertGuard]},
    {path:'search', component:SearchComponent, canActivate:[CertGuard]},
    {path:'perfil', component:PerfilComponent, canActivate:[CertGuard]},
    {path:'report', component:ReportComponent, canActivate:[CertGuard]},
    {path:'signos',component:SignosComponent,
      children:[{path:'new',component:SignosEditComponent},
      {path:'edit/:id', component: SignosEditComponent}
      ],
      canActivate: [CertGuard]
    },
    {path:'not-403', component: Not403Component},
    
    
  
  
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  