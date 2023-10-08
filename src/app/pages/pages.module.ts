import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientComponent } from './patient/patient.component';
import { MedicComponent } from './medic/medic.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicDialogComponent } from './medic/medic-dialog/medic-dialog.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { ConsultComponent } from './consult/consult.component';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { SearchComponent } from './search/search.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { ReportComponent } from './report/report.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { RandomComponent } from './login/forgot/random/random.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SignosComponent } from './signos/signos.component';
import { SignosEditComponent } from './signos/signos-edit/signos-edit.component';



@NgModule({
  declarations: [
    PatientComponent,
    MedicComponent,
    PatientEditComponent,
    MedicDialogComponent,
    ExamComponent,
    ExamEditComponent,
    SpecialtyComponent,
    SpecialtyEditComponent,
    ConsultComponent,
    LayoutComponent,
    ConsultAutocompleteComponent,
    ConsultWizardComponent,
    SearchComponent,
    SearchDialogComponent,
    ReportComponent,
    LayoutComponent,
    DashboardComponent,
    Not403Component,
    Not404Component,
    ForgotComponent,
    RandomComponent,
    PerfilComponent,
    SignosComponent,
    SignosEditComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PdfViewerModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PagesRoutingModule
  ],
  providers: [],
})
export class PageModule{ }