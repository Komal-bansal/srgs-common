import { NgModule } from '@angular/core'; 
import { HomeworkAddComponent } from './add';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';


@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : HomeworkAddComponent
			}
		])],
	declarations : [ HomeworkAddComponent, ]
}) 
export class HomeworkAddModule {
	
}
