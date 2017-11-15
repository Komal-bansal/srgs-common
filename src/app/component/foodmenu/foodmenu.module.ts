import { NgModule } from '@angular/core'; 
import { FoodmenuComponent } from './foodmenu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { FoodmenuService } from "../../providers/foodmenu.service";
@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : FoodmenuComponent
			}
			
		])],
	declarations : [ FoodmenuComponent ],
	providers : [ FoodmenuService ]
}) 
export class FoodmenuModule {
	
}
