import { Injectable } from '@angular/core';

@Injectable()
export class LoaderStop {
	private loaderstop = true;
	getLoader (){
		return this.loaderstop;
	}
	setLoader (ld:boolean){
		this.loaderstop = ld;
	}

}