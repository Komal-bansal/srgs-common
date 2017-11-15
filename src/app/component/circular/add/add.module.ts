import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { AddCircular } from './add';


@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : AddCircular
			}
		])],
	declarations : [ AddCircular ]
}) 
export class AddModule {
	
}
