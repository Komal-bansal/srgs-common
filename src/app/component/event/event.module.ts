import { NgModule } from '@angular/core'; 
import { EventComponent } from './event.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : EventComponent
			}
			
		])],
	declarations : [ EventComponent ]
}) 
export class EventModule {
	
}
