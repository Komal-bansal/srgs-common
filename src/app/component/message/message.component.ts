import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MessageService } from '../../providers/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonService } from '../../providers/common.service'
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],

}
)

export class MessageComponent implements AfterViewInit, OnInit {

  public fileUrl: string = "";

  //Display Old Messages
  public messageForm: FormGroup; //Send Message on an old thread
  public pictureForm: FormGroup;
  public currentPage: number = 1; //For recipients
  public noMore: boolean = false;
  public currentMessagePage: number = 1; //For Messages
  public noMoreMessages: boolean = false;
  public oldMessageRecipients: any[]; //List of old messages
  public emptyOldRecipient: boolean = false;
  public oldMessageRecipientsCOPY: any[];
  public selectedIndex: number; //for styling selected nav element
  public selectedOldRecipient: any[]; // Message Array
  public emptyOldMessages: boolean = false;

  public emptySearchResult: boolean = false;
  public loader: boolean = true;
  public loader1:boolean=true;
  public closed: boolean = false;
  public recipientName: any;
  public file: any;
  public imgUrl: any;
  public selectedId: any;
  public currentUser: any;

  //New Message
  public standardsArray: any[];
  public newMessageForm: FormGroup;
  public students: any[];
  public categories: any[];
  public standard: any;
  public selectedStudent: any;
  public newMsg:any;
  constructor(public ms: MessageService, public cs: CommonService,public router:Router) {

  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("name");
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getMessages();
    this.initForm();
    this.initnewMessageForm();
    this.getStandards();
    this.pictureForm = new FormGroup({
      // message: new FormControl('', [Validators.required]),
    })

  }

  ngAfterViewInit() {

  }

  //Old Messages

  public getMessages() {
    this.loader1 = true;
    this.ms.getAllMessages(this.currentPage).subscribe(res => {
      if (res.status == 204) {
        this.oldMessageRecipients = [];
        this.emptyOldRecipient = true;
        this.loader1 = false;
        return;
      }
      this.emptyOldRecipient = false;
      this.oldMessageRecipients = res;
      this.oldMessageRecipientsCOPY = this.oldMessageRecipients
      // console.log("msg", this.oldMessageRecipients);
      this.selectOldRecipient(this.oldMessageRecipients[0], 0);
      if (this.oldMessageRecipients.length < 12) {
        this.noMore = true;
      }
      else {
        this.noMore = false;
      }

    },
      err => {
        this.errPage();
      })

    this.loader = false;
  }

  initForm() {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  public selectOldRecipient(r: any, i: any) {
    this.initForm();
    this.currentMessagePage = 1;
    this.selectedIndex = i;
    this.selectedId = r.id;  //for submit
    if (r.againstParentName != null)
      this.recipientName = r.againstParentName;
    else
      this.recipientName = r.firstMessage.parentName;
    if (r.isClosed)
      this.closed = true;
    else
      this.closed = false;
    // console.log("this.recipientName", this.recipientName)
    this.getSelectedMessage(this.selectedId);
  }

  public getSelectedMessage(id: any) {
    this.loader = true;    
    var oldMessages: any[];
    oldMessages = this.selectedOldRecipient;
    // console.log("selected Id", id);
    // console.log("currentPage", this.currentMessagePage);
    this.ms.getMessage(id, this.currentMessagePage).subscribe(res => {
      if (res.status == 204) {
        this.selectedOldRecipient = [];
        this.emptyOldMessages = true;
        $("#noMessageModal").modal('show');
        this.currentMessagePage -= 1;
        this.getSelectedMessage(this.selectedId);
        this.loader = false;
        return;
      }
      // console.log("message", res);
      this.selectedOldRecipient = res;
      this.emptyOldMessages = false;
      // For Old Messages
      if (this.selectedOldRecipient.length < 6 && this.currentMessagePage != 1) {
        this.noMoreMessages = true;
        // console.log("less than 5", oldMessages);
        // console.log('df',this.selectedOldRecipient);

        this.selectedOldRecipient = oldMessages.concat(this.selectedOldRecipient);

        // console.log(this.selectedOldRecipient);
      }

      if (this.selectedOldRecipient.length < 12) {
        this.noMoreMessages = true;
      }
      else {
        this.noMoreMessages = false;
        // this.selectedOldRecipient = res;
      }

      //For New Messages

      this.loader = false;
    },
      err => {
        this.loader = false;
        this.errPage();
        // console.log("err", err);
      })
  }

  public loadOldMessages() {
    // delete this.selectedOldRecipient;
    this.currentMessagePage += 1;
    this.getSelectedMessage(this.selectedId);
  }

  public loadNewMessages() {
    // delete this.selectedOldRecipient;
    this.currentMessagePage -= 1;
    this.getSelectedMessage(this.selectedId);
  }

  public previousPage() {
    delete this.oldMessageRecipients;
    this.currentPage -= 1;
    this.getMessages();
  }

  public nextPage() {
    delete this.oldMessageRecipients;
    this.currentPage += 1;
    this.getMessages();
  }

  public searchMessages(ev: any) {
    this.oldMessageRecipients = this.oldMessageRecipientsCOPY;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.emptySearchResult = false;
      this.oldMessageRecipients = this.oldMessageRecipientsCOPY.filter((item: any) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if (this.oldMessageRecipients.length === 0)
        this.emptySearchResult = true;
      else
        this.emptySearchResult = false;
    }
  }

  getFile(event: any) {
    var ext = event.srcElement.files[0];
    var reader = new FileReader();
    if(ext.type=="image/png" || ext.type=="image/jpeg" || ext.type=="image/jpg"){
      this.file = event.srcElement.files[0];
    }
    else{
       $('#errorModal').modal('show');
      // this.newMessageForm.controls['file'].reset();      
    }
    reader.onload = function (e: any) {
      $('#img33')
        .attr('src', e.target.result)
    };
    // var blob = event.srcElement.files[0];
    // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
    //   this.file = event.srcElement.files[0];
    // }
    // else{
    //    $('#errorModal').modal('show');
    //   this.circular.controls['file'].reset();
    // }
    reader.readAsDataURL(event.srcElement.files[0]);

  }


  submitMessageForm() {
    this.loader = true;
    this.ms.conversationComment(this.selectedId, this.messageForm.value).subscribe(res => {
      // console.log("form Value", this.messageForm.value);
      this.currentMessagePage = 1;
      this.messageForm.value['employeeName'] = this.currentUser;
      this.messageForm.value['createdAt'] = new Date();
      this.messageForm.value['employeePicTimestamp'] = localStorage.getItem("picTimestamp");
      this.selectedOldRecipient.unshift(this.messageForm.value);
      this.initForm();
      this.loader = false;
    },
      er => {
        this.errPage();
        // console.log("Er", er);
      })

  }

  public submitFormWithPicture() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.file);
    this.ms.conversationCommentWithPicture(this.selectedId, formData).subscribe(res => {
      this.currentMessagePage = 1;
      this.getSelectedMessage(this.selectedId);
      this.file = null;
      this.loader = false;
    }, er => {
      this.errPage();
      // console.log("Er", er);
    })

  }

  public closeConversation() {
    this.loader = true;
    this.ms.closeConversation(this.selectedId).subscribe(res => {
      // console.log("close");
      this.closed = true;
      this.oldMessageRecipients[this.selectedIndex].isClosed = true;

    },
      err => {
        this.errPage();
        // console.log("err", err);
      })
    this.loader = false;
  }


  //New Message

  public newMessage() {
    this.selectedOldRecipient = null;
    // this.createMessage = true;
    this.newMsg=true;
    // this.selectedRecipient = null;
    this.initnewMessageForm();
    // this.getStandards();
  }

  public initnewMessageForm() {
    this.standard = null;
    this.categories = null;
    this.students = null;
    this.newMessageForm = new FormGroup({
      // standards: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      // againstParentId: new FormControl('', [Validators.required])
    })
  }

  public getStandards() {
    this.loader = true;
    this.ms.getStandards().subscribe(res => {
      if (res.status === 204) {
        this.standardsArray = null;
        this.loader = false;
        return;
      }
      this.standardsArray = res;
    },
      err => {
        this.errPage();
        // console.log("err", err);
      })
    this.loader = false;
  }

  public onStandard(ev: any) {
    this.loader = true;
    this.ms.getMessageCategory(ev).subscribe(res => {
      if (res.status === 204) {
        this.categories = null;
        this.students = null;
        this.loader = false;
        return;
      }
      // console.log(res);
      this.students = res.students;
      this.categories = res.categories;
      this.loader = false;
    },
      err => {
        this.errPage();
        // console.log("Err", err)
      })
    this.loader = false;
  }

  public submitNewMessage() {
    this.loader = true;
    // console.log("f", this.selectedStudent)
    var temp = {
      againstParentId: this.selectedStudent.parentId,
      againstStudentId: this.selectedStudent.id,
    }
      ;
    temp = Object.assign(temp, this.newMessageForm.value)
    // console.log(temp);
    this.ms.newConversation(temp).subscribe(res => {
      this.getMessages();
      $("#submitModal").modal('show');
      this.initnewMessageForm();
    },
      err => {
        this.errPage();
        // console.log("Err", err);
      })
    this.loader = false;
  }

  public errPage() {
    this.loader = false;
    this.router.navigate(['/error']);
  }

}
